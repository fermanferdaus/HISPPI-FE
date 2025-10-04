import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";
import { API_BASE_URL } from "../../../config/api";

export default function NewsAdd() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author_name: "",
    content: "",
    category_id: "",
  });
  const [image, setImage] = useState(null); // 🖼️ file gambar
  const [preview, setPreview] = useState(null); // 🖼️ preview sebelum upload
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Ambil kategori dari backend
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

  // 🔹 Handle upload gambar (preview)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // preview
    }
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const formData = new FormData();

      // masukkan semua field
      formData.append("title", form.title);
      formData.append("author_name", form.author_name);
      formData.append("content", form.content);
      formData.append("category_id", form.category_id);
      if (image) formData.append("image", image);

      const res = await fetch(`${API_BASE_URL}/news`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal menambah berita.");
      } else {
        // navigasi ke /admin/news dengan alert state
        navigate("/admin/news", {
          state: {
            alert: {
              type: "success",
              message: "Berita berhasil ditambahkan",
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
        <h1 className="text-3xl font-bold text-green-700">Tambah Berita</h1>
        <p className="text-gray-500 mt-1">
          Lengkapi formulir di bawah untuk menambahkan berita baru ke sistem.
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

          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gambar Berita
            </label>
            <div className="flex flex-col md:flex-row items-start gap-5">
              <label className="flex flex-col items-center justify-center w-full md:w-1/4 h-32 border-2 border-dashed border-green-400 rounded-lg cursor-pointer hover:bg-green-50 transition-all duration-200">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div className="text-center text-green-600">
                  <ImagePlus size={26} className="mx-auto mb-1" />
                  <p className="text-xs font-medium">
                    {image ? "Ganti Gambar" : "Upload Gambar"}
                  </p>
                </div>
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-auto rounded-lg shadow-sm border border-gray-200 object-cover"
                />
              )}
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
              {loading ? "Menyimpan..." : "Simpan Berita"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
