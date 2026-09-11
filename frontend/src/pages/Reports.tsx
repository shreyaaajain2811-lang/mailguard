import { useState } from "react";
import { Download, Printer, Share2, FileText, Plus, ExternalLink } from "lucide-react";
import { useToast } from "../components/Toast";

const sections = [
  {
    n: 1,
    title: "Executive Summary",
    body: "This report documents the forensic analysis of a phishing campaign targeting employees with fake invoice emails. The analysis confirms malicious intent, identifies the sender infrastructure, and correlates multiple indicators linked to a broader campaign.",
  },
  {
    n: 2,
    title: "Threat Assessment",
    body: "The email attempts to harvest user credentials using a lookalike domain and social engineering techniques. The sender infrastructure has been linked to previous phishing campaigns.",
  },
  {
    n: 3,
    title: "Email Analysis",
    body: "A total of 7 related emails were analyzed. The emails share similar content, subject patterns, and malicious URLs, indicating a coordinated campaign.",
  },
  {
    n: 4,
    title: "Header Analysis",
    body: "Email headers show inconsistencies in the purported sender domain. SPF and DKIM checks failed, and the email originated from a known malicious IP address.",
  },
  {
    n: 5,
    title: "Authentication Results",
    auth: true,
  },
];

export default function Reports() {
  const { showToast } = useToast();
  const [reportStatus, setReportStatus] = useState<"Draft" | "Final">("Draft");
  const [shared, setShared] = useState(false);

  return (
    <div className="h-full overflow-hidden px-8 py-7 flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports &amp; Evidence</h1>
          <p className="text-slate-500 text-[13.5px] mt-1">Forensic documentation and evidence integrity</p>
        </div>
        <button
          onClick={() => showToast("New report draft created")}
          className="flex items-center gap-1.5 bg-accent-blue hover:bg-accent-blueLight text-white text-[13px] font-medium rounded-lg px-4 py-2.5"
        >
          <Plus size={15} /> New Report
        </button>
      </div>
      <div className="text-[12px] text-slate-500 mb-5">
        Reports <span className="mx-1">›</span> Case Reports <span className="mx-1">›</span> #MG-2026-0142
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-base-panel border border-base-border rounded-xl flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-base-border text-[12px] text-slate-400">
            <span>1 / 12</span>
            <span className="ml-auto">100%</span>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-black overflow-hidden shrink-0">
                  <img src="iris-logo.jpg" alt="IRIS" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[15px] font-bold text-white">IRIS</div>
                  <div className="text-[10.5px] text-slate-500">Intelligent Risk Identification System</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-500">Report ID: RPT-2026-0142</div>
                <div className="text-[11px] text-slate-500 mb-2">Generated: 05 Sep 2026, 14:32 UTC</div>
                <span className="inline-block text-[10.5px] font-semibold px-2.5 py-1 rounded-md border border-red-500/30 bg-red-500/10 text-red-400">
                  CONFIDENTIAL
                </span>
              </div>
            </div>

            <h2 className="text-center text-2xl font-extrabold text-white mb-1">FORENSIC REPORT</h2>
            <p className="text-center text-slate-500 text-[13px] mb-7">Email Threat Investigation</p>

            <div className="grid grid-cols-5 gap-4 text-[12px] mb-8 pb-6 border-b border-base-border">
              <div>
                <div className="text-slate-500">Case ID</div>
                <div className="text-slate-200 font-medium">#MG-2026-0142</div>
              </div>
              <div>
                <div className="text-slate-500">Threat Type</div>
                <div className="text-slate-200 font-medium">Phishing</div>
              </div>
              <div>
                <div className="text-slate-500">Severity</div>
                <div className="text-red-400 font-semibold">HIGH RISK</div>
              </div>
              <div>
                <div className="text-slate-500">Status</div>
                <div className="text-slate-200 font-medium">Investigating</div>
              </div>
              <div>
                <div className="text-slate-500">Prepared By</div>
                <div className="text-slate-200 font-medium">A. Sharma</div>
              </div>
            </div>

            <div className="space-y-6">
              {sections.map((s) => (
                <div key={s.n} className="flex gap-3">
                  <FileText size={16} className="text-accent-blueLight shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-[13.5px] font-semibold text-white mb-1.5">
                      {s.n}. {s.title}
                    </h3>
                    {s.auth ? (
                      <pre className="text-[11.5px] font-mono bg-base-panel2 border border-base-border rounded-lg p-3.5 text-slate-300 leading-relaxed">
{`SPF   : Fail  (softfail)
DKIM  : Fail  (no valid signature)
DMARC : Fail  (p=none)`}
                      </pre>
                    ) : (
                      <p className="text-[12.5px] text-slate-400 leading-relaxed">{s.body}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-thin">
          <div className="bg-base-panel border border-base-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13.5px] font-semibold text-white">Report Status</h3>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                  reportStatus === "Draft"
                    ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                    : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                }`}
              >
                {reportStatus}
              </span>
            </div>
            <div className="text-[12px] text-slate-500 mb-1">Generated</div>
            <div className="text-[12.5px] text-slate-200 mb-3">05 Sep 2026, 14:32 UTC</div>
            <div className="text-[12px] text-slate-500 mb-1">Last Edited</div>
            <div className="text-[12.5px] text-slate-200 mb-5">05 Sep 2026, 14:32 UTC</div>

            <button
              onClick={() => {
                setReportStatus("Final");
                showToast("Report generated successfully");
              }}
              className="w-full bg-accent-blue hover:bg-accent-blueLight text-white text-[13px] font-medium rounded-lg py-2.5 flex items-center justify-center gap-2 mb-2.5"
            >
              <FileText size={15} /> Generate PDF Report
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => showToast("Report exported")}
                className="border border-base-border text-slate-200 text-[12.5px] font-medium rounded-lg py-2 flex items-center justify-center gap-1.5"
              >
                <Download size={13} /> Export
              </button>
              <button
                onClick={() => window.print()}
                className="border border-base-border text-slate-200 text-[12.5px] font-medium rounded-lg py-2 flex items-center justify-center gap-1.5"
              >
                <Printer size={13} /> Print
              </button>
            </div>
            <button
              onClick={() => {
                setShared(true);
                showToast("Report shared with case #MG-2026-0142");
              }}
              className="w-full mt-2 border border-base-border text-slate-200 text-[12.5px] font-medium rounded-lg py-2 flex items-center justify-center gap-1.5"
            >
              <Share2 size={13} /> {shared ? "Shared with Case ✓" : "Share with Case"}
            </button>
          </div>

          <div className="bg-base-panel border border-base-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13.5px] font-semibold text-white">Evidence Integrity</h3>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md border bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                Verified
              </span>
            </div>
            <div className="space-y-2.5 text-[12px] mb-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Original Email</span>
                <span className="text-slate-200">invoice.eml</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">SHA-256</span>
                <span className="text-slate-200 font-mono flex items-center gap-1">
                  8f42a7e3c1d9e6f...91ab <ExternalLink size={11} />
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Integrity</span>
                <span className="text-emerald-400 font-medium">Verified</span>
              </div>
            </div>
          </div>

          <div className="bg-base-panel border border-base-border rounded-xl p-5">
            <h3 className="text-[13.5px] font-semibold text-white mb-3">Chain of Custody</h3>
            <ul className="space-y-3">
              {[
                ["Evidence acquired", "05 Sep 2026, 10:14 UTC"],
                ["Hash generated", "05 Sep 2026, 10:16 UTC"],
                ["Header analysis", "05 Sep 2026, 10:22 UTC"],
                ["Infrastructure analysis", "05 Sep 2026, 11:03 UTC"],
                ["Investigation created", "05 Sep 2026, 11:15 UTC"],
              ].map(([label, time], i, arr) => (
                <li key={label} className="flex gap-3">
                  <div className="flex flex-col items-center pt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    {i < arr.length - 1 && <span className="w-px flex-1 bg-base-border" />}
                  </div>
                  <div className="pb-1">
                    <div className="text-[12px] text-slate-200">{label}</div>
                    <div className="text-[10.5px] text-slate-600">{time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-base-panel border border-base-border rounded-xl p-5">
            <h3 className="text-[13.5px] font-semibold text-white mb-3">Evidence Files (2)</h3>
            <div className="space-y-2">
              {[
                { name: "invoice.eml", type: "Original Email" },
                { name: "invoice.zip", type: "Attachment" },
              ].map((f) => (
                <div key={f.name} className="flex items-center justify-between bg-base-panel2 border border-base-border rounded-lg px-3 py-2">
                  <div>
                    <div className="text-[12.5px] text-slate-200">{f.name}</div>
                    <div className="text-[10.5px] text-slate-500">{f.type}</div>
                  </div>
                  <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
