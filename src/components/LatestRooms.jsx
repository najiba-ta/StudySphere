import RoomCardHome from "./RoomCardHome";

export default async function LatestRoomsSection() {
  // ব্যাকএন্ডের সর্ট ও লিমিট করা রুট থেকে লেটেস্ট ৬টা রুম ফেচ হচ্ছে
  const res = await fetch("http://localhost:8000/rooms/latest", {
    cache: "no-store",
  });
  const rooms = await res.json();

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* রিকোয়ারমেন্ট অনুযায়ী গ্রিড লেআউট: মোবাইল ১, ট্যাবলেট ২, ডেস্কটপ ৩ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms?.map((room) => (
          <RoomCardHome key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}