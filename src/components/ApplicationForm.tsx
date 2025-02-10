import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const steps = ["Student Information", "Leave Details", "Emergency Contact", "Review"];

const COURSE_OPTIONS = {
  btech: {
    name: "B.Tech",
    branches: [
      "Computer Science (CSE)",
      "Electronics & Communication (ECE)",
      "Electrical & Electronics (EEE)",
      "Mechanical Engineering",
      "Civil Engineering",
      "Computer Science & Mathematics (CSM)",
      "Computer Science & Design (CSD)",
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

export const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    course: "",
    branch: "",
    semester: "",
    fromDate: "",
    toDate: "",
    reason: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'course' && { branch: '', semester: '' }),
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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
    toast({
      title: "Leave Application Submitted",
      description: "Your emergency leave request has been received.",
    });
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select name="course" onValueChange={(value) => handleSelectChange('course', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech">{COURSE_OPTIONS.btech.name}</SelectItem>
                  <SelectItem value="degree">{COURSE_OPTIONS.degree.name}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.course && (
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Select name="branch" onValueChange={(value) => handleSelectChange('branch', value)}>
                  <SelectTrigger>
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
              </div>
            )}
            {formData.course && (
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select name="semester" onValueChange={(value) => handleSelectChange('semester', value)}>
                  <SelectTrigger>
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
              </div>
            )}
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="fromDate">From Date</Label>
              <Input
                id="fromDate"
                name="fromDate"
                type="date"
                value={formData.fromDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toDate">To Date</Label>
              <Input
                id="toDate"
                name="toDate"
                type="date"
                value={formData.toDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                className="min-h-[100px]"
                placeholder="Please provide detailed explanation for your emergency leave request..."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input
                id="emergencyContactName"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactRelation">Relationship</Label>
              <select
                id="emergencyContactRelation"
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select Relationship</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="guardian">Guardian</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                type="tel"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-semibold">Review Your Application</h3>
            <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
              <p>Name: {formData.studentName}</p>
              <p>Student ID: {formData.studentId}</p>
              <p>Course: {formData.course}</p>
              <p>Branch: {formData.branch}</p>
              <p>Semester: {formData.semester}</p>
              <p>Leave Period: {formData.fromDate} to {formData.toDate}</p>
              <p>Reason: {formData.reason}</p>
              <p>Emergency Contact: {formData.emergencyContactName}</p>
              <p>Relationship: {formData.emergencyContactRelation}</p>
              <p>Contact Phone: {formData.emergencyContactPhone}</p>
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
