import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SolutionsSection from "@/components/SolutionsSection";
import PlatformSection from "@/components/PlatformSection";
import ContactSection from "@/components/ContactSection";
import AboutBenefitsSection from "@/components/AboutBenefitsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <SolutionsSection />
      <PlatformSection />
      <AboutBenefitsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
