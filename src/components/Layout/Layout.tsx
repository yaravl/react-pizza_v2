import React from "react";
import { Header } from "../index";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
