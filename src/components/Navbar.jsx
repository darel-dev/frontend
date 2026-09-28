import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isBrowseActive = location.pathname === "/";
  const isCreateActive = location.pathname === "/create";

  const browseClasses = isBrowseActive
    ? "bg-slate-950 text-white shadow-lg shadow-slate-900/15"
    : "text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-sm";

  return (
    <nav className="sticky top-0 z-40 border-b border-white/50 bg-white/75 backdrop-blur-2xl shadow-sm shadow-slate-950/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between gap-4 py-3">
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3 rounded-2xl pr-2 transition-transform hover:-translate-y-0.5"
            aria-label="Go to inventory overview"
          >
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 text-white shadow-xl shadow-indigo-950/20 ring-1 ring-white/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(129,140,248,0.9),_transparent_42%),radial-gradient(circle_at_80%_80%,_rgba(45,212,191,0.75),_transparent_38%)] opacity-90 transition-transform duration-300 group-hover:scale-110" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="relative h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3 3a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2H3zm10 0a2 2 0 00-2 2v10a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2h-4zM3 11a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2v-2a2 2 0 00-2-2H3z" />
              </svg>
            </div>
            <div className="leading-tight">
              <p className="text-base font-black tracking-tight text-slate-950">
                Inventory<span className="text-indigo-600">HQ</span>
              </p>
              <p className="hidden text-[0.68rem] font-bold uppercase tracking-[0.24em] text-slate-500 sm:block">
                MERN control room
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/60 p-1 shadow-sm ring-1 ring-slate-900/5">
            <Link
              to="/"
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-all duration-200 sm:px-4 ${browseClasses}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4 3a2 2 0 00-2 2v2.5A1.5 1.5 0 003.5 9h13A1.5 1.5 0 0018 7.5V5a2 2 0 00-2-2H4zm-.5 8A1.5 1.5 0 002 12.5V15a2 2 0 002 2h12a2 2 0 002-2v-2.5a1.5 1.5 0 00-1.5-1.5h-13z" />
              </svg>
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Items</span>
            </Link>
            <Link
              to="/create"
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-all duration-200 active:scale-95 sm:px-4 ${
                isCreateActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-violet-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">New Item</span>
              <span className="sm:hidden">New</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
