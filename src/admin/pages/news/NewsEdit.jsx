import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus } from "lucide-react";
import { API_BASE_URL } from "../../../config/api";

export default function NewsEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author_name: "",
    content: "",
    category_id: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Ambil kategori
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const res = await fetch(`${API_BASE_URL}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Ambil data berita berdasarkan ID
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const res = await fetch(`${API_BASE_URL}/news/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        setForm({
          title: data.title,
          author_name: data.author_name,
          content: data.content,
          category_id: data.category_id,
        });
        setExistingImage(data.image || null);
      } catch (err) {
        console.error("Gagal memuat detail berita:", err);
      }
    };
    fetchNewsDetail();
  }, [id]);

  // 🔹 Handle upload gambar (preview)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Submit perubahan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("author_name", form.author_name);
      formData.append("content", form.content);
      formData.append("category_id", form.category_id);
      if (image) formData.append("image", image);

      const res = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal memperbarui berita.");
      } else {
        navigate("/admin/news", {
          state: {
            alert: {
              type: "success",
              message: "Berita berhasil diperbarui",
            },
          },
        });
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">Edit Berita</h1>
        <p className="text-gray-500 mt-1">
          Ubah informasi berita yang telah terdaftar di sistem.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul Berita */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Judul Berita
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Masukkan judul berita"
              required
            />
          </div>

          {/* Penulis */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Penulis
            </label>
            <input
              type="text"
              value={form.author_name}
              onChange={(e) =>
                setForm({ ...form, author_name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Masukkan nama penulis"
              required
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Kategori
            </label>
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({ ...form, category_id: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gambar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gambar Berita
            </label>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <label className="flex items-center justify-center w-full md:w-1/3 h-40 border-2 border-dashed border-green-400 rounded-lg cursor-pointer hover:bg-green-50 transition">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div className="text-center text-green-600">
                  <ImagePlus size={32} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">
                    {image ? "Ganti Gambar" : "Upload Gambar Baru"}
                  </p>
                </div>
              </label>

              {/* Preview */}
              <div className="flex gap-3 items-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-40 rounded-lg shadow border border-gray-200 object-cover"
                  />
                ) : existingImage ? (
                  <img
                    src={`${API_BASE_URL}/uploads/${existingImage}`}
                    alt="Current"
                    className="h-40 rounded-lg shadow border border-gray-200 object-cover"
                  />
                ) : (
                  <p className="text-gray-400 italic text-sm">
                    Tidak ada gambar saat ini
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Isi Berita */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Isi Berita
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 h-80 resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Tulis isi berita di sini..."
              required
            ></textarea>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/news")}
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
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
