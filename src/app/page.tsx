import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DeviceShowcase from "@/components/DeviceShowcase";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <Features />
        <DeviceShowcase />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
