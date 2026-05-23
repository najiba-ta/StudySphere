"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
    }, 700);
  };
  const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};


  return (
    <>
      {/* LOADING OVERLAY */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#3C0906]/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="h-14 w-14 rounded-full border-4 border-[#E4C08A]/30 border-t-[#BC5F41]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="bg-[#FFF8F0] border border-[#E4C08A]/40 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all flex flex-col h-full"
      >

        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
            <Image
              src={isValidUrl(image)? image : "https://img.magnific.com/free-vector/illustration-gallery-icon_53876-27002.jpg"}
              width={600}
              height={400}
              className="h-[200px] w-full object-cover"
              alt={roomName}
            />
          </motion.div>

          <div className="absolute top-4 right-4 bg-[#3C0906] text-[#E4C08A] px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            ৳{hourlyRate}/hr
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col flex-grow space-y-4">

          <div>
            <h2 className="text-xl font-bold text-[#3C0906]">
              {roomName}
            </h2>
            <p className="text-sm text-[#BC5F41] font-medium">
              Floor {floor}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>

          {/* INFO BOX */}
          <div className="flex items-center justify-between bg-[#F6E7D0] border border-[#E4C08A] rounded-2xl px-4 py-3">
            <div>
              <p className="text-xs text-[#BC5F41]">Capacity</p>
              <p className="font-semibold text-[#3C0906]">{capacity}</p>
            </div>

            <div className="w-px h-8 bg-[#BC5F41]/30" />

            <div>
              <p className="text-xs text-[#BC5F41]">Floor</p>
              <p className="font-semibold text-[#3C0906]">{floor}</p>
            </div>
          </div>

          {/* AMENITIES */}
          <div className="flex flex-wrap gap-2">
            {amenities?.slice(0, 3).map((item, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 text-xs rounded-full bg-white border border-[#E4C08A]/50 text-[#3C0906]"
              >
                {item}
              </motion.span>
            ))}

            {amenities?.length > 3 && (
              <span className="px-3 py-1 text-xs rounded-full bg-[#3C0906]/80 text-white font-medium shadow">
                +{amenities.length - 3} more
              </span>
            )}
          </div>

          {/* BUTTON */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleNavigation}
              className="w-full rounded-2xl h-11 bg-[#3C0906]/80 hover:bg-[#3C0906] text-white font-medium transition-all"
            >
              View Details
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default RoomCard;