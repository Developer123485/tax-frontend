"use client";
import React from "react";
export default function CustomCheckbox({ onClick, ...rest }, ref) {
  return (
    <>
      <div
        className="form-check pb-5 fixed-checkbox bg-white"
        style={{ backgroundColor: "" }}
      >
        <input
          type="checkbox"
          className="form-check-input  "
          style={{ height: "10px", width: "10px" }}
          ref={ref}
          onClick={onClick}
          {...rest}
        />
        <label className="form-check-label" id="booty-check" />
      </div>
    </>
  );
}
