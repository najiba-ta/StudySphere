"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const amenitiesList = [
  "Wi-Fi",
  "Whiteboard",
  "Projector",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function RoomFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") || "");
  const [selectedAmenities, setSelectedAmenities] = useState(
    params.get("amenities")?.split(",") || []
  );

  const toggleAmenity = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  const applyFilters = (e) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (search) query.set("search", search);
    if (selectedAmenities.length > 0)
      query.set("amenities", selectedAmenities.join(","));

    router.push(`/rooms?${query.toString()}`);
  };

  return (
    <form onSubmit={applyFilters} className="space-y-4 mb-6">

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search rooms..."
        className="px-4 py-2 border rounded-xl w-full"
      />

      {/* AMENITIES */}
      <div className="flex flex-wrap gap-2">
        {amenitiesList.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => toggleAmenity(item)}
            className={`px-3 py-1 rounded-full border ${
              selectedAmenities.includes(item)
                ? "bg-[#BC5F41] text-white"
                : "bg-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <button className="bg-[#3C0906] text-white px-5 py-2 rounded-xl">
        Apply Filters
      </button>
    </form>
  );
}