import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Root = () => {
  return (
    <div id="app-root">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
