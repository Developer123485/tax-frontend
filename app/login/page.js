"use client";
import React from "react";
import Image from "next/image";
import LoginForm from "../components/login/page";
import Header from "../components/header/header";

export default function Login() {
  return (
    <>
      <Header></Header>
      <LoginForm></LoginForm>
    </>
  );
}
