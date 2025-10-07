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
  Building2,
  Network,
} from "lucide-react";

export default function Sidebar({ role }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Kategori menu (dengan grup)
  const menuGroups = [
    {
      title: "MAIN MENU",
      items: [{ path: "/admin", label: "Dashboard", icon: Home }],
    },
    {
      title: "KONTEN",
      items: [
        { path: "/admin/news", label: "Berita", icon: Newspaper },
        ...(role?.toLowerCase() === "superadmin"
          ? [
              { path: "/admin/info", label: "Informasi", icon: Info },
              { path: "/admin/categories", label: "Kategori", icon: Layers },
            ]
          : []),
      ],
    },
    ...(role?.toLowerCase() === "superadmin"
      ? [
          {
            title: "KEPENGURUSAN",
            items: [
              {
                path: "/admin/pengurus",
                label: "Sejarah Kepengurusan",
                icon: BookOpenText,
              },
              {
                path: "/admin/dpd",
                label: "Dewan Pengurus Daerah",
                icon: Building2,
              },
              {
                path: "/admin/struktur",
                label: "Struktur Organisasi",
                icon: Network,
              },
            ],
          },
          {
            title: "RELASI",
            items: [
              { path: "/admin/partners", label: "Kemitraan", icon: Handshake },
            ],
          },
          {
            title: "PENGATURAN",
            items: [{ path: "/admin/users", label: "Admin", icon: Users }],
          },
        ]
      : []),
  ];

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* 🔹 Tombol Hamburger (Mobile) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-lg shadow-md hover:bg-green-800 transition"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* 🔹 Overlay (Mobile) */}
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
        {/* Header Sidebar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-green-700">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo HISPPI"
              className="w-10 h-10 object-contain rounded-full bg-white p-1"
            />
            <div>
              <h1 className="font-extrabold text-lg tracking-wide">
                HISPPI PNF
              </h1>
              <p className="text-xs text-green-200">Dashboard Administrator</p>
            </div>
          </div>

          {/* Tombol Close (Mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-green-100 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto sidebar-scroll">
          {menuGroups.map(
            (group, idx) =>
              group.items.length > 0 && (
                <div key={idx} className="mb-5">
                  <h2 className="text-xs font-semibold text-green-300 uppercase px-4 mb-2 tracking-wide">
                    {group.title}
                  </h2>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        item.path === "/admin"
                          ? location.pathname === "/admin"
                          : location.pathname.startsWith(item.path);

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-green-700 text-white shadow-inner"
                              : "text-green-100 hover:bg-green-700/50 hover:text-white"
                          }`}
                        >
                          <Icon size={18} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )
          )}
        </nav>

        {/* Footer / Tombol Logout */}
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
