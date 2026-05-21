"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useParams } from "next/navigation";
import BookRoomModal from "@/components/BookRoomModal";
import DeleteRoomButton from "@/components/DeleteRoomButton";

const RoomDetailsPage = () => {
  const { id } = useParams();
  const { data: session } = authClient.useSession();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
          headers: {
            Authorization: `Bearer ${tokenData?.token || ""}`,
          },
        });

        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6E7D0]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#BC5F41] border-t-transparent"></div>
      </div>
    );
  }

  if (!room || room?.message) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6E7D0]">
        <p className="text-[#3C0906] font-semibold">Room not found</p>
      </div>
    );
  }

  const isOwner =
    session?.user?.id &&
    room?.ownerId &&
    session.user.id === room.ownerId.toString();

  return (
    <div className="min-h-screen bg-[#F6E7D0] px-4 py-12 md:px-10">

      <div className="mx-auto max-w-6xl">

        {/* IMAGE CARD */}
        <div className="rounded-[2rem] overflow-hidden shadow-xl border border-white/50 bg-white">
          <Image
            src={room.image}
            width={1200}
            height={500}
            alt={room.roomName}
            className="w-full h-[380px] md:h-[450px] object-cover"
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-md border border-white/60">

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#3C0906]">
              {room.roomName}
            </h1>

            <p className="mt-4 text-[#3C0906]/70 leading-relaxed">
              {room.description}
            </p>

            {/* AMENITIES */}
            <div className="mt-6 flex flex-wrap gap-2">
              {room.amenities?.map((a, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 rounded-full text-sm font-medium
                  bg-[#F6E7D0] text-[#3C0906]
                  border border-[#BC5F41]/20"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-white flex flex-col gap-5">

            <h3 className="text-xl font-bold text-[#3C0906] border-b border-[#F6E7D0] pb-3">
              Room Details
            </h3>

            <div className="space-y-3 text-[#3C0906]/80">
              <p>
                <span className="font-semibold">Capacity:</span>{" "}
                {room.capacity}
              </p>
              <p>
                <span className="font-semibold">Floor:</span> {room.floor}
              </p>

              <p className="text-[#BC5F41] font-bold text-lg">
                ৳{room.hourlyRate} / hour
              </p>
            </div>

            {/* BOOK BUTTON */}
            <div>
              {session?.user ? (
                <BookRoomModal room={room} />
              ) : (
                <Link href="/login">
                  <Button className="w-full h-12 rounded-2xl bg-[#BC5F41] text-white font-bold hover:bg-[#a44e33] transition">
                    Login to Book
                  </Button>
                </Link>
              )}
            </div>

            {/* OWNER ACTIONS */}
            {isOwner && (
              <div className="pt-4 mt-2 border-t border-[#F6E7D0] space-y-3">

                <Link href={`/rooms/${room._id}/update-room`}>
                  <Button className="w-full h-11 rounded-xl bg-[#3C0906] text-white font-semibold hover:bg-black transition mb-3">
                    Update Room
                  </Button>
                </Link>

                <DeleteRoomButton roomId={room._id} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;