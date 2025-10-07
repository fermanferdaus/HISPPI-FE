import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";
import { API_BASE_URL } from "../../../config/api";

export default function StrukturEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [form, setForm] = useState({
    nama: "",
    jabatan: "",
    periode: "",
  });

  const [foto, setFoto] = useState(null); // file baru
  const [preview, setPreview] = useState(null); // preview baru
  const [oldFoto, setOldFoto] = useState(null); // foto lama
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Ambil data struktur berdasarkan ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/struktur/${id}`);
        if (!res.ok) throw new Error("Gagal memuat data struktur");
        const data = await res.json();
        setForm({
          nama: data.nama || "",
          jabatan: data.jabatan || "",
          periode: data.periode || "",
        });
        setOldFoto(data.foto);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data struktur organisasi.");
      }
    };
    fetchData();
  }, [id]);

  // 🖼️ Handle upload foto baru
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 💾 Submit update ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("nama", form.nama);
      formData.append("jabatan", form.jabatan);
      formData.append("periode", form.periode);
      if (foto) formData.append("foto", foto);

      const res = await fetch(`${API_BASE_URL}/struktur/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal memperbarui data struktur.");
      } else {
        navigate("/admin/struktur", {
          state: {
            alert: {
              type: "success",
              message: "Data struktur berhasil diperbarui.",
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
        <h1 className="text-3xl font-bold text-green-700">
          Edit Struktur Organisasi
        </h1>
        <p className="text-gray-500 mt-1">
          Ubah informasi pengurus DPP HISPPI PNF yang terdaftar di sistem.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama Pengurus
            </label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Masukkan nama lengkap pengurus"
              required
            />
          </div>

          {/* Jabatan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Jabatan
            </label>
            <input
              type="text"
              value={form.jabatan}
              onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Contoh: Ketua Umum, Sekretaris, Bendahara..."
              required
            />
          </div>

          {/* Periode */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Periode
            </label>
            <input
              type="text"
              value={form.periode}
              onChange={(e) => setForm({ ...form, periode: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Contoh: 2023–2028"
              required
            />
          </div>

          {/* Foto */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Foto Pengurus
            </label>
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Upload area */}
              <label className="flex flex-col items-center justify-center w-full md:w-1/4 h-32 border-2 border-dashed border-green-400 rounded-lg cursor-pointer hover:bg-green-50 transition-all duration-200">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFotoChange}
                />
                <div className="text-center text-green-600">
                  <ImagePlus size={26} className="mx-auto mb-1" />
                  <p className="text-xs font-medium">
                    {foto ? "Ganti Foto" : "Upload Foto Baru"}
                  </p>
                </div>
              </label>

              {/* Preview Foto */}
              <div className="flex gap-4 items-start">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview Baru"
                    className="h-32 w-auto rounded-lg shadow-sm border border-gray-200 object-cover"
                  />
                ) : oldFoto ? (
                  <img
                    src={`${API_BASE_URL}/uploads/${oldFoto}`}
                    alt="Foto Lama"
                    className="h-32 w-auto rounded-lg shadow-sm border border-gray-200 object-cover"
                  />
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Belum ada foto pengurus.
                  </p>
                )}
              </div>
            </div>
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
              onClick={() => navigate("/admin/struktur")}
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
              {loading ? "Menyimpan..." : "Perbarui Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
