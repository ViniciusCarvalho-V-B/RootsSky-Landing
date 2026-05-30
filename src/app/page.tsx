import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnnouncementGrid from "@/components/AnnouncementGrid";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />

      {/* Content Section: Announcements + Sidebar */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="divider-glow mb-16" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content — 2/3 */}
          <div className="lg:col-span-2">
            <AnnouncementGrid />
          </div>

          {/* Sidebar — 1/3 */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
