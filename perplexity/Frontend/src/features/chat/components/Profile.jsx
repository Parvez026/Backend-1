import { LogOut } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const username = user?.username || "user";
  const initial = username.charAt(0).toUpperCase();

  const logout = async () => {
    await handleLogout();
  };
  return (
    <div className="mt-auto border-t border-white/20 relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 rounded-2xl text-left hover:bg-white/10 p-2"
      >
        <div className="h-10 w-10 rounded-full bg-violet-600 flex items-center justify-center font-semibold">
          {initial}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{username || "user"}</p>
          <p className="text-xs text-white/50">Personal account</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 z-50 mb-2 w-full rounded-xl border border-white/15 bg-[#1d1d1fea] p-3 shadow-xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-2 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm text-white">{username}</p>
              <p className="truncate text-xs text-white/50">
                {user?.email || "No email available"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full rounded-lg mt-2 px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
