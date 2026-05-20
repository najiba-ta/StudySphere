"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";
import CancelModal from "@/components/CancelModal";

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
        const res = await fetch(
          `http://localhost:8000/bookings/${session.user.id}`,
        );
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [session]);

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    try {
      const res = await fetch(
        `http://localhost:8000/bookings/${selectedBooking._id}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session.user.id }),
        },
      );
      const data = await res.json();
      if (data.success || data.modifiedCount > 0) {
        toast.success("Booking cancelled");
        setBookings((prev) =>
          prev.map((b) =>
            b._id === selectedBooking._id ? { ...b, status: "cancelled" } : b,
          ),
        );
      } else {
        toast.error(data.message || "Cancel failed");
      }
    } catch (err) {
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

  if (loading)
    return <p className="p-10 text-center text-gray-600">Loading...</p>;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-8 text-3xl font-bold text-[#3C0906]">My Bookings</h1>

      <div className="grid gap-6">
        {bookings.length > 0 ? (
          bookings.map((b) => (
            <div
              key={b._id}
              className="flex items-center justify-between gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-6">
                {b.roomImage ? (
                  <Image
                    src={b.roomImage}
                    width={140}
                    height={100}
                    alt={b.roomName}
                    className="rounded-xl object-cover"
                  />
                ) : (
                  <div className="h-[100px] w-[140px] rounded-xl bg-gray-100" />
                )}

                <div>
                  <h2 className="text-xl font-bold text-[#3C0906]">
                    {b.roomName}
                  </h2>
                  <p className="mt-1 text-gray-600 font-medium">
                    {formatDate(b.date)} | {b.startTime} - {b.endTime}
                  </p>
                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      b.status === "cancelled"
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {b.status === "cancelled" ? "Cancelled" : "Confirmed"}
                  </span>
                </div>
              </div>

              {b.status !== "cancelled" && (
                <button
                  onClick={() => {
                    setSelectedBooking(b);
                    setOpenCancel(true);
                  }}
                  className="rounded-lg bg-[#BC5F41] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#3C0906] hover:scale-105"
                >
                  Cancel
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No bookings found.</p>
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
