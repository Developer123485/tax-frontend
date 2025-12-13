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

                {/* REMITTEE DROPDOWN */}
                <div className="col-md-4">
                    <label className="form-label">Banks <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.bankDetailId}
                        options={dropdowns.banks}
                        setEventId={(e) => handleInput("bankDetailId", e)}
                    />
                    {errors.bankDetailId && <span className="text-danger">{errors.bankDetailId}</span>}
                </div>

                {/* REMITTEE DROPDOWN */}
                <div className="col-md-4">
                    <label className="form-label">Ao Details <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.aoOrderDetailId}
                        options={dropdowns.aoDetails}
                        setEventId={(e) => handleInput("aoOrderDetailId", e)}
                    />
                    {errors.aoOrderDetailId && <span className="text-danger">{errors.aoOrderDetailId}</span>}
                </div>

                {/* REMITTEE DROPDOWN */}
                <div className="col-md-4">
                    <label className="form-label">Accountants <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.accountantDetailId}
                        options={dropdowns.accountants}
                        setEventId={(e) => handleInput("accountantDetailId", e)}
                    />
                    {errors.remitteeId && <span className="text-danger">{errors.remitteeId}</span>}
                </div>

                {/* COUNTRY */}
                <div className="col-md-4">
                    <label className="form-label">Country <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.country}
                        options={enums.countries}
                        setEventId={(e) => handleInput("country", e)}
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

                {/* CURRENCY */}
                <div className="col-md-4">
                    <label className="form-label">Currency <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.currency}
                        options={enums.currencyType}
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

                <div className="col-md-4">
                    <label className="form-label">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.country || ""}
                        onChange={(e) => handleInput("country", e)}
                    />
                </div>

                {/* Aggregate Amount */}
                <div className="col-md-4">
                    <label className="form-label">Aggregate Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.aggregateAmount || ""}
                        onChange={(e) => handleInput("aggregateAmount", e)}
                    />
                </div>

                {/* Amount Payable */}
                <div className="col-md-4">
                    <label className="form-label">Amount Payable</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amountPayable || ""}
                        onChange={(e) => handleInput("amountPayable", e)}
                    />
                </div>

                {/* Amount Of TDS */}
                <div className="col-md-4">
                    <label className="form-label">TDS Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amountOfTds || ""}
                        onChange={(e) => handleInput("amountOfTds", e)}
                    />
                </div>

                {/* In Foreign */}
                <div className="col-md-4">
                    <label className="form-label">Amount (Foreign Currency)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.inForiegn || ""}
                        onChange={(e) => handleInput("inForiegn", e)}
                    />
                </div>

                {/* In Indian */}
                <div className="col-md-4">
                    <label className="form-label">Amount (INR)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.inIndian || ""}
                        onChange={(e) => handleInput("inIndian", e)}
                    />
                </div>

                {/* Grossed Up */}
                <div className="col-md-4">
                    <label className="form-label">Grossed Up Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.grossedUp || ""}
                        onChange={(e) => handleInput("grossedUp", e)}
                    />
                </div>

                {/* IT Act Section */}
                <div className="col-md-4">
                    <label className="form-label">IT Act Relevant Section</label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.itActRelevantSection || ""}
                        onChange={(e) => handleInput("itActRelevantSection", e)}
                    />
                </div>

                {/* IT Act Income Chargeable */}
                <div className="col-md-4">
                    <label className="form-label">Income Chargeable (IT Act)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.itActIncomeChargeable || ""}
                        onChange={(e) => handleInput("itActIncomeChargeable", e)}
                    />
                </div>

                {/* IT Act Tax Liability */}
                <div className="col-md-4">
                    <label className="form-label">Tax Liability (IT Act)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.itActTaxLiability || ""}
                        onChange={(e) => handleInput("itActTaxLiability", e)}
                    />
                </div>

                {/* DTAA Available */}
                <div className="col-md-4">
                    <label className="form-label">DTAA Residency Available</label>
                    <select
                        className="form-control"
                        value={model.dtaaTaxResidencyAvailable ?? ""}
                        onChange={(e) => handleInput("dtaaTaxResidencyAvailable", e)}
                    >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                {/* DTAA Relevant */}
                <div className="col-md-4">
                    <label className="form-label">DTAA Relevant</label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.dtaaRelevant || ""}
                        onChange={(e) => handleInput("dtaaRelevant", e)}
                    />
                </div>

                {/* DTAA Article */}
                <div className="col-md-4">
                    <label className="form-label">DTAA Relevant Article</label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.dtaaRelevantArticle || ""}
                        onChange={(e) => handleInput("dtaaRelevantArticle", e)}
                    />
                </div>

                {/* DTAA TDS Rate */}
                <div className="col-md-4">
                    <label className="form-label">DTAA TDS Rate (%)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.dtaaTdsRatePercentage || ""}
                        onChange={(e) => handleInput("dtaaTdsRatePercentage", e)}
                    />
                </div>

                {/* TDS Rate */}
                <div className="col-md-4">
                    <label className="form-label">TDS Rate (%)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.tdsRate || ""}
                        onChange={(e) => handleInput("tdsRate", e)}
                    />
                </div>

                {/* Actual Remittance */}
                <div className="col-md-4">
                    <label className="form-label">Actual Remittance After TDS</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.actualRemittanceAfterTds || ""}
                        onChange={(e) => handleInput("actualRemittanceAfterTds", e)}
                    />
                </div>

                {/* TDS Deduction Date */}
                <div className="col-md-4">
                    <label className="form-label">TDS Deduction Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={model.tdsDeductionDate || ""}
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
