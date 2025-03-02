
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Upload, X, Bell } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const steps = ["Student Information", "Leave Details", "Supporting Documents", "Review"];

const COURSE_OPTIONS = {
  btech: {
    name: "B.Tech",
    branches: [
      "Computer Science (CSE)",
      "Electronics & Communication (ECE)",
      "Electrical & Electronics (EEE)",
      "Mechanical Engineering",
      "Civil Engineering",
      "Computer Science & AI/ML (CSE-AIML)",
      "Computer Science & Data Science (CSE-DS)",
      "Information Technology (IT)"
    ],
    semesters: Array.from({ length: 8 }, (_, i) => ({
      year: Math.floor(i / 2) + 1,
      sem: (i % 2) + 1
    }))
  },
  degree: {
    name: "Degree",
    branches: ["BCA", "BBA", "B.Com", "BSc"],
    semesters: Array.from({ length: 6 }, (_, i) => ({
      year: Math.floor(i / 2) + 1,
      sem: (i % 2) + 1
    }))
  }
};

const LEAVE_TYPES = [
  { id: "medical", name: "Medical Leave", requiresDocument: true },
  { id: "personal", name: "Personal Leave", requiresDocument: false },
  { id: "academic", name: "Academic Leave", requiresDocument: true },
  { id: "emergency", name: "Emergency Leave", requiresDocument: false }
];

