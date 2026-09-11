import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, MoreHorizontal } from "lucide-react";
import { cases } from "../data/mockData";
import { SeverityBadge, StatusBadge } from "../components/Badges";
import { useToast } from "../components/Toast";

const caseTabs = ["Overview", "Emails", "Indicators", "Infrastructure", "Timeline", "Evidence", "Notes", "Reports"] as const;

export default function Cases() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selected, setSelected] = useState(cases[0]);
  const [caseTab, setCaseTab] = useState<(typeof caseTabs)[number]>("Overview");
  const [showCreate, setShowCreate] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusOverride, setStatusOverride] = useState<Record<string, string>>({});

  const open = cases.filter((c) => c.status === "Open").length;
  const investigating = cases.filter((c) => c.status === "Investigating").length;
  const highRisk = cases.filter((c) => c.severity === "High").length;
  const closed = cases.filter((c) => c.status === "Closed").length;

  const displayStatus = (id: string, fallback: string) => statusOverride[id] || fallback;

  return (
    <div className="h-full overflow-y-auto scrollbar-thin px-8 py-7">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Cases</h1>
          <p className="text-slate-500 text-[13.5px] mt-1">Investigation and incident management</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 bg-accent-blue hover:bg-accent-blueLight text-white text-[13px] font-medium rounded-lg px-4 py-2.5"
        >
          <Plus size={15} /> Create Case
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "Open Cases", value: open + investigating, icon: "📁" },
          { label: "Investigating", value: investigating, icon: "🔍" },
          { label: "High Risk", value: highRisk, icon: "⚠️" },
          { label: "Closed", value: closed, icon: "✅" },
        ].map((s) => (
          <div key={s.label} className="bg-base-panel border border-base-border rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-[12.5px] text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3 bg-base-panel border border-base-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-white">All Cases ({cases.length})</h2>
          </div>
          <input
            placeholder="Search cases..."
            className="w-full bg-base-panel2 border border-base-border rounded-lg px-3 py-2 text-[12.5px] text-slate-200 mb-3 focus:outline-none focus:border-accent-blue/50"
          />
          <div className="overflow-x-auto overflow-y-auto scrollbar-thin max-h-[520px]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-base-panel z-10">
                <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-base-border">
                  <th className="py-2 px-2">Case ID</th>
                  <th className="py-2 px-2">Threat</th>
                  <th className="py-2 px-2">Severity</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Assigned</th>
                  <th className="py-2 px-2">Updated</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => {
                      setSelected(c);
                      setCaseTab("Overview");
                    }}
                    className={`border-b border-base-border last:border-0 cursor-pointer text-[12.5px] ${
                      selected.id === c.id ? "bg-accent-blue/10" : "hover:bg-white/5"
                    }`}
                  >
                    <td className="py-2.5 px-2 text-slate-200 font-medium whitespace-nowrap">#{c.id}</td>
                    <td className="py-2.5 px-2 text-slate-400">{c.threat}</td>
                    <td className="py-2.5 px-2">
                      <SeverityBadge severity={c.severity} />
                    </td>
                    <td className="py-2.5 px-2">
                      <StatusBadge status={displayStatus(c.id, c.status)} />
                    </td>
                    <td className="py-2.5 px-2 text-slate-400 whitespace-nowrap">{c.assignedAnalyst}</td>
                    <td className="py-2.5 px-2 text-slate-500 whitespace-nowrap">{c.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-slate-500 mt-3">Showing 1–{cases.length} of {cases.length} cases</p>
        </div>

        <div className="col-span-2 bg-base-panel border border-base-border rounded-xl p-5 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[11px] text-slate-500">CASE #{selected.id}</div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-[13.5px] font-semibold text-red-400">{selected.threat}</span>
                <SeverityBadge severity={selected.severity} />
                <StatusBadge status={displayStatus(selected.id, selected.status)} />
              </div>
            </div>
            <button className="text-slate-500 hover:text-slate-300">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[12px] mb-4">
            <div>
              <div className="text-slate-500">Assigned</div>
              <div className="text-slate-200">{selected.assignedAnalyst}</div>
            </div>
            <div>
              <div className="text-slate-500">Last Updated</div>
              <div className="text-slate-200">{selected.updated}</div>
            </div>
            <div>
              <div className="text-slate-500">Created</div>
              <div className="text-slate-200">{selected.created}</div>
            </div>
            <div>
              <div className="text-slate-500">Tags</div>
              <div className="flex gap-1 flex-wrap mt-0.5">
                {selected.tags.map((t) => (
                  <span key={t} className="text-[10.5px] bg-white/5 text-slate-300 px-1.5 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-3 overflow-x-auto scrollbar-thin border-b border-base-border">
            {caseTabs.map((t) => (
              <button
                key={t}
                onClick={() => setCaseTab(t)}
                className={`px-2.5 py-2 text-[12px] font-medium whitespace-nowrap border-b-2 -mb-px ${
                  caseTab === t ? "text-white border-accent-blue" : "text-slate-500 border-transparent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin mb-4">
            {caseTab === "Overview" && (
              <>
                <h4 className="text-[12.5px] font-semibold text-slate-300 mb-1.5">Case Description</h4>
                <p className="text-[12.5px] text-slate-400 leading-relaxed mb-4">{selected.description}</p>
                <h4 className="text-[12.5px] font-semibold text-slate-300 mb-2">Related Entities</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-base-panel2 border border-base-border rounded-lg px-3 py-2">
                    <div className="text-[13px] font-semibold text-white">{selected.relatedEmails} Emails</div>
                  </div>
                  <div className="bg-base-panel2 border border-base-border rounded-lg px-3 py-2">
                    <div className="text-[13px] font-semibold text-white">{selected.relatedDomains.length} Domains</div>
                  </div>
                  <div className="bg-base-panel2 border border-base-border rounded-lg px-3 py-2">
                    <div className="text-[13px] font-semibold text-white">1 IP Address</div>
                  </div>
                  <div className="bg-base-panel2 border border-base-border rounded-lg px-3 py-2">
                    <div className="text-[13px] font-semibold text-white">
                      {selected.relatedCampaignId ? "1 Campaign" : "0 Campaigns"}
                    </div>
                  </div>
                </div>
              </>
            )}
            {caseTab === "Emails" && (
              <ul className="space-y-2">
                {selected.relatedEmailIds.length === 0 && (
                  <p className="text-[12px] text-slate-500">No linked emails.</p>
                )}
                {selected.relatedEmailIds.map((id) => (
                  <li key={id} className="text-[12.5px] text-slate-300 bg-base-panel2 border border-base-border rounded-lg px-3 py-2">
                    {id}
                  </li>
                ))}
              </ul>
            )}
            {caseTab === "Indicators" && (
              <ul className="space-y-2">
                {selected.relatedDomains.map((d) => (
                  <li key={d} className="text-[12.5px] text-slate-300 bg-base-panel2 border border-base-border rounded-lg px-3 py-2">
                    {d}
                  </li>
                ))}
              </ul>
            )}
            {caseTab === "Infrastructure" && (
              <p className="text-[12.5px] text-slate-400">Primary IP: {selected.relatedIp}</p>
            )}
            {caseTab === "Timeline" && (
              <p className="text-[12.5px] text-slate-400">Created {selected.created} · Last updated {selected.updated}</p>
            )}
            {caseTab === "Evidence" && <p className="text-[12.5px] text-slate-400">No evidence files added yet.</p>}
            {caseTab === "Notes" && <p className="text-[12.5px] text-slate-400">No analyst notes yet.</p>}
            {caseTab === "Reports" && (
              <button
                onClick={() => navigate("/reports")}
                className="text-[12.5px] text-accent-blueLight font-medium"
              >
                View forensic report →
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-base-border">
            <button onClick={() => setShowAssign(true)} className="border border-base-border text-slate-200 text-[12.5px] font-medium rounded-lg py-2">
              Assign
            </button>
            <button onClick={() => setShowStatus(true)} className="border border-base-border text-slate-200 text-[12.5px] font-medium rounded-lg py-2">
              Change Status
            </button>
            <button onClick={() => showToast("Evidence added to case")} className="border border-base-border text-slate-200 text-[12.5px] font-medium rounded-lg py-2">
              Add Evidence
            </button>
            <button
              onClick={() => navigate(`/case-investigations/${selected.id}`)}
              className="bg-accent-blue hover:bg-accent-blueLight text-white text-[12.5px] font-medium rounded-lg py-2"
            >
              Generate Report
            </button>
          </div>
          <button
            onClick={() => navigate(`/case-investigations/${selected.id}`)}
            className="mt-2 text-center text-[12.5px] text-accent-blueLight font-medium"
          >
            Open Case Investigation →
          </button>
        </div>
      </div>

      {showCreate && (
        <Modal title="Create Case" onClose={() => setShowCreate(false)}>
          <label className="block text-[12.5px] text-slate-400 mb-1.5">Threat type</label>
          <select className="w-full bg-base-panel border border-base-border rounded-lg px-3.5 py-2.5 text-[13px] text-slate-200 mb-4">
            <option>Phishing</option>
            <option>BEC</option>
            <option>Impersonation</option>
            <option>Malware</option>
          </select>
          <label className="block text-[12.5px] text-slate-400 mb-1.5">Description</label>
          <textarea
            rows={3}
            placeholder="Briefly describe this case..."
            className="w-full bg-base-panel border border-base-border rounded-lg px-3.5 py-2.5 text-[13px] text-slate-200 mb-5"
          />
          <ModalActions
            onCancel={() => setShowCreate(false)}
            onConfirm={() => {
              setShowCreate(false);
              showToast("Case successfully created");
            }}
            confirmLabel="Create Case"
          />
        </Modal>
      )}

      {showAssign && (
        <Modal title="Assign Analyst" onClose={() => setShowAssign(false)}>
          <label className="block text-[12.5px] text-slate-400 mb-1.5">Analyst</label>
          <select className="w-full bg-base-panel border border-base-border rounded-lg px-3.5 py-2.5 text-[13px] text-slate-200 mb-5">
            <option>A. Sharma</option>
            <option>R. Singh</option>
            <option>S. Patel</option>
            <option>K. Mehta</option>
            <option>N. Patel</option>
          </select>
          <ModalActions
            onCancel={() => setShowAssign(false)}
            onConfirm={() => {
              setShowAssign(false);
              showToast("Analyst assigned to case");
            }}
            confirmLabel="Assign"
          />
        </Modal>
      )}

      {showStatus && (
        <Modal title="Change Status" onClose={() => setShowStatus(false)}>
          <div className="flex flex-col gap-2 mb-5">
            {["Open", "Investigating", "Closed"].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatusOverride((prev) => ({ ...prev, [selected.id]: s }));
                  setShowStatus(false);
                  showToast(`Case status changed to ${s}`);
                }}
                className="text-left px-3.5 py-2.5 rounded-lg border border-base-border text-[13px] text-slate-200 hover:bg-white/5"
              >
                {s}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
      <div className="w-full max-w-md bg-base-panel2 border border-base-borderLight rounded-xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-[15px]">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalActions({
  onCancel,
  onConfirm,
  confirmLabel,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
}) {
  return (
    <div className="flex gap-2 justify-end">
      <button onClick={onCancel} className="px-4 py-2 rounded-lg text-[13px] text-slate-300 hover:bg-white/5">
        Cancel
      </button>
      <button onClick={onConfirm} className="px-4 py-2 rounded-lg text-[13px] bg-accent-blue text-white font-medium">
        {confirmLabel}
      </button>
    </div>
  );
}
