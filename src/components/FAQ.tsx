
import React, { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "How do I apply for leave?",
    answer: "Navigate to the application form, fill in your details, select the type of leave, dates, and reason. Attach any supporting documents if required and submit your application."
  },
  {
    question: "What types of leave can I apply for?",
    answer: "You can apply for Medical Leave, Personal Leave, Academic Leave, and Emergency Leave. Each has different documentation requirements and approval processes."
  },
  {
    question: "How long does the approval process take?",
    answer: "Standard applications are typically processed within 2-3 working days. Emergency leave applications are prioritized and may be processed within 24 hours."
  },
  {
    question: "Can I cancel my approved leave?",
    answer: "Yes, you can cancel your approved leave up to 24 hours before the start date through the Leave Balance section under the 'Upcoming' tab."
  },
  {
    question: "What documents do I need for medical leave?",
    answer: "For medical leave, you need to provide a medical certificate or doctor's note that covers the period of your absence."
  },
  {
    question: "How can I check the status of my application?",
    answer: "You can check the status of your leave application in the Leave Balance section under the 'History' tab or through the notification system if you've opted in."
  }
];

export const FAQ = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about the leave application process
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
