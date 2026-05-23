"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

const MyListingsPage = () => {
  const { data: session, status } = authClient.useSession();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      setLoading(false);
      return;
    }

    const fetchRooms = async () => {
      try {
        const { data: tokenData } = await authClient.token();

        if (!tokenData?.token) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-listings/${session.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setRooms(data);
        } else {
          console.log(data?.message || "Failed to fetch listings");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [session, status]);

  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold">My Listings</h1>

      {rooms.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <h2 className="text-2xl font-bold">No listings found</h2>
          <p className="mt-2 text-gray-500">Create your first room now.</p>

          <Link href="/add-room">
            <Button className="mt-5 bg-[#BC5F41] text-white">
              Create Room
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="overflow-hidden rounded-2xl border bg-white"
            >
              <Image
                src={room.image}
                width={500}
                height={300}
                alt={room.roomName}
                className="h-[220px] w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">{room.roomName}</h2>

                <p className="mt-2 text-sm text-gray-500">
                  Floor {room.floor}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Capacity: {room.capacity}
                </p>

                <p className="mt-3 font-semibold text-[#BC5F41]">
                  ৳{room.hourlyRate}/hr
                </p>

                <Link href={`/rooms/${room._id}`}>
                  <Button className="mt-4 w-full bg-[#BC5F41] text-white hover:bg-[#3C0906]">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;