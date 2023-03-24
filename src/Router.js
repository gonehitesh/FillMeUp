import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Home from "./pages/home/Home";
import ModifyItems from "./pages/modifyItems/ModifyItems";
import NavBar from "./pages/navBar";
import Coupons from "./pages/coupons";
import ContactUs from "./pages/contactUs";
import Footer from "./pages/footer/Footer";

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/modifyItems" element={<ModifyItems />} />
        <Route exact path="/coupons" element={<Coupons />} />
        <Route exact path="/contactUs" element={<ContactUs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
