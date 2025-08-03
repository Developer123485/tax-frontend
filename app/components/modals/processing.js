"use client";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";

export default function ProcessPopup(props) {
  const { showLoader } = props;
  return (
    <>
      <Modal
        className="processing-loader-popup"
        size=""
        aria-labelledby=""
        centered
        show={showLoader}
        keyboard={false}
        backdrop="static"
      >
        <Image
          className="bg-white rounded-3"
          src="/images/processing_img.gif"
          alt="processing-img"
          width={150}
          height={155}
        />
      </Modal>
    </>
  );
}
