import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ApplicationForm } from "@/components/ApplicationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <main className="container py-12">
        <ApplicationForm />
      </main>
    </div>
  );
};

export default Index;