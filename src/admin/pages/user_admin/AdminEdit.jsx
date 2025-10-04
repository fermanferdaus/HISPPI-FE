import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";

export default function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch data admin yang akan diedit
  const fetchAdmin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const target = data.find((u) => u.id === parseInt(id));

      if (target) {
        setForm({
          name: target.name,
          email: target.email,
          password: "",
        });
      } else {
        setAlert({ type: "error", message: "Admin tidak ditemukan." });
      }
    } catch (err) {
      console.error("Gagal memuat data admin:", err);
      setAlert({ type: "error", message: "Terjadi kesalahan server." });
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, [id]);

  // Update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/admin/users", {
          state: {
            alert: {
              type: "success",
              message: "Data admin berhasil diperbarui!",
            },
          },
        });
      } else {
        navigate("/admin/users", {
          state: {
            alert: {
              type: "error",
              message: data.message || "Gagal memperbarui data admin.",
            },
          },
        });
      }
    } catch (err) {
      console.error("Gagal memperbarui admin:", err);
      navigate("/admin/users", {
        state: {
          alert: { type: "error", message: "Terjadi kesalahan server." },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 relative">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-700">Edit Admin</h1>
        <p className="text-gray-500 text-sm mt-1">
          Perbarui informasi admin di bawah ini. Kosongkan kolom password jika
          tidak ingin mengubahnya.
        </p>
      </div>

      {/* Full Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Admin */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Admin
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Masukkan nama admin"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Email Admin */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Admin
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Masukkan email admin"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Password Baru (opsional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password Baru (opsional)
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Kosongkan jika tidak ingin mengubah password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-lg font-medium shadow transition ${
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
