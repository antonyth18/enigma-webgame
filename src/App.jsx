import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ThemedNavbar from "./pages/ThemedNavbar"; // ok if you kept it in /pages
import Leader from "./pages/Leader";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";      // ✅ add this

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-neutral-200">
        <ThemedNavbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} /> {/* ✅ default to dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />               {/* ✅ new route */}
          <Route path="/leader" element={<Leader />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} /> {/* optional fallback */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
