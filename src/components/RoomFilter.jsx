"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // sync URL → state
  useEffect(() => {
    setSearch(params.get("search") || "");
    setSelectedAmenities(params.get("amenities")?.split(",") || []);
  }, [params]);

  const toggleAmenity = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const applyFilters = (e) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (search.trim()) query.set("search", search.trim());
    if (selectedAmenities.length > 0)
      query.set("amenities", selectedAmenities.join(","));

    router.push(`/rooms?${query.toString()}`);
  };

  // 🔥 RESET FUNCTION
  const resetFilters = () => {
    setSearch("");
    setSelectedAmenities([]);
    router.push("/rooms");
  };

  return (
    <form
      onSubmit={applyFilters}
      className="mb-10 rounded-3xl bg-white/80 backdrop-blur-md border border-amber-100 shadow-xl p-6 space-y-5"
    >
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#3C0906]">
          Filter Study Rooms
        </h2>

        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-semibold text-[#BC5F41] hover:underline"
        >
          Reset
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by room name or description..."
          className="w-full rounded-2xl border border-amber-100 bg-white px-4 py-3 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BC5F41] transition"
        />

        {/* search icon */}
        <svg
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* AMENITIES */}
      <div className="flex flex-wrap gap-2">
        {amenitiesList.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => toggleAmenity(item)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 shadow-sm
              ${
                selectedAmenities.includes(item)
                  ? "bg-[#BC5F41] text-white border-[#BC5F41] scale-105"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#BC5F41] hover:text-[#BC5F41]"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-2xl bg-[#3C0906] text-white py-3 font-semibold hover:bg-[#250503] transition shadow-md"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={resetFilters}
          className="px-5 rounded-2xl border border-[#BC5F41] text-[#BC5F41] font-semibold hover:bg-[#BC5F41] hover:text-white transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
}