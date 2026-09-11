import { useState } from "react";
import { Search } from "lucide-react";
import { investigations } from "../data/mockData";
import { SeverityBadge, StatusBadge } from "../components/Badges";
import { useToast } from "../components/Toast";

export default function Investigations() {
  const { showToast } = useToast();
  const [query, setQuery] = useState("");

  const filtered = investigations.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.id.toLowerCase().includes(query.toLowerCase())
  );

  const active = investigations.filter((i) => i.status === "Active").length;
  const inProgress = investigations.filter((i) => i.status === "Investigating").length;

  return (
    <div className="h-full overflow-y-auto scrollbar-thin px-8 py-7">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-white">Investigations</h1>
        <p className="text-slate-500 text-[13.5px] mt-1">Analyze and correlate threat intelligence</p>
      </div>

      <div className="relative mb-5 max-w-lg">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search investigations, emails, domains, IPs..."
          className="w-full bg-base-panel2 border border-base-border rounded-lg pl-10 pr-4 py-2.5 text-[13px] text-slate-200 focus:outline-none focus:border-accent-blue/50"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-base-panel border border-base-border rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{investigations.length}</div>
          <div className="text-[12.5px] text-slate-500">Active Investigations</div>
        </div>
        <div className="bg-base-panel border border-base-border rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{active}</div>
          <div className="text-[12.5px] text-slate-500">Recent Investigations</div>
        </div>
        <div className="bg-base-panel border border-base-border rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{inProgress}</div>
          <div className="text-[12.5px] text-slate-500">Investigation Status: In Progress</div>
        </div>
      </div>

      <div className="bg-base-panel border border-base-border rounded-xl p-5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-base-border">
              <th className="py-2.5 px-2">Investigation ID</th>
              <th className="py-2.5 px-2">Title</th>
              <th className="py-2.5 px-2">Primary Threat</th>
              <th className="py-2.5 px-2">Severity</th>
              <th className="py-2.5 px-2">Entities</th>
              <th className="py-2.5 px-2">Analyst</th>
              <th className="py-2.5 px-2">Status</th>
              <th className="py-2.5 px-2">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv) => (
              <tr
                key={inv.id}
                onClick={() => showToast(`Opening investigation workspace for ${inv.id}`)}
                className="border-b border-base-border last:border-0 cursor-pointer hover:bg-white/5 text-[12.5px]"
              >
                <td className="py-3 px-2 text-slate-400 whitespace-nowrap">{inv.id}</td>
                <td className="py-3 px-2 text-slate-200 font-medium">{inv.title}</td>
                <td className="py-3 px-2 text-slate-400">{inv.primaryThreat}</td>
                <td className="py-3 px-2">
                  <SeverityBadge severity={inv.severity} />
                </td>
                <td className="py-3 px-2 text-slate-500 whitespace-nowrap">{inv.entities}</td>
                <td className="py-3 px-2 text-slate-400 whitespace-nowrap">{inv.analyst}</td>
                <td className="py-3 px-2">
                  <StatusBadge status={inv.status} />
                </td>
                <td className="py-3 px-2 text-slate-500 whitespace-nowrap">{inv.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
