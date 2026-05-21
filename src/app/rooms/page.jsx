import RoomCard from "@/components/RoomCard";
import RoomFilter from "@/components/RoomFilter";

export default async function Page(props) {
  const searchParams = await props.searchParams; // ✅ FIX

  const search = searchParams?.search || "";
  const amenities = searchParams?.amenities || "";
  const min = searchParams?.min || "";
  const max = searchParams?.max || "";

  const query = new URLSearchParams();

  if (search) query.set("search", search);
  if (amenities) query.set("amenities", amenities);
  if (min) query.set("min", min);
  if (max) query.set("max", max);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms?${query.toString()}`,

  );

  const rooms = await res.json();

  return (
    <div className="min-h-screen bg-[#F6E7D0] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-[#3C0906]">
          All Study Rooms
        </h1>

        <RoomFilter />

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