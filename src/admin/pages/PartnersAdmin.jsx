import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PlusCircle,
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function PartnersAdmin() {
  const [partners, setPartners] = useState([]);
  const [alert, setAlert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Ambil alert dari navigasi (tambah/edit)
  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
      window.history.replaceState({}, document.title); // hapus alert state setelah tampil
      setTimeout(() => setAlert(null), 3000);
    }
  }, [location.state]);

  // 🔹 Ambil data mitra
  const fetchPartners = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/partners`);
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error("Gagal memuat mitra:", err);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // 🔹 Tampilkan alert auto-hilang
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  // 🔹 Hapus partner
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${API_BASE_URL}/partners/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        showAlert("success", `Mitra berhasil dihapus.`);
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
      <div className="flex justify-between items-center mb-8">
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
            <AlertTriangle size={18} />
          )}
          <span>{alert.message}</span>
        </div>
      )}

      {/* 🔹 Daftar Partner */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        {partners.length === 0 ? (
          <p className="text-gray-500 italic text-center py-6">
            Belum ada mitra yang ditambahkan.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((p) => (
              <div
                key={p.id}
                className="border border-gray-100 rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all bg-white"
              >
                <img
                  src={`${API_BASE_URL}/uploads/${p.logo}`}
                  alt={p.name}
                  className="h-20 object-contain mb-3"
                />
                <h3 className="font-semibold text-gray-800">{p.name}</h3>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 text-sm mt-1 hover:underline"
                >
                  {p.url.replace(/^https?:\/\//, "")}
                </a>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => navigate(`edit/${p.id}`)}
                    className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(p)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
