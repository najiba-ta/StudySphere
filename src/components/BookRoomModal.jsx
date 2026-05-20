"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const timeSlots = [
  "08:00","09:00","10:00","11:00","12:00","13:00",
  "14:00","15:00","16:00","17:00","18:00","19:00","20:00",
];

const BookRoomModal = ({ room }) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [note, setNote] = useState("");
  const [total, setTotal] = useState(0);

  // safer end filtering
  const filteredEndTimes = timeSlots.filter((t) => {
    if (!start) return false;
    return parseInt(t) > parseInt(start);
  });

  // ✅ FIXED TOTAL CALCULATION (MAIN BUG FIX)
  useEffect(() => {
    if (!start || !end || !room?.hourlyRate) {
      setTotal(0);
      return;
    }

    const startHour = parseInt(start.split(":")[0]);
    const endHour = parseInt(end.split(":")[0]);
    const rate = Number(room.hourlyRate);

    if (
      isNaN(startHour) ||
      isNaN(endHour) ||
      isNaN(rate)
    ) {
      setTotal(0);
      return;
    }

    if (endHour <= startHour) {
      setTotal(0);
      return;
    }

    const hours = endHour - startHour;
    setTotal(hours * rate);
  }, [start, end, room]);

  const handleBooking = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (!date || !start || !end) {
      return toast.error("Fill all required fields");
    }

    const startHour = parseInt(start.split(":")[0]);
    const endHour = parseInt(end.split(":")[0]);

    if (endHour <= startHour) {
      return toast.error("End time must be after start time");
    }

    try {
      const res = await fetch("http://localhost:8000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: room._id,
          userId: session.user.id,
          date,
          startTime: start,
          endTime: end,
          totalCost: total,
          note,
        }),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Room booked successfully!");
        setOpen(false);
        setDate("");
        setStart("");
        setEnd("");
        setNote("");
        setTotal(0);
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }
  };

  return (
    <>
      {/* OPEN BUTTON */}
      <Button
        onClick={() => setOpen(true)}
        className="h-12 w-full rounded-2xl bg-[#BC5F41] text-white"
      >
        Book Now
      </Button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-lg rounded-2xl bg-white p-6">

            <h2 className="text-xl font-bold text-[#3C0906]">
              Book This Room
            </h2>

            {/* DATE */}
            <input
              type="date"
              className="mt-4 w-full rounded-lg border p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {/* START */}
            <select
              className="mt-4 w-full rounded-lg border p-2"
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
                setEnd(""); // reset end when start changes
              }}
            >
              <option value="">Start Time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* END */}
            <select
              className="mt-4 w-full rounded-lg border p-2"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            >
              <option value="">End Time</option>
              {filteredEndTimes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* NOTE */}
            <textarea
              className="mt-4 w-full rounded-lg border p-2"
              placeholder="Special note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {/* TOTAL */}
            <p className="mt-3 font-semibold text-[#3C0906]">
              Total Cost: ৳{total}
            </p>

            {/* ACTIONS */}
            <div className="mt-5 flex gap-3">
              <Button
                onClick={handleBooking}
                className="w-full bg-[#BC5F41] text-white"
              >
                Confirm Booking
              </Button>

              <Button
                onClick={() => setOpen(false)}
                className="w-full bg-gray-200"
              >
                Cancel
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default BookRoomModal;