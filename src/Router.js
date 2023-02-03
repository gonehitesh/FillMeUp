import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Home from './pages/home/Home'
import ModifyItems from "./pages/modifyItems/ModifyItems";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Registration/>} />
            <Route exact path="/modifyItems" element={<ModifyItems/>} />
        </Routes>
    </BrowserRouter>
  );
}