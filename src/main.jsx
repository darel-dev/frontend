import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 3200,
          style: {
            background: "rgba(255,255,255,0.96)",
            color: "#0f172a",
            borderRadius: "18px",
            padding: "14px 16px",
            border: "1px solid rgba(226, 232, 240, 0.9)",
            boxShadow: "0 20px 45px rgba(15, 23, 42, 0.14)",
            backdropFilter: "blur(16px)",
            fontWeight: 700,
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
