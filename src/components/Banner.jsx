"use client";

import Image from "next/image";
import studyroom from "../../public/assests/bookroom1.jpeg";
import studyroom1 from "../../public/assests/bookroom2.avif";
import studyroom2 from "../../public/assests/bookroom3.avif";
import studyroom6 from "../../public/assests/bookroom4.webp";
import studyroom8 from "../../public/assests/bookroom5.avif";
import studyroom9 from "../../public/assests/bookroom6.jpg";
import "animate.css";
import Link from "next/link";


export default function Banner() {
  const images = [
    studyroom,
    studyroom1,
    studyroom2,
    studyroom6,
    studyroom8,
    studyroom9,
  ];

  return (
    <section className="bg-[#F6E7D0] border-t-8 border-[#5f2f28] py-16 md:py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-40 items-center">

        <div className="rotate-[8deg] grid grid-cols-3 gap-4 md:gap-5">

          {images.map((img, i) => (
            <div
              key={i}
              className={`relative h-[120px] sm:h-[170px] md:h-[220px] lg:h-[250px] overflow-hidden shadow-md border border-white/40 transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1 animate__animated animate__fadeInUp`}
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <Image
                src={img}
                fill
                alt="study room"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}

        </div>

        <div className="text-center lg:text-left animate__animated animate__fadeInRight">

          <div className="inline-block px-3 py-2 rounded-full border border-[#ddc39b] text-xs md:text-sm tracking-[3px] bg-[#f8ebd8] shadow-sm animate__animated animate__fadeInDown">
            STUDYSPHERE – ROOM BOOKING PLATFORM
          </div>

          <h1 className="mt-6 text-3xl sm:text-5xl lg:text-5xl font-bold leading-tight text-[#02091a] animate__animated animate__fadeInUp">
            Find Your Perfect
            <br />
            <span className="text-[#B57A1D]">Study Room</span>
            <br />
            For Focused Learning
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#333] max-w-xl mx-auto lg:mx-0 leading-8 animate__animated animate__fadeInUp">
            Browse available rooms, check room details, and instantly book your ideal learning environment.
          </p>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 animate__animated animate__fadeInUp">

            <Link
              href="/rooms"
              className="bg-[#02091a] text-white px-7 py-3 rounded-xl text-base font-semibold transition hover:scale-105 active:scale-95"
            >
              Explore Rooms
            </Link>

            <Link
              href="/add-room"
              className="border border-[#d3b27b] px-7 py-3 rounded-xl text-base font-semibold transition hover:bg-[#f3e1c2] hover:scale-105 active:scale-95"
            >
              Add Room
            </Link>

          </div>

        </div>
      </div>

    </section>
  );
}