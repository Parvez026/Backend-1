import { Sun } from "lucide-react";
import React from "react";

const ToggleTheme = () => {
  return (
    <button
      className="rounded-lg p-2 border border-white/10 text-white/80 transition hover:bg-white/10"
      title="Toggle theme"
    >
      <Sun size={20} />
    </button>
  );
};

export default ToggleTheme;
