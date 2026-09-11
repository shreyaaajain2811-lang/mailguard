import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { alerts } from "../data/mockData";
import { useToast } from "../components/Toast";
import type { AlertRecord } from "../types";

const tabs = ["All", "Unresolved", "Critical", "High", "Resolved"] as const;
type Tab = (typeof tabs)[number];

const sevColor: Record<string, string> = {
  Critical: "text-red-400 border-red-500/25 bg-red-500/5",
  High: "text-red-400 border-red-500/25 bg-red-500/5",
  Medium: "text-amber-400 border-amber-500/25 bg-amber-500/5",
  Low: "text-yellow-300 border-yellow-500/25 bg-yellow-500/5",
};

export default function Alerts() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>("All");
  const [selected, setSelected] = useState<AlertRecord | null>(alerts[0]);

  const counts = {
    Critical: alerts.filter((a) => a.severity === "Critical").length,
    High: alerts.filter((a) => a.severity === "High").length,
    Medium: alerts.filter((a) => a.severity === "Medium").length,
    Low: alerts.filter((a) => a.severity === "Low").length,
  };

  const filtered = useMemo(() => {
    if (tab === "All") return alerts;
    if (tab === "Unresolved") return alerts.filter((a) => a.status === "Unresolved");
    if (tab === "Resolved") return alerts.filter((a) => a.status === "Resolved");
    return alerts.filter((a) => a.severity === tab);
  }, [tab]);

  function dismiss(_id: string) {
    showToast("Alert dismissed");
  }

  return (
    <div className="h-full flex">
      <div className="flex-1 min-w-0 flex flex-col px-8 py-7 overflow-hidden">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-white">Alerts</h1>
          <p className="text-slate-500 text-[13.5px] mt-1">Threat detections requiring analyst attention</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: "Critical", value: counts.Critical, color: "text-red-400" },
            { label: "High", value: counts.High, color: "text-red-400" },
            { label: "Medium", value: counts.Medium, color: "text-amber-400" },
            { label: "Low", value: counts.Low, color: "text-yellow-300" },
          ].map((s) => (
            <div key={s.label} className="bg-base-panel border border-base-border rounded-xl p-4">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[12.5px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
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

        <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-3 pr-1">
          {filtered.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              className={`text-left rounded-xl border p-4 transition-colors ${
                selected?.id === a.id ? "border-accent-blue/40 bg-accent-blue/5" : sevColor[a.severity]
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-2.5 min-w-0">
                  <AlertTriangle size={16} className={sevColor[a.severity].split(" ")[0] + " shrink-0 mt-0.5"} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wide ${sevColor[a.severity].split(" ")[0]}`}>
                        {a.severity}
                      </span>
                    </div>
                    <div className="text-[13.5px] font-semibold text-slate-100 mt-0.5">{a.title}</div>
                    <div className="text-[12.5px] text-slate-500 mt-0.5">{a.description}</div>
                    <div className="text-[11px] text-slate-600 mt-1.5">
                      {a.timeAgo}
                      {a.relatedCampaignId && ` · Campaign #${a.relatedCampaignId.replace("CMP-", "")}`}
                      {a.relatedCaseId && ` · Case #${a.relatedCaseId}`}
                    </div>
                  </div>
                </div>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/investigations");
                  }}
                  className="shrink-0 text-[12px] font-medium text-accent-blueLight flex items-center gap-1"
                >
                  Investigate <ArrowRight size={12} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="w-[360px] shrink-0 border-l border-base-border bg-base-panel px-5 py-6 overflow-y-auto scrollbar-thin animate-slide-in-right">
          <h3 className="text-[15px] font-semibold text-white mb-4">{selected.title}</h3>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-base-panel2 border border-base-border rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">{selected.riskScore}/100</div>
              <div className="text-[11px] text-slate-500">Risk Score</div>
            </div>
            <div className="bg-base-panel2 border border-base-border rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">{selected.confidence}%</div>
              <div className="text-[11px] text-slate-500">Confidence</div>
            </div>
          </div>

          <h4 className="text-[12.5px] font-semibold text-slate-300 mb-2">Indicators</h4>
          <ul className="space-y-2 mb-6">
            {selected.indicators.map((ind, i) => (
              <li key={i} className="text-[12px] text-slate-400 bg-base-panel2 border border-base-border rounded-lg px-3 py-2">
                {ind}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate("/investigations")}
              className="bg-accent-blue hover:bg-accent-blueLight text-white text-[13px] font-medium rounded-lg py-2.5"
            >
              Investigate
            </button>
            <button
              onClick={() => {
                showToast(`Case created from alert ${selected.id}`);
                navigate("/cases");
              }}
              className="border border-base-border text-slate-200 text-[13px] font-medium rounded-lg py-2.5"
            >
              Create Case
            </button>
            <button
              onClick={() => showToast(`Added to campaign ${selected.relatedCampaignId ?? "#24"}`)}
              className="border border-base-border text-slate-200 text-[13px] font-medium rounded-lg py-2.5"
            >
              Add to Campaign
            </button>
            <button
              onClick={() => dismiss(selected.id)}
              className="text-slate-500 text-[12.5px] font-medium py-2"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
