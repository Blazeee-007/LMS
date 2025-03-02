
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  type: "exam" | "holiday" | "assignment" | "leave";
  description?: string;
}

interface LeaveRequest {
  id: number;
  studentName: string;
  studentId: string;
  fromDate: Date;
  toDate: Date;
  status: "pending" | "approved" | "rejected";
  title: string;
}

export const AcademicCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [viewType, setViewType] = useState<string>("all");

  // Mock data - would come from API in real app
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: "Mid-term Exams",
      date: new Date(2024, 5, 15),
      type: "exam",
      description: "Mid-term examinations for all departments"
    },
    {
      id: 2,
      title: "College Foundation Day",
      date: new Date(2024, 5, 20),
      type: "holiday",
      description: "Annual celebration of the college foundation day"
    },
    {
      id: 3,
      title: "Project Submission",
      date: new Date(2024, 5, 25),
      type: "assignment",
      description: "Final project submission deadline"
    },
  ];

  const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      studentName: "John Doe",
      studentId: "CS2021001",
      fromDate: new Date(2024, 5, 22),
      toDate: new Date(2024, 5, 25),
      status: "approved",
      title: "Medical Leave"
    },
    {
      id: 2,
      studentName: "Alice Johnson",
      studentId: "ECE2022042",
      fromDate: new Date(2024, 5, 24),
      toDate: new Date(2024, 5, 28),
      status: "pending",
      title: "Personal Leave"
    },
  ];

  // Convert leave requests to calendar events
  const leaveEvents: CalendarEvent[] = leaveRequests.map(leave => ({
    id: leave.id + 1000, // Ensure unique ID
    title: `${leave.title} (${leave.studentName})`,
    date: leave.fromDate,
    type: "leave",
    description: `${leave.studentName} (${leave.studentId}) - ${leave.status}`
  }));

  // Combine all events
  const allEvents = [...events, ...leaveEvents];

  // Filter events based on viewType
  const filteredEvents = viewType === "all" 
    ? allEvents 
    : allEvents.filter(event => event.type === viewType);

  // Get events for the selected date
  const selectedDateEvents = filteredEvents.filter(
    event => date && event.date.toDateString() === date.toDateString()
  );

  // Check for leave conflicts
  const checkConflicts = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    const conflictingEvents = events.filter(
      event => event.type === "exam" && event.date.toDateString() === selectedDate.toDateString()
    );
    
    return conflictingEvents;
  };

  const conflicts = checkConflicts(date);

  // Function to render date cell with events
  const renderEventIndicator = (day: Date) => {
    const dayEvents = filteredEvents.filter(
      event => event.date.toDateString() === day.toDateString()
    );
    
    if (dayEvents.length === 0) return null;
    
    // Get event types for this day to show different colors
    const eventTypes = new Set(dayEvents.map(event => event.type));
    
    return (
      <div className="flex gap-0.5 mt-1 justify-center">
        {Array.from(eventTypes).map((type, index) => (
          <div 
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${
              type === "exam" ? "bg-red-500" :
              type === "holiday" ? "bg-green-500" :
              type === "assignment" ? "bg-blue-500" :
              "bg-purple-500"
            }`}
          />
        ))}
      </div>
    );
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "exam": return "Exam";
      case "holiday": return "Holiday";
      case "assignment": return "Assignment";
      case "leave": return "Leave Request";
      default: return type;
    }
  };

  const getEventTypeBadgeColor = (type: string) => {
    switch (type) {
      case "exam": return "bg-red-100 text-red-800";
      case "holiday": return "bg-green-100 text-green-800";
      case "assignment": return "bg-blue-100 text-blue-800";
      case "leave": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="text-xl font-semibold">Academic Calendar</h2>
        <Select value={viewType} onValueChange={setViewType}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="exam">Exams</SelectItem>
            <SelectItem value="holiday">Holidays</SelectItem>
            <SelectItem value="assignment">Assignments</SelectItem>
            <SelectItem value="leave">Leave Requests</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <div className="p-4">
              <TooltipProvider>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  components={{
                    DayContent: (props) => (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <div>{props.day.day}</div>
                            {renderEventIndicator(props.day.date)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent align="center" className="p-0">
                          {filteredEvents.filter(
                            event => event.date.toDateString() === props.day.date.toDateString()
                          ).length > 0 ? (
                            <div className="p-2 max-w-xs">
                              <p className="font-semibold">Events:</p>
                              <ul className="text-xs space-y-1 mt-1">
                                {filteredEvents
                                  .filter(event => event.date.toDateString() === props.day.date.toDateString())
                                  .map(event => (
                                    <li key={event.id} className="flex items-center gap-1">
                                      <div 
                                        className={`h-2 w-2 rounded-full ${
                                          event.type === "exam" ? "bg-red-500" :
                                          event.type === "holiday" ? "bg-green-500" :
                                          event.type === "assignment" ? "bg-blue-500" :
                                          "bg-purple-500"
                                        }`}
                                      />
                                      {event.title}
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          ) : (
                            <div className="p-2">No events</div>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    ),
                  }}
                />
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              {date ? date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : "Select a date"}
            </CardTitle>
            <CardDescription>
              View events and leave requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            {conflicts.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-700">Leave Conflict Warning</h4>
                    <p className="text-sm text-red-600">
                      This date has {conflicts.length} conflicting event(s) that may affect leave approval:
                    </p>
                    <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
                      {conflicts.map(conflict => (
                        <li key={conflict.id}>{conflict.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge className={getEventTypeBadgeColor(event.type)}>
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {event.date.toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="mx-auto h-12 w-12 opacity-30" />
                <p className="mt-2">No events on this date</p>
                {date && (
                  <Button variant="outline" className="mt-4">
                    Add Event
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
