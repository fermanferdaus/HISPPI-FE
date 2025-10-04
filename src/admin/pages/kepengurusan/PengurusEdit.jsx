import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";

export default function PengurusEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [form, setForm] = useState({
    periode: "",
    ketua_umum: "",
    sekjen: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Ambil data kepengurusan berdasarkan ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/kepengurusan/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setForm({
          periode: data.periode || "",
          ketua_umum: data.ketua_umum || "",
          sekjen: data.sekjen || "",
        });
      } catch (err) {
        console.error("Gagal memuat data kepengurusan:", err);
        navigate("/admin/pengurus", {
          state: {
            alert: {
              type: "error",
              message: "Gagal memuat data kepengurusan.",
            },
          },
        });
      }
    };
    fetchData();
  }, [id, navigate]);

  // 🔹 Simpan perubahan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/kepengurusan/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/admin/pengurus", {
          state: {
            alert: {
              type: "success",
              message: "Data kepengurusan berhasil diperbarui!",
            },
          },
        });
      } else {
        navigate("/admin/pengurus", {
          state: {
            alert: {
              type: "error",
              message: data.message || "Gagal memperbarui data.",
            },
          },
        });
      }
    } catch (err) {
      console.error(err);
      navigate("/admin/pengurus", {
        state: {
          alert: {
            type: "error",
            message: "Terjadi kesalahan server.",
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          Edit Data Kepengurusan
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Perbarui informasi kepengurusan di bawah ini.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Periode */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Periode
            </label>
            <input
              type="text"
              value={form.periode}
              onChange={(e) => setForm({ ...form, periode: e.target.value })}
              placeholder="Contoh: 2023 - 2027"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Ketua Umum */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ketua Umum
            </label>
            <input
              type="text"
              value={form.ketua_umum}
              onChange={(e) => setForm({ ...form, ketua_umum: e.target.value })}
              placeholder="Masukkan nama Ketua Umum"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Sekjen */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Sekretaris Jenderal
            </label>
            <input
              type="text"
              value={form.sekjen}
              onChange={(e) => setForm({ ...form, sekjen: e.target.value })}
              placeholder="Masukkan nama Sekretaris Jenderal"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/admin/pengurus")}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg font-medium transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg font-medium shadow transition-all ${
                loading && "opacity-70 cursor-not-allowed"
              }`}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
