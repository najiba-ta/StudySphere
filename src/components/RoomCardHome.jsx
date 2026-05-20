"use client";

import { useEffect, useState } from "react";
import RoomCardHome from "@/components/RoomCardHome"; // আপনার পাথ অনুযায়ী

export default function Home() {
  const [latestRooms, setLatestRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/rooms/latest")
      .then((res) => res.json())
      .then((data) => setLatestRooms(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 🌟 আপনার আগের বানানো স্ট্যাটিক সেকশন ১ (যেমন: Hero Banner) */}
      <section className="bg-[#3C0906] text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to StudySphere</h1>
        <p className="mt-2 text-gray-300">Book your perfect room now</p>
      </section>

      {/* 🎯 মূল রুমের সেকশন (যেটা রিকোয়ারমেন্টে চেইয়েছে) */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-[#3C0906] mb-8 text-center">Latest Rooms</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestRooms.map((room) => (
            <RoomCardHome key={room._id} room={room} />
          ))}
        </div>
      </section>

      {/* 🌟您的 আগের বানানো স্ট্যাটিক সেকশন ২ (যেমন: Why Choose Us / Features) */}
      <section className="bg-white py-12 text-center border-t">
        <h2 className="text-2xl font-bold">Why Choose Us?</h2>
        {/* বাকি কোড... */}
      </section>

    </div>
  );
}