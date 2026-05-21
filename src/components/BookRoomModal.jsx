"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "@heroui/react";
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

  const today = new Date().toISOString().split("T")[0];

  const filteredEndTimes = timeSlots.filter((t) => t > start);

  useEffect(() => {
    if (!start || !end || !room?.hourlyRate) {
      setTotal(0);
      return;
    }

    const startHour = parseInt(start.split(":")[0], 10);
    const endHour = parseInt(end.split(":")[0], 10);
    const rate = Number(room.hourlyRate);

    if (endHour > startHour) {
      setTotal((endHour - startHour) * rate);
    } else {
      setTotal(0);
    }
  }, [start, end, room?.hourlyRate]);

  const handleBooking = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (!date || !start || !end) {
      return toast.error("Please fill all required fields");
    }

    if (new Date(date) < new Date(today)) {
      return toast.error("You cannot book for a past date");
    }

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({
          roomId: room._id,
          userId: session.user.id,
          userName: session.user.name,
          date,
          startTime: start,
          endTime: end,
          totalCost: total,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "This slot is already booked!");
      }

      toast.success("Room booked successfully!");
      setOpen(false);

      setDate("");
      setStart("");
      setEnd("");
      setNote("");
      setTotal(0);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="h-12 w-full rounded-2xl bg-[#BC5F41] text-white font-bold"
      >
        Book Now
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

            <h2 className="text-2xl font-bold mb-4">Book This Room</h2>

            <Input
              label="Booked By"
              value={session?.user?.name || "Guest"}
              readOnly
            />

            <input
              type="date"
              min={today}
              className="mt-4 w-full rounded-lg border p-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <select
              className="mt-4 w-full rounded-lg border p-3"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            >
              <option value="">Start Time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              className="mt-4 w-full rounded-lg border p-3"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            >
              <option value="">End Time</option>
              {filteredEndTimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <textarea
              className="mt-4 w-full min-h-[100px] rounded-lg border p-3"
              placeholder="Special note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <p className="mt-4 text-xl font-bold">
              Total Cost: ৳{total}
            </p>

            <div className="mt-6 flex gap-3">
              <Button onClick={handleBooking} className="w-full bg-[#BC5F41] text-white">
                Confirm Booking
              </Button>
              <Button onClick={() => setOpen(false)} className="w-full bg-gray-200">
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