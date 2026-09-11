import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { cases, infrastructureNodes } from "../data/mockData";
import { SeverityBadge, StatusBadge } from "../components/Badges";

const tabs = ["Overview", "Email", "Trace", "Infrastructure", "Correlation", "Evidence"] as const;

const timeline = [
  { label: "Email generated", time: "05 Sep 2026, 09:58 UTC" },
  { label: "First relay detected", time: "05 Sep 2026, 10:02 UTC" },
  { label: "Suspicious infrastructure observed", time: "05 Sep 2026, 10:06 UTC" },
  { label: "Email delivered", time: "05 Sep 2026, 10:11 UTC" },
  { label: "Threat analysis completed", time: "05 Sep 2026, 10:19 UTC" },
  { label: "Alert generated", time: "05 Sep 2026, 10:24 UTC" },
];

export default function CaseInvestigation() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const record = cases.find((c) => c.id === caseId) || cases[0];
  const [tab, setTab] = useState<(typeof tabs)[number]>("Trace");
  const [selectedNode, setSelectedNode] = useState(infrastructureNodes[0]);

  return (
    <div className="h-full overflow-y-auto scrollbar-thin px-8 py-6">
      <button
        onClick={() => navigate("/cases")}
        className="flex items-center gap-1.5 text-[12.5px] text-slate-400 hover:text-slate-200 mb-4"
      >
        <ArrowLeft size={14} /> Back to Cases
      </button>

      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <div className="text-[12px] text-slate-500 mb-1">CASE #{record.id}</div>
          <h1 className="text-xl font-bold text-white mb-2">{record.description.split(".")[0]}.</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <SeverityBadge severity={record.severity} />
            <StatusBadge status={record.status} />
          </div>
        </div>
        <div className="text-right text-[12px] text-slate-500">
          <div>Assigned: <span className="text-slate-300">{record.assignedAnalyst}</span></div>
          <div>Created: <span className="text-slate-300">{record.created}</span></div>
          <div className="mt-1">
            Related: {record.relatedEmails} emails | {record.relatedDomains.length} domains
            {record.relatedCampaignId ? " | 1 campaign" : ""}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-5 border-b border-base-border">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-[13px] font-medium border-b-2 -mb-px ${
              tab === t ? "text-white border-accent-blue" : "text-slate-500 border-transparent hover:text-slate-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="bg-base-panel border border-base-border rounded-xl p-5">
          <h3 className="text-[13.5px] font-semibold text-white mb-2">Case Summary</h3>
          <p className="text-[13px] text-slate-400 leading-relaxed">{record.description}</p>
        </div>
      )}

      {tab === "Email" && (
        <div className="bg-base-panel border border-base-border rounded-xl p-5">
          <h3 className="text-[13.5px] font-semibold text-white mb-3">Related Emails</h3>
          {record.relatedEmailIds.length === 0 ? (
            <p className="text-[12.5px] text-slate-500">No linked emails for this case.</p>
          ) : (
            <ul className="space-y-2">
              {record.relatedEmailIds.map((id) => (
                <li key={id} className="text-[12.5px] text-slate-300 bg-base-panel2 border border-base-border rounded-lg px-3 py-2">
                  {id}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === "Trace" && (
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 bg-base-panel border border-base-border rounded-xl p-5">
            <h3 className="text-[14px] font-semibold text-white mb-1">Email Transmission Trace</h3>
            <p className="text-[12px] text-slate-500 mb-6">
              Reconstructed relay path based on available header evidence.
            </p>

            <div className="flex flex-col items-stretch gap-0">
              {infrastructureNodes.map((node, i) => (
                <div key={node.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode(node)}
                    className={`w-full max-w-md rounded-xl border px-4 py-3 text-left transition-colors ${
                      selectedNode.id === node.id
                        ? "border-accent-blue bg-accent-blue/10"
                        : "border-base-border bg-base-panel2 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-slate-100">{node.label}</span>
                      <span className="text-[10.5px] text-slate-500">{node.role}</span>
                    </div>
                    <div className="text-[11.5px] text-slate-500 font-mono mt-1">
                      {node.ip} · {node.hostname}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      {node.city}, {node.country}
                    </div>
                  </button>
                  {i < infrastructureNodes.length - 1 && (
                    <ChevronDown size={16} className="text-slate-600 my-1" />
                  )}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-600 mt-6 border-t border-base-border pt-4">
              Location represents identified infrastructure, not necessarily the sender's physical
              location.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-base-panel border border-base-border rounded-xl p-5">
              <h3 className="text-[13px] font-semibold text-white mb-3">Selected Node Details</h3>
              <dl className="space-y-2.5 text-[12px]">
                {[
                  ["IP Address", selectedNode.ip],
                  ["Hostname", selectedNode.hostname],
                  ["Country", selectedNode.country],
                  ["Region", selectedNode.region],
                  ["City", selectedNode.city],
                  ["ISP", selectedNode.isp],
                  ["ASN", selectedNode.asn],
                  ["Infrastructure", selectedNode.infrastructure],
                  ["VPN / TOR", selectedNode.vpnTor ? "Detected" : "Not detected"],
                  ["Confidence", `${selectedNode.confidence}%`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="text-slate-200 text-right font-mono">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-base-panel border border-base-border rounded-xl p-5">
              <h3 className="text-[13px] font-semibold text-white mb-2">Probable Origin</h3>
              <p className="text-[12px] text-slate-400">
                {infrastructureNodes[0].city}, {infrastructureNodes[0].country} —{" "}
                {infrastructureNodes[0].isp}, confidence {infrastructureNodes[0].confidence}%.
              </p>
            </div>

            <div className="bg-base-panel border border-base-border rounded-xl p-5">
              <h3 className="text-[13px] font-semibold text-white mb-3">Forensic Timeline</h3>
              <ul className="space-y-3">
                {timeline.map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center pt-0.5">
                      <span className="w-2 h-2 rounded-full bg-accent-blue shrink-0" />
                      {i < timeline.length - 1 && <span className="w-px flex-1 bg-base-border" />}
                    </div>
                    <div className="pb-2">
                      <div className="text-[12px] text-slate-200">{t.label}</div>
                      <div className="text-[10.5px] text-slate-600">{t.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {tab === "Infrastructure" && (
        <div className="bg-base-panel border border-base-border rounded-xl p-5">
          <h3 className="text-[13.5px] font-semibold text-white mb-3">Infrastructure Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            {record.relatedDomains.map((d) => (
              <div key={d} className="bg-base-panel2 border border-base-border rounded-lg px-3.5 py-2.5 text-[12.5px] text-slate-300 font-mono">
                {d}
              </div>
            ))}
            <div className="bg-base-panel2 border border-base-border rounded-lg px-3.5 py-2.5 text-[12.5px] text-slate-300 font-mono">
              {record.relatedIp}
            </div>
          </div>
        </div>
      )}

      {tab === "Correlation" && (
        <div className="bg-base-panel border border-base-border rounded-xl p-5">
          <h3 className="text-[13.5px] font-semibold text-white mb-2">Related Campaign</h3>
          <p className="text-[12.5px] text-slate-400">
            {record.relatedCampaignId
              ? `Correlated with campaign ${record.relatedCampaignId} sharing infrastructure and threat pattern.`
              : "No correlated campaign identified for this case."}
          </p>
        </div>
      )}

      {tab === "Evidence" && (
        <div className="bg-base-panel border border-base-border rounded-xl p-5">
          <h3 className="text-[13.5px] font-semibold text-white mb-2">Evidence Files</h3>
          <p className="text-[12.5px] text-slate-500 mb-4">
            Preserved artifacts with verified chain of custody.
          </p>
          <button
            onClick={() => navigate("/reports")}
            className="text-[12.5px] text-accent-blueLight font-medium"
          >
            View full forensic report →
          </button>
        </div>
      )}
    </div>
  );
}
