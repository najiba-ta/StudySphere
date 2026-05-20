import UpdateRoomForm from "@/components/UpdateRoomForm";

async function getRoom(id) {
  const res = await fetch(`http://localhost:8000/rooms/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function Page({ params }) {
  const { id } = await params;

  const room = await getRoom(id);

  if (!room) return <p>Room not found</p>;

  return (
    <UpdateRoomForm room={room} />
  );
}