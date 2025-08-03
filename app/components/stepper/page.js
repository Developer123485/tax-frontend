"use client";
import { React, useState } from "react";
import Stepper from "react-stepper-horizontal";
import { usePathname } from "next/navigation";

export default function StepperForm() {
  const pathname = usePathname();
  const steps = [{ title: "About You" }, { title: "Verify" }];

  return (
    <>
      <Stepper
        steps={steps}
        activeStep={pathname === "/verification" ? 1 : 0}
      />
    </>
  );
}
