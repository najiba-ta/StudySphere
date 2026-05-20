import Banner from "@/components/Banner";
import FeatureSection from "@/components/FeatureSection";

export default async function Home() {
  // const res = await fetch("http://localhost:8000/rooms", {
  //   cache: "no-store",
  // });

  // const rooms = await res.json();

  return (
    <div>
      <Banner/>
      <FeatureSection/>
      {/* <RoomCardHomePage/>
      <CTASection/> */}
    </div>
  );
}
