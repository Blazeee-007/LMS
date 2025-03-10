
import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Book, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Branch {
  id: string;
  name: string;
  courses: Course[];
}

interface Course {
  id: string;
  name: string;
  code: string;
  semester: string;
  studentCount: number;
}

export const CourseSelector = ({ onCourseSelect }: { onCourseSelect: (courseId: string, branchId: string) => void }) => {
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  // Mock data for branches and courses
  const branches: Branch[] = [
    {
      id: "cse",
      name: "Computer Science (CSE)",
      courses: [
        { id: "cse101", name: "Introduction to Programming", code: "CSE101", semester: "1-1", studentCount: 45 },
        { id: "cse201", name: "Data Structures", code: "CSE201", semester: "2-1", studentCount: 42 },
        { id: "cse301", name: "Database Management Systems", code: "CSE301", semester: "3-1", studentCount: 38 },
        { id: "cse401", name: "Computer Networks", code: "CSE401", semester: "4-1", studentCount: 35 }
      ]
    },
    {
      id: "ece",
      name: "Electronics & Communication (ECE)",
      courses: [
        { id: "ece101", name: "Basic Electronics", code: "ECE101", semester: "1-1", studentCount: 40 },
        { id: "ece201", name: "Signals and Systems", code: "ECE201", semester: "2-1", studentCount: 38 },
        { id: "ece301", name: "Digital Signal Processing", code: "ECE301", semester: "3-1", studentCount: 36 }
      ]
    },
    {
      id: "mech",
      name: "Mechanical Engineering (MECH)",
      courses: [
        { id: "mech101", name: "Engineering Mechanics", code: "MECH101", semester: "1-1", studentCount: 50 },
        { id: "mech201", name: "Thermodynamics", code: "MECH201", semester: "2-1", studentCount: 48 }
      ]
    }
  ];

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);
    setSelectedCourse("");
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    onCourseSelect(value, selectedBranch);
  };

  const selectedBranchData = branches.find(branch => branch.id === selectedBranch);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Course & Branch Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium mb-1 block">Select Branch</label>
            <Select value={selectedBranch} onValueChange={handleBranchChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map(branch => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium mb-1 block">Select Course</label>
            <Select 
              value={selectedCourse} 
              onValueChange={handleCourseChange}
              disabled={!selectedBranch}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {selectedBranchData?.courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedBranchData && (
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="courses">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  <span>All Courses in {selectedBranchData.name}</span>
                  <Badge variant="secondary" className="ml-2">{selectedBranchData.courses.length}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {selectedBranchData.courses.map(course => (
                    <div 
                      key={course.id} 
                      className={`p-3 rounded-md border cursor-pointer hover:bg-gray-50 ${
                        selectedCourse === course.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                      }`}
                      onClick={() => handleCourseChange(course.id)}
                    >
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-gray-500 flex justify-between">
                        <span>Code: {course.code}</span>
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {course.studentCount}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">Semester: {course.semester}</div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};
