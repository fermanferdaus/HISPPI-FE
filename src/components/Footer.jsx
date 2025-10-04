import { Link } from "react-router-dom";
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Kiri - Logo & Deskripsi */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="/logo.png"
              alt="Logo HISPPI"
              className="h-12 w-12 bg-white rounded-full p-1 shadow-md"
            />
            <h2 className="text-xl font-bold">HISPPI PNF</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Himpunan Seluruh Pendidik & Penguji Indonesia Pendidikan Non Formal.
            Bersama-sama meningkatkan kualitas pendidikan non formal di
            Indonesia.
          </p>
        </div>

        {/* Tengah - Tautan Cepat */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-white">
                Berita
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                Tentang
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Kanan - Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontak</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-3">
              <FaEnvelope /> <span>info@hisppi.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaWhatsapp /> <span>(021) 6299487</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt /> <span>Jalan Kartini VIII No. 54/O Jakarta, Indonesia</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-green-700 pt-6">
        © 2025 HISPPI PNF. Semua Hak Dilindungi.
      </div>
    </footer>
  );
}
