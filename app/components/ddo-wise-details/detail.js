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
        ddoDropdowns
    } = props;

    function handleInput(name, e) {
        props.handleInput(name, e);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="inputddo" className="form-label">
                        <span>DDO Details</span>
                        <span className="text-danger"> *</span>
                    </label>
                    <div className="d-flex align-items-center">
                        {ddoDropdowns && ddoDropdowns.length > 0 && <SearchableDropdown
                            setEventId={props.setDdoId}
                            id={ddoWiseDetail.ddoDetailId}
                            options={ddoDropdowns}
                        ></SearchableDropdown>}
                        <button
                            type="button"
                            className="btn btn-primary w-100 ms-3"
                            onClick={(e) =>
                                router.push(
                                    `/deductors/${props.deductorId}/tds/24g-form/ddo-details/detail`
                                )
                            }
                        >
                            Add
                        </button>
                    </div>
                    <div className="">
                        {isDirty && ddoErrors.nameError && (
                            <span className="text-danger">
                                {ddoErrors.nameError}
                            </span>
                        )}
                    </div>
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
                        maxLength={15}
                        onChange={(e) => {
                            if (CommonService.isNumeric(e.target.value)) {
                                handleInput("taxAmount", e)
                            }
                        }}
                    />
                    {isDirty && ddoErrors.taxAmountError && (
                        <span className="text-danger">
                            {ddoErrors.taxAmountError}
                        </span>
                    )}
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
                        maxLength={15}
                        onChange={(e) => {
                            if (CommonService.isNumeric(e.target.value)) {
                                handleInput("totalTds", e)
                            }
                        }}
                    />
                    {isDirty && ddoErrors.totalTdsError && (
                        <span className="text-danger">
                            {ddoErrors.totalTdsError}
                        </span>
                    )}
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
