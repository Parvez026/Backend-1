import { ArrowLeft, SettingsIcon } from "lucide-react";

const Settings = ({ onBack }) => {
  return (
    <div className="h-full min-h-0 overflow-y-auto p-6 text-white bg-[#13141a]">
      <button
        onClick={onBack}
        className="flex items-center mb-5 gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        <ArrowLeft size={20} />
        Back to Chat
      </button>
      <div className="flex items-center gap-3 mb-8">
        <div className="rounded-xl bg-violet-600/20 p-3">
          <SettingsIcon size={24} className="text-violet-400" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Setting</h1>
          <p className="mt-1 text-sm text-white/50">
            Manage your ZentraAI preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
