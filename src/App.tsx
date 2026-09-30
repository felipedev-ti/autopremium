import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import UpdatePassword from "./UpdatePassword";
    
// Adicione isto no meio das suas outras rotas:
<Route path="/update-password" element={<UpdatePassword />} />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
