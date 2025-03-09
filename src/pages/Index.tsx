
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
            const navbarOffset = window.innerWidth < 768 ? 80 : 100; // Different offset for mobile
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - navbarOffset,
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
    
    // Handle resize events to adjust scroll position if needed
    const handleResize = () => {
      if (window.location.hash) {
        handleHashChange();
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-mobile-footer md:pb-0">
      <Header />
      <Hero />
      <main className="container py-8 md:py-12" id="application-form">
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
