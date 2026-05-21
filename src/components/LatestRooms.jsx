
import RoomCardHome from "./RoomCardHome";

export default async function LatestRoomsSection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/latest`);
  const rooms = await res.json();

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms?.map((room) => (
          <RoomCardHome key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}