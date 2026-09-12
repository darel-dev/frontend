import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-300/40 transition-transform group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
              </svg>
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-bold text-gray-900">
                MERN<span className="text-indigo-600">CRUD</span>
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Inventory
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                location.pathname === "/"
                  ? "bg-indigo-100 text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
              </svg>
              <span className="hidden sm:inline">Browse</span>
              <span className="sm:hidden">Items</span>
            </Link>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200/50 transition-all duration-200 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-xl hover:shadow-indigo-300/50 active:scale-95 sm:px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
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
