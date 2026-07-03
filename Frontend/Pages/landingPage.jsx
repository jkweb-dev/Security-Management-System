import { useNavigate } from "react-router-dom";
import Footer from "../Components/footer";

export const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }


  }
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .float-card { animation: float 6s ease-in-out infinite; }
        .pulse-dot { animation: pulseDot 1.8s ease-in-out infinite; }
      `}</style>

      <div className="relative overflow-hidden">
        {/* faint grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* LEFT COLUMN */}
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-mono text-xs tracking-wider text-slate-600 uppercase">
                  System Online · Live Monitoring
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-slate-900">
                Command your security
                <br />
                workforce with{" "}
                <span className="text-blue-700">precision.</span>
              </h1>

              {/* Description */}
              <p className="font-body mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                One platform to schedule guards, verify checkpoints, and
                track every shift in real time — built for operations teams
                who can't afford blind spots.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleGetStarted}
                  className="font-body px-7 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm sm:text-base shadow-lg shadow-slate-900/10 transition duration-300 hover:bg-blue-700 hover:shadow-blue-700/20 hover:-translate-y-0.5"
                >
                  Get Started
                </button>
                <button
                 
                  className="font-body px-7 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-sm sm:text-base transition duration-300 hover:border-slate-900 hover:-translate-y-0.5"
                >
                  View Live Demo
                </button>
              </div>

              {/* Feature strip */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-xl">
                {[
                  "Attendance Tracking",
                  "Zone Assignment",
                  "Guard Management",
                  "Reports & Analytics",
                ].map((label) => (
                  <div key={label} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-700 shrink-0"></span>
                    <span className="font-body text-sm text-slate-700 leading-snug">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <div className="font-display text-2xl font-bold text-slate-900">
                    500+
                  </div>
                  <div className="font-mono text-xs text-slate-500 uppercase tracking-wide">
                    Sites Secured
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-slate-900">
                    12K
                  </div>
                  <div className="font-mono text-xs text-slate-500 uppercase tracking-wide">
                    Guards Managed
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-slate-900">
                    24/7
                  </div>
                  <div className="font-mono text-xs text-slate-500 uppercase tracking-wide">
                    Live Monitoring
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Duty Card signature element */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                {/* back card */}
                <div className="float-card absolute -top-6 -right-4 w-full h-full rounded-3xl bg-blue-100/70 border border-blue-200"></div>

                {/* front card */}
                <div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-900/10 p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-widest text-slate-400 uppercase">
                      Duty Badge
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      #SG-04812
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-slate-900 flex items-center justify-center shrink-0">
                      <span className="font-display text-white text-lg font-bold">
                        AR
                      </span>
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold text-slate-900">
                        Ahmed Raza
                      </div>
                      <div className="font-body text-sm text-slate-500">
                        Senior Guard · Zone B
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5">
                      <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wide">
                        Shift
                      </div>
                      <div className="font-body text-sm font-semibold text-slate-800 mt-0.5">
                        08:00 – 20:00
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5">
                      <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wide">
                        Checkpoint
                      </div>
                      <div className="font-body text-sm font-semibold text-slate-800 mt-0.5">
                        Gate 3 — East
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="font-body text-sm font-semibold text-emerald-700">
                        On Duty
                      </span>
                    </div>
                    <span className="font-mono text-xs text-emerald-600">
                      scanned 2s ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>

   
  );
}
  


