"use client";
import React from "react";
import Image from "next/image";
import Subscription from "../components/subscription/page";
import HeaderList from "../components/header/header-list";

export default function Plans() {
  return (
    <>
      <HeaderList></HeaderList>
      <Subscription></Subscription>
    </>
  );
}
