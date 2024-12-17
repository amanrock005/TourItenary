import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import AddPackagePage from "./components/AddPackage";
import PackageDetailsPage from "./components/PackageDetailed";
import BookingFormPage from "./pages/BookingFormPage";
import Invoice from "./components/Invoice";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./auth/AdminLogin";
import UpdatePackagePage from "./components/UpdatePackageForm";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/add" element={<AddPackagePage />} />
          <Route path="/update/:id" element={<UpdatePackagePage />} />
        </Route>
        <Route path="/package/:id" element={<PackageDetailsPage />} />
        <Route path="/book/:id" element={<BookingFormPage />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </div>
  );
}
