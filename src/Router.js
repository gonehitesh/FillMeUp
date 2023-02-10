import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Home from "./pages/home/Home";
import ModifyItems from "./pages/modifyItems/ModifyItems";
import NavBar from "./pages/navBar";
import EventsAndCoupons from "./pages/eventsAndCoupons";
import ContactUs from "./pages/contactUs";

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/modifyItems" element={<ModifyItems />} />
        <Route exact path="/events&coupons" element={<EventsAndCoupons />} />
        <Route exact path="/contactUs" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}
