import type { ReactElement } from "react";
import { AlertTriangle, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";
import type { Severity, RiskLevel } from "../types";

const severityStyles: Record<Severity, string> = {
  Critical: "bg-red-500/15 text-red-400 border-red-500/30",
  High: "bg-red-500/15 text-red-400 border-red-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Low: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${severityStyles[severity]}`}
    >
      {severity}
    </span>
  );
}

const riskStyles: Record<RiskLevel, string> = {
  High: "bg-red-500/15 text-red-400 border-red-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Suspicious: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Safe: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border whitespace-nowrap ${riskStyles[level]}`}
    >
      {level}
    </span>
  );
}

const riskIcon: Record<RiskLevel, ReactElement> = {
  High: <AlertTriangle size={16} className="text-red-400" />,
  Medium: <ShieldAlert size={16} className="text-amber-400" />,
  Suspicious: <ShieldQuestion size={16} className="text-amber-400" />,
  Safe: <ShieldCheck size={16} className="text-emerald-400" />,
};

export function RiskIcon({ level }: { level: RiskLevel }) {
  return riskIcon[level];
}

const statusStyles: Record<string, string> = {
  Active: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Investigating: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Monitoring: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Open: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  Contained: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Closed: "bg-slate-600/20 text-slate-400 border-slate-600/30",
  Unresolved: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border whitespace-nowrap ${
        statusStyles[status] || "bg-slate-500/15 text-slate-300 border-slate-500/30"
      }`}
    >
      {status}
    </span>
  );
}
