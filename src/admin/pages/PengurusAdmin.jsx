import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PlusCircle,
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function PengurusAdmin() {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // 🔹 Ambil data kepengurusan
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/kepengurusan`);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error("Gagal mengambil data kepengurusan:", err);
      setAlert({
        type: "error",
        message: "Gagal memuat data kepengurusan.",
      });
    }
  };

  // 🔹 Saat pertama kali render
  useEffect(() => {
    fetchData();

    if (location.state?.alert) {
      setAlert(location.state.alert);
      window.history.replaceState({}, document.title);
      setTimeout(() => setAlert(null), 3000);
    }
  }, [location.state]);

  // 🔹 Hapus data kepengurusan
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id, periode } = deleteTarget;

    try {
      const res = await fetch(`${API_BASE_URL}/kepengurusan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setAlert({
          type: "success",
          message: `Data kepengurusan ${periode} berhasil dihapus.`,
        });
        setData((prev) => prev.filter((d) => d.id !== id));
      } else {
        setAlert({
          type: "error",
          message: data.message || "Gagal menghapus data.",
        });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: "Terjadi kesalahan server saat menghapus data.",
      });
    } finally {
      setDeleteTarget(null);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="p-4 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Kelola Sejarah Kepengurusan
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Tambah, ubah, atau hapus data kepengurusan periode HISPPI PNF.
          </p>
        </div>

        <button
          onClick={() => navigate("add")}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-all shadow-sm"
        >
          <PlusCircle size={18} /> Tambah Data
        </button>
      </div>

      {/* ✅ Alert */}
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
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {" "}
          {/* ✅ Tambahkan scroll wrapper */}
          <table className="w-full min-w-[600px] text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-700 w-16">
                  #
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Periode
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Ketua Umum
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Sekjen
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700 w-40">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-3 text-gray-700 font-medium">
                    {i + 1}
                  </td>
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {p.periode}
                  </td>
                  <td className="px-6 py-3 text-gray-700">{p.ketua_umum}</td>
                  <td className="px-6 py-3 text-gray-700">{p.sekjen}</td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => navigate(`edit/${p.id}`)}
                        className="inline-flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() =>
                          setDeleteTarget({ id: p.id, periode: p.periode })
                        }
                        className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-all shadow-sm"
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Belum ada data kepengurusan.
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
              Yakin ingin menghapus data kepengurusan{" "}
              <span className="font-semibold text-gray-800">
                "{deleteTarget.periode}"
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
