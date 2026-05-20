"use client";

import Link from "next/link";
import Image from "next/image";
import notFound from "../../public/assests/not-found.png"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-gradient-to-br from-[#3C0906] via-[#2a0a08] to-[#BC5F41]">

      {/* background blobs */}
      <div className="absolute w-[300px] h-[300px] bg-[#BC5F41]/20 rounded-full blur-3xl top-[-80px] left-[-80px] animate-pulse" />
      <div className="absolute w-[250px] h-[250px] bg-[#E4C08A]/10 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-pulse" />

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 items-center z-10">

        {/* IMAGE */}
        <div className="flex justify-center animate__animated animate__fadeInLeft">
          <div className="relative">
            <Image
              src={notFound}
              alt="not found"
              width={320}
              height={320}
              className="rounded-2xl border border-[#E4C08A]/20 shadow-xl"
            />

            <div className="absolute -top-3 -right-3 bg-[#BC5F41] text-white text-xs px-3 py-1 rounded-full animate-bounce">
              Oops!
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div className="text-center md:text-left animate__animated animate__fadeInRight">

          <p className="text-[#E4C08A]/70 text-xs tracking-[4px]">
            PAGE NOT FOUND
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-[#E4E4E6] mt-3">
            Looks like this page got lost 😅
          </h1>

          <p className="text-sm text-[#E4E4E6]/70 mt-4 leading-6">
            Even the best study rooms can't find this page. Try going back home or explore rooms.
          </p>

          <div className="mt-6 flex gap-3 justify-center md:justify-start">

            <Link
              href="/"
              className="px-4 py-2 text-sm rounded-full bg-[#BC5F41]/20 text-[#E4E4E6] border border-[#BC5F41]/30 hover:bg-[#BC5F41] transition"
            >
              Go Home
            </Link>

            <Link
              href="/rooms"
              className="px-4 py-2 text-sm rounded-full border border-[#E4C08A]/40 text-[#E4C08A] hover:bg-[#E4C08A] hover:text-[#3C0906] transition"
            >
              Find Rooms
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}