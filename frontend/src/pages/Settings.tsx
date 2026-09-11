import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, User, Palette, Bell, Shield, Plug, Lock, Cpu, Info } from "lucide-react";
import { currentUser } from "../data/mockData";
import { useToast } from "../components/Toast";

const categories = [
  { id: "Profile", icon: User },
  { id: "Appearance", icon: Palette },
  { id: "Notifications", icon: Bell },
  { id: "Security", icon: Shield },
  { id: "Integrations", icon: Plug },
  { id: "Data & Privacy", icon: Lock },
  { id: "System", icon: Cpu },
  { id: "About", icon: Info },
] as const;

export default function Settings() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [active, setActive] = useState<(typeof categories)[number]["id"]>("Profile");
  const [prefs, setPrefs] = useState({
    preview: true,
    compact: false,
    advanced: true,
    autoRefresh: true,
  });
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
    department: currentUser.department,
    timezone: currentUser.timezone,
    language: currentUser.language,
  });

  function togglePref(key: keyof typeof prefs) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
      <div className="w-full max-w-3xl h-[600px] bg-base-panel border border-base-borderLight rounded-2xl flex overflow-hidden animate-slide-up">
        <div className="w-52 shrink-0 border-r border-base-border py-5 px-3 flex flex-col">
          <h2 className="px-2 text-[15px] font-bold text-white mb-4">Settings</h2>
          {categories.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium text-left mb-0.5 ${
                active === id ? "bg-accent-blue/15 text-white" : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <Icon size={15} /> {id}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-6 py-4 border-b border-base-border">
            <h3 className="text-[15px] font-semibold text-white">{active}</h3>
            <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-300">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5">
            {active === "Profile" && (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Full Name" },
                  { key: "email", label: "Email Address" },
                  { key: "role", label: "Role" },
                  { key: "department", label: "Department" },
                  { key: "timezone", label: "Time Zone" },
                  { key: "language", label: "Language" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-[12px] text-slate-400 mb-1.5">{label}</label>
                    <input
                      value={(profile as any)[key]}
                      onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full bg-base-panel2 border border-base-border rounded-lg px-3.5 py-2.5 text-[13px] text-slate-200 focus:outline-none focus:border-accent-blue/50"
                    />
                  </div>
                ))}
              </div>
            )}

            {active === "Appearance" && (
              <div className="flex flex-col gap-4 max-w-md">
                <ToggleRow
                  label="Show email preview in lists"
                  checked={prefs.preview}
                  onChange={() => togglePref("preview")}
                />
                <ToggleRow
                  label="Compact view"
                  checked={prefs.compact}
                  onChange={() => togglePref("compact")}
                />
                <ToggleRow
                  label="Enable advanced threat indicators"
                  checked={prefs.advanced}
                  onChange={() => togglePref("advanced")}
                />
                <ToggleRow
                  label="Auto-refresh data"
                  checked={prefs.autoRefresh}
                  onChange={() => togglePref("autoRefresh")}
                />
              </div>
            )}

            {active === "Notifications" && (
              <div className="flex flex-col gap-4 max-w-md">
                <ToggleRow label="Critical alert emails" checked={true} onChange={() => {}} />
                <ToggleRow label="Daily digest" checked={true} onChange={() => {}} />
                <ToggleRow label="Desktop push notifications" checked={false} onChange={() => {}} />
              </div>
            )}

            {active === "Security" && (
              <div className="flex flex-col gap-3 max-w-md text-[13px] text-slate-300">
                <button className="text-left border border-base-border rounded-lg px-4 py-3 hover:bg-white/5">
                  Change password
                </button>
                <button className="text-left border border-base-border rounded-lg px-4 py-3 hover:bg-white/5">
                  Enable two-factor authentication
                </button>
                <button className="text-left border border-base-border rounded-lg px-4 py-3 hover:bg-white/5">
                  View active sessions
                </button>
              </div>
            )}

            {active === "Integrations" && (
              <div className="flex flex-col gap-3 max-w-md">
                {["Microsoft 365", "Google Workspace", "Slack", "Jira"].map((i) => (
                  <div key={i} className="flex items-center justify-between border border-base-border rounded-lg px-4 py-3">
                    <span className="text-[13px] text-slate-200">{i}</span>
                    <span className="text-[11px] text-slate-500">Not connected</span>
                  </div>
                ))}
              </div>
            )}

            {active === "Data & Privacy" && (
              <div className="max-w-md flex flex-col gap-3">
                <ToggleRow label="Retain evidence for 12 months" checked={true} onChange={() => {}} />
                <button className="text-left border border-base-border rounded-lg px-4 py-3 text-[13px] text-slate-300 hover:bg-white/5">
                  Export all account data
                </button>
              </div>
            )}

            {active === "System" && (
              <div className="max-w-md text-[13px] text-slate-400 space-y-2">
                <p>Scan latency: ~1.2s average</p>
                <p>Data retention: 12 months</p>
                <p>API status: Operational</p>
              </div>
            )}

            {active === "About" && (
              <div className="max-w-md text-[13px] text-slate-400 space-y-2">
                <p className="text-white font-semibold text-[14px]">IRIS v1.0.0</p>
                <p>Intelligent Risk Identification System.</p>
                <p className="text-slate-500">© 2026 IRIS Security</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-base-border">
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg text-[13px] text-slate-300 hover:bg-white/5">
              Cancel
            </button>
            <button
              onClick={() => {
                showToast("Settings saved successfully");
                navigate(-1);
              }}
              className="px-4 py-2 rounded-lg text-[13px] bg-accent-blue hover:bg-accent-blueLight text-white font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-[13px] text-slate-300">{label}</span>
      <button
        type="button"
        onClick={onChange}
        className={`w-10 h-5.5 rounded-full relative transition-colors ${checked ? "bg-accent-blue" : "bg-base-border"}`}
        style={{ height: 22, width: 40 }}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-[19px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}
