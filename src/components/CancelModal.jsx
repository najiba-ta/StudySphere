"use client";

import { Button } from "@heroui/react";

const CancelBooking = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-md rounded-2xl bg-white p-6">

        <h2 className="text-xl font-bold text-gray-800">
          Cancel Booking?
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to cancel this booking?
        </p>

        <div className="mt-5 flex gap-3">
          <Button
            onClick={onConfirm}
            className="w-full bg-red-500 text-white"
          >
            Yes, Cancel
          </Button>

          <Button
            onClick={onClose}
            className="w-full bg-gray-200"
          >
            No
          </Button>
        </div>

      </div>
    </div>
  );
};export default CancelBooking;