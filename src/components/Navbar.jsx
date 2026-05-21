"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/assests/logo.png";

import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
  ];

  const privateLinks = [
    { name: "Add Room", href: "/add-room" },
    { name: "My Listings", href: "/my-listing" },
    { name: "My Bookings", href: "/my-booking" },
  ];

  // ✅ SIMPLE NAVIGATION (NO LOADING OVERLAY)
  const handleNavigation = (href) => {
    setOpen(false);
    router.push(href);
  };

  const handleLogout = async () => {
    setOpen(false);

    try {
      await authClient.signOut();
      toast.success("Logged out successfully");

      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } catch {
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#3C0906]/90 backdrop-blur-xl border-b border-[#E4C08A]/10">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">

        {/* LOGO */}
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center bg-transparent border-none p-0 cursor-pointer"
        >
          <Image src={logo} alt="logo" width={130} height={40} />
        </button>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {publicLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavigation(link.href)}
              className={`bg-transparent border-none cursor-pointer ${
                pathname === link.href
                  ? "text-[#E4C08A] font-semibold"
                  : "text-[#E4E4E6] hover:text-[#E4C08A]"
              }`}
            >
              {link.name}
            </button>
          ))}

          {user &&
            privateLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className={`bg-transparent border-none cursor-pointer ${
                  pathname === link.href
                    ? "text-[#E4C08A] font-semibold"
                    : "text-[#E4E4E6] hover:text-[#E4C08A]"
                }`}
              >
                {link.name}
              </button>
            ))}
        </div>

        {/* AUTH */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Avatar className="h-10 w-10 border border-[#E4C08A]/20">
                <Avatar.Image src={user?.image} />
                <Avatar.Fallback className="bg-[#84352D] text-white">
                  {user?.name?.charAt(0)}
                </Avatar.Fallback>
              </Avatar>

              <Button
                onClick={handleLogout}
                className="h-9 px-3 rounded-xl bg-[#84352D]/30 text-white hover:bg-[#BC5F41]"
              >
                <LogOut size={16} />
              </Button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/login")}
                className="text-[#E4E4E6] hover:text-[#E4C08A]"
              >
                Login
              </button>

              <button
                onClick={() => handleNavigation("/register")}
                className="px-4 py-2 rounded-xl bg-[#BC5F41]/30 text-[#E4C08A]"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#E4E4E6]"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE LINKS */}
      {open && (
        <div className="md:hidden px-5 py-4 space-y-4 bg-[#3C0906] border-t border-[#E4C08A]/10">
          {[...publicLinks, ...(user ? privateLinks : [])].map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavigation(link.href)}
              className="block text-[#E4E4E6] hover:text-[#E4C08A] w-full text-left"
            >
              {link.name}
            </button>
          ))}

          <div className="pt-3 border-t border-[#E4C08A]/10">
            {user ? (
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => handleNavigation("/login")}>
                  Login
                </button>
                <button onClick={() => handleNavigation("/register")}>
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}