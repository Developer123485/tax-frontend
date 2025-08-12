"use client";
import { CommonService } from "@/app/services/common.service";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchableDropdown from "../deductors/searchable-dropdown";

export default function DDODetail(props) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
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

    const highlightStyle2 = {
        padding: "8px",
        border: "1px solid",
        borderColor: isFocused2 ? "#007bff" : "#ccc",
        boxShadow: isFocused2 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
        outline: "none",
    };
    const {
        ddoDetail,
        ddoErrors,
        isDirty,
        enumList,
    } = props;

    function handleInput(name, e) {
        props.handleInput(name, e);
    }

    return (
        <>
            <div className="row align-items-start bg-light-gray px-3 py-4 px-md-2 pt-0 pb-md-3 rounded-3 mb-4 mt-0 g-3">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <h5 className="text-blue fw-bold">
                            Detail
                        </h5>
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputName" className="form-label">
                        <span>Name</span>
                        <span className="text-danger"> *</span>
                    </label>

                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="inputName"
                        value={ddoDetail.name}
                        onChange={(e) => {
                            handleInput("name", e);
                        }}
                    />
                    {isDirty && ddoErrors.nameError && (
                        <span className="text-danger">
                            {ddoErrors.nameError}
                        </span>
                    )}
                </div>
                <div className="col-md-3">
                    <label htmlFor="name" className="form-label">
                        <span>Tan</span>
                        <span className="text-danger"> *</span>
                    </label>

                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="tan"
                        maxLength={10}
                        value={ddoDetail.tan}
                        onChange={(e) => {
                            handleInput("tan", e);
                        }}
                    />
                    {isDirty && ddoErrors.tanError && (
                        <span className="text-danger">
                            {ddoErrors.tanError}
                        </span>
                    )}
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputPan" className="form-label">
                        <span>Address 1</span>
                        <span className="text-danger"> *</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="inputPan"
                        maxLength={100}
                        value={
                            ddoDetail.address1
                        }
                        onChange={(e) => {
                            handleInput("address1", e);
                        }}
                    />{" "}
                    {isDirty && ddoErrors.address1Error && (
                        <span className="text-danger">
                            {ddoErrors.address1Error}
                        </span>
                    )}
                </div>
                <div className="col-md-3">
                    <label htmlFor="address2" className="form-label">
                        <span>Address 2</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="address1"
                        maxLength={100}
                        value={
                            ddoDetail.address2
                        }
                        onChange={(e) => {
                            handleInput("address2", e);
                        }}
                    />{" "}
                </div>
                <div className="col-md-3">
                    <label htmlFor="address3" className="form-label">
                        <span>Address 3</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="address3"
                        maxLength={100}
                        value={ddoDetail.address3}
                        onChange={(e) => {
                            handleInput("address3", e);
                        }}
                    />{" "}
                </div>
                <div className="col-md-3">
                    <label htmlFor="address4" className="form-label">
                        <span>Address 4</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="address4"
                        maxLength={10}
                        value={
                            ddoDetail.address4
                        }
                        onChange={(e) => {
                            handleInput("address4", e);
                        }}
                    />{" "}
                </div>
                <div className="col-md-3">
                    <label htmlFor="city" className="form-label">
                        <span>City</span>
                        <span className="text-danger"> *</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="city"
                        value={ddoDetail.city}
                        onChange={(e) => handleInput("city", e)}
                    />
                    {isDirty && ddoErrors.cityError && (
                        <span className="text-danger">
                            {ddoErrors.cityError}
                        </span>
                    )}
                </div>
                <div className="col-md-3">
                    <label htmlFor="state" className="form-label">
                        <span>State</span>
                        <span className="text-danger"> *</span>
                    </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        value={ddoDetail.state}
                        style={highlightStyle1}
                        onFocus={() => setIsFocused1(true)}
                        onBlur={() => setIsFocused1(false)}
                        onChange={(e) => handleInput("state", e)}
                    >
                        <option defaultValue={""}>Select</option>
                        {enumList.states?.map((option, index) => (
                            <option key={index} value={option.key}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                    {isDirty && ddoErrors.stateError && (
                        <span className="text-danger">
                            {ddoErrors.stateError}
                        </span>
                    )}
                </div>
                <div className="col-md-3">
                    <label htmlFor="Pincode" className="form-label">
                        <span>Pincode</span>
                        <span className="text-danger"> *</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="Pincode"
                        maxLength={10}
                        value={ddoDetail.pincode}
                        onChange={(e) => {
                            handleInput("pincode", e)
                        }
                        }
                    />
                    {isDirty && ddoErrors.pincodeError && (
                        <span className="text-danger">
                            {ddoErrors.pincodeError}
                        </span>
                    )}
                </div>

                <div className="col-md-3">
                    <label htmlFor="emailId" className="form-label">
                        <span>Email Id</span>
                    </label>

                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="emailID"
                        value={ddoDetail.emailID}
                        onChange={(e) => handleInput("emailID", e)}
                    />
                </div>
                <div className="col-md-3">
                    <label htmlFor="ddoRegNo" className="form-label">
                        <span>DDO Reg No</span>
                    </label>

                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="ddoRegNo"
                        value={ddoDetail.ddoRegNo}
                        onChange={(e) => handleInput("ddoRegNo", e)}
                    />
                </div>
                <div className="col-md-3">
                    <label htmlFor="ddoCode" className="form-label">
                        <span>DDO Code</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="ddoCode"
                        value={ddoDetail.ddoCode}
                        onChange={(e) => handleInput("ddoCode", e)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 px-0 d-flex justify-content-start">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => props.handleSaveDDODetail(e)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}
