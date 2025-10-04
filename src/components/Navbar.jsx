import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDaftarOpen, setIsDaftarOpen] = useState(false); // ✅ toggle submenu Daftar
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setScrolled(true);
      return;
    }

    setScrolled(false);

    const hero = document.getElementById("hero");
    const heroHeight = hero ? hero.offsetHeight : 0;

    const handleScroll = () => {
      if (window.scrollY > heroHeight - 80) {
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
        ? "text-green-300 font-bold border-b-2 border-green-300"
        : "hover:text-green-200"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-green-700 shadow-md text-white"
          : "bg-transparent text-white"
      } px-6 py-4 flex justify-between items-center`}
    >
      {/* Logo + Judul */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo.png"
          alt="Logo HISPPI PNF"
          className="h-10 w-10 bg-white rounded-full p-1 shadow-md"
        />
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-lg md:text-2xl">HISPPI PNF</span>
          <span className="hidden md:block text-xs text-green-200">
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
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menu Desktop */}
      <div className="hidden md:flex space-x-8 font-medium items-center">
        <NavLink to="/" className={navLinkClass}>
          Beranda
        </NavLink>
        <NavLink to="/news" className={navLinkClass}>
          Berita
        </NavLink>

        {/* Dropdown Tentang */}
        <div className="relative group">
          <button className="flex items-center space-x-1 hover:text-green-200">
            <span
              className={`transition ${
                location.pathname.startsWith("/about")
                  ? "text-green-300 font-bold border-b-2 border-green-300"
                  : ""
              }`}
            >
              Tentang
            </span>
            <ChevronDown size={16} />
          </button>
          <div className="absolute left-0 top-full hidden group-hover:block bg-green-700 shadow-lg rounded-md w-56 py-2 z-50">
            <NavLink
              to="/about/sejarah"
              className="block px-4 py-2 hover:bg-green-600"
            >
              Sejarah
            </NavLink>
            <NavLink
              to="/about/visi-misi"
              className="block px-4 py-2 hover:bg-green-600"
            >
              Visi & Misi
            </NavLink>
            <NavLink
              to="/about/tujuan-fungsi"
              className="block px-4 py-2 hover:bg-green-600"
            >
              Tujuan & Fungsi
            </NavLink>
            <NavLink
              to="/about/logo"
              className="block px-4 py-2 hover:bg-green-600"
            >
              Logo Organisasi
            </NavLink>
            <NavLink
              to="/about/sejarah-kepengurusan"
              className="block px-4 py-2 hover:bg-green-600"
            >
              Sejarah Kepengurusan
            </NavLink>
            <NavLink
              to="/about/sekretariat"
              className="block px-4 py-2 hover:bg-green-600"
            >
              Sekretariat
            </NavLink>
            <NavLink
              to="/about/program-kerja"
              className="block px-4 py-2 hover:bg-green-600"
            >
              Program Kerja
            </NavLink>
            <NavLink
              to="/about/lagu"
              className="block px-4 py-2 hover:bg-green-600"
            >
              Lagu
            </NavLink>
          </div>
        </div>

        {/* Dropdown Daftar/Login */}
        <div className="relative group">
          <button className="flex items-center space-x-1 hover:text-green-200">
            <span>Daftar</span>
            <ChevronDown size={16} />
          </button>
          <div className="absolute left-0 top-full hidden group-hover:block bg-green-700 shadow-lg rounded-md w-52 py-2 z-50">
            <a
              href="https://bit.ly/InstrumenProfile_PKPPNF"
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-2 hover:bg-green-600"
            >
              Daftar
            </a>
            <NavLink to="/login" className="block px-4 py-2 hover:bg-green-600">
              Login
            </NavLink>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-green-700 shadow-md flex flex-col items-start space-y-4 py-6 px-6 md:hidden">
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Beranda
          </NavLink>
          <NavLink
            to="/news"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Berita
          </NavLink>

          {/* Dropdown Tentang Mobile */}
          <button
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium">Tentang</span>
            <ChevronDown
              size={16}
              className={`${isAboutOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isAboutOpen && (
            <div className="ml-4 flex flex-col space-y-2">
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
              <NavLink to="/about/sekretariat" onClick={() => setIsOpen(false)}>
                Sekretariat
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
            </div>
          )}

          {/* Dropdown Daftar/Login Mobile */}
          <button
            onClick={() => setIsDaftarOpen(!isDaftarOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium">Daftar</span>
            <ChevronDown
              size={16}
              className={`${isDaftarOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isDaftarOpen && (
            <div className="ml-4 flex flex-col space-y-2">
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
