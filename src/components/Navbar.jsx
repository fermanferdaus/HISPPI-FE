import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDaftarOpen, setIsDaftarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `transition px-2 py-1 ${
      isActive
        ? scrolled
          ? "text-green-200 font-bold border-b-2 border-green-200"
          : "text-green-700 font-bold border-b-2 border-green-700"
        : scrolled
        ? "hover:text-green-200"
        : "hover:text-green-700"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-500 ${
        scrolled
          ? "bg-green-700 text-white shadow-md"
          : "bg-transparent text-green-800"
      }`}
    >
      {/* Logo + Judul */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo.png"
          alt="Logo HISPPI PNF"
          className={`h-10 w-10 rounded-full p-1 shadow-md transition-all duration-300 ${
            scrolled ? "bg-white" : "bg-green-100"
          }`}
        />
        <div className="flex flex-col leading-tight">
          <span
            className={`font-bold text-lg md:text-2xl transition ${
              scrolled ? "text-white" : "text-green-800"
            }`}
          >
            HISPPI PNF
          </span>
          <span
            className={`hidden md:block text-xs transition ${
              scrolled ? "text-green-200" : "text-green-700"
            }`}
          >
            Himpunan Seluruh Pendidik & Penguji Indonesia <br />
            Pendidikan Non Formal
          </span>
        </div>
      </div>

      {/* Tombol Hamburger (Mobile) */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X
            size={28}
            className={`${scrolled ? "text-white" : "text-green-800"}`}
          />
        ) : (
          <Menu
            size={28}
            className={`${scrolled ? "text-white" : "text-green-800"}`}
          />
        )}
      </button>

      {/* Menu Desktop */}
      <div
        className={`hidden md:flex space-x-8 font-medium items-center transition-colors duration-300 ${
          scrolled ? "text-white" : "text-green-800"
        }`}
      >
        <NavLink to="/" className={navLinkClass}>
          Beranda
        </NavLink>
        <NavLink to="/news" className={navLinkClass}>
          Berita
        </NavLink>

        {/* Dropdown Tentang */}
        <div className="relative group">
          <button
            className={`flex items-center space-x-1 ${
              scrolled ? "hover:text-green-200" : "hover:text-green-700"
            }`}
          >
            <span
              className={`transition ${
                location.pathname.startsWith("/about") ||
                location.pathname === "/pengurus" ||
                location.pathname === "/ketua-dpd"
                  ? scrolled
                    ? "text-green-200 font-bold border-b-2 border-green-200"
                    : "text-green-700 font-bold border-b-2 border-green-700"
                  : ""
              }`}
            >
              Profil
            </span>

            <ChevronDown size={16} />
          </button>
          <div
            className={`absolute left-0 top-full hidden group-hover:block rounded-md w-56 py-2 z-50 shadow-lg ${
              scrolled ? "bg-green-700" : "bg-white border border-green-100"
            }`}
          >
            {[
              ["Sejarah", "/about/sejarah"],
              ["Visi & Misi", "/about/visi-misi"],
              ["Tujuan & Fungsi", "/about/tujuan-fungsi"],
              ["Logo Organisasi", "/about/logo"],
              ["Sejarah Kepengurusan", "/about/sejarah-kepengurusan"],
              ["Struktur Organisasi", "/pengurus"],
              ["Program Kerja", "/about/program-kerja"],
              ["Lagu", "/about/lagu"],
              ["Daftar Ketua DPD", "/ketua-dpd"],
              ["Kontak", "/about/kontak"],
            ].map(([label, link]) => (
              <NavLink
                key={link}
                to={link}
                className={({ isActive }) =>
                  `block px-4 py-2 transition ${
                    isActive
                      ? scrolled
                        ? "bg-green-600 text-white font-semibold"
                        : "bg-green-100 text-green-700 font-semibold"
                      : scrolled
                      ? "hover:bg-green-600"
                      : "hover:bg-green-50 text-green-700"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Dropdown Daftar/Login */}
        <div className="relative group">
          <button
            className={`flex items-center space-x-1 ${
              scrolled ? "hover:text-green-200" : "hover:text-green-700"
            }`}
          >
            <span>Daftar</span>
            <ChevronDown size={16} />
          </button>
          <div
            className={`absolute left-0 top-full hidden group-hover:block rounded-md w-52 py-2 z-50 shadow-lg ${
              scrolled ? "bg-green-700" : "bg-white border border-green-100"
            }`}
          >
            <a
              href="https://bit.ly/InstrumenProfile_PKPPNF"
              target="_blank"
              rel="noreferrer"
              className={`block px-4 py-2 ${
                scrolled
                  ? "hover:bg-green-600"
                  : "hover:bg-green-50 text-green-700"
              }`}
            >
              Daftar
            </a>
            <NavLink
              to="/login"
              className={`block px-4 py-2 ${
                scrolled
                  ? "hover:bg-green-600"
                  : "hover:bg-green-50 text-green-700"
              }`}
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div
          className={`absolute top-16 left-0 w-full flex flex-col items-start space-y-4 py-6 px-6 md:hidden text-left transition ${
            scrolled ? "bg-green-700 text-white" : "bg-white text-green-800"
          } shadow-md`}
        >
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Beranda
          </NavLink>
          <NavLink to="/news" onClick={() => setIsOpen(false)}>
            Berita
          </NavLink>

          {/* Dropdown Tentang Mobile */}
          <button
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            className="flex items-center justify-between w-full font-medium"
          >
            <span>Profil</span>
            <ChevronDown
              size={16}
              className={`${isAboutOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isAboutOpen && (
            <div className="flex flex-col space-y-2 w-full pl-2">
              <NavLink to="/about/sejarah" onClick={() => setIsOpen(false)}>
                Sejarah
              </NavLink>
              <NavLink to="/about/visi-misi" onClick={() => setIsOpen(false)}>
                Visi & Misi
              </NavLink>
              <NavLink
                to="/about/tujuan-fungsi"
                onClick={() => setIsOpen(false)}
              >
                Tujuan & Fungsi
              </NavLink>
              <NavLink to="/about/logo" onClick={() => setIsOpen(false)}>
                Logo Organisasi
              </NavLink>
              <NavLink
                to="/about/sejarah-kepengurusan"
                onClick={() => setIsOpen(false)}
              >
                Sejarah Kepengurusan
              </NavLink>
              <NavLink to="/pengurus" onClick={() => setIsOpen(false)}>
                Struktur Organisasi
              </NavLink>
              <NavLink
                to="/about/program-kerja"
                onClick={() => setIsOpen(false)}
              >
                Program Kerja
              </NavLink>
              <NavLink to="/about/lagu" onClick={() => setIsOpen(false)}>
                Lagu
              </NavLink>
              <NavLink to="/ketua-dpd" onClick={() => setIsOpen(false)}>
                Daftar Ketua DPD
              </NavLink>
              <NavLink to="/about/kontak" onClick={() => setIsOpen(false)}>
                Kontak
              </NavLink>
            </div>
          )}

          {/* Dropdown Daftar/Login Mobile */}
          <button
            onClick={() => setIsDaftarOpen(!isDaftarOpen)}
            className="flex items-center justify-between w-full font-medium"
          >
            <span>Daftar</span>
            <ChevronDown
              size={16}
              className={`${isDaftarOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isDaftarOpen && (
            <div className="flex flex-col space-y-2 w-full pl-2">
              <a
                href="https://bit.ly/InstrumenProfile_PKPPNF"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
              >
                Daftar
              </a>
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
