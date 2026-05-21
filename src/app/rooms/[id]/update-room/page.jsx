import UpdateRoomForm from "@/components/UpdateRoomForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getRoom(id) {
   const {token} = await auth.api.getToken({
      headers: await headers(),
  
     })
   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
    headers:{
     authorization:`Bearer ${token}`
    },
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