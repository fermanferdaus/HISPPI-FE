import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";
import { API_BASE_URL } from "../../../config/api";

export default function DpdAdd() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [form, setForm] = useState({
    nama: "",
    provinsi: "",
    alamat_sekretariat: "",
    nomor: "",
  });

  const [foto, setFoto] = useState(null); // file gambar
  const [preview, setPreview] = useState(null); // preview sebelum upload
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Handle upload gambar (preview)
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file)); // tampilkan preview
    }
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("nama", form.nama);
      formData.append("provinsi", form.provinsi);
      formData.append("alamat_sekretariat", form.alamat_sekretariat);
      formData.append("nomor", form.nomor);
      if (foto) formData.append("foto", foto);

      const res = await fetch(`${API_BASE_URL}/dpd`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal menambah data DPD.");
      } else {
        navigate("/admin/dpd", {
          state: {
            alert: {
              type: "success",
              message: "Data DPD berhasil ditambahkan",
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
          Tambah Dewan Pengurus Daerah
        </h1>
        <p className="text-gray-500 mt-1">
          Lengkapi formulir di bawah untuk menambahkan data Ketua DPD baru.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Ketua */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama Ketua DPD
            </label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Masukkan nama lengkap Ketua DPD"
              required
            />
          </div>

          {/* Provinsi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Provinsi
            </label>
            <input
              type="text"
              value={form.provinsi}
              onChange={(e) => setForm({ ...form, provinsi: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Masukkan nama provinsi"
              required
            />
          </div>

          {/* Alamat Sekretariat */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Alamat Sekretariat
            </label>
            <textarea
              value={form.alamat_sekretariat}
              onChange={(e) =>
                setForm({ ...form, alamat_sekretariat: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Masukkan alamat lengkap sekretariat"
              required
            ></textarea>
          </div>

          {/* Nomor Kontak */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nomor Kontak
            </label>
            <input
              type="text"
              value={form.nomor}
              onChange={(e) => setForm({ ...form, nomor: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Contoh: 08123456789"
            />
          </div>

          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Foto Ketua DPD
            </label>
            <div className="flex flex-col md:flex-row items-start gap-5">
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
                    {foto ? "Ganti Foto" : "Upload Foto"}
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
              onClick={() => navigate("/admin/dpd")}
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
              {loading ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
