import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  AlertTriangle,
  Folder,
  Boxes,
  ChevronDown,
  ArrowRight,
  CalendarDays,
  X,
  ExternalLink,
  Paperclip,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { alerts, emails } from "../data/mockData";

const chartData = {
  "24h": [
    { label: "00:00", value: 4 }, { label: "04:00", value: 2 }, { label: "08:00", value: 9 },
    { label: "12:00", value: 14 }, { label: "16:00", value: 11 }, { label: "20:00", value: 18 },
  ],
  "7d": [
    { label: "30 Aug", value: 10 }, { label: "31 Aug", value: 38 }, { label: "01 Sep", value: 26 },
    { label: "02 Sep", value: 44 }, { label: "03 Sep", value: 68 }, { label: "04 Sep", value: 60 },
    { label: "05 Sep", value: 102 },
  ],
  "30d": [
    { label: "Wk 1", value: 210 }, { label: "Wk 2", value: 260 }, { label: "Wk 3", value: 190 },
    { label: "Wk 4", value: 320 },
  ],
};

const threatBreakdown = [
  { label: "Phishing", value: 42, pct: 33, color: "#ef4444" },
  { label: "Impersonation", value: 28, pct: 22, color: "#f59e0b" },
  { label: "BEC", value: 18, pct: 14, color: "#3b82f6" },
  { label: "Malicious Links", value: 24, pct: 19, color: "#8b5cf6" },
  { label: "Malware", value: 15, pct: 12, color: "#22c55e" },
];

const dateOptions = ["05 Sep 2026", "04 Sep 2026", "03 Sep 2026"];

function riskClass(risk: string) {
  if (risk === "High" || risk === "Critical") return "text-red-400 bg-red-500/10 border-red-500/20";
  if (risk === "Medium") return "text-amber-400 bg-amber-500/10 border-amber-500/20";
  return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
}

