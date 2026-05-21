
import Banner from "@/components/Banner";
import CTASection from "@/components/CTASection";
import FeatureSection from "@/components/FeatureSection";
import LatestRoomsSection from "@/components/LatestRooms";

export default function Home() {
  return (
    <div>
      <Banner/>
      <LatestRoomsSection/> 
      <CTASection/> 
      <FeatureSection/>
    </div>
  );
}