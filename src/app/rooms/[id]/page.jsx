import RoomDetailsPage from "@/components/RoomDetailsPage";

export async function generateMetadata() {
  return {
    title: "StudySphere – Room Details",
  };
}

export default function RoomDetailPage() {
  return (
    <div>
      <RoomDetailsPage/>
    </div>
  );
}