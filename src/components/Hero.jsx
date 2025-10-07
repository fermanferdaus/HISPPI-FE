import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

export default function Hero() {
  const [ketua, setKetua] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKetua = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/struktur/ketua`);
        if (!res.ok) throw new Error("Gagal fetch data ketua");
        const data = await res.json();
        setKetua(data);
      } catch (err) {
        console.error("Gagal memuat data ketua:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchKetua();
  }, []);

  const kataSambutan =
    "Pendidikan Non Formal memiliki potensi besar dalam membentuk sumber daya manusia yang kompeten, profesional, dan siap kerja dengan semangat kebersamaan untuk mencerdaskan dan menerampil­kan bangsa menghadapi tantangan pembangunan di masa depan.";

  return (
    <section
      id="hero"
      className="relative min-h-[110vh] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-50"
    >
      {/* Efek background lembut */}
      <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 md:w-[420px] md:h-[420px] bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>

      {/* Konten utama */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center mt-[-100px] md:mt-0">
        {/* Teks kiri */}
        <div data-aos="fade-right" className="text-left md:pr-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-gray-800">
            Himpunan Seluruh{" "}
            <span className="text-green-700">
              Pendidik & Pengajar Indonesia PNF
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {kataSambutan}
          </p>
        </div>

        {/* Foto Ketua */}
        <div
          data-aos="fade-left"
          className="flex flex-col items-center justify-center md:items-end"
        >
          {loading ? (
            <p className="text-gray-500">Memuat data ketua...</p>
          ) : ketua ? (
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden w-60 sm:w-72 md:w-80 mb-4 border border-gray-100">
                <img
                  src={`${API_BASE_URL}/uploads/${ketua.foto}`}
                  alt={ketua.nama}
                  className="w-full h-auto object-cover object-top"
                />
              </div>

              {/* Info ketua di bawah foto */}
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">
                  {ketua.nama}
                </h3>
                <p className="text-gray-600">{ketua.jabatan}</p>
                <p className="text-green-700 font-semibold">
                  Periode {ketua.periode}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">Data ketua belum tersedia.</p>
          )}
        </div>
      </div>
    </section>
  );
}
