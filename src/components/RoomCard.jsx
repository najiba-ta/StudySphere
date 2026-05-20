"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const RoomCard = ({ room }) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const {
    _id,
    roomName,
    floor,
    description,
    image,
    capacity,
    hourlyRate,
    amenities,
  } = room;

  const handleNavigation = () => {
    setIsNavigating(true);

    setTimeout(() => {
      router.push(`/rooms/${_id}`);
    }, 1500); 
  };

  return (
    <>
      {isNavigating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#E4E4E6]/40 backdrop-blur-md">
          <div className="relative flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#E4C08A]/20 border-t-[#BC5F41] border-b-[#84352D]"></div>
            <div className="absolute h-10 w-10 animate-spin rounded-full border-4 border-[#E4E4E6]/10 border-r-[#3C0906] border-l-[#84352D]"></div>
          </div>
          <p className="mt-4 text-sm font-semibold tracking-wider text-[#3C0906] animate-pulse">
            Loading Details...
          </p>
        </div>
      )}

      <div className="bg-[#FFF8F0] border border-[#d9a96d] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group">
        
        <div className="overflow-hidden relative">
          <Image
            src={image}
            width={600}
            height={400}
            className="h-[200px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={roomName}
          />

          <div className="absolute top-4 right-4 bg-[#BC5F41] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            ৳{hourlyRate}/hr
          </div>
        </div>

        <div className="p-5 space-y-4">

          <div>
            <h2 className="text-xl font-bold text-[#3C0906]">
              {roomName}
            </h2>

            <p className="text-sm text-[#84352D] mt-1 font-medium">
              Floor {floor}
            </p>
          </div>

          <p className="text-sm leading-5 text-[#5a4038]">
            {description?.length > 90
              ? description.slice(0, 90) + "..."
              : description}
          </p>

          <div className="flex items-center justify-between bg-[#E4C08A]/20 border border-[#E4C08A] rounded-2xl px-4 py-3">
            
            <div>
              <p className="text-xs text-[#84352D]">
                Seat Capacity
              </p>

              <p className="font-semibold text-[#3C0906] text-sm">
                {capacity} People
              </p>
            </div>

            <div className="w-px h-8 bg-[#BC5F41]/30"></div>

            <div>
              <p className="text-xs text-[#84352D]">
                Floor
              </p>

              <p className="font-semibold text-[#3C0906] text-sm">
                {floor}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {amenities?.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-white border border-[#BC5F41]/30 text-[#84352D] rounded-full"
              >
                {item}
              </span>
            ))}

            {amenities?.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-[#BC5F41] text-white rounded-full">
                +{amenities.length - 3} more
              </span>
            )}
          </div>

          <div className="pt-1">
            <Button 
              onClick={handleNavigation}
              className="w-full rounded-2xl h-11 bg-[#BC5F41] hover:bg-[#84352D] text-white font-medium text-sm transition-all duration-300 shadow-md"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;