"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";
import CancelModal from "@/components/CancelModal";
import Link from "next/link";

const MyBookingsPage = () => {
  const { data: session } = authClient.useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openCancel, setOpenCancel] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (!session?.user) return;

    const fetchBookings = async () => {
      try {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
          },
        );

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          toast.error(data.message || "Failed to load bookings");
          return;
        }

        setBookings(data);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${selectedBooking._id}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Cancel failed");
        return;
      }

      toast.success("Booking cancelled");

      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id ? { ...b, status: "cancelled" } : b,
        ),
      );
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setOpenCancel(false);
      setSelectedBooking(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }
  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-8 text-3xl font-bold text-[#3C0906]">My Bookings</h1>

      <div className="grid gap-6">
        {bookings.length > 0 ? (
          bookings.map((b) => (
            <div
              key={b._id}
              className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-5">
                <Image
                  src={isValidUrl(b.roomImage)? b.roomImage : "https://img.magnific.com/free-vector/illustration-gallery-icon_53876-27002.jpg"}
                  width={130}
                  height={90}
                  alt={b.roomName}
                  className="rounded-xl object-cover"
                />

                <div>
                  <Link href={`/rooms/${b.roomId}`}>
                    <h2 className="text-lg font-bold text-[#3C0906]">
                      {b.roomName}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {formatDate(b.date)} | {b.startTime} - {b.endTime}
                  </p>

                  <p
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      b.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {b.status === "cancelled" ? "Cancelled" : "Confirmed"}
                  </p>
                </div>
              </div>

              {b.status !== "cancelled" && (
                <button
                  onClick={() => {
                    setSelectedBooking(b);
                    setOpenCancel(true);
                  }}
                  className="rounded-full bg-[#3C0906] px-3 py-1.5 ml-5 text-xs font-medium text-white
             hover:bg-black transition-all duration-300 shadow-sm
             hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No bookings found</p>
        )}
      </div>

      <CancelModal
        open={openCancel}
        onClose={() => {
          setOpenCancel(false);
          setSelectedBooking(null);
        }}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default MyBookingsPage;
