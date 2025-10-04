import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";
import { API_BASE_URL } from "../../../config/api";

export default function PartnersEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", logo: null });
  const [preview, setPreview] = useState(null);
  const [oldLogo, setOldLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // 🔹 Ambil data mitra berdasarkan ID
  useEffect(() => {
    fetch(`${API_BASE_URL}/partners/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({ name: data.name, url: data.url, logo: null });
        setOldLogo(data.logo);
        setPreview(`${API_BASE_URL}/uploads/${data.logo}`);
      })
      .catch(() =>
        navigate("/admin/partners", {
          state: {
            alert: { type: "error", message: "Gagal memuat data mitra." },
          },
        })
      );
  }, [id]);

  // 🔹 Ganti file logo baru
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, logo: file });
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // 🔹 Update data mitra
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("url", form.url);
    if (form.logo) formData.append("logo", form.logo);

    try {
      const res = await fetch(`${API_BASE_URL}/partners/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        navigate("/admin/partners", {
          state: {
            alert: {
              type: "success",
              message: `Mitra berhasil diperbarui!`,
            },
          },
        });
      } else {
        const data = await res.json();
        navigate("/admin/partners", {
          state: {
            alert: {
              type: "error",
              message: data.message || "Gagal memperbarui mitra.",
            },
          },
        });
      }
    } catch {
      navigate("/admin/partners", {
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
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-green-700 mb-2">Edit Mitra</h1>
      <p className="text-gray-500 mb-8">
        Perbarui informasi mitra di bawah ini. Kosongkan logo jika tidak ingin
        mengganti.
      </p>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Nama Mitra */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Mitra
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Masukkan nama mitra"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* URL Mitra */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL Mitra
            </label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="Masukkan URL website mitra"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Logo Lama */}
          {oldLogo && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Logo Saat Ini
              </label>
              <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-3">
                <img
                  src={`${API_BASE_URL}/uploads/${oldLogo}`}
                  alt="Logo Lama"
                  className="h-16 object-contain rounded"
                />
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Logo aktif saat ini</span> –
                  Kosongkan jika tidak ingin mengganti logo.
                </p>
              </div>
            </div>
          )}

          {/* Logo Baru */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Logo Baru (opsional)
            </label>
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-green-400 rounded-lg cursor-pointer hover:bg-green-50 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {preview && form.logo ? (
                <img
                  src={preview}
                  alt="Preview Baru"
                  className="h-32 object-contain rounded-lg"
                />
              ) : (
                <div className="text-gray-500 text-center">
                  <ImagePlus
                    className="mx-auto mb-2 text-green-600"
                    size={28}
                  />
                  <p className="text-sm">
                    {form.logo
                      ? "Ganti logo mitra"
                      : "Klik untuk pilih logo baru"}
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/admin/partners")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow transition ${
                loading && "opacity-70 cursor-not-allowed"
              }`}
            >
              {loading ? "Menyimpan..." : "Perbarui"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
