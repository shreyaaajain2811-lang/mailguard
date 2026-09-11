export type Severity = "Critical" | "High" | "Medium" | "Low";
export type RiskLevel = "High" | "Medium" | "Suspicious" | "Safe";
export type ThreatType =
  | "Phishing"
  | "Impersonation"
  | "BEC"
  | "Malicious Attachment"
  | "Suspicious Link"
  | "Credential Theft"
  | "Malware"
  | "Malicious Link"
  | "None";

export interface EmailRecord {
  id: string;
  from: string;
  fromDomain: string;
  subject: string;
  receivedAt: string;
  receivedLabel: string;
  threatType: ThreatType;
  riskLevel: RiskLevel;
  riskScore: number;
  hasAttachment: boolean;
  unread: boolean;
  to: string;
  spf: "Pass" | "Fail" | "SoftFail";
  dkim: "Pass" | "Fail" | "SoftFail";
  dmarc: "Pass" | "Fail" | "SoftFail";
  indicators: string[];
  summary: string;
  tags: string[];
  maliciousUrl?: string;
  attachmentName?: string;
  campaignId?: string;
  caseId?: string;
}

export interface AlertRecord {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  timeAgo: string;
  timestamp: number;
  relatedCaseId?: string;
  relatedCampaignId?: string;
  riskScore: number;
  confidence: number;
  indicators: string[];
  status: "Unresolved" | "Resolved";
}

export interface CampaignRecord {
  id: string;
  number: number;
  name: string;
  threat: ThreatType;
  emails: number;
  domains: number;
  ips: number;
  asns: number;
  firstSeen: string;
  lastActivity: string;
  status: "Active" | "Monitoring" | "Contained" | "Resolved";
  commonIndicators: string[];
  relatedCaseIds: string[];
  timeline: { date: string; emails: number; domains: number; ips: number }[];
}

export interface CaseRecord {
  id: string;
  threat: ThreatType;
  severity: Severity;
  status: "Open" | "Investigating" | "Closed";
  assignedAnalyst: string;
  relatedEmails: number;
  updated: string;
  created: string;
  description: string;
  tags: string[];
  relatedEmailIds: string[];
  relatedDomains: string[];
  relatedIp: string;
  relatedCampaignId?: string;
}

export interface InfrastructureNode {
  id: string;
  label: string;
  role: string;
  ip: string;
  hostname: string;
  country: string;
  region: string;
  city: string;
  isp: string;
  asn: string;
  infrastructure: string;
  vpnTor: boolean;
  confidence: number;
}

export interface InvestigationRecord {
  id: string;
  title: string;
  primaryThreat: ThreatType;
  severity: Severity;
  entities: string;
  analyst: string;
  status: "Active" | "Investigating" | "Closed";
  lastActivity: string;
}
