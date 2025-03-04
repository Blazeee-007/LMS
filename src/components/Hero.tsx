
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ClipboardList, Info } from "lucide-react";

export const Hero = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#E5DEFF] to-[#D3E4FD] dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 py-20 md:py-28">
      <motion.div 
        className="container px-4 md:px-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-6"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold leading-tight text-[#1A1F2C] dark:text-gray-100"
            variants={fadeIn}
          >
            Student Leave Application Portal
          </motion.h1>
          <motion.div variants={fadeIn}>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Submit your leave requests quickly and securely. We understand your needs need prompt attention.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Track your application status, view leave balance, and manage your profile all in one place.
            </p>
          </motion.div>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={fadeIn}
          >
            <Button 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white dark:bg-[#a694f8] dark:hover:bg-[#8c7bd6] text-lg px-8 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ClipboardList className="mr-2 h-5 w-5" />
              Start Application
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 dark:border-[#a694f8] dark:text-[#a694f8] dark:hover:bg-[#a694f8]/20 transition-all duration-300 shadow-sm hover:shadow-md"
              onClick={() => window.location.href = '/dashboard'}
            >
              <Info className="mr-2 h-5 w-5" />
              View Dashboard
            </Button>
          </motion.div>
          
          <motion.div 
            className="pt-10 flex justify-center"
            variants={fadeIn}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg">Easy Submission</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Simple forms for quick applications</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg">Real-time Status</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Track your application instantly</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg">Balance Tracking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your available leave days</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
