
import React from "react";
import { Link } from "react-router-dom";
import { CalendarClock, BarChart3, Home, Mail, Search } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
              <span className="text-xs mt-1">Search</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-80">
            <SheetHeader>
              <SheetTitle>Search</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex gap-2">
                <Input placeholder="Search leave applications, status..." className="flex-1" />
                <Button type="submit">Search</Button>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Quick searches</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">My pending leaves</Button>
                  <Button variant="outline" size="sm">Sick leave balance</Button>
                  <Button variant="outline" size="sm">Holiday calendar</Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
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
