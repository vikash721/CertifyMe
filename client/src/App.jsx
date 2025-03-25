import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IssuerDashboard from "./pages/IssuerDashboard"
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Home />} />
      <Route path="/issuer-dashboard" element={<IssuerDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
