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
        const res = await fetch(`http://localhost:8000/rooms/${id}`);
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6E7D0]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#BC5F41] border-t-transparent"></div>
          <p className="text-lg font-medium text-[#3C0906] animate-pulse">Loading Premium Space...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6E7D0]">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-sm">
          <span className="text-5xl">🛑</span>
          <h3 className="text-xl font-bold text-[#3C0906] mt-4">Room Not Found</h3>
          <p className="text-gray-500 text-sm mt-1">The space you are looking for might have been removed.</p>
          <Link href="/rooms" className="mt-5 inline-block bg-[#BC5F41] text-white px-5 py-2 rounded-xl text-sm font-semibold">
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = session?.user?.id && room?.ownerId === session?.user?.id;

  return (
    <div className="min-h-screen bg-[#F6E7D0] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        
        {/* 📸 Premium Image Section with Badges */}
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20 bg-white/40 backdrop-blur-sm p-3">
          <div className="relative overflow-hidden rounded-[2rem] h-[300px] md:h-[450px] w-full">
            {room?.image ? (
              <Image
                src={room.image}
                fill
                alt={room.roomName || "room image"}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-gray-400 font-medium">Luxury Space Preview</span>
              </div>
            )}
            
            {/* Hourly Rate Overlay Badge */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-[#3C0906] font-bold px-5 py-2.5 rounded-2xl shadow-lg border border-amber-100 flex items-center gap-1">
              <span className="text-xl font-black text-[#BC5F41]">৳{room.hourlyRate}</span>
              <span className="text-xs text-gray-500 font-normal">/ hr</span>
            </div>
          </div>
        </div>

        {/* 📋 Details Grid Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: Name, Description, Amenities */}
          <div className="lg:col-span-2 bg-white/75 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-xl border border-white/60 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#BC5F41] uppercase bg-[#BC5F41]/10 px-3 py-1 rounded-full">
                Premium Workspace
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#3C0906] mt-3 tracking-tight">
                {room.roomName}
              </h1>
            </div>

            <hr className="border-amber-100" />

            <div>
              <h3 className="text-lg font-bold text-[#3C0906] mb-2">About This Space</h3>
              <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base">
                {room.description}
              </p>
            </div>

            <hr className="border-amber-100" />

            <div>
              <h3 className="text-lg font-bold text-[#3C0906] mb-3">Available Amenities</h3>
              <div className="flex flex-wrap gap-2.5">
                {room.amenities?.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-amber-50 to-white text-gray-800 rounded-xl text-sm font-medium border border-amber-100/60 shadow-sm flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-[#BC5F41] rounded-full"></span>
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side: Quick Info Card & Action Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-white flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#BC5F41]/5 rounded-bl-[5rem] -z-10"></div>
              
              <h3 className="text-xl font-bold text-[#3C0906] border-b pb-3 border-amber-50">
                Space Overview
              </h3>

              {/* Specs Stack */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-amber-50/40 rounded-xl border border-amber-50">
                  <span className="text-gray-500 font-medium text-sm flex items-center gap-2">👥 Capacity</span>
                  <span className="font-bold text-[#3C0906] text-sm">{room.capacity} People</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50/40 rounded-xl border border-amber-50">
                  <span className="text-gray-500 font-medium text-sm flex items-center gap-2">🏢 Location</span>
                  <span className="font-bold text-[#3C0906] text-sm">Floor {room.floor}</span>
                </div>
              </div>

              {/* Primary Booking Button */}
              <div className="mt-2">
                {session?.user ? (
                  <BookRoomModal room={room} />
                ) : (
                  <Link href="/login" className="block w-full">
                    <Button className="w-full h-12 rounded-2xl bg-[#BC5F41] hover:bg-[#a44e33] text-white font-bold transition-all shadow-md shadow-[#BC5F41]/20">
                      Login to Book Now
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* 👑 Owner Actions Control Panel */}
            {isOwner && (
              <div className="bg-amber-950/5 p-4 rounded-3xl border border-amber-950/10 flex flex-col gap-2">
                <p className="text-xs font-semibold text-center text-[#3C0906]/60 tracking-wider uppercase mb-1">
                  Owner Dashboard Tools
                </p>
                
                {/* 🎯 Unique Link Button to /rooms/[id]/update-room */}
                <Link href={`/rooms/${room._id}/update-room`} className="block w-full">
                  <Button className="w-full h-11 rounded-xl bg-[#3C0906] hover:bg-[#250503] text-white font-semibold transition-all shadow-sm flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Update Room Details
                  </Button>
                </Link>

                <DeleteRoomButton
                  roomId={room._id}
                  ownerId={room.ownerId}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;