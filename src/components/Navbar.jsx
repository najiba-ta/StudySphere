"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assests/logo.png"
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button, Avatar } from "@heroui/react";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
  };

  const isOwner = user?.role === "owner";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },

    ...(isOwner ? [{ name: "Add Room", href: "/add-room" }] : []),

    { name: "My Listings", href: "/my-listing" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E4C08A]/10 bg-[#3C0906]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={140}
            height={40}
            className="drop-shadow-[0_0_12px_rgba(228,196,138,0.15)]"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition duration-200 hover:text-[#E4C08A] ${
                pathname === link.href
                  ? "text-[#E4C08A] font-semibold"
                  : "text-[#E4E4E6]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {user ? (
            <>
              {/* Avatar */}
              <Avatar className="h-9 w-9 border border-[#E4C08A]/20">
                <Avatar.Image src={user.image} />
                <Avatar.Fallback className="bg-[#84352D] text-[#E4E4E6]">
                  {user.name?.charAt(0)}
                </Avatar.Fallback>
              </Avatar>

              {/* Logout */}
              <Button
                onClick={handleLogout}
                className="rounded-xl border border-[#BC5F41]/30 bg-[#84352D]/20 text-[#E4E4E6] hover:bg-[#BC5F41]/30 hover:text-white"
              >
                <LogOut size={16} />
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[#E4E4E6] hover:text-[#E4C08A] transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-[#E4C08A]/20 bg-[#BC5F41]/20 px-4 py-2 text-[#E4C08A] hover:bg-[#BC5F41]/30 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-[#E4E4E6]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-[#E4C08A]/10 bg-[#3C0906] px-5 py-4 space-y-3 text-[#E4E4E6]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block transition hover:text-[#E4C08A] ${
                pathname === link.href ? "text-[#E4C08A]" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#E4C08A]/10">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-[#E4E4E6] hover:text-[#BC5F41]"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <div className="flex gap-4">
                <Link href="/login" className="hover:text-[#E4C08A]">
                  Login
                </Link>
                <Link href="/register" className="hover:text-[#E4C08A]">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}