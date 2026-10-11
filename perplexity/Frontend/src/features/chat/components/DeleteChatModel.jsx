import React from "react";
import { Trash2 } from "lucide-react";

const DeleteChatModel = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1b1c24] p-6 shadow-2xl">
        <div className="mb-4 h-12 w-12 flex items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <Trash2 size={24} />
        </div>

        <h2 className="text-xl font-semibold text-white">Delete chat?</h2>

        <p className="mt-2 text-sm leading-6 text-white/60">
          Are you sure you want to delete this conversation? This action cannot
          be undone.
        </p>

       <div className="mt-6 flex justify-end gap-3">
        <button
        type="button"
        onClick={onClose}
        className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >Cancel</button>

        <button
        type="button"
        onClick={onConfirm}
        className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >Delete</button>
       </div>
      </div>
    </div>
  );
};

export default DeleteChatModel;
