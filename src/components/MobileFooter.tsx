
import React from "react";
import { Link } from "react-router-dom";
import { CalendarClock, BarChart3, Home, Mail, Phone } from "lucide-react";

export const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md border-t border-gray-200 dark:border-gray-800 md:hidden z-10">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link
          to="/leave-balance"
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
        >
          <BarChart3 className="h-5 w-5" />
          <span className="text-xs mt-1">Balance</span>
        </Link>
        
        <Link
          to="/application"
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
        >
          <CalendarClock className="h-5 w-5" />
          <span className="text-xs mt-1">Apply</span>
        </Link>
        
        <a
          href="#support"
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
        >
          <Mail className="h-5 w-5" />
          <span className="text-xs mt-1">Support</span>
        </a>
      </div>
    </div>
  );
};
