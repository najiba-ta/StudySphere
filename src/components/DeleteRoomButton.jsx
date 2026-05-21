"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const DeleteRoomButton = ({ roomId, ownerId, currentUserId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    try {
      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        toast.error("Unauthorized");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms-delete/${roomId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (data?.deletedCount > 0) {
        toast.success("Room deleted successfully!");
        router.push("/rooms");
      } else {
        toast.error("Not allowed or failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // safe render check (no hook issue)
  if (ownerId !== currentUserId) return null;

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
                disabled={loading}
                className="w-full bg-red-500 text-white"
                onClick={handleDelete}
              >
                {loading ? "Deleting..." : "Yes Delete"}
              </Button>

              <Button
                disabled={loading}
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