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

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

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

  const handleNavigation = (href, name) => {
    setOpen(false);
    setLoadingText(`Loading ${name}...`);
    setLoading(true);

    setTimeout(() => {
      router.push(href);
      setLoading(false);
    }, 1500);
  };

  const handleLogout = async () => {
    setOpen(false);
    setLoadingText("Logging out...");
    setLoading(true);

    try {
      await authClient.signOut();
      toast.success("Logged out successfully");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch {
      toast.error("Logout failed!");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#E4E4E6]/40 backdrop-blur-md">
          <div className="relative flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#E4C08A]/20 border-t-[#BC5F41] border-b-[#84352D]"></div>
            <div className="absolute h-10 w-10 animate-spin rounded-full border-4 border-[#E4E4E6]/10 border-r-[#3C0906] border-l-[#84352D]"></div>
          </div>
          <p className="mt-4 text-sm font-semibold tracking-wider text-[#3C0906] animate-pulse">
            {loadingText}
          </p>
        </div>
      )}

      <nav className="sticky top-0 z-40 bg-[#3C0906]/90 backdrop-blur-xl border-b border-[#E4C08A]/10">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">

          <button 
            onClick={() => handleNavigation("/", "Home")} 
            className="flex items-center bg-transparent border-none p-0 cursor-pointer"
          >
            <Image
              src={logo}
              alt="logo"
              width={130}
              height={40}
              className="drop-shadow-md"
            />
          </button>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {publicLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href, link.name)}
                className={`transition bg-transparent border-none p-0 cursor-pointer ${
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
                  onClick={() => handleNavigation(link.href, link.name)}
                  className={`transition bg-transparent border-none p-0 cursor-pointer ${
                    pathname === link.href
                    ? "text-[#E4C08A] font-semibold"
                    : "text-[#E4E4E6] hover:text-[#E4C08A]"
                  }`}
                >
                  {link.name}
                </button>
              ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm text-[#E4E4E6] font-medium">
                      {user?.name}
                    </p>
                    <p className="text-xs text-[#E4C08A]/70">
                      Welcome
                    </p>
                  </div>

                  <Avatar className="h-10 w-10 border border-[#E4C08A]/20">
                    <Avatar.Image src={user?.image} />
                    <Avatar.Fallback className="bg-[#84352D] text-white">
                      {user?.name?.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                </div>
                
                <Button
                  onClick={handleLogout}
                  className="h-9 px-3 rounded-xl bg-[#84352D]/30 text-white hover:bg-[#BC5F41] transition"
                >
                  <LogOut size={16} />
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/login", "Login")}
                  className="text-[#E4E4E6] hover:text-[#E4C08A] transition bg-transparent border-none p-0 cursor-pointer"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavigation("/register", "Registration")}
                  className="px-4 py-2 rounded-xl bg-[#BC5F41]/30 text-[#E4C08A] hover:bg-[#BC5F41]/50 transition border-none cursor-pointer"
                >
                  Register
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#E4E4E6]"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden px-5 py-4 space-y-4 bg-[#3C0906] border-t border-[#E4C08A]/10 flex flex-col items-start">
            {publicLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href, link.name)}
                className="block text-[#E4E4E6] hover:text-[#E4C08A] bg-transparent border-none p-0 text-left w-full cursor-pointer"
              >
                {link.name}
              </button>
            ))}

            {user &&
              privateLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link.href, link.name)}
                  className="block text-[#E4E4E6] hover:text-[#E4C08A] bg-transparent border-none p-0 text-left w-full cursor-pointer"
                >
                  {link.name}
                </button>
              ))}

            <div className="pt-3 border-t border-[#E4C08A]/10 w-full">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white hover:text-[#BC5F41] bg-transparent border-none p-0 w-full text-left cursor-pointer"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              ) : (
                <div className="flex gap-4 text-sm">
                  <button 
                    onClick={() => handleNavigation("/login", "Login")} 
                    className="text-white bg-transparent border-none p-0 cursor-pointer"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => handleNavigation("/register", "Registration")} 
                    className="text-[#E4C08A] bg-transparent border-none p-0 cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}