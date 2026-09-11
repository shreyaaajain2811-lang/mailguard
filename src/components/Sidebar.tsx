import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Mail,
  AlertTriangle,
  Search,
  Boxes,
  Folder,
  FileText,
  Settings,
} from "lucide-react";
import { alerts } from "../data/mockData";

const navItems = [
  { to: "/overview", label: "Overview", icon: LayoutGrid },
  { to: "/inbox", label: "Inbox", icon: Mail },
  { to: "/alerts", label: "Alerts", icon: AlertTriangle, badge: true },
  { to: "/investigations", label: "Investigations", icon: Search },
  { to: "/campaigns", label: "Campaigns", icon: Boxes },
  { to: "/cases", label: "Cases", icon: Folder },
  { to: "/reports", label: "Reports", icon: FileText },
];

export default function Sidebar() {
  const unresolvedAlerts = alerts.filter((a) => a.status === "Unresolved").length;

  return (
    <aside className="w-[220px] shrink-0 h-full bg-base-panel border-r border-base-border flex flex-col">
      <div className="px-5 py-5 flex items-center gap-2.5 border-b border-base-border">
        <div className="w-10 h-10 rounded-lg bg-black overflow-hidden shrink-0">
          <img src="iris-logo.jpg" alt="IRIS" className="w-full h-full object-cover" />
        </div>
        <div className="leading-tight">
          <div className="text-[15px] font-bold text-white tracking-tight">IRIS</div>
          <div className="text-[10.5px] text-slate-500">Intelligent Risk Identification System</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto scrollbar-thin">
        {navItems.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                isActive
                  ? "bg-accent-blue/15 text-white border border-accent-blue/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? "text-accent-blueLight" : ""} />
                <span className="flex-1">{label}</span>
                {badge && unresolvedAlerts > 0 && (
                  <span className="text-[11px] font-semibold bg-red-500/90 text-white rounded-full px-1.5 min-w-[20px] text-center leading-5">
                    {unresolvedAlerts}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}

        <div className="h-px bg-base-border my-3" />

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
              isActive
                ? "bg-accent-blue/15 text-white border border-accent-blue/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
            }`
          }
        >
          <Settings size={17} />
          Settings
        </NavLink>
      </nav>

      <div className="mx-3 mb-3 p-4 rounded-xl bg-base-panel2 border border-base-border">
        <p className="text-[13px] font-semibold text-slate-200 leading-snug">
          Safer Emails.
          <br />
          Stronger Investigations.
        </p>
        <div className="h-px bg-base-border my-3" />
        <p className="text-[11px] text-slate-500">IRIS</p>
        <p className="text-[11px] text-slate-600">v1.0.0</p>
      </div>
    </aside>
  );
}
