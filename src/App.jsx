import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import ViewItem from "./pages/ViewItem";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.36),_transparent_34rem),radial-gradient(circle_at_85%_10%,_rgba(45,212,191,0.22),_transparent_28rem),linear-gradient(180deg,_#eef2ff_0%,_#f8fafc_44%,_#ffffff_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateItem />} />
            <Route path="/view/:id" element={<ViewItem />} />
            <Route path="/edit/:id" element={<EditItem />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
