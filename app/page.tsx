import Header from "@/components/header";
import SmoothScroll from "@/components/smooth-scroll";
import HeroSection from "@/components/sections/hero";
import RecruiterSection from "@/components/sections/recruiter";
import ProofSection from "@/components/sections/proof";
import OracleSection from "@/components/sections/oracle";
import WorkSection from "@/components/sections/work";
import StackSection from "@/components/sections/stack";
import ContactSection from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main id="top" className="flex-1">
        <HeroSection />
        <RecruiterSection />
        <ProofSection />
        <OracleSection />
        <WorkSection />
        <StackSection />
        <ContactSection />
      </main>
    </>
  );
}
