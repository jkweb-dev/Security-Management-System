import { ArrowUpRight } from "lucide-react";

const linkColumns = [
  {
    title: "Product",
    links: ["Attendance Tracking", "Location Assignment", "Guard Management", "Reports & Analytics", "Mobile App"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press Kit", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Help Center", "Security", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Data Processing", "Compliance"],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-white text-slate-900 font-['Inter',sans-serif] overflow-hidden">
      {/* Soft ambient accents, matching hero */}
      <div className="pointer-events-none absolute w-[420px] h-[420px] bg-indigo-100/60 blur-3xl rounded-full -top-40 -left-40" />
      <div className="pointer-events-none absolute w-[420px] h-[420px] bg-sky-100/60 blur-3xl rounded-full -bottom-40 -right-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Link columns */}
        <div className="py-14 sm:py-16 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10">
          {linkColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase font-['Plus_Jakarta_Sans',sans-serif]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-sm text-slate-600 transition duration-200 hover:text-indigo-600"
                    >
                      {link}
                      <ArrowUpRight
                        size={13}
                        strokeWidth={2}
                        className="opacity-0 -translate-x-1 transition duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © 2026 Sentinel Security Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}