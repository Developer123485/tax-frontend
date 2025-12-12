"use client";

import React, { useEffect, useState } from "react";
import SearchableDropdown from "../deductors/searchable-dropdown";

export default function RemittanceDetail({
    model,
    errors,
    handleInput,
    handleSave,
    enums,
    dropdowns
}) {

    return (
        <form autoComplete="off">
            <div className="row bg-light-gray px-3 py-4 rounded-3 g-3 my-4">
                <h5 className="text-blue fw-bold">Remittance Details</h5>

                {/* COUNTRY */}
                <div className="col-md-4">
                    <label className="form-label">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.country || ""}
                        onChange={(e) => handleInput("country", e)}
                    />
                </div>

                {/* CURRENCY */}
                <div className="col-md-4">
                    <label className="form-label">Currency <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.currency}
                        options={enums.currencies}
                        setEventId={(e) => handleInput("currency", e)}
                    />
                    {model.currency === "Other" && (
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter other currency"
                            value={model.currencyOther || ""}
                            onChange={(e) => handleInput("currencyOther", e)}
                        />
                    )}
                </div>

                {/* NATURE */}
                <div className="col-md-4">
                    <label className="form-label">Natures <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.nature}
                        options={enums.incomeNatureType}
                        setEventId={(e) => handleInput("nature", e)}
                    />
                    {errors.nature && <span className="text-danger">{errors.nature}</span>}
                </div>
                {model.nature === "16.99" && (
                    <div className="col-md-4">
                        <label className="form-label">Others Natures <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter other nature"
                            value={model.otherNature || ""}
                            onChange={(e) => handleInput("otherNature", e)}
                        />
                        {errors.nature && <span className="text-danger">{errors.nature}</span>}
                    </div>
                )}



                {/* REMITTEE DROPDOWN */}
                <div className="col-md-4">
                    <label className="form-label">Remittee <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.remitteeId}
                        options={dropdowns.remittees}
                        setEventId={(e) => handleInput("remitteeId", e)}
                    />
                    {errors.remitteeId && <span className="text-danger">{errors.remitteeId}</span>}
                </div>

                {/* BANK DROPDOWN */}
                <div className="col-md-4">
                    <label className="form-label">Bank <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.bankDetailId}
                        options={enums.banks}
                        setEventId={(e) => handleInput("bankDetailId", e)}
                    />
                    {errors.bankDetailId && <span className="text-danger">{errors.bankDetailId}</span>}
                </div>

                {/* AMOUNTS */}
                <div className="col-md-4">
                    <label className="form-label">Amount Payable</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amountPayable || ""}
                        onChange={(e) => handleInput("amountPayable", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">TDS Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amountOfTds || ""}
                        onChange={(e) => handleInput("amountOfTds", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Actual Remittance After TDS</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.actualRemittanceAfterTds || ""}
                        onChange={(e) => handleInput("actualRemittanceAfterTds", e)}
                    />
                </div>

                {/* TDS DATE */}
                <div className="col-md-4">
                    <label className="form-label">TDS Deduction Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={model.tdsDeductionDate ?? ""}
                        onChange={(e) => handleInput("tdsDeductionDate", e)}
                    />
                </div>

                {/* SAVE BUTTON */}
                <div className="col-md-12 mt-4">
                    <button className="btn btn-primary" type="button" onClick={handleSave}>
                        Save Remittance
                    </button>
                </div>
            </div>
        </form>
    );
}
