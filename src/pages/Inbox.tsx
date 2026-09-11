import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Paperclip, X, ShieldAlert } from "lucide-react";
import { emails } from "../data/mockData";
import { RiskBadge } from "../components/Badges";
import { useToast } from "../components/Toast";
import type { EmailRecord } from "../types";

const tabs = ["All", "Unread", "Threats", "Suspicious", "Safe"] as const;
type Tab = (typeof tabs)[number];

export default function Inbox() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<EmailRecord | null>(emails[0]);
  const [drawerTab, setDrawerTab] = useState<"Overview" | "Email Content" | "Headers" | "Analysis">("Overview");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = emails;
    if (tab === "Unread") list = list.filter((e) => e.unread);
    if (tab === "Threats") list = list.filter((e) => e.riskLevel === "High");
    if (tab === "Suspicious") list = list.filter((e) => e.riskLevel === "Medium" || e.riskLevel === "Suspicious");
    if (tab === "Safe") list = list.filter((e) => e.riskLevel === "Safe");
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (e) => e.from.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q)
      );
    }
    return list;
  }, [tab, query]);

  const threatsCount = emails.filter((e) => e.riskLevel === "High").length;

  return (
    <div className="h-full flex">
      <div className="flex-1 min-w-0 flex flex-col px-8 py-7 overflow-hidden">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-white">Inbox</h1>
            <p className="text-slate-500 text-[13.5px] mt-1">Real-time email threat analysis</p>
          </div>
          <div className="text-right text-[12.5px] text-slate-500">
            <div>{emails.length.toLocaleString()} emails</div>
            <div className="text-red-400 font-medium">{threatsCount} threats detected</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium border ${
                tab === t
                  ? "bg-accent-blue/15 text-white border-accent-blue/30"
                  : "text-slate-400 border-base-border hover:bg-white/5"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in inbox..."
              className="w-full bg-base-panel2 border border-base-border rounded-lg pl-9 pr-3 py-2 text-[12.5px] text-slate-200 focus:outline-none focus:border-accent-blue/50"
            />
          </div>
          {["Sender", "Threat Type", "Risk Level", "Has Attachment"].map((f) => (
            <button
              key={f}
              onClick={() => showToast(`${f} filter applied`)}
              className="px-3 py-2 rounded-lg text-[12px] text-slate-400 border border-base-border hover:bg-white/5"
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin border border-base-border rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-base-panel2 z-10">
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-base-border">
                <th className="py-2.5 px-3 w-8"></th>
                <th className="py-2.5 px-2">Risk</th>
                <th className="py-2.5 px-2">From</th>
                <th className="py-2.5 px-2">Subject</th>
                <th className="py-2.5 px-2">Received</th>
                <th className="py-2.5 px-2">Threat Type</th>
                <th className="py-2.5 px-2 pr-4 text-right">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr
                  key={e.id}
                  onClick={() => {
                    setSelected(e);
                    setDrawerTab("Overview");
                  }}
                  className={`border-b border-base-border last:border-0 cursor-pointer text-[12.5px] ${
                    selected?.id === e.id ? "bg-accent-blue/10" : "hover:bg-white/5"
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <input type="checkbox" className="accent-accent-blue" onClick={(ev) => ev.stopPropagation()} />
                  </td>
                  <td className="py-2.5 px-2">
                    <RiskBadge level={e.riskLevel} />
                  </td>
                  <td className="py-2.5 px-2 text-slate-300 max-w-[220px] truncate">{e.from}</td>
                  <td className="py-2.5 px-2 text-slate-200 max-w-[260px] truncate">
                    <div className="flex items-center gap-1.5">
                      {e.hasAttachment && <Paperclip size={12} className="text-slate-500 shrink-0" />}
                      <span className="truncate">{e.subject}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-slate-500 whitespace-nowrap">{e.receivedLabel}</td>
                  <td className="py-2.5 px-2 text-slate-400 whitespace-nowrap">{e.threatType}</td>
                  <td className="py-2.5 px-2 pr-4 text-right font-mono text-slate-300">{e.riskScore}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-3 text-[12.5px] text-slate-500">
          <span>
            Showing 1–{filtered.length} of {emails.length.toLocaleString()} emails
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 rounded-md border border-base-border hover:bg-white/5"
            >
              ‹
            </button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-2.5 py-1 rounded-md border ${
                  page === n ? "bg-accent-blue text-white border-accent-blue" : "border-base-border hover:bg-white/5"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-slate-600">...</span>
            <button className="px-2.5 py-1 rounded-md border border-base-border hover:bg-white/5">212</button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-2.5 py-1 rounded-md border border-base-border hover:bg-white/5"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {selected && (
        <div className="w-[380px] shrink-0 border-l border-base-border bg-base-panel flex flex-col overflow-hidden animate-slide-in-right">
          <div className="flex items-start justify-between px-5 py-4 border-b border-base-border">
            <div>
              <h3 className="text-[14px] font-semibold text-white leading-snug pr-4">{selected.subject}</h3>
              <div className="flex items-center gap-2 mt-2">
                <RiskBadge level={selected.riskLevel} />
                <span className="text-[12px] font-mono text-slate-500">{selected.riskScore}/100</span>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-300">
              <X size={16} />
            </button>
          </div>

          <div className="px-5 py-3 border-b border-base-border text-[12px] text-slate-400 space-y-1">
            <div>
              <span className="text-slate-600">From:</span> {selected.from}
            </div>
            <div>
              <span className="text-slate-600">To:</span> {selected.to}
            </div>
            <div>
              <span className="text-slate-600">Date:</span> 05 Sep 2026, {selected.receivedLabel}
            </div>
          </div>

          <div className="flex border-b border-base-border px-5">
            {(["Overview", "Email Content", "Headers", "Analysis"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setDrawerTab(t)}
                className={`py-2.5 mr-5 text-[12.5px] font-medium border-b-2 -mb-px ${
                  drawerTab === t ? "text-white border-accent-blue" : "text-slate-500 border-transparent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4">
            {drawerTab === "Overview" && (
              <>
                {selected.riskLevel !== "Safe" && (
                  <div className="rounded-lg border border-red-500/25 bg-red-500/5 p-3.5 mb-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <ShieldAlert size={14} className="text-red-400" />
                      <span className="text-[13px] font-semibold text-red-400">
                        Likely {selected.threatType}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-400 leading-relaxed mb-2.5">{selected.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.tags.map((t) => (
                        <span key={t} className="text-[10.5px] bg-white/5 text-slate-300 px-2 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.indicators.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-[12.5px] font-semibold text-slate-300 mb-2">
                      Key Indicators ({selected.indicators.length})
                    </h4>
                    <ul className="space-y-2">
                      {selected.indicators.map((ind, i) => (
                        <li key={i} className="text-[12px] text-slate-400 bg-base-panel2 border border-base-border rounded-lg px-3 py-2">
                          {ind}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="text-[12.5px] font-semibold text-slate-300 mb-2">Authentication Results</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "SPF", value: selected.spf },
                      { label: "DKIM", value: selected.dkim },
                      { label: "DMARC", value: selected.dmarc },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className={`rounded-lg border px-3 py-2 text-center ${
                          value === "Pass"
                            ? "border-emerald-500/25 bg-emerald-500/5"
                            : "border-red-500/25 bg-red-500/5"
                        }`}
                      >
                        <div className="text-[11px] text-slate-500">{label}</div>
                        <div
                          className={`text-[12.5px] font-semibold ${
                            value === "Pass" ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {drawerTab === "Email Content" && (
              <div className="text-[12.5px] text-slate-400 leading-relaxed">
                <p className="mb-3">Subject: {selected.subject}</p>
                <div className="bg-base-panel2 border border-base-border rounded-lg p-4 text-slate-400">
                  Email body preview is redacted in this workspace. Use "Investigate" to view the
                  full reconstructed message in a secure sandbox.
                </div>
              </div>
            )}

            {drawerTab === "Headers" && (
              <pre className="text-[11px] font-mono text-slate-400 bg-base-panel2 border border-base-border rounded-lg p-4 whitespace-pre-wrap leading-relaxed">
{`Return-Path: <${selected.from}>
From: ${selected.from}
To: ${selected.to}
Subject: ${selected.subject}
SPF: ${selected.spf}
DKIM: ${selected.dkim}
DMARC: ${selected.dmarc}
X-Risk-Score: ${selected.riskScore}/100`}
              </pre>
            )}

            {drawerTab === "Analysis" && (
              <div className="text-[12.5px] text-slate-400 leading-relaxed space-y-3">
                <p>{selected.summary}</p>
                <div>
                  <h4 className="text-[12px] font-semibold text-slate-300 mb-1.5">Threat Intelligence</h4>
                  <p className="text-slate-500 text-[12px]">
                    Risk classification: {selected.threatType} · Confidence based on {selected.indicators.length}{" "}
                    correlated indicators.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 px-5 py-4 border-t border-base-border">
            <button
              onClick={() => navigate("/investigations")}
              className="flex-1 bg-accent-blue hover:bg-accent-blueLight text-white text-[13px] font-medium rounded-lg py-2.5 flex items-center justify-center gap-1.5"
            >
              Investigate →
            </button>
            <button
              onClick={() => {
                showToast(`Case created from email ${selected.id}`);
                navigate("/cases");
              }}
              className="flex-1 border border-base-border text-slate-200 text-[13px] font-medium rounded-lg py-2.5"
            >
              Create Case
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
