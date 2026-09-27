import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";

function Nav() {
  return (
    <nav style={{ display: "flex", gap: "1.5rem", padding: "1rem 1.5rem", borderBottom: "1px solid #eee" }}>
      <Link to="/">BuilderBootcamp</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment/callback" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
