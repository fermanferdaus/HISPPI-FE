import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PlusCircle,
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function PartnersAdmin() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Ambil alert dari navigasi (tambah/edit)
  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
      window.history.replaceState({}, document.title);
      setTimeout(() => setAlert(null), 3000);
    }
  }, [location.state]);

  // 🔹 Ambil data mitra
  const fetchPartners = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/partners`);
      const data = await res.json();
      setPartners(data);
      setFilteredPartners(data);
    } catch (err) {
      console.error("Gagal memuat mitra:", err);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // 🔍 Filter pencarian
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = partners.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.url || "").toLowerCase().includes(term)
    );
    setFilteredPartners(filtered);
  }, [searchTerm, partners]);

  // 🔹 Tampilkan alert
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  // 🔹 Hapus mitra
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${API_BASE_URL}/partners/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        showAlert("success", `Mitra "${deleteTarget.name}" berhasil dihapus.`);
        fetchPartners();
      } else {
        showAlert("error", data.message || "Gagal menghapus mitra.");
      }
    } catch (err) {
      showAlert("error", "Terjadi kesalahan server saat menghapus.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="p-4 relative">
      {/* 🔹 Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-green-700">Kelola Mitra</h1>
          <p className="text-gray-500 text-sm mt-1">
            Tambah, ubah, atau hapus mitra kerja sama institusi.
          </p>
        </div>

        <button
          onClick={() => navigate("add")}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 shadow-sm transition-all"
        >
          <PlusCircle size={18} /> Tambah Mitra
        </button>
      </div>

      {/* 🔍 Pencarian */}
      <div className="mb-6 flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm max-w-sm">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Cari nama atau URL mitra..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* 🔹 Alert */}
      {alert && (
        <div
          className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium border transition-all duration-300 ${
            alert.type === "success"
              ? "bg-green-50 border-green-400 text-green-700"
              : "bg-red-50 border-red-400 text-red-700"
          }`}
        >
          {alert.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <XCircle size={18} />
          )}
          <span>{alert.message}</span>
        </div>
      )}

      {/* 🔹 Tabel Mitra */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-700 w-10">
                  #
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700 w-24">
                  Logo
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Nama Mitra
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">URL</th>
                <th className="px-6 py-3 font-semibold text-gray-700 w-40 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.length > 0 ? (
                filteredPartners.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-3 text-gray-700 font-medium">
                      {i + 1}
                    </td>

                    {/* Logo */}
                    <td className="px-6 py-3">
                      <img
                        src={`${API_BASE_URL}/uploads/${p.logo}`}
                        alt={p.name}
                        className="w-12 h-12 object-contain border border-gray-200 rounded-lg bg-white"
                      />
                    </td>

                    {/* Nama Mitra */}
                    <td className="px-6 py-3 text-gray-800 font-medium">
                      {p.name}
                    </td>

                    {/* URL */}
                    <td className="px-6 py-3 text-gray-600">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {p.url || "-"}
                      </a>
                    </td>

                    {/* Aksi */}
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => navigate(`edit/${p.id}`)}
                          className="inline-flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    {searchTerm
                      ? "Tidak ada hasil pencarian."
                      : "Belum ada mitra yang ditambahkan."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 Modal Konfirmasi Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-600" size={22} />
              <h2 className="text-lg font-semibold text-gray-800">
                Konfirmasi Hapus
              </h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Apakah Anda yakin ingin menghapus mitra{" "}
              <span className="font-semibold text-gray-800">
                "{deleteTarget.name}"
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-gray-800 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
