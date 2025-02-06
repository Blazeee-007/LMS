import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-[#E5DEFF] to-[#D3E4FD] text-gray-800 py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1A1F2C]">
            Student Leave Application Portal
          </h1>
          <p className="text-xl text-gray-700">
            Submit your leave requests quickly and securely. We understand your needs need prompt attention.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-[#9b87f5] hover:bg-[#7E69AB] text-lg px-8">
              Start Application
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};