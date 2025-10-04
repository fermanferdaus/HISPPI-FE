export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen bg-gradient-to-r from-green-800 to-green-600 text-white flex items-center justify-center"
    >

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h1
          className="text-4xl md:text-6xl font-bold mb-6"
          data-aos="fade-down"
        >
          Meningkatkan Kualitas Pendidikan Non Formal di Indonesia
        </h1>
        <p
          className="text-lg max-w-3xl mx-auto mb-8 text-green-100"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          HISPPI PNF adalah wadah pendidik & penguji untuk bersama-sama
          meningkatkan mutu pendidikan non formal, memperkuat kemitraan, dan
          mencetak generasi emas Indonesia.
        </p>

        {/* CTA */}
        <a
          href="https://bit.ly/InstrumenProfile_PKPPNF"
          target="_blank"
          rel="noreferrer"
          className="bg-white text-green-700 font-semibold px-8 py-4 rounded-lg shadow hover:bg-green-100 transition"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          Bergabung Sekarang
        </a>
      </div>
    </section>
  );
}
