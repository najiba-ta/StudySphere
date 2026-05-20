import RoomCard from "@/components/RoomCard";
import RoomFilter from "@/components/RoomFilter";

export default async function Page({ searchParams }) {
  // ✅ IMPORTANT FIX (unwrap Promise safely)
  const params = await searchParams;

  const search = params?.search || "";
  const amenities = params?.amenities || "";
  const min = params?.min || "";
  const max = params?.max || "";

  const query = new URLSearchParams({
    search,
    amenities,
    min,
    max,
  }).toString();

  const res = await fetch(`http://localhost:8000/rooms?${query}`, {
    cache: "no-store",
  });

  const rooms = await res.json();

  return (
    <div className="min-h-screen bg-[#F6E7D0] px-4 py-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-center text-4xl font-bold text-[#3C0906]">
          All Study Rooms
        </h1>

        <RoomFilter/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No rooms found
            </p>
          )}
        </div>

      </div>
    </div>
  );
}