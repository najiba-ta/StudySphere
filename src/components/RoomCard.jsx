"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    }, 800);
  };

  return (
    <>
      {/* LOADING OVERLAY */}
      {isNavigating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3C0906]/60 backdrop-blur-md">
          <div className="flex flex-col items-center gap-3 animate-fadeIn">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#E4C08A]/20 border-t-[#BC5F41]"></div>
            <p className="text-[#E4C08A] font-semibold animate-pulse">
              Opening Room...
            </p>
          </div>
        </div>
      )}

      {/* CARD */}
      <div className="bg-white border border-[#E4C08A]/30 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">

        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <Image
            src={image}
            width={600}
            height={400}
            className="h-[210px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={roomName}
          />

          <div className="absolute top-4 right-4 bg-[#3C0906] text-[#E4C08A] px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-[#E4C08A]/20">
            ৳{hourlyRate}/hr
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col flex-1 space-y-4">

          <div>
            <h2 className="text-xl font-bold text-[#3C0906] line-clamp-1">
              {roomName}
            </h2>

            <p className="text-sm text-[#84352D] mt-1 font-medium">
              Floor {floor}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>

          {/* INFO BOX */}
          <div className="flex items-center justify-between bg-[#3C0906]/5 border border-[#E4C08A]/30 rounded-2xl px-4 py-3">
            <div>
              <p className="text-xs text-[#84352D]">Capacity</p>
              <p className="font-semibold text-[#3C0906] text-sm">
                {capacity} People
              </p>
            </div>

            <div className="w-px h-8 bg-[#BC5F41]/30"></div>

            <div>
              <p className="text-xs text-[#84352D]">Floor</p>
              <p className="font-semibold text-[#3C0906] text-sm">{floor}</p>
            </div>
          </div>

          {/* AMENITIES */}
          <div className="flex flex-wrap gap-2">
            {amenities?.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-[#3C0906] text-[#E4C08A] rounded-full border border-[#E4C08A]/20 transition-all hover:scale-105"
              >
                {item}
              </span>
            ))}

            {amenities?.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-[#BC5F41] text-white rounded-full animate-pulse">
                +{amenities.length - 3} more
              </span>
            )}
          </div>

          {/* BUTTON */}
          <div className="pt-2 mt-auto">
            <Button
              onClick={handleNavigation}
              className="w-full h-11 rounded-2xl bg-[#3C0906] text-[#E4C08A] border border-[#E4C08A]/20 hover:bg-[#BC5F41] hover:text-white transition-all duration-300 shadow-md"
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