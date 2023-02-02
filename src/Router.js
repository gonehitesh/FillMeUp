import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import Home from './home/Home'

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Registration/>} />
        </Routes>
    </BrowserRouter>
  );
}