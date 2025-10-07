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

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // 🔹 Ambil alert dari navigasi (setelah tambah/edit)
  useEffect(() => {
    if (location.state?.alert) {
      const { type, message } = location.state.alert;
      showAlert(type, message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location]);

  // 🔹 Ambil daftar admin
  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const filtered = data.filter((u) => u.role === "admin");
      setAdmins(filtered);
      setFilteredAdmins(filtered);
    } catch (err) {
      console.error("Gagal memuat data admin:", err);
      showAlert("error", "Gagal memuat data admin.");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 🔍 Filter pencarian
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = admins.filter(
      (a) =>
        a.name.toLowerCase().includes(term) ||
        a.email.toLowerCase().includes(term)
    );
    setFilteredAdmins(filtered);
  }, [searchTerm, admins]);

  // 🔹 Alert helper
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  // 🔹 Hapus admin
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${API_BASE_URL}/users/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        showAlert("success", `Admin "${deleteTarget.name}" berhasil dihapus.`);
        fetchAdmins();
      } else {
        showAlert("error", data.message || "Gagal menghapus admin.");
      }
    } catch (err) {
      showAlert("error", "Terjadi kesalahan server saat menghapus.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="p-4 relative">
      {/* Header */}
      <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row mb-8 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Kelola Admin Sistem
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Tambah, ubah, atau hapus akun admin pada sistem HISPPI PNF.
          </p>
        </div>
        <button
          onClick={() => navigate("add")}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-all shadow-sm"
        >
          <PlusCircle size={18} /> Tambah Admin
        </button>
      </div>

      {/* 🔍 Pencarian */}
      <div className="mb-6 flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm max-w-sm">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Cari nama atau email admin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Alert */}
      {alert && (
        <div
          className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium border shadow-sm transition-all duration-300 ${
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

      {/* ✅ Tabel Responsif */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold w-16">#</th>
                <th className="px-6 py-3 font-semibold">Nama</th>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold w-48 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((a, i) => (
                  <tr
                    key={a.id}
                    className={`${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-green-50/60 transition`}
                  >
                    <td className="px-6 py-3 border-b border-gray-100 font-medium text-gray-700">
                      {i + 1}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100">
                      {a.name}
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100">
                      {a.email}
                    </td>
                    <td className="px-6 py-3 text-center border-b border-gray-100">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => navigate(`edit/${a.id}`)}
                          className="inline-flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition shadow-sm"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(a)}
                          className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition shadow-sm"
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
                    colSpan="4"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    {searchTerm
                      ? "Tidak ada hasil pencarian."
                      : "Belum ada admin yang terdaftar."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Hapus */}
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
              Yakin ingin menghapus admin{" "}
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
