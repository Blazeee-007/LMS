import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Upload, X, Bell, Mail, User, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useNotifications } from "@/hooks/use-notifications";

const steps = ["Personal Information", "Leave Details", "Work Arrangement", "Review"];

const DEPARTMENTS = [
  "Computer Science",
  "Electronics & Communication",
  "Electrical & Electronics", 
  "Mechanical Engineering",
  "Civil Engineering",
  "Information Technology",
  "Chemical Engineering"
];

const DESIGNATIONS = [
  "Professor",
  "Associate Professor", 
  "Assistant Professor",
  "Lecturer",
  "Senior Lecturer"
];

const LEAVE_TYPES = [
  { id: "medical", name: "Medical Leave", requiresDocument: true, maxDays: 30 },
  { id: "personal", name: "Personal Leave", requiresDocument: false, maxDays: 15 },
  { id: "academic", name: "Academic Leave", requiresDocument: true, maxDays: 180 },
  { id: "emergency", name: "Emergency Leave", requiresDocument: false, maxDays: 7 }
];

export const FacultyApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendNotification } = useNotifications();
  
  const [formData, setFormData] = useState({
    facultyName: "",
    facultyId: "",
    employeeId: "",
    department: "",
    designation: "",
    title: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    workAllocation: "",
    substituteArranged: false,
    substituteFaculty: "",
    email: "",
    phone: "",
    emailNotification: true,
    adminApprovalRequired: false,
  });

  const [documents, setDocuments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      
      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        setUploadError("Some files exceed the 5MB size limit");
        return;
      }
      
      setDocuments(prev => [...prev, ...selectedFiles]);
      setUploadError(null);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const calculateLeaveDuration = () => {
    if (formData.fromDate && formData.toDate) {
      const from = new Date(formData.fromDate);
      const to = new Date(formData.toDate);
      const diffTime = Math.abs(to.getTime() - from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 0) {
      if (!formData.facultyName) newErrors.facultyName = "Faculty name is required";
      if (!formData.facultyId) newErrors.facultyId = "Faculty ID is required";
      if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
      if (!formData.department) newErrors.department = "Department is required";
      if (!formData.designation) newErrors.designation = "Designation is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
    } else if (currentStep === 1) {
      if (!formData.title) newErrors.title = "Leave title is required";
      if (!formData.leaveType) newErrors.leaveType = "Leave type is required";
      if (!formData.fromDate) newErrors.fromDate = "From date is required";
      if (!formData.toDate) newErrors.toDate = "To date is required";
      if (!formData.reason) newErrors.reason = "Reason is required";
      
      if (formData.fromDate && formData.toDate) {
        const fromDate = new Date(formData.fromDate);
        const toDate = new Date(formData.toDate);
        
        if (fromDate > toDate) {
          newErrors.toDate = "End date cannot be before start date";
        }

        const selectedLeaveType = LEAVE_TYPES.find(type => type.id === formData.leaveType);
        const duration = calculateLeaveDuration();
        if (selectedLeaveType && duration > selectedLeaveType.maxDays) {
          newErrors.toDate = `${selectedLeaveType.name} cannot exceed ${selectedLeaveType.maxDays} days`;
        }
      }
    } else if (currentStep === 2) {
      if (!formData.workAllocation) newErrors.workAllocation = "Work allocation details are required";
      if (formData.substituteArranged && !formData.substituteFaculty) {
        newErrors.substituteFaculty = "Substitute faculty name is required";
      }
      
      const selectedLeaveType = LEAVE_TYPES.find(type => type.id === formData.leaveType);
      if (selectedLeaveType?.requiresDocument && documents.length === 0) {
        setUploadError(`Supporting documents are required for ${selectedLeaveType.name}`);
        return false;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      if (formData.emailNotification) {
        sendNotification({
          methods: ['email'],
          title: "Faculty Leave Application Submitted",
          message: `Your leave request from ${formData.fromDate} to ${formData.toDate} has been submitted for approval.`,
          recipient: formData.email
        });
      }
      
      toast({
        title: "Leave Application Submitted",
        description: "Your leave request has been submitted for approval. You will be notified of updates.",
      });
    }
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="facultyName">Full Name</Label>
              <Input
                id="facultyName"
                name="facultyName"
                value={formData.facultyName}
                onChange={handleInputChange}
                className={errors.facultyName ? "border-red-500" : ""}
              />
              {errors.facultyName && (
                <p className="text-sm text-red-500">{errors.facultyName}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facultyId">Faculty ID</Label>
                <Input
                  id="facultyId"
                  name="facultyId"
                  value={formData.facultyId}
                  onChange={handleInputChange}
                  className={errors.facultyId ? "border-red-500" : ""}
                />
                {errors.facultyId && (
                  <p className="text-sm text-red-500">{errors.facultyId}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className={errors.employeeId ? "border-red-500" : ""}
                />
                {errors.employeeId && (
                  <p className="text-sm text-red-500">{errors.employeeId}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select 
                  name="department" 
                  onValueChange={(value) => handleSelectChange('department', value)}
                >
                  <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-500">{errors.department}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Select 
                  name="designation" 
                  onValueChange={(value) => handleSelectChange('designation', value)}
                >
                  <SelectTrigger className={errors.designation ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {DESIGNATIONS.map((designation) => (
                      <SelectItem key={designation} value={designation}>
                        {designation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.designation && (
                  <p className="text-sm text-red-500">{errors.designation}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="title">Leave Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a brief title for your leave"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leaveType">Leave Type</Label>
              <Select 
                name="leaveType" 
                onValueChange={(value) => handleSelectChange('leaveType', value)}
              >
                <SelectTrigger className={errors.leaveType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  {LEAVE_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} (Max: {type.maxDays} days) {type.requiresDocument && "*"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.leaveType && (
                <p className="text-sm text-red-500">{errors.leaveType}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromDate">From Date</Label>
                <Input
                  id="fromDate"
                  name="fromDate"
                  type="date"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  className={errors.fromDate ? "border-red-500" : ""}
                />
                {errors.fromDate && (
                  <p className="text-sm text-red-500">{errors.fromDate}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="toDate">To Date</Label>
                <Input
                  id="toDate"
                  name="toDate"
                  type="date"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  className={errors.toDate ? "border-red-500" : ""}
                />
                {errors.toDate && (
                  <p className="text-sm text-red-500">{errors.toDate}</p>
                )}
              </div>
            </div>

            {formData.fromDate && formData.toDate && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Duration: {calculateLeaveDuration()} days
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Provide detailed reason for your leave request"
                className={errors.reason ? "border-red-500" : ""}
                rows={4}
              />
              {errors.reason && (
                <p className="text-sm text-red-500">{errors.reason}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="workAllocation">Work Allocation Details</Label>
              <Textarea
                id="workAllocation"
                name="workAllocation"
                value={formData.workAllocation}
                onChange={handleInputChange}
                placeholder="List subjects, classes, and responsibilities you handle"
                className={errors.workAllocation ? "border-red-500" : ""}
                rows={3}
              />
              {errors.workAllocation && (
                <p className="text-sm text-red-500">{errors.workAllocation}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="substitute-arranged" 
                  checked={formData.substituteArranged}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, substituteArranged: checked as boolean }))}
                />
                <Label htmlFor="substitute-arranged" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Substitute faculty arranged
                </Label>
              </div>
              {formData.substituteArranged && (
                <div className="pl-6 pt-2">
                  <Label htmlFor="substituteFaculty">Substitute Faculty Name</Label>
                  <Input
                    id="substituteFaculty"
                    name="substituteFaculty"
                    value={formData.substituteFaculty}
                    onChange={handleInputChange}
                    placeholder="Name of the substitute faculty member"
                    className={errors.substituteFaculty ? "border-red-500" : ""}
                  />
                  {errors.substituteFaculty && (
                    <p className="text-sm text-red-500">{errors.substituteFaculty}</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email-notification" 
                  checked={formData.emailNotification}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, emailNotification: checked as boolean }))}
                />
                <Label htmlFor="email-notification" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Send email notifications for status updates
                </Label>
              </div>
            </div>

            {LEAVE_TYPES.find(type => type.id === formData.leaveType)?.requiresDocument && (
              <div className="space-y-2">
                <Label>Supporting Documents</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-2"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Button>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, DOCX, JPG, PNG files up to 5MB each
                  </p>
                </div>
                
                {uploadError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{uploadError}</AlertDescription>
                  </Alert>
                )}
                
                {documents.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Documents:</p>
                    {documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocument(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Review Your Application</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Name:</strong> {formData.facultyName}</p>
                  <p><strong>Faculty ID:</strong> {formData.facultyId}</p>
                  <p><strong>Employee ID:</strong> {formData.employeeId}</p>
                  <p><strong>Department:</strong> {formData.department}</p>
                  <p><strong>Designation:</strong> {formData.designation}</p>
                </div>
                <div>
                  <p><strong>Leave Type:</strong> {LEAVE_TYPES.find(t => t.id === formData.leaveType)?.name}</p>
                  <p><strong>Duration:</strong> {formData.fromDate} to {formData.toDate}</p>
                  <p><strong>Days:</strong> {calculateLeaveDuration()} days</p>
                  <p><strong>Substitute:</strong> {formData.substituteArranged ? formData.substituteFaculty : "Not arranged"}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p><strong>Reason:</strong> {formData.reason}</p>
                <p><strong>Work Allocation:</strong> {formData.workAllocation}</p>
              </div>
              
              {documents.length > 0 && (
                <div className="mt-4">
                  <p><strong>Documents:</strong> {documents.length} file(s) uploaded</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Faculty Leave Application
        </h2>
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm ${
                  index <= currentStep ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className="w-12 h-0.5 bg-gray-200 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderFormStep()}

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit">
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};