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

  // FETCH BOOKINGS
  useEffect(() => {
    if (!session?.user) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/bookings/${session.user.id}`
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

  // CANCEL API CALL
  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;

    try {
      const res = await fetch(
        `http://localhost:8000/bookings/${selectedBooking._id}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
          }),
        }
      );

      const data = await res.json();

      if (data.success || data.modifiedCount > 0) {
        toast.success("Booking cancelled");

        // update UI instantly
        setBookings((prev) =>
          prev.map((b) =>
            b._id === selectedBooking._id
              ? { ...b, status: "cancelled" }
              : b
          )
        );
      } else {
        toast.error(data.message || "Cancel failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setOpenCancel(false);
      setSelectedBooking(null);
    }
  };

  // LOADING
  if (loading) {
    return (
      <p className="p-10 text-center text-gray-600">
        Loading...
      </p>
    );
  }

  // EMPTY STATE
  if (!bookings.length) {
    return (
      <p className="p-10 text-center text-gray-500">
        No bookings found.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">

      <h1 className="mb-6 text-2xl font-bold">
        My Bookings
      </h1>

      <div className="grid gap-4">

        {bookings.map((b) => (
          <div
            key={b._id}
            className="flex items-center justify-between gap-4 rounded-xl border bg-white p-4"
          >

            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">

              {/* IMAGE */}
              {b.roomImage ? (
                <Image
                  src={b.roomImage}
                  width={120}
                  height={80}
                  alt={b.roomName || "room"}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="h-[80px] w-[120px] rounded-lg bg-gray-200" />
              )}

              {/* INFO */}
              <div>
                <h2 className="font-bold">
                  {b.roomName}
                </h2>

                <p className="text-sm text-gray-500">
                  {b.date} | {b.startTime} - {b.endTime}
                </p>

                <span
                  className={`mt-2 inline-block rounded px-2 py-1 text-xs ${
                    b.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {b.status || "confirmed"}
                </span>
              </div>
            </div>

            {/* CANCEL BUTTON */}
            {b.status !== "cancelled" && (
              <button
                onClick={() => {
                  setSelectedBooking(b);
                  setOpenCancel(true);
                }}
                className="shrink-0 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Cancel
              </button>
            )}

          </div>
        ))}

      </div>

      {/* MODAL */}
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