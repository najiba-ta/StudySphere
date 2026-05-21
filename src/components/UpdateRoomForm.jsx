"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

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
  const { data: session } = authClient.useSession();

  const [selectedAmenities, setSelectedAmenities] = useState(
    room?.amenities || []
  );

  const [loading, setLoading] = useState(false);

  const toggleAmenity = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const updatedRoom = Object.fromEntries(formData.entries());

      updatedRoom.capacity = Number(updatedRoom.capacity);
      updatedRoom.hourlyRate = Number(updatedRoom.hourlyRate);
      updatedRoom.amenities = selectedAmenities;

      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${room?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(updatedRoom),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Update failed");
      }

      if (data.modifiedCount > 0) {
        toast.success("Room updated successfully!");
        router.push(`/rooms/${room?._id}`);
        router.refresh();
      } else {
        toast.error("No changes made");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] border border-white shadow-xl flex flex-col gap-8 w-full">

      <form onSubmit={handleUpdate} className="space-y-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            name="roomName"
            defaultValue={room?.roomName}
            placeholder="Room Name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#BC5F41]/30 focus:border-[#BC5F41]"
            required
          />

          <input
            name="floor"
            defaultValue={room?.floor}
            placeholder="Floor"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#BC5F41]/30 focus:border-[#BC5F41]"
            required
          />

          <input
            name="capacity"
            type="number"
            defaultValue={room?.capacity}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#BC5F41]/30 focus:border-[#BC5F41]"
            required
          />

          <input
            name="hourlyRate"
            type="number"
            defaultValue={room?.hourlyRate}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#BC5F41]/30 focus:border-[#BC5F41]"
            required
          />
        </div>

        <input
          name="image"
          defaultValue={room?.image}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#BC5F41]/30 focus:border-[#BC5F41]"
          required
        />

        <textarea
          name="description"
          defaultValue={room?.description}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#BC5F41]/30 focus:border-[#BC5F41]"
          required
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {amenitiesList.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleAmenity(item)}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                selectedAmenities.includes(item)
                  ? "bg-[#BC5F41]/10 border-[#BC5F41] text-[#3C0906]"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#BC5F41]/40"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

    
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#BC5F41] hover:bg-[#84352D] transition text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Updating..." : "Update Room"}
        </button>

      </form>
    </div>
  );
}