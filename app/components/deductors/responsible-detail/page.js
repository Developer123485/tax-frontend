"use client";
import { CommonService } from "@/app/services/common.service";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

export default function ResponsibleDetail(props) {
  const [isFocused, setIsFocused] = useState(false);

  const highlightStyle = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused ? "#007bff" : "#ccc",
    boxShadow: isFocused ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const router = useRouter(null);
  const {
    enumList,
    handleInputDeductor,
    deductorDetail,
    deductorErrors,
    isDirty,
  } = props;

  function handleInput(name, e) {
    handleInputDeductor(name, e);
  }

  return (
    <>
      {deductorDetail && (
        <>
          <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-4 g-3">
            <div className={!deductorDetail.id || deductorDetail.id == 0 ? "col-md-6 mt-0" : "col-md-12 mt-0"}>
              <h5 className="text-blue fw-bold">Responsible Person Details</h5>
            </div>
            {!deductorDetail.id || deductorDetail.id == 0 && <div className="col-md-6 d-flex justify-content-end mt-0">
              <div className="form-check form-switch mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="CopyAddress"
                  onChange={(e) => handleInput("copyAddress", e)}
                />
                <label className="form-check-label" htmlFor="CopyAddress">
                  Copy Deductors Address
                </label>
              </div>
            </div>}

            <div className="col-md-3">
              <label htmlFor="inputPersonName" className="form-label">
                <span>Person Name</span>
                <span className="text-danger"> *</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputPersonName"
                maxLength={50}
                autoComplete="off"
                value={deductorDetail.responsibleName}
                onChange={(e) => {
                  handleInput("responsibleName", e);
                }}
              />
              {isDirty && deductorErrors.responsibleNameError && (
                <span className="text-danger">
                  {deductorErrors.responsibleNameError}
                </span>
              )}
            </div>
            <div className="col-md-3">
              <label htmlFor="inputPAN" className="form-label">
                <span>PAN</span>
                <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                placeholder="ABCDE0787A"
                className="form-control"
                id="inputPAN"
                maxLength={10}
                autoComplete="off"
                value={
                  deductorDetail.responsiblePan
                    ? deductorDetail.responsiblePan.toUpperCase()
                    : ""
                }
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                  handleInput("responsiblePan", e);
                }}
              />
              {isDirty && deductorErrors.responsiblePanError && (
                <span className="text-danger">
                  {deductorErrors.responsiblePanError}
                </span>
              )}
            </div>

            <div className="col-md-3">
              <label htmlFor="inputDesignation" className="form-label">
                <span>Designation</span>
                <span className="text-danger"> *</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputDesignation"
                maxLength={20}
                autoComplete="off"
                value={deductorDetail.responsibleDesignation}
                onChange={(e) => {
                  if (CommonService.isAlphabet(e.target.value))
                    handleInput("responsibleDesignation", e);
                }}
              />
              {isDirty && deductorErrors.responsibleDesignationError && (
                <span className="text-danger">
                  {deductorErrors.responsibleDesignationError}
                </span>
              )}
            </div>

            <div className="col-md-3">
              <label htmlFor="inputFatherName" className="form-label">
                <span>Father Name</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputFatherName"
                maxLength={50}
                autoComplete="off"
                value={deductorDetail.fatherName}
                onChange={(e) => {
                  if (CommonService.isAlphabet(e.target.value))
                    handleInput("fatherName", e);
                }}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputDOB" className="form-label">
                <span>Date Of Birth</span>
              </label>
              <DatePicker
                autoComplete="off"
                selected={deductorDetail.responsibleDOB}
                id="inputDOB"
                className="form-control w-100"
                onChange={(e) => handleInput("responsibleDOB", e)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/MM/yyyy"

              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputEmail" className="form-label">
                <span>Email</span>
                <span className="text-danger"> *</span>
              </label>

              <input
                type="email"
                placeholder=""
                className="form-control"
                id="inputEmail"
                maxLength={50}
                autoComplete="off"
                value={deductorDetail.responsibleEmailId}
                onChange={(e) => handleInput("responsibleEmailId", e)}
              />
              {isDirty && deductorErrors.responsibleEmailIdError && (
                <span className="text-danger">
                  {deductorErrors.responsibleEmailIdError}
                </span>
              )}
            </div>
            <div className="col-md-3">
              <label htmlFor="alterinputEmail" className="form-label">
                <span>Alternate Email</span>
              </label>

              <input
                type="email"
                placeholder=""
                className="form-control"
                id="alterinputEmail"
                maxLength={50}
                autoComplete="off"
                value={deductorDetail.responsibleAlternateEmail}
                onChange={(e) => handleInput("responsibleAlternateEmail", e)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputMobileNo" className="form-label">
                <span>Mobile No</span>
                <span className="text-danger"> *</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputMobileNo"
                maxLength={10}
                autoComplete="off"
                value={deductorDetail.responsibleMobile}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value))
                    handleInput("responsibleMobile", e);
                }}
              />
              {isDirty && deductorErrors.responsibleMobileError && (
                <span className="text-danger">
                  {deductorErrors.responsibleMobileError}
                </span>
              )}
            </div>
            <div className="col-md-3">
              <label htmlFor="inputSTDCode" className="form-label">
                <span>STD Code</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputSTDCode"
                maxLength={5}
                autoComplete="off"
                value={deductorDetail.responsibleStdcode}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value))
                    handleInput("responsibleStdcode", e);
                }}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="inputTelephone" className="form-label">
                <span>Telephone No.</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputTelephone"
                maxLength={10}
                autoComplete="off"
                value={deductorDetail.responsibleTelephone}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value))
                    handleInput("responsibleTelephone", e);
                }}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="alterinputSTDCode" className="form-label">
                <span>Alternate STD Code</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="alterinputSTDCode"
                maxLength={5}
                autoComplete="off"
                value={deductorDetail.responsibleAlternateSTD}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value))
                    handleInput("responsibleAlternateSTD", e);
                }}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="alterinputTelephone" className="form-label">
                <span>Alternate Telephone No.</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="alterinputTelephone"
                maxLength={10}
                autoComplete="off"
                value={deductorDetail.responsibleAlternatePhone}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value))
                    handleInput("responsibleAlternatePhone", e);
                }}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="inputCodeNo" className="form-label">
                <span>Flat/Block No.</span>
                <span className="text-danger"> *</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputFlatNo"
                maxLength={25}
                autoComplete="off"
                value={deductorDetail.responsibleFlatNo}
                disabled={deductorDetail.copyAddress}
                onChange={(e) => {
                  handleInput("responsibleFlatNo", e);
                }}
              />
              {isDirty && deductorErrors.responsibleFlatNoError && (
                <span className="text-danger">
                  {deductorErrors.responsibleFlatNoError}
                </span>
              )}
            </div>

            <div className="col-md-3">
              <label htmlFor="inputName" className="form-label">
                <span>Building Name</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputBuildingName"
                maxLength={25}
                autoComplete="off"
                value={deductorDetail.responsibleBuildingName}
                disabled={deductorDetail.copyAddress}
                onChange={(e) => {
                  handleInput("responsibleBuildingName", e);
                }}
              />
              {isDirty && deductorErrors.responsibleBuildingNameError && (
                <span className="text-danger">
                  {deductorErrors.responsibleBuildingNameError}
                </span>
              )}
            </div>

            <div className="col-md-3">
              <label htmlFor="inputRoad" className="form-label">
                <span>Road/Street</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputRoad"
                maxLength={25}
                autoComplete="off"
                disabled={deductorDetail.copyAddress}
                value={deductorDetail.responsibleStreet}
                onChange={(e) => {
                  handleInput("responsibleStreet", e);
                }}
              />
              {isDirty && deductorErrors.responsibleStreetError && (
                <span className="text-danger">
                  {deductorErrors.responsibleStreetError}
                </span>
              )}
            </div>

            <div className="col-md-3">
              <label htmlFor="inputState" className="form-label">
                <span>State</span>
                <span className="text-danger"> *</span>
              </label>

              <select
                className="form-select"
                aria-label="Default select example"
                autoComplete="off"
                disabled={deductorDetail.copyAddress}
                style={highlightStyle}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={deductorDetail.responsibleState}
                onChange={(e) => handleInput("responsibleState", e)}
              >
                <option value={""}>Select State</option>
                {enumList.states?.filter(p => p.value != "OVERSEAS")?.map((option, index) => (
                  <option key={index} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </select>
              {isDirty && deductorErrors.responsibleStateError && (
                <span className="text-danger">
                  {deductorErrors.responsibleStateError}
                </span>
              )}
            </div>
            <div className="col-md-3">
              <label htmlFor="inputArea" className="form-label">
                <span>Area/Locality</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputArea"
                maxLength={25}
                autoComplete="off"
                disabled={deductorDetail.copyAddress}
                value={deductorDetail.responsibleArea}
                onChange={(e) => {
                  handleInput("responsibleArea", e);
                }}
              />
              {isDirty && deductorErrors.responsibleAreaError && (
                <span className="text-danger">
                  {deductorErrors.responsibleAreaError}
                </span>
              )}
            </div>

            <div className="col-md-3">
              <label htmlFor="inputTown" className="form-label">
                <span>Town/City/District</span>
              </label>

              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputTown"
                maxLength={25}
                autoComplete="off"
                disabled={deductorDetail.copyAddress}
                value={deductorDetail.responsibleDistrict}
                onChange={(e) => {
                  handleInput("responsibleDistrict", e);
                }}
              />
              {isDirty && deductorErrors.responsibleDistrictError && (
                <span className="text-danger">
                  {deductorErrors.responsibleDistrictError}
                </span>
              )}
            </div>

            <div className="col-md-3">
              <label htmlFor="inputPincode" className="form-label">
                <span>Pincode</span>
                <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="inputPincode"
                maxLength={6}
                autoComplete="off"
                disabled={deductorDetail.copyAddress}
                value={deductorDetail.responsiblePincode}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value))
                    handleInput("responsiblePincode", e);
                }}
              />
              {isDirty && deductorErrors.responsiblePincodeError && (
                <span className="text-danger">
                  {deductorErrors.responsiblePincodeError}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex px-0">
              <button
                type="button"
                onClick={(e) => props.setActive(0)}
                className="btn btn-outline-dark px-md-5 me-3"
              >
                Back
              </button>
              {deductorDetail.id > 0 && (
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={(e) => router.back()}
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => props.handleSaveDeductor(e)}
              >
                Save Deductor
              </button>
              {deductorDetail.correction &&
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => props.undoDeductor(e)}
                >
                  Undo Deductor
                </button>
              }
            </div>
          </div>
        </>
      )
      }
    </>
  );
}
