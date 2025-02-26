//import React from 'react'
import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);
  return (
    <>
      <Suspense fallback={<Loader />}>{<Outlet />}</Suspense>
    </>
  );
};

export default AuthLayout;
