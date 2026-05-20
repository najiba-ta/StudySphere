"use client";

import { BookOpen, ShieldCheck, Clock, LayoutGrid } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Easy Room Booking",
      desc: "Find and book study rooms instantly with a smooth, distraction-free experience.",
    },
    {
      icon: ShieldCheck,
      title: "Secure System",
      desc: "JWT-based authentication keeps your bookings and data fully protected.",
    },
    {
      icon: Clock,
      title: "Real-time Availability",
      desc: "Check available time slots and avoid double booking automatically.",
    },
    {
      icon: LayoutGrid,
      title: "Organized Dashboard",
      desc: "Manage your rooms, listings, and bookings in one clean dashboard.",
    },
  ];

  return (
    <section className="bg-[#F6E7D0] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-[#0b0f1a]">
          Why Choose <span className="text-[#5f2f28]">StudyNook</span>
        </h2>

        <p className="mt-3 text-[#3b2a22] max-w-2xl mx-auto">
          A smart and simple study room booking system designed for students,
          libraries, and focused learning environments.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-[#d3b27b]/40 bg-white/40 backdrop-blur-md p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#5f2f28]/10 text-[#5f2f28] group-hover:scale-110 transition">
                <f.icon size={22} />
              </div>

              <h3 className="text-lg font-semibold text-[#0b0f1a]">
                {f.title}
              </h3>

              <p className="mt-2 text-sm text-[#3b2a22] leading-6">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}