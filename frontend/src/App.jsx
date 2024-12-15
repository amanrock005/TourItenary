import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PackagePage from "./pages/PackagePage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/packages" element={<PackagePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}
