"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const DeleteRoomButton = ({ roomId, ownerId }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:8000/rooms/${roomId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: session?.user?.id,
      }),
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      toast.success("Room deleted successfully!");
      router.push("/rooms");
    } else {
      toast.error("Not allowed or failed");
    }

    setOpen(false);
  };

  // ownership check inside component
  if (ownerId !== session?.user?.id) return null;

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="h-12 w-full rounded-2xl bg-red-500 text-sm font-medium text-white hover:bg-red-600"
      >
        Delete Room
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6">

            <h2 className="text-xl font-bold">Delete Room?</h2>
            <p className="mt-2 text-sm text-gray-600">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <Button
                className="w-full bg-red-500 text-white"
                onClick={handleDelete}
              >
                Yes Delete
              </Button>

              <Button
                className="w-full bg-gray-200"
                onClick={() => setOpen(false)}
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

export default DeleteRoomButton;