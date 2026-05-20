"use client";

import { useState } from "react";
import { Sparkles, MapPin, ImageIcon, Users, DollarSign } from "lucide-react";
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

  // ✅ FIXED
  const { data: session } = authClient.useSession();

  const toggleAmenity = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(
        selectedAmenities.filter((amenity) => amenity !== item),
      );
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const roomsData = Object.fromEntries(formData.entries());

    roomsData.amenities = selectedAmenities;

    // ✅ FIXED
    roomsData.ownerId = session?.user?.id;

    const res = await fetch("http://localhost:8000/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomsData),
    });

    const data = await res.json();

    if (data?.insertedId) {
      toast.success("Room added successfully!");
      e.target.reset();
      setSelectedAmenities([]);
    }
  };

  const inputClass =
    "w-full rounded-[18px] bg-white/70 border border-[#BC5F41]/20 px-4 py-3 text-[#3C0906] outline-none transition focus:border-[#BC5F41] focus:ring-4 focus:ring-[#BC5F41]/10";

  return (
    <div className="min-h-screen bg-[#F6E7D0] px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BC5F41]/20 bg-[#BC5F41]/10 px-5 py-2 text-sm font-medium text-[#84352D]">
            <Sparkles size={16} />
            StudySphere Room Listing
          </div>

          <h1 className="mt-4 text-4xl font-bold text-[#3C0906]">
            Add New Study Room
          </h1>

          <p className="mt-3 text-[#84352D]/70">
            Create a focused learning space for students
          </p>
        </div>

        <div className="rounded-[30px] border border-[#BC5F41]/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl md:p-10">
          <form onSubmit={handleAddRoom} className="space-y-7">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3C0906]">
                  <Sparkles size={16} className="text-[#BC5F41]" />
                  Room Name
                </label>
                <input
                  name="roomName"
                  placeholder="Silent Focus Room"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3C0906]">
                  <MapPin size={16} className="text-[#BC5F41]" />
                  Floor
                </label>
                <input
                  name="floor"
                  placeholder="3rd Floor"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#3C0906]">
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                placeholder="Describe the room environment..."
                className={inputClass + " resize-none"}
                required
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3C0906]">
                <ImageIcon size={16} className="text-[#BC5F41]" />
                Room Image URL
              </label>
              <input
                name="image"
                placeholder="https://example.com/room.jpg"
                className={inputClass}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3C0906]">
                  <Users size={16} className="text-[#BC5F41]" />
                  Seat Capacity
                </label>
                <input
                  name="capacity"
                  type="number"
                  min={1}
                  placeholder="4"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3C0906]">
                  <DollarSign size={16} className="text-[#BC5F41]" />
                  Hourly Rate
                </label>
                <input
                  name="hourlyRate"
                  type="number"
                  min={1}
                  placeholder="10"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-4 block text-sm font-medium text-[#3C0906]">
                Amenities
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {amenitiesList.map((item) => {
                  const active = selectedAmenities.includes(item);

                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleAmenity(item)}
                      className={`rounded-2xl border px-5 py-4 text-sm font-medium transition ${
                        active
                          ? "border-[#BC5F41] bg-[#BC5F41]/10 text-[#84352D]"
                          : "border-[#BC5F41]/10 bg-[#F6E7D0]/50 text-[#3C0906] hover:border-[#BC5F41]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item}</span>

                        <input
                          type="checkbox"
                          checked={active}
                          readOnly
                          className="h-4 w-4 accent-[#BC5F41]"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#3C0906] py-4 text-lg font-semibold text-white transition hover:bg-[#84352D]"
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