import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// 👉 Tambahan untuk animasi scroll
import AOS from "aos";
import "aos/dist/aos.css";

// Inisialisasi AOS saat app pertama kali jalan
AOS.init({
  duration: 1000, // durasi animasi (ms)
  once: true,     // animasi hanya sekali (tidak berulang saat scroll naik turun)
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
