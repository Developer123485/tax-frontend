"use client";

import React, { useEffect, useState } from "react";
import SearchableDropdown from "../deductors/searchable-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RemittanceDetailD({
    model,
    errors,
    handleInput,
    handleSave,
    enums,
    dropdowns,
    isDirty,
    remitterId
}) {

    return (
        <form autoComplete="off">
            <div className="row bg-light-gray px-1 py-1 rounded-3 g-3 my-4">
                <h5 className="text-blue fw-bold">Remittance Details</h5>

                {/* REMITTEE DROPDOWN */}
                <div className="col-md-4">
                    <label className="form-label">Remittees <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.remitteeId}
                        url={`/remitters/${remitterId}/dashboard/remittees/remittee-detail`}
                        options={dropdowns.remittees}
                        setEventId={(e) => handleInput("remitteeId", e)}
                    />
                    {isDirty && errors.remitteeId && <span className="text-danger">{errors.remitteeId}</span>}
                </div>

                {/* REMITTEE DROPDOWN */}
                <div className="col-md-4">
                    <label className="form-label">Banks <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.bankDetailId}
                        url={`/remitters/${remitterId}/dashboard/banks/banks-detail`}
                        options={dropdowns.banks}
                        setEventId={(e) => handleInput("bankDetailId", e)}
                    />
                    {isDirty && errors.bankDetailId && <span className="text-danger">{errors.bankDetailId}</span>}
                </div>

                {/* COUNTRY */}
                <div className="col-md-4">
                    <label className="form-label">Country <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.country}
                        options={enums.countryCodeRemitter}
                        setEventId={(e) => handleInput("country", e)}
                    />
                    {isDirty && errors.country && <span className="text-danger">{errors.country}</span>}
                </div>
                {model.country === "9999" && (
                    <div className="col-md-4">
                        <label className="form-label">Other Country <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Other Country Name"
                            value={model.countryOther || ""}
                            onChange={(e) => handleInput("countryOther", e)}
                        />
                        {isDirty && errors.countryOther && <span className="text-danger">{errors.countryOther}</span>}
                    </div>
                )}

                {/* CURRENCY */}
                <div className="col-md-4">
                    <label className="form-label">Currency <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.currency}
                        options={enums.currencies}
                        setEventId={(e) => handleInput("currency", e)}
                    />
                    {isDirty && errors.currency && <span className="text-danger">{errors.currency}</span>}
                </div>
                {model.currency === "99" && (
                    <div className="col-md-4">
                        <label className="form-label">Other Currency <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter other currency"
                            value={model.currencyOther || ""}
                            onChange={(e) => handleInput("currencyOther", e)}
                        />
                        {isDirty && errors.currencyOther && <span className="text-danger">{errors.currencyOther}</span>}
                    </div>
                )}

                <div className="col-md-4">
                    <label className="form-label">Amount Payable (INR)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        onKeyDown={(e) => {
                            if (!/[0-9.]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const value = e.target.value;
                            if ((value.match(/\./g) || []).length > 1) return;
                            if (value.replace(".", "").length > 18) return;
                            handleInput("inIndian", value);
                        }}
                        className="form-control"
                        value={model.inIndian || ""}
                    />
                    {isDirty && errors.inIndian && <span className="text-danger">{errors.inIndian}</span>}
                </div>


                <div className="col-md-4">
                    <label className="form-label">Amount Payable (IN Foreign)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        onKeyDown={(e) => {
                            if (!/[0-9.]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const value = e.target.value;
                            if ((value.match(/\./g) || []).length > 1) return;
                            if (value.replace(".", "").length > 18) return;
                            handleInput("inForiegn", value);
                        }}
                        className="form-control"
                        value={model.inForiegn || ""}
                    />
                    {isDirty && errors.inForiegn && <span className="text-danger">{errors.inForiegn}</span>}
                </div>


                {/* NATURE */}
                <div className="col-md-4">
                    <label className="form-label">Natures <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.nature}
                        options={enums.incomeNatureType}
                        setEventId={(e) => handleInput("nature", e)}
                    />
                    {isDirty && errors.nature && <span className="text-danger">{errors.nature}</span>}
                </div>
                {model.nature === "16.99" && (
                    <div className="col-md-4">
                        <label className="form-label">Others Natures <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter other nature"
                            value={model.otherNature || ""}
                            onChange={(e) => handleInput("otherNature", e)}
                        />
                        {isDirty && errors.nature && <span className="text-danger">{errors.nature}</span>}
                    </div>
                )}

                <div className="col-md-4">
                    <label className="form-label">Rev Pur Category <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.purposeCode}
                        options={enums.revPurCategory}
                        setEventId={(e) => handleInput("purposeCode", e)}
                    />
                    {isDirty && errors.purposeCode && <span className="text-danger">{errors.purposeCode}</span>}
                </div>


                <div className="col-md-4">
                    <label className="form-label">Rev Pur Code(Select before Rev Pur Category) <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.purposeCode1}
                        options={model.purposeCode ? enums.revPurCode.filter(item =>
                            item.key.startsWith(model.purposeCode)
                        ) : null}
                        setEventId={(e) => handleInput("purposeCode1", e)}
                    />
                    {isDirty && errors.purposeCode1 && <span className="text-danger">{errors.purposeCode1}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Proposed Date
                        <span className="text-danger">*</span>
                    </label>
                    <div>
                        <DatePicker
                            placeholderText="dd/MM/yyyy"
                            onKeyDown={(e) => e.preventDefault()}
                            autoComplete="off"
                            selected={model.proposedDate}
                            id="dateOfDoposit"
                            className="form-control w-100"
                            onChange={(e) => {
                                handleInput("proposedDate", e);
                            }}
                            dateFormat="dd/MM/yyyy"
                        />
                        {isDirty && errors.proposedDate && <span className="text-danger">{errors.proposedDate}</span>}
                    </div>


                </div>
                <div className="col-md-12">
                    <h5 className="fw-bold mt-4">Declaration</h5>
                </div>

                <div className="col-md-4">
                    <label className="form-label">I / We
                        <span className="text-danger">*</span>
                    </label>
                    <select
                        className="form-select"
                        value={model.i_We}
                        onChange={(e) => handleInput("i_We", e)}
                    >
                        <option value="1">I</option>
                        <option value="2">WE</option>
                    </select>
                    {isDirty && errors.i_We && <span className="text-danger">{errors.i_We}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Verification Date
                        <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                        placeholderText="dd/MM/yyyy"
                        onKeyDown={(e) => e.preventDefault()}
                        selected={model.verificationDate}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => handleInput("verificationDate", e)}
                    />
                    {isDirty && errors.verificationDate && <span className="text-danger">{errors.verificationDate}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Place
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control"
                        value={model.verificationPlace || ""}
                        onChange={(e) => handleInput("verificationPlace", e)}
                    />
                    {isDirty && errors.verificationPlace && <span className="text-danger">{errors.verificationPlace}</span>}

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
