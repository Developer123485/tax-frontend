"use client";
import Image from "next/image";

const HomeBanner = ({ subheading, heading, paragraph, backgroundImage }) => {
  return (
    <div className="col-md-6 position-relative d-flex align-items-center justify-content-end main-banner overflow-hidden">

      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Banner Background"
        fill
        priority
        quality={80}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Overlay Content */}
      <div className="position-relative text-white px-2 py-5 mx-md-4 px-md-5 py-md-5 z-1">
        <h6 className="fw-bold mb-2">{subheading}</h6>
        <h1 className="fw-bold mb-3">{heading}</h1>
        <p className="fs-18">{paragraph}</p>
      </div>
    </div>
  );
};

export default HomeBanner;
