import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FAQ } from "@/components/FAQ";
import { ContactSupport } from "@/components/ContactSupport";
import { MobileFooter } from "@/components/MobileFooter";
import { BackToTop } from "@/components/BackToTop";
import { useEffect } from "react";

const Index = () => {
  // Handle smooth scrolling to sections
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Add a slight delay to ensure DOM is ready
          setTimeout(() => {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 100,
              behavior: "smooth"
            });
          }, 100);
        }
      }
    };

    // Initial check for hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-mobile-footer">
      <Header />
      <Hero />
      <main className="container py-12" id="application-form">
        <ApplicationForm />
      </main>
      <FAQ />
      <ContactSupport />
      <MobileFooter />
      <BackToTop />
    </div>
  );
};

export default Index;
