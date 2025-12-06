"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProcessPopup from "../../modals/processing";
import { CommonService } from "@/app/services/common.service";
import SearchableDropdown from "../../deductors/searchable-dropdown";

export default function RemitterDetail(props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  const highlightStyle = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused ? "#007bff" : "#ccc",
    boxShadow: isFocused ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const highlightStyle1 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused1 ? "#007bff" : "#ccc",
    boxShadow: isFocused1 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const router = useRouter(null);
  const {
    enumList,
    handleInputRemitter,
    remitterDetail,
    remitterErrors,
    isNextDirty,
  } = props;

  function handleInput(name, e) {
    handleInputRemitter(name, e);
  }

  return (
    <>
      {enumList && (
        <form autoComplete="off">
          <div className="row row d-flex g-3">
            <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-4 g-3">
              <div className="col-md-12 mt-0">
                <h5 className="text-blue fw-bold">Remitter Details</h5>
              </div>

              {/* TAN */}
              <div className="col-md-3">
                <label htmlFor="inputTANNo" className="form-label">
                  <span>TAN</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={10}
                  value={
                    remitterDetail.remitterTan
                      ? remitterDetail.remitterTan.toUpperCase()
                      : ""
                  }
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleInput("remitterTan", e);
                  }}
                />
                {isNextDirty && remitterErrors.remitterTanError && (
                  <span className="text-danger">
                    {remitterErrors.remitterTanError}
                  </span>
                )}
              </div>

            </div>

            <div className="row">
              <div className="col-md-12 px-0 d-flex justify-content-start">
                {remitterDetail.id > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => router.back()}
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => props.handleSaveRemitter(e)}
                >
                  Save Remitter
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <ProcessPopup />
    </>
  );
}
