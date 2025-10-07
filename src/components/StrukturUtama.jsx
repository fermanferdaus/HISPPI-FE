import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

export default function StrukturUtama() {
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStruktur = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/struktur`);
        if (!res.ok) throw new Error("Gagal fetch data struktur");
        const data = await res.json();

        const utama = data.filter((item) =>
          /(ketua|sekretaris|bendahara)/i.test(item.jabatan)
        );

        // Urutkan tampil: Ketua → Sekretaris → Bendahara
        const ordered = [
          utama.find((p) => /ketua/i.test(p.jabatan)),
          utama.find((p) => /sekretaris/i.test(p.jabatan)),
          utama.find((p) => /bendahara/i.test(p.jabatan)),
        ].filter(Boolean);

        setAnggota(ordered);
      } catch (err) {
        console.error("Gagal memuat data struktur:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStruktur();
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center text-gray-500">
        Memuat struktur organisasi...
      </div>
    );

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-green-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul */}
        <div className="text-center mb-14">
          <p className="text-green-600 font-semibold uppercase tracking-wide mb-2">
            Struktur Utama
          </p>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            Pengurus <span className="text-green-700">Inti HISPPI PNF</span>
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto rounded mb-6"></div>

          {/* Kalimat tambahan untuk konsistensi */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Mengenal lebih dekat para pengurus utama{" "}
            <span className="text-green-700 font-semibold">HISPPI PNF</span> —
            garda terdepan dalam membangun kolaborasi dan peningkatan mutu
            pendidikan non formal di Indonesia.
          </p>
        </div>

        {/* Grid Anggota */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center mb-12">
          {anggota.map((person, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-72 md:w-80 overflow-hidden border border-gray-100 flex flex-col h-full"
            >
              {/* Foto */}
              <div className="w-full h-[380px] bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={`${API_BASE_URL}/uploads/${person.foto}`}
                  alt={person.nama}
                  className="h-full w-auto object-contain object-top transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Detail */}
              <div className="p-6 text-center flex flex-col justify-between flex-grow">
                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-4 py-1 rounded-full mb-3 uppercase tracking-wide">
                  {person.jabatan}
                </span>
                <h3 className="text-lg font-bold text-gray-800 uppercase leading-snug">
                  {person.nama}
                </h3>
                <p className="text-green-600 text-sm font-medium mt-1">
                  Periode {person.periode}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Semua */}
        <div className="text-center">
          <a
            href="/pengurus"
            className="inline-block bg-green-700 text-white px-10 py-4 rounded-lg shadow-md hover:bg-green-800 font-semibold transition duration-300"
          >
            Lihat Semua Pengurus
          </a>
        </div>
      </div>
    </section>
  );
}
