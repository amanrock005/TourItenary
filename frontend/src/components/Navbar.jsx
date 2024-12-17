import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="h-16 bg-blue-600 flex items-center justify-between px-6 shadow-md">
      {/* Logo Section */}
      <h1 className="text-2xl text-white font-bold tracking-wide">
        <Link to="/" className="hover:text-gray-200 transition duration-300">
          MakeMyTour
        </Link>
      </h1>

      {/* Admin Login Link */}
      <h4>
        <Link
          to="/admin-login"
          className="text-white text-lg hover:text-gray-200 transition duration-300"
        >
          Admin Login
        </Link>
      </h4>
    </nav>
  );
}