export const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    course: "",
    branch: "",
    semester: "",
    title: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    notificationType: "email",
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
      ...(name === 'course' && { branch: '', semester: '' }),
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
      
      // Check file size (limit to 5MB)
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

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 0) {
      if (!formData.studentName) newErrors.studentName = "Student name is required";
      if (!formData.studentId) newErrors.studentId = "Student ID is required";
      if (!formData.course) newErrors.course = "Course is required";
      if (!formData.branch) newErrors.branch = "Branch is required";
      if (!formData.semester) newErrors.semester = "Semester is required";
    } else if (currentStep === 1) {
      if (!formData.title) newErrors.title = "Title is required";
      if (!formData.leaveType) newErrors.leaveType = "Leave type is required";
      if (!formData.fromDate) newErrors.fromDate = "From date is required";
      if (!formData.toDate) newErrors.toDate = "To date is required";
      if (!formData.reason) newErrors.reason = "Reason is required";
      
      // Date validation
      if (formData.fromDate && formData.toDate) {
        const fromDate = new Date(formData.fromDate);
        const toDate = new Date(formData.toDate);
        
        if (fromDate > toDate) {
          newErrors.toDate = "End date cannot be before start date";
        }
      }
    } else if (currentStep === 2) {
      // Check if documents are required based on leave type
      const selectedLeaveType = LEAVE_TYPES.find(type => type.id === formData.leaveType);
      if (selectedLeaveType?.requiresDocument && documents.length === 0) {
        setUploadError(`Supporting documents are required for ${selectedLeaveType.name}`);
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.emergencyContactName) newErrors.emergencyContactName = "Contact name is required";
      if (!formData.emergencyContactRelation) newErrors.emergencyContactRelation = "Relation is required";
      if (!formData.emergencyContactPhone) newErrors.emergencyContactPhone = "Contact phone is required";
      
      // Phone validation
      if (formData.emergencyContactPhone && !/^\d{10}$/.test(formData.emergencyContactPhone)) {
        newErrors.emergencyContactPhone = "Please enter a valid 10-digit phone number";
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
      toast({
        title: "Leave Application Submitted",
        description: "Your leave request has been received. You will be notified of updates.",
      });
      
      // Show notification for successful submission
      if (Notification.permission === "granted") {
        new Notification("Leave Application Submitted", {
          body: "Your leave request has been received. You will be notified of updates.",
          icon: "/favicon.ico"
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("Leave Application Submitted", {
              body: "Your leave request has been received. You will be notified of updates.",
              icon: "/favicon.ico"
            });
          }
        });
      }
    }
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="studentName">Full Name</Label>
              <Input
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className={errors.studentName ? "border-red-500" : ""}
              />
              {errors.studentName && (
                <p className="text-sm text-red-500">{errors.studentName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                className={errors.studentId ? "border-red-500" : ""}
              />
              {errors.studentId && (
                <p className="text-sm text-red-500">{errors.studentId}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select 
                name="course" 
                onValueChange={(value) => handleSelectChange('course', value)}
              >
                <SelectTrigger className={errors.course ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech">{COURSE_OPTIONS.btech.name}</SelectItem>
                  <SelectItem value="degree">{COURSE_OPTIONS.degree.name}</SelectItem>
                </SelectContent>
              </Select>
              {errors.course && (
                <p className="text-sm text-red-500">{errors.course}</p>
              )}
            </div>
            {formData.course && (
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Select 
                  name="branch" 
                  onValueChange={(value) => handleSelectChange('branch', value)}
                >
                  <SelectTrigger className={errors.branch ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSE_OPTIONS[formData.course as keyof typeof COURSE_OPTIONS].branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.branch && (
                  <p className="text-sm text-red-500">{errors.branch}</p>
                )}
              </div>
            )}
            {formData.course && (
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select 
                  name="semester" 
                  onValueChange={(value) => handleSelectChange('semester', value)}
                >
                  <SelectTrigger className={errors.semester ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSE_OPTIONS[formData.course as keyof typeof COURSE_OPTIONS].semesters.map((sem) => (
                      <SelectItem key={`${sem.year}-${sem.sem}`} value={`${sem.year}-${sem.sem}`}>
                        {`${sem.year} Year - ${sem.sem} Semester`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.semester && (
                  <p className="text-sm text-red-500">{errors.semester}</p>
                )}
              </div>
            )}
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
                      {type.name} {type.requiresDocument && "* (requires documents)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.leaveType && (
                <p className="text-sm text-red-500">{errors.leaveType}</p>
              )}
            </div>
            
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
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className={`min-h-[100px] ${errors.reason ? "border-red-500" : ""}`}
                placeholder="Please provide detailed explanation for your leave request..."
              />
              {errors.reason && (
                <p className="text-sm text-red-500">{errors.reason}</p>
              )}
            </div>
          </div>
        );
      case 2:
        const selectedLeaveType = LEAVE_TYPES.find(type => type.id === formData.leaveType);
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-semibold">Supporting Documents</h3>
            
            {selectedLeaveType?.requiresDocument && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Supporting documents are required for {selectedLeaveType.name}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
                <span className="text-sm text-gray-500">Max size: 5MB</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
              </div>
              
              {uploadError && (
                <p className="text-sm text-red-500">{uploadError}</p>
              )}
              
              {documents.length > 0 && (
                <div className="space-y-2 mt-4">
                  <h4 className="font-medium text-sm">Uploaded Documents</h4>
                  <ul className="space-y-2">
                    {documents.map((doc, index) => (
                      <li 
                        key={index} 
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm truncate max-w-[80%]">{doc.name}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeDocument(index)}
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="notificationType">Notification Preferences</Label>
              <Select 
                name="notificationType" 
                defaultValue={formData.notificationType}
                onValueChange={(value) => handleSelectChange('notificationType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select notification preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Only</SelectItem>
                  <SelectItem value="push">Push Notifications</SelectItem>
                  <SelectItem value="both">Both Email and Push</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                <Bell className="h-3 w-3 inline mr-1" />
                You will receive notifications about your application status
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input
                id="emergencyContactName"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                className={errors.emergencyContactName ? "border-red-500" : ""}
              />
              {errors.emergencyContactName && (
                <p className="text-sm text-red-500">{errors.emergencyContactName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactRelation">Relationship</Label>
              <Select 
                name="emergencyContactRelation" 
                onValueChange={(value) => handleSelectChange('emergencyContactRelation', value)}
              >
                <SelectTrigger className={errors.emergencyContactRelation ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select Relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="guardian">Guardian</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.emergencyContactRelation && (
                <p className="text-sm text-red-500">{errors.emergencyContactRelation}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                type="tel"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                className={errors.emergencyContactPhone ? "border-red-500" : ""}
                placeholder="10-digit phone number"
              />
              {errors.emergencyContactPhone && (
                <p className="text-sm text-red-500">{errors.emergencyContactPhone}</p>
              )}
            </div>
            
            <div className="mt-8 border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-4">Review Your Application</h3>
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Name: </p>
                    <p className="text-sm">{formData.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Student ID: </p>
                    <p className="text-sm">{formData.studentId}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Course: </p>
                    <p className="text-sm">{formData.course}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Branch: </p>
                    <p className="text-sm">{formData.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Semester: </p>
                    <p className="text-sm">{formData.semester}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Leave Type: </p>
                  <p className="text-sm">{LEAVE_TYPES.find(type => type.id === formData.leaveType)?.name}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Title: </p>
                  <p className="text-sm">{formData.title}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Leave Period: </p>
                  <p className="text-sm">{formData.fromDate} to {formData.toDate}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Reason: </p>
                  <p className="text-sm">{formData.reason}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Supporting Documents: </p>
                  <p className="text-sm">{documents.length > 0 ? documents.map(d => d.name).join(", ") : "None"}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Emergency Contact: </p>
                  <p className="text-sm">{formData.emergencyContactName} ({formData.emergencyContactRelation}) - {formData.emergencyContactPhone}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Notification Preference: </p>
                  <p className="text-sm">
                    {formData.notificationType === "email" ? "Email Only" : 
                     formData.notificationType === "push" ? "Push Notifications" : 
                     "Both Email and Push"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${
                index !== steps.length - 1 ? "flex-1" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= index
                    ? "bg-primary text-white"
                    : "bg-secondary text-primary"
                }`}
              >
                {index + 1}
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > index ? "bg-primary" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold text-center text-primary">
          {steps[currentStep]}
        </h2>
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
          {currentStep === steps.length - 1 ? (
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              Submit Application
            </Button>
          ) : (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
