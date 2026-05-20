"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0b0f1a] text-white border-t border-white/10 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-[#F6E7D0]">
            StudyNook
          </h2>

          <p className="mt-4 text-sm text-gray-400 leading-6">
            A smart study room booking platform for students and libraries.
            Book rooms instantly, manage listings, and stay productive.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-[#F6E7D0] mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#E4C08A]">Home</Link>
            <Link href="/rooms" className="hover:text-[#E4C08A]">Rooms</Link>
            <Link href="/add-room" className="hover:text-[#E4C08A]">Add Room</Link>
            <Link href="/my-bookings" className="hover:text-[#E4C08A]">My Bookings</Link>
          </div>
        </div>

        {/* CONTACT + SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold text-[#F6E7D0] mb-4">
            Contact
          </h3>

          <div className="flex flex-col gap-3 text-sm text-gray-400">

            <div className="flex items-center gap-2">
              <Mail size={16} />
              support@studynook.com
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              +880 1234 567890
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              Bangladesh
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-5 text-xl text-gray-400">
            <FaFacebook className="hover:text-[#E4C08A] cursor-pointer transition" />
            <FaInstagram className="hover:text-[#E4C08A] cursor-pointer transition" />
            <FaLinkedin className="hover:text-[#E4C08A] cursor-pointer transition" />
            <FaXTwitter className="hover:text-[#E4C08A] cursor-pointer transition" />
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} StudyNook. All rights reserved.
      </div>
    </footer>
  );
}