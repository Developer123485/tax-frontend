"use client";
import React from "react";
import Image from "next/image";
import VerificationForm from "../components/verification/page";
import Header from "../components/header/header";

export default function Signup() {
  return (
    <>
      <Header></Header>
      <VerificationForm></VerificationForm>
    </>
  );
}
