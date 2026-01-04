"use client";

import React, { useEffect, useState } from "react";
import SearchableDropdown from "../deductors/searchable-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RemittanceDetailB({
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
                        options={dropdowns.remittees}
                        url={`/remitters/${remitterId}/dashboard/remittees/remittee-detail`}
                        setEventId={(e) => handleInput("remitteeId", e)}
                    />
                    {isDirty && errors.remitteeId && <span className="text-danger">{errors.remitteeId}</span>}
                </div>

                {/* Banks DROPDOWN */}
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

                {/* Ao DROPDOWN */}
                <div className="col-md-4">
                    <label className="form-label">Ao Details <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.aoOrderDetailId}
                        options={dropdowns.aoDetails}
                        url={`/remitters/${remitterId}/dashboard/ao-order/ao-order-detail`}
                        setEventId={(e) => handleInput("aoOrderDetailId", e)}
                    />
                    {isDirty && errors.aoOrderDetailId && <span className="text-danger">{errors.aoOrderDetailId}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Aggregate Amount</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("aggregateAmount", value);
                        }}
                        className="form-control"
                        value={model.aggregateAmount || ""}
                    />
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
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
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
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
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
                        options={enums.rbiClassificationType}
                        setEventId={(e) => handleInput("purposeCode", e)}
                    />
                    {isDirty && errors.purposeCode && <span className="text-danger">{errors.purposeCode}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Rev Pur Code(Select before Rev Pur Category) <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.purposeCode1}
                        options={model.purposeCode ? enums.rbiPurposeCode.filter(item =>
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
                {/* BANK DROPDOWN */}
                <div className="col-md-4">
                    <label className="form-label">TDS Amount
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("amountOfTds", value);
                        }}
                        className="form-control"
                        value={model.amountOfTds || ""}
                    />
                    {isDirty && errors.amountOfTds && <span className="text-danger">{errors.amountOfTds}</span>}
                </div>

                {/* TDS Rate */}
                <div className="col-md-4">
                    <label className="form-label">Rate Of TDS
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("tdsRate", value);
                        }}
                        className="form-control"
                        value={model.tdsRate || ""}
                    />
                    {isDirty && errors.tdsRate && <span className="text-danger">{errors.tdsRate}</span>}
                </div>


                {/* TDS Deduction Date */}
                <div className="col-md-4">
                    <label className="form-label">TDS Deduction Date</label>
                    <div>
                        <DatePicker
                            placeholderText="dd/MM/yyyy"
                            onKeyDown={(e) => e.preventDefault()}
                            autoComplete="off"
                            selected={model.dateOfDeduction}
                            id="dateOfDoposit"
                            className="form-control w-100"
                            onChange={(e) => {
                                handleInput("dateOfDeduction", e);
                            }}
                            minDate={new Date(2004, 3, 1)}
                            maxDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                        />
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
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => handleInput("verificationDate", e)}
                    />
                    {isDirty && errors.verificationDate && <span className="text-danger">{errors.verificationDate}</span>}
                </div>

                {/* <div className="col-md-4">
                    <label className="form-label">Designation
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control"
                        value={model.verDesignation || ""}
                        onChange={(e) => handleInput("verDesignation", e)}
                    />
                    {isDirty && errors.verDesignation && <span className="text-danger">{errors.verDesignation}</span>}
                </div> */}

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
