export default function FooterAdmin() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-800 text-green-100 text-sm py-4 px-6 mt-auto shadow-inner border-t border-green-700">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <p className="font-medium">
          © {year} <span className="font-semibold text-white">HISPPI PNF</span>.
          Semua Hak Dilindungi.
        </p>
      </div>
    </footer>
  );
}
