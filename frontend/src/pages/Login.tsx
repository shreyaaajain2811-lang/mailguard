import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Search as SearchIcon,
  FileText,
  ShieldAlert,
} from "lucide-react";
import { useToast } from "../components/Toast";

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState("analyst@company.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setError("Enter your password.");
      return;
    }
    setError("");
    navigate("/overview");
  }

  return (
    <div className="h-screen w-screen flex bg-base-bg overflow-hidden">
      <div className="hidden lg:flex flex-col justify-center w-[46%] px-16 relative overflow-hidden bg-gradient-to-br from-[#0a0e17] to-[#0d1220]">
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-14">
            <div className="w-11 h-11 rounded-lg bg-black overflow-hidden shrink-0">
              <img src="iris-logo.jpg" alt="IRIS" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">IRIS</div>
              <div className="text-[12px] text-slate-500">Intelligent Risk Identification System</div>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Safer Emails.
            <br />
            <span className="text-accent-blueLight">Stronger Investigations.</span>
          </h1>
          <p className="text-slate-400 text-[15px] mb-10 max-w-md">
            Detect. Investigate. Stop email threats with intelligence-driven forensic analysis.
          </p>

          <div className="flex flex-col gap-5 mb-14">
            {[
              { icon: Mail, title: "Detect Threats", body: "Identify malicious emails in real time" },
              { icon: SearchIcon, title: "Investigate Deeper", body: "Trace infrastructure and uncover campaigns" },
              { icon: FileText, title: "Preserve Evidence", body: "Maintain forensic integrity" },
              { icon: ShieldAlert, title: "Stay Ahead", body: "Turn insights into stronger defenses" },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-accent-blueLight" />
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold text-slate-200">{title}</div>
                  <div className="text-[12.5px] text-slate-500">{body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11.5px] text-slate-600 border-t border-base-border pt-4">
            — Trusted by security teams worldwide
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 right-0 opacity-40"
          viewBox="0 0 600 300"
          fill="none"
        >
          <circle cx="150" cy="240" r="3" fill="#5b9bff" />
          <circle cx="280" cy="200" r="3" fill="#ef4444" />
          <circle cx="380" cy="260" r="3" fill="#22c55e" />
          <circle cx="450" cy="190" r="3" fill="#f59e0b" />
          <path d="M150 240 Q220 180 280 200 T450 190" stroke="#2f7bff" strokeWidth="0.6" fill="none" opacity="0.5" />
          <path d="M280 200 Q330 240 380 260" stroke="#2f7bff" strokeWidth="0.6" fill="none" opacity="0.5" />
        </svg>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 relative">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            showToast("Support request submitted. Our team will reach out shortly.");
          }}
          className="absolute top-8 right-10 text-[13px] text-slate-400"
        >
          Need help? <span className="text-accent-blueLight font-medium">Contact Support</span>
        </a>

        <div className="w-full max-w-[420px] border border-base-border rounded-2xl p-9 bg-base-panel/40">
          <div className="flex items-center gap-2.5 mb-7">
            <div className="w-10 h-10 rounded-lg bg-black overflow-hidden shrink-0">
              <img src="iris-logo.jpg" alt="IRIS" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-white">IRIS</div>
              <div className="text-[10.5px] text-slate-500">Intelligent Risk Identification System</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Sign in</h2>
          <p className="text-slate-500 text-[13.5px] mb-7">Access your IRIS workspace</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-slate-300 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-base-panel2 border border-base-border rounded-lg pl-10 pr-4 py-2.5 text-[13.5px] text-slate-200 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-[13px] font-medium text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-[12.5px] text-accent-blueLight hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-base-panel2 border border-base-border rounded-lg pl-10 pr-10 py-2.5 text-[13.5px] text-slate-200 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && <p className="text-[12.5px] text-red-400 -mt-2">{error}</p>}

            <label className="flex items-center gap-2 text-[13px] text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-base-border bg-base-panel2 accent-accent-blue"
              />
              Remember me
            </label>

            <button
              type="submit"
              className="w-full bg-accent-blue hover:bg-accent-blueLight transition-colors text-white font-semibold rounded-lg py-2.5 flex items-center justify-center gap-2 text-[14px]"
            >
              Sign in →
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="h-px bg-base-border flex-1" />
              <span className="text-[12px] text-slate-600">or</span>
              <div className="h-px bg-base-border flex-1" />
            </div>

            <button
              type="button"
              onClick={() => showToast("Redirecting to Microsoft sign-in…")}
              className="w-full border border-base-border hover:bg-white/5 transition-colors text-slate-200 font-medium rounded-lg py-2.5 flex items-center justify-center gap-2.5 text-[13.5px]"
            >
              <span className="text-base">🪟</span> Sign in with Microsoft
            </button>
          </form>

          <p className="text-center text-[12.5px] text-slate-500 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => showToast("Please reach out to your organization's IRIS administrator.")}
              className="text-accent-blueLight hover:underline"
            >
              Contact your administrator
            </button>
          </p>
        </div>

        {showForgot && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
            <div className="w-full max-w-sm bg-base-panel2 border border-base-borderLight rounded-xl p-6 animate-slide-up">
              <h3 className="text-white font-semibold text-[15px] mb-2">Reset your password</h3>
              <p className="text-slate-400 text-[13px] mb-4">
                Enter your work email and we'll send you a reset link.
              </p>
              <input
                type="email"
                placeholder="analyst@company.com"
                className="w-full bg-base-panel border border-base-border rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-200 mb-4 focus:outline-none focus:border-accent-blue/50"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowForgot(false)}
                  className="px-4 py-2 rounded-lg text-[13px] text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowForgot(false);
                    showToast("Password reset link sent to your email.");
                  }}
                  className="px-4 py-2 rounded-lg text-[13px] bg-accent-blue text-white font-medium"
                >
                  Send reset link
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
