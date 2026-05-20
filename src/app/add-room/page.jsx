"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function AddRoomPage() {
  const [amenities, setAmenities] = useState([]);

  const amenityOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const handleAmenityChange = (value) => {
    if (amenities.includes(value)) {
      setAmenities(amenities.filter((item) => item !== value));
    } else {
      setAmenities([...amenities, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const roomData = {
      roomName: form.roomName.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: parseInt(form.capacity.value),
      hourlyRate: parseInt(form.hourlyRate.value),
      amenities,
    };

    console.log(roomData);

    toast.success("Room added successfully");

    form.reset();
    setAmenities([]);
  };

  return (
    <div className="min-h-screen bg-[#F6E7D0] py-14 px-5">

      <div className="max-w-4xl mx-auto">

        {/* heading */}
        <div className="text-center mb-10">
          <p className="text-[#84352D] tracking-[4px] text-xs uppercase">
            StudySphere
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-[#3C0906] mt-3">
            Add A New Study Room
          </h1>

          <p className="text-[#5c4033] mt-4 max-w-2xl mx-auto leading-7">
            Create your room listing with detailed information so students
            can easily discover and book the perfect study environment.
          </p>
        </div>

        {/* form */}
        <div className="bg-white/60 backdrop-blur-md border border-[#E4C08A]/30 rounded-[30px] shadow-xl p-6 md:p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* room name */}
            <div>
              <label className="block text-sm font-medium text-[#3C0906] mb-2">
                Room Name
              </label>

              <input
                type="text"
                name="roomName"
                required
                placeholder="Silent Study Room"
                className="w-full rounded-2xl border border-[#d9b98a] bg-white px-5 py-3 outline-none focus:border-[#BC5F41]"
              />
            </div>

            {/* description */}
            <div>
              <label className="block text-sm font-medium text-[#3C0906] mb-2">
                Description
              </label>

              <textarea
                name="description"
                rows="5"
                required
                placeholder="Describe the environment, facilities and atmosphere..."
                className="w-full rounded-2xl border border-[#d9b98a] bg-white px-5 py-3 outline-none focus:border-[#BC5F41]"
              />
            </div>

            {/* image + floor */}
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-[#3C0906] mb-2">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-2xl border border-[#d9b98a] bg-white px-5 py-3 outline-none focus:border-[#BC5F41]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3C0906] mb-2">
                  Floor
                </label>

                <input
                  type="text"
                  name="floor"
                  required
                  placeholder="3rd Floor"
                  className="w-full rounded-2xl border border-[#d9b98a] bg-white px-5 py-3 outline-none focus:border-[#BC5F41]"
                />
              </div>

            </div>

            {/* capacity + rate */}
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-[#3C0906] mb-2">
                  Seat Capacity
                </label>

                <input
                  type="number"
                  name="capacity"
                  required
                  placeholder="4"
                  className="w-full rounded-2xl border border-[#d9b98a] bg-white px-5 py-3 outline-none focus:border-[#BC5F41]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3C0906] mb-2">
                  Hourly Rate ($)
                </label>

                <input
                  type="number"
                  name="hourlyRate"
                  required
                  placeholder="5"
                  className="w-full rounded-2xl border border-[#d9b98a] bg-white px-5 py-3 outline-none focus:border-[#BC5F41]"
                />
              </div>

            </div>

            {/* amenities */}
            <div>
              <label className="block text-sm font-medium text-[#3C0906] mb-4">
                Amenities
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                {amenityOptions.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-[#E4C08A]/30 bg-white px-4 py-3 cursor-pointer hover:border-[#BC5F41] transition"
                  >
                    <input
                      type="checkbox"
                      checked={amenities.includes(item)}
                      onChange={() => handleAmenityChange(item)}
                      className="accent-[#BC5F41]"
                    />

                    <span className="text-sm text-[#3C0906]">
                      {item}
                    </span>
                  </label>
                ))}

              </div>
            </div>

            {/* button */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-[#3C0906] py-4 text-white font-semibold tracking-wide transition hover:bg-[#84352D]"
            >
              Add Room
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}