import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;