"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const amenitiesList = [
  "Wi-Fi",
  "Whiteboard",
  "Projector",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function UpdateRoomForm({ room }) {
  const router = useRouter();

  const [selectedAmenities, setSelectedAmenities] = useState(
    room?.amenities || []
  );

  const toggleAmenity = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedRoom = Object.fromEntries(formData.entries());

    updatedRoom.capacity = Number(updatedRoom.capacity);
    updatedRoom.hourlyRate = Number(updatedRoom.hourlyRate);
    updatedRoom.amenities = selectedAmenities;

    try {
      const res = await fetch(`http://localhost:8000/rooms/${room?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRoom),
      });

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Room updated successfully!");
        router.push(`/rooms/${room?._id}`);
        router.refresh();
      } else {
        toast.error("No changes made");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    // 🎯 মূল কন্টেইনারে লাক্সারি প্যাডিং (p-6 md:p-10) এবং শ্যাডো দিয়ে কার্ড লুক দেওয়া হয়েছে
    <div className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] border border-white shadow-xl flex flex-col gap-8 w-full">
      <form onSubmit={handleUpdate} className="space-y-6">
        
        {/* 🔹 Input Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Room Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#3C0906]/70 uppercase tracking-widest pl-1">
              Room Name
            </label>
            <input
              name="roomName"
              type="text"
              required
              defaultValue={room?.roomName}
              className="w-full bg-amber-50/20 border border-amber-200/50 focus:border-[#BC5F41] focus:ring-4 focus:ring-[#BC5F41]/10 p-3.5 rounded-xl outline-none text-gray-800 transition-all font-medium text-sm shadow-sm"
            />
          </div>

          {/* Floor Level */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#3C0906]/70 uppercase tracking-widest pl-1">
              Floor Location
            </label>
            <input
              name="floor"
              type="text"
              required
              defaultValue={room?.floor}
              className="w-full bg-amber-50/20 border border-amber-200/50 focus:border-[#BC5F41] focus:ring-4 focus:ring-[#BC5F41]/10 p-3.5 rounded-xl outline-none text-gray-800 transition-all font-medium text-sm shadow-sm"
            />
          </div>

          {/* Capacity */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#3C0906]/70 uppercase tracking-widest pl-1">
              Capacity (People)
            </label>
            <input
              name="capacity"
              type="number"
              required
              min="1"
              defaultValue={room?.capacity}
              className="w-full bg-amber-50/20 border border-amber-200/50 focus:border-[#BC5F41] focus:ring-4 focus:ring-[#BC5F41]/10 p-3.5 rounded-xl outline-none text-gray-800 transition-all font-medium text-sm shadow-sm"
            />
          </div>

          {/* Hourly Rate */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#3C0906]/70 uppercase tracking-widest pl-1">
              Hourly Rate (৳)
            </label>
            <input
              name="hourlyRate"
              type="number"
              required
              min="0"
              defaultValue={room?.hourlyRate}
              className="w-full bg-amber-50/20 border border-amber-200/50 focus:border-[#BC5F41] focus:ring-4 focus:ring-[#BC5F41]/10 p-3.5 rounded-xl outline-none transition-all font-bold text-sm text-[#BC5F41] shadow-sm"
            />
          </div>
        </div>

        {/* Image URL (Full Width) */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#3C0906]/70 uppercase tracking-widest pl-1">
            Room Image URL
          </label>
          <input
            name="image"
            type="url"
            required
            defaultValue={room?.image}
            className="w-full bg-amber-50/20 border border-amber-200/50 focus:border-[#BC5F41] focus:ring-4 focus:ring-[#BC5F41]/10 p-3.5 rounded-xl outline-none text-gray-700 transition-all text-sm shadow-sm"
          />
        </div>

        {/* Description (Full Width) */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#3C0906]/70 uppercase tracking-widest pl-1">
            Detailed Description
          </label>
          <textarea
            name="description"
            required
            rows="4"
            defaultValue={room?.description}
            className="w-full bg-amber-50/20 border border-amber-200/50 focus:border-[#BC5F41] focus:ring-4 focus:ring-[#BC5F41]/10 p-3.5 rounded-xl outline-none text-gray-700 transition-all text-sm leading-relaxed shadow-sm resize-none"
          />
        </div>

        {/* 🔹 Amenities Section with enhanced padding */}
        <div className="flex flex-col gap-3 pt-2">
          <label className="text-xs font-bold text-[#3C0906]/70 uppercase tracking-widest pl-1">
            Modify Amenities
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {amenitiesList.map((item) => {
              const isSelected = selectedAmenities.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleAmenity(item)}
                  className={`p-3.5 rounded-xl border text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                    isSelected
                      ? "bg-[#BC5F41]/10 border-[#BC5F41] text-[#BC5F41] scale-[1.01]"
                      : "bg-white border-amber-100 text-gray-600 hover:border-amber-200 hover:bg-amber-50/20"
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-[#BC5F41] rounded-full animate-ping"></span>}
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* 🔹 Form Submit Action Button */}
        <div className="pt-6 border-t border-amber-100/70 mt-4">
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#BC5F41] hover:bg-[#a44e33] text-white font-bold tracking-wide transition-all duration-200 shadow-md shadow-[#BC5F41]/20 flex items-center justify-center gap-2 group text-sm md:text-base cursor-pointer"
          >
            Save Changes & Update
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

      </form>
    </div>
  );
}