export default function Overview() {
  const navigate = useNavigate();
  const [range, setRange] = useState<"24h" | "7d" | "30d">("7d");
  const [selectedDate, setSelectedDate] = useState("05 Sep 2026");
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<(typeof emails)[number] | null>(null);

  const unresolvedAlerts = alerts.filter((a) => a.status === "Unresolved");
  const recentEmails = emails.slice(0, 5);

  return (
    <div className="h-full overflow-hidden px-4 xl:px-5 py-3 flex flex-col min-h-0 gap-2">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0 h-[clamp(50px,7vh,64px)]">
        <div>
          <h1 className="text-[clamp(20px,2.2vh,27px)] font-bold text-white leading-tight">Good morning, Analyst</h1>
          <p className="text-slate-500 text-[12px] mt-1">Email Security Overview <span className="mx-1">•</span> Last 24 hours</p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-2 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-lg">
            Live Monitoring <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </span>
          <div className="relative">
            <button onClick={() => setShowDateMenu((v) => !v)} className="h-9 flex items-center gap-2 text-[11px] text-slate-300 bg-base-panel2 border border-base-border px-3 rounded-lg">
              <CalendarDays size={14} /><span>{selectedDate}</span><ChevronDown size={13} />
            </button>
            {showDateMenu && (
              <div className="absolute right-0 top-full mt-2 z-40 min-w-[180px] rounded-lg border border-base-borderLight bg-base-panel2 p-1.5 shadow-elevated">
                {dateOptions.map((date) => (
                  <button key={date} onClick={() => { setSelectedDate(date); setShowDateMenu(false); }} className={`w-full text-left px-3 py-2 rounded-md text-[12px] ${selectedDate === date ? "bg-accent-blue/15 text-accent-blueLight" : "text-slate-300 hover:bg-white/5"}`}>
                    {date}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exact rectangular hero from the supplied reference */}
      <section className="relative overflow-hidden rounded-xl shrink-0 h-[clamp(145px,19vh,182px)]">
        <img src="/hero-full.png" alt="Protected Today, Safer Tomorrow" className="absolute inset-0 w-full h-full object-fill block" draggable={false} />
      </section>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-3 shrink-0 h-[clamp(82px,11vh,104px)]">
        {[
          { icon: Mail, label: "Emails Scanned", value: "12,482", delta: "+8.2%", tone: "blue" },
          { icon: AlertTriangle, label: "Threats Detected", value: "127", delta: "+12 today", tone: "red" },
          { icon: Folder, label: "Active Cases", value: "24", delta: "3 new", tone: "blue" },
          { icon: Boxes, label: "Active Campaigns", value: "8", delta: "2 new", tone: "violet" },
        ].map(({ icon: Icon, label, value, delta, tone }) => (
          <div key={label} className="relative rounded-xl border border-base-border bg-base-panel2 px-3 py-2.5 overflow-hidden flex items-start">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${tone === "red" ? "bg-red-500/10 text-red-400" : tone === "violet" ? "bg-violet-500/10 text-violet-400" : "bg-accent-blue/10 text-accent-blueLight"}`}>
              <Icon size={24} />
            </div>
            <div className="ml-3 min-w-0">
              <div className="text-[11.5px] text-slate-300 truncate">{label}</div>
              <div className="text-[21px] font-bold text-white leading-none mt-1">{value}</div>
              <div className={`text-[11px] font-medium mt-1 ${tone === "red" ? "text-red-400" : tone === "violet" ? "text-violet-400" : "text-emerald-400"}`}>↑ {delta}</div>
            </div>
            <div className={`absolute right-2 bottom-2 w-16 h-7 ${tone === "red" ? "text-red-400" : tone === "violet" ? "text-violet-400" : "text-accent-blue"}`}>
              <svg viewBox="0 0 80 32" className="w-full h-full"><path d="M1 26 C12 24, 17 15, 25 20 S38 27, 47 14 S59 12, 79 3" fill="none" stroke="currentColor" strokeWidth="2.2" /></svg>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-3 gap-3 shrink-0 h-[clamp(185px,25vh,228px)] min-h-0">
        <div className="col-span-2 bg-base-panel border border-base-border rounded-xl p-3.5 min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[15px] font-semibold text-white">Threat Activity</h2>
            <div className="flex items-center gap-1 bg-base-panel2 border border-base-border rounded-lg p-1">
              {(["24h", "7d", "30d"] as const).map((r) => <button key={r} onClick={() => setRange(r)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${range === r ? "bg-accent-blue text-white" : "text-slate-400 hover:text-slate-200"}`}>{r}</button>)}
            </div>
          </div>
          <div className="h-[calc(100%-34px)] min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData[range]} margin={{ top: 4, right: 6, left: -18, bottom: 0 }}>
                <defs><linearGradient id="overviewThreatArea" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2f7bff" stopOpacity={0.42} /><stop offset="95%" stopColor="#2f7bff" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#17304a" vertical /><XAxis dataKey="label" stroke="#718198" fontSize={9.5} tickLine={false} axisLine={false} /><YAxis stroke="#718198" fontSize={9.5} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ background: "#131a29", border: "1px solid #26314a", borderRadius: 8, fontSize: 12 }} labelStyle={{ color: "#e5e9f2" }} /><Area type="monotone" dataKey="value" stroke="#2f7bff" strokeWidth={2.2} fill="url(#overviewThreatArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-base-panel border border-base-border rounded-xl p-3.5 min-h-0 overflow-hidden">
          <h2 className="text-[15px] font-semibold text-white mb-2">Threat Breakdown</h2>
          <div className="flex items-center gap-3 h-[calc(100%-26px)]">
            <div className="relative w-[clamp(104px,9vw,132px)] h-[clamp(104px,9vw,132px)] rounded-full flex items-center justify-center shrink-0" style={{ background: `conic-gradient(${threatBreakdown.map((t, i) => { const start = threatBreakdown.slice(0, i).reduce((a, b) => a + b.pct, 0); return `${t.color} ${start}% ${start + t.pct}%`; }).join(", ")})` }}>
              <div className="w-[64%] h-[64%] rounded-full bg-base-panel flex flex-col items-center justify-center"><span className="text-[24px] font-bold text-white">127</span><span className="text-[9px] text-slate-500">Threats</span></div>
            </div>
            <div className="flex flex-col gap-1.5 min-w-0 flex-1">
              {threatBreakdown.map((t) => <div key={t.label} className="flex items-center gap-2 text-[10.5px]"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} /><span className="text-slate-300 flex-1 truncate">{t.label}</span><span className="text-slate-500 whitespace-nowrap">{t.value} ({t.pct}%)</span></div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts — always visible */}
      <div className="bg-base-panel border border-red-500/30 rounded-xl px-3 py-2 shrink-0 h-[clamp(114px,14vh,150px)] overflow-hidden">
        <div className="flex items-center justify-between h-7 mb-1">
          <h2 className="text-[15px] font-semibold text-white flex items-center gap-2"><span className="w-7 h-7 rounded-md bg-red-500/15 flex items-center justify-center"><AlertTriangle size={15} className="text-red-400" /></span> Critical Alerts ({unresolvedAlerts.length})</h2>
          <button onClick={() => navigate("/alerts")} className="text-[11.5px] text-accent-blueLight font-medium flex items-center gap-2">View All Alerts <span className="rounded-md bg-amber-400 text-slate-950 px-2 py-1 font-bold">{unresolvedAlerts.length}</span><ArrowRight size={12} /></button>
        </div>
        <div className="grid grid-cols-3 gap-2.5 h-[calc(100%-32px)]">
          {unresolvedAlerts.slice(0, 3).map((a) => (
            <div key={a.id} className={`rounded-lg border p-2.5 flex flex-col min-w-0 ${a.severity === "Critical" || a.severity === "High" ? "border-red-500/30 bg-red-500/5" : "border-amber-500/30 bg-amber-500/5"}`}>
              <div className="flex items-center gap-2 min-w-0"><span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${a.severity === "Critical" || a.severity === "High" ? "bg-red-500 text-white" : "bg-amber-400 text-slate-950"}`}><AlertTriangle size={13} /></span><span className={`text-[11.5px] font-semibold truncate ${a.severity === "Critical" || a.severity === "High" ? "text-red-400" : "text-amber-400"}`}>{a.title}</span></div>
              <p className="text-[10.5px] text-slate-400 truncate mt-1">{a.description}</p>
              <div className="text-[9.5px] text-slate-600 mt-0.5">{a.timeAgo}</div>
              <div className="mt-auto flex items-center gap-1.5"><span className="text-[9px] bg-white/5 text-slate-300 rounded-full px-2 py-1">{a.title.toLowerCase().includes("impersonation") ? "Impersonation" : a.title.toLowerCase().includes("credential") ? "Credential Theft" : "Phishing"}</span><span className={`text-[9px] rounded-full px-2 py-1 ${a.severity === "Critical" || a.severity === "High" ? "bg-red-500/15 text-red-400" : "bg-amber-500/15 text-amber-400"}`}>{a.severity === "Critical" ? "Critical" : a.severity === "High" ? "High Risk" : "Medium Risk"}</span><button onClick={() => navigate("/alerts")} className="ml-auto text-[9.5px] bg-white/5 hover:bg-white/10 text-slate-200 rounded-md px-2 py-1 flex items-center gap-1">Investigate <ArrowRight size={10} /></button></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Emails — compact reference-style bar, always visible */}
      <div className="bg-base-panel border border-base-border rounded-xl h-[46px] shrink-0 overflow-hidden">
        <button onClick={() => navigate("/inbox")} className="w-full h-full px-3 flex items-center gap-3 text-left hover:bg-white/[.025]">
          <span className="w-8 h-8 rounded-md bg-accent-blue/10 text-accent-blueLight flex items-center justify-center"><Mail size={18} /></span>
          <span className="text-[15px] font-semibold text-white">Recent Emails ({recentEmails.length})</span>
          <span className="ml-auto rounded-md bg-accent-blue text-white px-2.5 py-1 text-[11px] font-bold">{recentEmails.length}</span>
          <ArrowRight size={15} className="text-slate-400" />
        </button>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedEmail(null); }}>
          <div className="w-full max-w-2xl max-h-[82vh] overflow-hidden rounded-2xl border border-base-borderLight bg-base-panel shadow-elevated">
            <div className="px-5 py-4 border-b border-base-border flex items-start justify-between gap-4">
              <div className="min-w-0"><div className="text-[11px] uppercase tracking-wider text-accent-blueLight font-semibold mb-1">Email Preview</div><h3 className="text-lg font-semibold text-white truncate">{selectedEmail.subject}</h3><p className="text-[12px] text-slate-500 mt-1">{selectedEmail.from} · {selectedEmail.receivedLabel}</p></div>
              <button onClick={() => setSelectedEmail(null)} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-5 overflow-y-auto max-h-[58vh]">
              <div className="flex flex-wrap items-center gap-2 mb-5"><span className={`border rounded-md px-2.5 py-1 text-[10px] font-semibold ${riskClass(selectedEmail.riskLevel)}`}>{selectedEmail.riskLevel} Risk</span></div>
              <div className="grid grid-cols-2 gap-3 mb-5"><div className="rounded-lg border border-base-border bg-base-panel2 p-3"><div className="text-[10px] uppercase text-slate-600 mb-1">Sender</div><div className="text-[12px] text-slate-200 break-all">{selectedEmail.from}</div></div><div className="rounded-lg border border-base-border bg-base-panel2 p-3"><div className="text-[10px] uppercase text-slate-600 mb-1">Received</div><div className="text-[12px] text-slate-200">{selectedEmail.receivedLabel}</div></div></div>
              <div className="rounded-xl border border-base-border bg-base-panel2 p-4"><div className="text-[10px] uppercase tracking-wider text-slate-600 mb-2">Message Summary</div><p className="text-[13px] leading-6 text-slate-300">{selectedEmail.summary}</p>{selectedEmail.indicators?.length ? <div className="mt-4 pt-4 border-t border-base-border"><div className="text-[11px] text-slate-500 mb-2">Threat Indicators</div><ul className="space-y-1.5">{selectedEmail.indicators.slice(0, 3).map((indicator) => <li key={indicator} className="text-[12px] text-slate-300 flex gap-2"><span className="text-red-400">•</span><span>{indicator}</span></li>)}</ul></div> : null}{selectedEmail.hasAttachment && selectedEmail.attachmentName ? <div className="mt-4 pt-4 border-t border-base-border"><div className="text-[11px] text-slate-500 mb-2 flex items-center gap-2"><Paperclip size={13} /> Attachment</div><div className="text-[12px] text-slate-300">{selectedEmail.attachmentName}</div></div> : null}</div>
            </div>
            <div className="px-5 py-4 border-t border-base-border flex justify-end gap-2"><button onClick={() => setSelectedEmail(null)} className="px-3 py-2 rounded-lg border border-base-border text-[12px] text-slate-300 hover:bg-white/5">Close</button><button onClick={() => navigate("/inbox")} className="px-3 py-2 rounded-lg bg-accent-blue text-white text-[12px] font-medium flex items-center gap-2">Open in Inbox <ExternalLink size={13} /></button></div>
          </div>
        </div>
      )}
    </div>
  );
}
