import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  X,
  Circle,
  Mail,
  Folder,
  Boxes,
  FileSearch,
} from "lucide-react";
import { alerts, currentUser } from "../data/mockData";
import { globalSearch, type SearchResult } from "../utils/search";
import { useTheme } from "./ThemeContext";

const typeIcon: Record<SearchResult["type"], ReactElement> = {
  Email: <Mail size={14} />,
  Case: <Folder size={14} />,
  Campaign: <Boxes size={14} />,
  Investigation: <FileSearch size={14} />,
  Domain: <Search size={14} />,
  IP: <Search size={14} />,
};

export default function TopBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const results = globalSearch(query);
  const unresolvedAlerts = alerts.filter((a) => a.status === "Unresolved");

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleResultClick(r: SearchResult) {
    navigate(r.path);
    setQuery("");
    setShowResults(false);
  }

  return (
    <header className="h-[68px] shrink-0 border-b border-base-border bg-base-panel flex items-center gap-4 px-6">
      <div ref={searchRef} className="relative flex-1 max-w-2xl">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Search emails, domains, IPs, cases, campaigns, hashes..."
          aria-label="Global search"
          className="w-full bg-base-panel2 border border-base-border rounded-lg pl-10 pr-10 py-2.5 text-[13px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setShowResults(false);
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
          >
            <X size={15} />
          </button>
        )}
        {showResults && query && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-base-panel2 border border-base-borderLight rounded-lg shadow-elevated overflow-hidden z-50 animate-fade-in">
            {results.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-slate-500">
                No matching results for "{query}"
              </div>
            ) : (
              <ul className="max-h-80 overflow-y-auto scrollbar-thin">
                {results.map((r, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleResultClick(r)}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center gap-3 border-b border-base-border last:border-0"
                    >
                      <span className="text-accent-blueLight">{typeIcon[r.type]}</span>
                      <span className="flex-1 min-w-0">
                        <div className="text-sm text-slate-200 truncate">{r.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{r.subtitle}</div>
                      </span>
                      <span className="text-[10px] uppercase tracking-wide text-slate-500 shrink-0">
                        {r.type}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 bg-base-panel2 border border-base-border rounded-lg p-1 no-invert">
        <button
          onClick={() => setTheme("light")}
          aria-label="Light theme"
          className={`p-1.5 rounded-md ${!isDark ? "bg-amber-500/20 text-amber-400" : "text-slate-500 hover:text-slate-300"}`}
        >
          <Sun size={15} />
        </button>
        <button
          onClick={() => setTheme("dark")}
          aria-label="Dark theme"
          className={`p-1.5 rounded-md ${isDark ? "bg-accent-blue/20 text-accent-blueLight" : "text-slate-500 hover:text-slate-300"}`}
        >
          <Moon size={15} />
        </button>
      </div>

      <div ref={notifRef} className="relative">
        <button
          onClick={() => setShowNotifications((s) => !s)}
          aria-label="Notifications"
          className="relative p-2.5 rounded-lg bg-base-panel2 border border-base-border text-slate-400 hover:text-slate-200"
        >
          <Bell size={16} />
          {unresolvedAlerts.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-base-panel">
              {unresolvedAlerts.length}
            </span>
          )}
        </button>
        {showNotifications && (
          <div className="absolute top-full mt-2 right-0 w-96 bg-base-panel2 border border-base-borderLight rounded-lg shadow-elevated z-50 animate-fade-in">
            <div className="px-4 py-3 border-b border-base-border flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-200">Notifications</span>
              <span className="text-[11px] text-slate-500">{unresolvedAlerts.length} unresolved</span>
            </div>
            <ul className="max-h-80 overflow-y-auto scrollbar-thin">
              {unresolvedAlerts.map((a) => (
                <li key={a.id} className="border-b border-base-border last:border-0">
                  <button
                    onClick={() => {
                      navigate("/alerts");
                      setShowNotifications(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          a.severity === "Critical" || a.severity === "High"
                            ? "bg-red-400"
                            : "bg-amber-400"
                        }`}
                      />
                      <span className="text-[13px] font-medium text-slate-200 flex-1">{a.title}</span>
                    </div>
                    <p className="text-[11.5px] text-slate-500 pl-3.5">{a.timeAgo}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25">
        <Circle size={8} className="fill-emerald-400 text-emerald-400" />
        <div className="leading-tight">
          <div className="text-[12px] font-semibold text-emerald-400">Monitoring Active</div>
          <div className="text-[10.5px] text-emerald-400/60">Real-time analysis</div>
        </div>
      </div>

      <div ref={profileRef} className="relative">
        <button
          onClick={() => setShowProfile((s) => !s)}
          className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-white/5"
        >
          <div className="w-8 h-8 rounded-full bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center text-[12px] font-bold text-accent-blueLight">
            {currentUser.initials}
          </div>
          <span className="text-[13px] text-slate-300 font-medium">{currentUser.name}</span>
          <ChevronDown size={14} className="text-slate-500" />
        </button>
        {showProfile && (
          <div className="absolute top-full mt-2 right-0 w-56 bg-base-panel2 border border-base-borderLight rounded-lg shadow-elevated z-50 animate-fade-in overflow-hidden">
            <div className="px-4 py-3 border-b border-base-border">
              <div className="text-sm font-semibold text-slate-200">{currentUser.name}</div>
              <div className="text-[11.5px] text-slate-500">{currentUser.email}</div>
            </div>
            <button
              onClick={() => {
                navigate("/settings");
                setShowProfile(false);
              }}
              className="w-full text-left px-4 py-2.5 text-[13px] text-slate-300 hover:bg-white/5"
            >
              Settings
            </button>
            <button
              onClick={() => {
                navigate("/login");
                setShowProfile(false);
              }}
              className="w-full text-left px-4 py-2.5 text-[13px] text-slate-300 hover:bg-white/5 border-t border-base-border"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
