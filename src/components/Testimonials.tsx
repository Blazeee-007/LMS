
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";

type TestimonialProps = {
  quote: string;
  name: string;
  role: string;
  image?: string;
};

const Testimonial = ({ quote, name, role, image }: TestimonialProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4 text-primary">
          <QuoteIcon className="h-6 w-6" />
        </div>
        <blockquote className="flex-1 mb-4 text-gray-700 dark:text-gray-300 italic">
          "{quote}"
        </blockquote>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            {image && <AvatarImage src={image} alt={name} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Testimonials = () => {
  const testimonials: TestimonialProps[] = [
    {
      quote:
        "The new leave management system is so intuitive. I love how I can track my leave balance and application status all in one place.",
      name: "Priya Sharma",
      role: "Computer Science, 3rd Year",
    },
    {
      quote:
        "Applying for medical leave has never been easier. The process is streamlined and I got my approval notification within hours.",
      name: "Rahul Kumar",
      role: "Electronics Engineering, 4th Year",
    },
    {
      quote:
        "The mobile interface works perfectly on my phone. I was able to apply for leave while away from campus without any issues.",
      name: "Ananya Patel",
      role: "Information Technology, 2nd Year",
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Student Experiences</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what other students have to say about the leave management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};
