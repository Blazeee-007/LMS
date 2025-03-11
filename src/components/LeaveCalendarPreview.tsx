
import { useState } from "react";
import { format, parseISO, startOfWeek, addDays, isWithinInterval } from "date-fns";

interface LeaveEvent {
  id: number;
  title: string;
  fromDate: string;
  toDate: string;
  leaveType: string;
  status: string;
}

interface LeaveCalendarPreviewProps {
  leaves: LeaveEvent[];
  onDateSelect?: (date: Date | undefined) => void;
}

export const LeaveCalendarPreview = ({ leaves, onDateSelect }: LeaveCalendarPreviewProps) => {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Monday as the start of week
  
  // Create a 2-week view
  const days = Array.from({ length: 14 }, (_, i) => addDays(startDate, i));
  
  // Get events for each day
  const getEventsForDay = (day: Date) => {
    return leaves.filter(leave => {
      const startDate = parseISO(leave.fromDate);
      const endDate = parseISO(leave.toDate);
      return isWithinInterval(day, { start: startDate, end: endDate });
    });
  };
  
  // Color mappings for leave types
  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case "medical": return "bg-red-100 border-red-300";
      case "personal": return "bg-blue-100 border-blue-300";
      case "academic": return "bg-purple-100 border-purple-300";
      case "emergency": return "bg-orange-100 border-orange-300";
      default: return "bg-gray-100 border-gray-300";
    }
  };
  
  // Handle day click
  const handleDayClick = (day: Date) => {
    if (onDateSelect) {
      onDateSelect(day);
    }
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    const isToday = date.toDateString() === today.toDateString();
    return (
      <div 
        className={`text-center ${isToday ? "font-bold" : ""} cursor-pointer hover:bg-gray-100 rounded-md p-1`}
        onClick={() => handleDayClick(date)}
      >
        <div className="text-xs text-gray-500">{format(date, 'EEE')}</div>
        <div className={`text-sm ${isToday ? "bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto" : ""}`}>
          {format(date, 'd')}
        </div>
      </div>
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-7 bg-gray-50 border-b">
        {/* First week */}
        {days.slice(0, 7).map((day, index) => (
          <div key={index} className="p-2 text-center border-r last:border-r-0">
            {formatDate(day)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 h-16 bg-white">
        {days.slice(0, 7).map((day, index) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div key={index} className="border-r last:border-r-0 border-b p-1 overflow-y-auto text-xs">
              {dayEvents.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className={`p-1 mb-1 truncate rounded-sm ${getLeaveTypeColor(event.leaveType)} border`}
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 bg-gray-50 border-b">
        {/* Second week */}
        {days.slice(7, 14).map((day, index) => (
          <div key={index} className="p-2 text-center border-r last:border-r-0">
            {formatDate(day)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 h-16 bg-white">
        {days.slice(7, 14).map((day, index) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div key={index} className="border-r last:border-r-0 p-1 overflow-y-auto text-xs">
              {dayEvents.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className={`p-1 mb-1 truncate rounded-sm ${getLeaveTypeColor(event.leaveType)} border`}
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="p-3 bg-gray-50 border-t flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <span className="block w-3 h-3 bg-red-100 border border-red-300 rounded-sm"></span>
          <span>Medical</span>
          <span className="block w-3 h-3 bg-blue-100 border border-blue-300 rounded-sm ml-2"></span>
          <span>Personal</span>
          <span className="block w-3 h-3 bg-purple-100 border border-purple-300 rounded-sm ml-2"></span>
          <span>Academic</span>
          <span className="block w-3 h-3 bg-orange-100 border border-orange-300 rounded-sm ml-2"></span>
          <span>Emergency</span>
        </div>
        <div>
          Showing {leaves.length} approved leaves
        </div>
      </div>
    </div>
  );
};
