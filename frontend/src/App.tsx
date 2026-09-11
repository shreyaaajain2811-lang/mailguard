import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./layouts/AppShell";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Inbox from "./pages/Inbox";
import Alerts from "./pages/Alerts";
import Investigations from "./pages/Investigations";
import Campaigns from "./pages/Campaigns";
import Cases from "./pages/Cases";
import CaseInvestigation from "./pages/CaseInvestigation";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { ToastProvider } from "./components/Toast";
import { ThemeProvider } from "./components/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AppShell />}>
              <Route index element={<Navigate to="/overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="investigations" element={<Investigations />} />
              <Route path="campaigns" element={<Campaigns />} />
              <Route path="cases" element={<Cases />} />
              <Route path="case-investigations/:caseId" element={<CaseInvestigation />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Routes>
        </HashRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
