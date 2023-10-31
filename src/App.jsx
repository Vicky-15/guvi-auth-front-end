import { Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axiosInstance from "./config/axios";

const token = localStorage.getItem("authtoken");

function App() {
  if (token) axiosInstance.defaults.headers.common.authtoken = token;
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
