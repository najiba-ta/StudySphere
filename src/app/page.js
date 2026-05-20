
import Banner from "@/components/Banner";
import CTASection from "@/components/CTASection";
import FeatureSection from "@/components/FeatureSection";
import LatestRoomsSection from "@/components/LatestRooms";

export default function Home() {
  return (
    <div>
      <Banner />
      
      {/* শুধু সেকশন কম্পোনেন্টটা এখানে কল হবে */}
      <LatestRoomsSection />
      
      <FeatureSection />
      <CTASection />
    </div>
  );
}