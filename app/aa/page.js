"use client";
import React from "react";
import Image from "next/image";
import LoginForm from "../components/login/page";
import Header from "../components/header/header";
import LoginFormaa from "./ok/page";

export default function Login() {
  return (
    <>
      <Header></Header>
      <div>
        <h2>TDS e-Filing Portal</h2>
        <LoginFormaa />
      </div>
    </>
  );
}
