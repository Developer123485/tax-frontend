"use client";
import { CommonService } from "@/app/services/common.service";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchableDropdown from "../deductors/searchable-dropdown";

export default function DDOWiseDetail(props) {
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
        ddoWiseDetail,
        ddoErrors,
        isDirty,
    } = props;

    function handleInput(name, e) {
        props.handleInput(name, e);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <label htmlFor="inputName" className="form-label">
                        <span>DDO Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="inputName"
                        value={ddoDetail.name}
                        readOnly
                    />
                </div>
                <div className="col-md-3">
                    <label htmlFor="name" className="form-label">
                        <span>DDO Tan</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="tan"
                        maxLength={10}
                        readOnly
                        value={ddoDetail.tan}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPan" className="form-label">
                        <span>DDO Address</span>
                        <span className="text-danger"> *</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="inputPan"
                        value={
                            ddoDetail.address1 + ", " + ddoDetail.city + ", " + ddoDetail.state + "-" + ddoDetail.pincode
                        }
                        readOnly
                    />{" "}
                </div>
                <div className="col-md-3">
                    <label htmlFor="emailId" className="form-label">
                        <span>Email Id</span>
                    </label>

                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="emailId"
                        value={ddoDetail.emailId}
                        readOnly
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
                        readOnly
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
                        readOnly
                    />
                </div>
                <div className="col-md-3">
                    <label htmlFor="taxAmount" className="form-label">
                        <span>Tax Amount</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="taxAmount"
                        value={ddoWiseDetail.taxAmount}
                        onChange={(e) => {
                            if (CommonService.isNumeric(e.target.value)) {
                                handleInput("taxAmount", e)
                            }
                        }}
                    />
                </div>
                <div className="col-md-3">
                    <label htmlFor="totalTds" className="form-label">
                        <span>Total TDS</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="totalTds"
                        value={ddoWiseDetail.totalTds}
                        onChange={(e) => {
                            if (CommonService.isNumeric(e.target.value)) {
                                handleInput("totalTds", e)
                            }
                        }}
                    />
                </div>
                <div className="col-md-3">
                    <label htmlFor="natureDeduction" className="form-label">
                        <span>Nature Of Deduction</span>
                    </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        style={highlightStyle1}
                        onFocus={() => setIsFocused1(true)}
                        onBlur={() => setIsFocused1(false)}
                        value={ddoWiseDetail.nature}
                        onChange={(e) => handleInput("nature", e)}
                    >
                        <option value={""} hidden>Select</option>
                        <option value="TDS-Non-Salary (26Q)">TDS-Non-Salary (26Q)</option>
                        <option value="TDS-Salary (24Q)">TDS-Salary (24Q)</option>
                        <option value="TDS-Non-Resident (27Q)">TDS-Non-Resident (27Q)</option>
                        <option value="TCS (27EQ)">TCS (27EQ)</option>
                    </select>
                </div>
            </div>
        </>
    );
}
