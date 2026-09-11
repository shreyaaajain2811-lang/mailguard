import { emails, cases, campaigns, investigations, infrastructureNodes } from "../data/mockData";

export interface SearchResult {
  type: "Email" | "Case" | "Campaign" | "Investigation" | "Domain" | "IP";
  name: string;
  subtitle: string;
  path: string;
}

export function globalSearch(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResult[] = [];

  emails.forEach((e) => {
    if (
      e.from.toLowerCase().includes(q) ||
      e.subject.toLowerCase().includes(q) ||
      e.fromDomain.toLowerCase().includes(q)
    ) {
      results.push({
        type: "Email",
        name: e.subject,
        subtitle: e.from,
        path: "/inbox",
      });
    }
  });

  cases.forEach((c) => {
    if (
      c.id.toLowerCase().includes(q) ||
      c.threat.toLowerCase().includes(q) ||
      c.relatedDomains.some((d) => d.toLowerCase().includes(q)) ||
      c.relatedIp.toLowerCase().includes(q)
    ) {
      results.push({
        type: "Case",
        name: `#${c.id}`,
        subtitle: `${c.threat} · ${c.status}`,
        path: "/cases",
      });
    }
  });

  campaigns.forEach((c) => {
    if (
      c.name.toLowerCase().includes(q) ||
      `campaign #${c.number}`.includes(q) ||
      String(c.number).includes(q) ||
      c.commonIndicators.some((i) => i.toLowerCase().includes(q))
    ) {
      results.push({
        type: "Campaign",
        name: `Campaign #${c.number}`,
        subtitle: c.name,
        path: "/campaigns",
      });
    }
  });

  investigations.forEach((i) => {
    if (i.title.toLowerCase().includes(q) || i.id.toLowerCase().includes(q)) {
      results.push({
        type: "Investigation",
        name: i.title,
        subtitle: i.id,
        path: "/investigations",
      });
    }
  });


  infrastructureNodes.forEach((node) => {
    if (
      node.ip.toLowerCase().includes(q) ||
      node.hostname.toLowerCase().includes(q) ||
      node.label.toLowerCase().includes(q) ||
      node.infrastructure.toLowerCase().includes(q)
    ) {
      results.push({
        type: node.ip.toLowerCase().includes(q) ? "IP" : "Domain",
        name: node.ip,
        subtitle: `${node.hostname} · ${node.role}`,
        path: "/investigations",
      });
    }
  });

  return results.slice(0, 8);
}
