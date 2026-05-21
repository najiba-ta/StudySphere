"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
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

const AddRoomPage = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const { data: session } = authClient.useSession();

  const toggleAmenity = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const roomsData = Object.fromEntries(formData.entries());
    roomsData.amenities = selectedAmenities;

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(roomsData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to add room");
        return;
      }

      toast.success("Room added successfully!");
      e.target.reset();
      setSelectedAmenities([]);
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const inputClass =
    "w-full rounded-[18px] bg-white/70 border border-[#BC5F41]/20 px-4 py-3 text-[#3C0906] outline-none transition focus:border-[#BC5F41] focus:ring-4 focus:ring-[#BC5F41]/10";

  const labelClass =
    "text-sm font-semibold text-[#3C0906] mb-1 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-[#F6E7D0] px-4 py-14">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BC5F41]/20 bg-[#BC5F41]/10 px-5 py-2 text-sm font-medium text-[#84352D]">
            <Sparkles size={16} />
            StudySphere Room Listing
          </div>

          <h1 className="mt-4 text-4xl font-bold text-[#3C0906]">
            Add New Study Room
          </h1>
        </div>

        {/* FORM */}
        <div className="rounded-[30px] border border-[#BC5F41]/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl md:p-10">

          <form onSubmit={handleAddRoom} className="space-y-6">

            {/* ROOM NAME + FLOOR */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Room Name</label>
                <input name="roomName" className={inputClass} placeholder="e.g. Silent Study Room" required />
              </div>

              <div>
                <label className={labelClass}>Floor</label>
                <input name="floor" className={inputClass} placeholder="e.g. 3rd Floor" required />
              </div>

            </div>

            {/* DESCRIPTION */}
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                rows={5}
                className={inputClass + " resize-none"}
                placeholder="Describe the study environment..."
                required
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className={labelClass}> Image URL</label>
              <input name="image" className={inputClass} placeholder="https://..." required />
            </div>

            {/* CAPACITY + RATE */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Capacity</label>
                <input type="number" name="capacity" className={inputClass} placeholder="Number of people" required />
              </div>

              <div>
                <label className={labelClass}> Hourly Rate</label>
                <input type="number" name="hourlyRate" className={inputClass} placeholder="Price per hour" required />
              </div>

            </div>

            {/* AMENITIES */}
            <div>
              <label className={labelClass}> Amenities</label>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {amenitiesList.map((item) => {
                  const active = selectedAmenities.includes(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleAmenity(item)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-[#BC5F41] text-white border-[#BC5F41] scale-105"
                          : "bg-[#F6E7D0]/40 text-[#3C0906] border-[#BC5F41]/10 hover:border-[#BC5F41]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-[#3C0906] py-4 text-white font-semibold text-lg hover:bg-[#84352D] transition-all duration-300"
            >
              + Add Study Room
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;