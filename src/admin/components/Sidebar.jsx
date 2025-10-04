import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Newspaper,
  Users,
  Info,
  Home,
  LogOut,
  Handshake,
  BookOpenText,
  Layers,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar({ role }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: Home },
    { path: "/admin/news", label: "Berita", icon: Newspaper },
    ...(role === "superadmin"
      ? [
          { path: "/admin/info", label: "Informasi", icon: Info },
          { path: "/admin/categories", label: "Kategori", icon: Layers },
          { path: "/admin/pengurus", label: "Kepengurusan", icon: BookOpenText },
          { path: "/admin/partners", label: "Kemitraan", icon: Handshake },
          { path: "/admin/users", label: "Admin", icon: Users },
        ]
      : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* 🔹 Hamburger Button (Mobile Only) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-lg shadow-md hover:bg-green-800 transition"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* 🔹 Overlay Background (Mobile Only) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-64 bg-gradient-to-b from-green-800 to-green-900 text-white flex flex-col shadow-xl transform transition-transform duration-300 z-50 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-green-700">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo HISPPI"
              className="w-10 h-10 object-contain rounded-full bg-white p-1"
            />
            <div>
              <h1 className="font-extrabold text-lg tracking-wide">HISPPI PNF</h1>
              <p className="text-xs text-green-200">Dashboard Administrator</p>
            </div>
          </div>

          {/* Tombol Close di mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-green-100 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)} // tutup menu saat klik di mobile
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-green-700 text-white shadow-inner"
                    : "text-green-100 hover:bg-green-700/50 hover:text-white"
                }`}
              >
                <Icon size={18} /> <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-green-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-left text-green-100 hover:bg-green-700/50 hover:text-white transition-all duration-200"
          >
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
