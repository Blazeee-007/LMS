import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-primary to-primary/90 text-white py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Student Emergency Leave Application Portal
          </h1>
          <p className="text-xl text-white/90">
            Submit your emergency leave requests quickly and securely. We understand emergencies need prompt attention.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-accent hover:bg-accent/90 text-lg px-8">
              Start Application
            </Button>
            <Button variant="outline" className="text-lg px-8 border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};