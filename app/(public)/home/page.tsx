import HeroSection from "./_components/HeroSection";
import StatsSection from "./_components/StatsSection";
import AboutSection from "./_components/AboutSection";
import CTASection from "./_components/CTASection";
import ForWhomSection from "./_components/ForWhomSection";
// import Navbar from "@/components/navigation/NavBar";



export default function Home() {
  return (
    <div>
      <main className=" border-white max-w-screen-2xl mx-auto">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ForWhomSection />
        <CTASection />
      </main>
    </div>
  );
}
