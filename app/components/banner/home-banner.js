"use client";
import React from "react";
import Image from "next/image";

const HomeBanner = ({ subheading, heading, paragraph, backgroundImage }) => {
  return (
    <div
      className="col-md-6 d-flex justify-content-end align-items-center main-banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-2 py-5 mx-md-4 px-md-5 py-md-5 text-white">
        <h6 className="fw-bold mb-2">{subheading}</h6>
        <h1 className="fw-bold mb-3">{heading}</h1>
        <p className="fs-18">{paragraph}</p>
      </div>
    </div>
  );
};

export default HomeBanner;
