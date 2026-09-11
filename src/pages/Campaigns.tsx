import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Boxes, AlertTriangle, Mail, Share2, Plus, ArrowRight, X } from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { campaigns, cases } from "../data/mockData";
import { StatusBadge } from "../components/Badges";
import { useToast } from "../components/Toast";

export default function Campaigns() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selected, setSelected] = useState(campaigns[0]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = campaigns.filter((c) => {
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || c.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const relatedCases = cases.filter((c) => selected.relatedCaseIds.includes(c.id));

  return (
    <div className="h-full overflow-y-auto scrollbar-thin px-8 py-7">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Campaign Intelligence</h1>
          <p className="text-slate-500 text-[13.5px] mt-1">Correlated email threats and shared infrastructure</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 bg-accent-blue hover:bg-accent-blueLight text-white text-[13px] font-medium rounded-lg px-4 py-2.5"
        >
          <Plus size={15} /> Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "Active Campaigns", value: campaigns.filter((c) => c.status === "Active").length, icon: Boxes, color: "blue" },
          { label: "High Risk", value: 5, icon: AlertTriangle, color: "red" },
          { label: "Emails Correlated", value: 64, icon: Mail, color: "blue" },
          { label: "Infrastructure Indicators", value: 17, icon: Share2, color: "violet" },
        ].map((s) => (
          <div key={s.label} className="bg-base-panel border border-base-border rounded-xl p-4 flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                s.color === "red" ? "bg-red-500/15 text-red-400" : s.color === "violet" ? "bg-violet-500/15 text-violet-400" : "bg-accent-blue/15 text-accent-blueLight"
              }`}
            >
              <s.icon size={17} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-[12px] text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-base-panel border border-base-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-white">Campaigns ({campaigns.length})</h2>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search campaigns..."
              className="flex-1 bg-base-panel2 border border-base-border rounded-lg px-3 py-2 text-[12.5px] text-slate-200 focus:outline-none focus:border-accent-blue/50"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-base-panel2 border border-base-border rounded-lg px-3 py-2 text-[12.5px] text-slate-300"
            >
              {["All Status", "Active", "Monitoring", "Contained", "Resolved"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-base-border">
                  <th className="py-2 px-2">#</th>
                  <th className="py-2 px-2">Campaign</th>
                  <th className="py-2 px-2">Threat</th>
                  <th className="py-2 px-2 text-right">Emails</th>
                  <th className="py-2 px-2 text-right">Domains</th>
                  <th className="py-2 px-2 text-right">IPs</th>
                  <th className="py-2 px-2">Last Activity</th>
                  <th className="py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`border-b border-base-border last:border-0 cursor-pointer text-[12.5px] ${
                      selected.id === c.id ? "bg-accent-blue/10" : "hover:bg-white/5"
                    }`}
                  >
                    <td className="py-2.5 px-2 text-slate-500">#{c.number}</td>
                    <td className="py-2.5 px-2 text-slate-200">{c.name}</td>
                    <td className="py-2.5 px-2 text-slate-400">{c.threat}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-300">{c.emails}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-300">{c.domains}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-300">{c.ips}</td>
                    <td className="py-2.5 px-2 text-slate-500 whitespace-nowrap">{c.lastActivity}</td>
                    <td className="py-2.5 px-2">
                      <StatusBadge status={c.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-slate-500 mt-3">
            Showing 1–{filtered.length} of {campaigns.length} campaigns
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-base-panel border border-base-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[11px] text-slate-500">CAMPAIGN #{selected.number}</div>
                <div className="text-[15px] font-semibold text-red-400">{selected.name}</div>
              </div>
              <StatusBadge status={selected.status} />
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: "Emails", value: selected.emails },
                { label: "Domains", value: selected.domains },
                { label: "IPs", value: selected.ips },
                { label: "ASNs", value: selected.asns },
              ].map((s) => (
                <div key={s.label} className="bg-base-panel2 border border-base-border rounded-lg p-2 text-center">
                  <div className="text-[15px] font-bold text-white">{s.value}</div>
                  <div className="text-[10px] text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[11.5px] text-slate-500 mb-1">
              <span>First detected: {selected.firstSeen}</span>
            </div>
            <div className="text-[11.5px] text-slate-500">Last activity: {selected.lastActivity}</div>
          </div>

          <div className="bg-base-panel border border-base-border rounded-xl p-5">
            <h3 className="text-[13.5px] font-semibold text-white mb-3">Campaign Activity Timeline</h3>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={selected.timeline}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#131a29", border: "1px solid #26314a", borderRadius: 8, fontSize: 11 }} />
                <Bar dataKey="emails" fill="#2f7bff" radius={[3, 3, 0, 0]} />
                <Bar dataKey="domains" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="ips" fill="#ef4444" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-base-panel border border-base-border rounded-xl p-5">
            <h3 className="text-[13.5px] font-semibold text-white mb-3">Common Indicators</h3>
            <ul className="space-y-1.5">
              {selected.commonIndicators.map((i) => (
                <li key={i} className="text-[12px] text-slate-400 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-500" /> {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-base-panel border border-base-border rounded-xl p-5">
            <h3 className="text-[13.5px] font-semibold text-white mb-3">Related Cases ({relatedCases.length})</h3>
            {relatedCases.length === 0 ? (
              <p className="text-[12px] text-slate-500">No related cases yet.</p>
            ) : (
              <ul className="space-y-2">
                {relatedCases.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => navigate("/cases")}
                      className="w-full flex items-center justify-between text-[12.5px] text-slate-300 hover:text-white"
                    >
                      <span>#{c.id}</span>
                      <StatusBadge status={c.status} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-base-panel border border-base-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13.5px] font-semibold text-white">Campaign Relationship Graph</h3>
              <button
                onClick={() => showToast("Opening full relationship graph…")}
                className="text-[11.5px] text-accent-blueLight font-medium flex items-center gap-1"
              >
                View Full Graph <ArrowRight size={11} />
              </button>
            </div>
            <div className="flex items-center justify-between text-center">
              {[
                { label: "Emails", value: selected.emails, color: "text-red-400" },
                { label: "Domains", value: selected.domains, color: "text-accent-blueLight" },
                { label: "IPs", value: selected.ips, color: "text-blue-300" },
                { label: "ASNs", value: selected.asns, color: "text-emerald-400" },
              ].map((n, i, arr) => (
                <div key={n.label} className="flex items-center">
                  <div>
                    <div className={`text-[13px] font-bold ${n.color}`}>{n.value}</div>
                    <div className="text-[10px] text-slate-500">{n.label}</div>
                  </div>
                  {i < arr.length - 1 && <ArrowRight size={12} className="text-slate-600 mx-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
          <div className="w-full max-w-md bg-base-panel2 border border-base-borderLight rounded-xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-[15px]">Create Campaign</h3>
              <button onClick={() => setShowCreate(false)} className="text-slate-500 hover:text-slate-300">
                <X size={16} />
              </button>
            </div>
            <label className="block text-[12.5px] text-slate-400 mb-1.5">Campaign name</label>
            <input
              placeholder="e.g. Vendor Impersonation Wave"
              className="w-full bg-base-panel border border-base-border rounded-lg px-3.5 py-2.5 text-[13px] text-slate-200 mb-4 focus:outline-none focus:border-accent-blue/50"
            />
            <label className="block text-[12.5px] text-slate-400 mb-1.5">Primary threat type</label>
            <select className="w-full bg-base-panel border border-base-border rounded-lg px-3.5 py-2.5 text-[13px] text-slate-200 mb-5">
              <option>Phishing</option>
              <option>BEC</option>
              <option>Malware</option>
              <option>Impersonation</option>
              <option>Credential Theft</option>
            </select>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg text-[13px] text-slate-300 hover:bg-white/5">
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCreate(false);
                  showToast("Campaign created successfully");
                }}
                className="px-4 py-2 rounded-lg text-[13px] bg-accent-blue text-white font-medium"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
