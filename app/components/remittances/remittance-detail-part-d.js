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
    isDirty
}) {

    return (
        <form autoComplete="off">
            <div className="row bg-light-gray px-1 py-1 rounded-3 g-3 my-4">
                <h5 className="text-blue fw-bold">Remittance Details</h5>

                {/* REMITTEE DROPDOWN */}
                <div className="col-md-6">
                    <label className="form-label">Remittees <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.remitteeId}
                        options={dropdowns.remittees}
                        setEventId={(e) => handleInput("remitteeId", e)}
                    />
                    {isDirty && errors.remitteeId && <span className="text-danger">{errors.remitteeId}</span>}
                </div>

                {/* REMITTEE DROPDOWN */}
                <div className="col-md-6">
                    <label className="form-label">Banks <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.bankDetailId}
                        options={dropdowns.banks}
                        setEventId={(e) => handleInput("bankDetailId", e)}
                    />
                    {isDirty && errors.bankDetailId && <span className="text-danger">{errors.bankDetailId}</span>}
                </div>


                {/* <div className="col-md-6">
                    <label className="form-label">Aggregate Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.aggregateAmount || ""}
                        onChange={(e) => handleInput("aggregateAmount", e)}
                    />
                </div> */}
                {/* REMITTEE DROPDOWN */}
                {/* <div className="col-md-6">
                    <label className="form-label">Ao Details <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.aoOrderDetailId}
                        options={dropdowns.aoDetails}
                        setEventId={(e) => handleInput("aoOrderDetailId", e)}
                    />
                    {errors.aoOrderDetailId && <span className="text-danger">{errors.aoOrderDetailId}</span>}
                </div> */}

                {/* REMITTEE DROPDOWN */}
                {/* {partType == "C" &&
                    <div className="col-md-6">
                        <label className="form-label">Accountants <span className="text-danger">*</span></label>
                        <SearchableDropdown
                            id={model.accountantDetailId}
                            options={dropdowns.accountants}
                            setEventId={(e) => handleInput("accountantDetailId", e)}
                        />
                        {errors.remitteeId && <span className="text-danger">{errors.remitteeId}</span>}
                    </div>
                } */}

                {/* COUNTRY */}
                {/* <div className="col-md-6">
                    <label className="form-label">Country <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.country}
                        options={enums.countryCodeRemitter}
                        setEventId={(e) => handleInput("country", e)}
                    />
                    {isDirty && errors.country && <span className="text-danger">{errors.country}</span>}
                </div>
                {model.country === "9999" && (
                    <div className="col-md-6">
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
                )} */}

                {/* CURRENCY */}
                <div className="col-md-6">
                    <label className="form-label">Currency <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.currency}
                        options={enums.currencies}
                        setEventId={(e) => handleInput("currency", e)}
                    />
                    {isDirty && errors.currency && <span className="text-danger">{errors.currency}</span>}
                </div>
                {model.currency === "99" && (
                    <div className="col-md-6">
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

                <div className="col-md-6">
                    <label className="form-label">Amount Payable (INR)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.inIndian || ""}
                        onChange={(e) => handleInput("inIndian", e)}
                    />
                    {isDirty && errors.inIndian && <span className="text-danger">{errors.inIndian}</span>}
                </div>


                <div className="col-md-6">
                    <label className="form-label">Amount Payable (IN Foreign)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.inForiegn || ""}
                        onChange={(e) => handleInput("inForiegn", e)}
                    />
                    {isDirty && errors.inForiegn && <span className="text-danger">{errors.inForiegn}</span>}
                </div>


                {/* NATURE */}
                <div className="col-md-6">
                    <label className="form-label">Natures <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.nature}
                        options={enums.incomeNatureType}
                        setEventId={(e) => handleInput("nature", e)}
                    />
                    {isDirty && errors.nature && <span className="text-danger">{errors.nature}</span>}
                </div>
                {model.nature === "16.99" && (
                    <div className="col-md-6">
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

                <div className="col-md-6">
                    <label className="form-label">Rev Pur Category <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.purposeCode}
                        options={enums.revPurCategory}
                        setEventId={(e) => handleInput("purposeCode", e)}
                    />
                    {isDirty && errors.purposeCode && <span className="text-danger">{errors.purposeCode}</span>}
                </div>


                <div className="col-md-6">
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

                <div className="col-md-6">
                    <label className="form-label">Proposed Date
                        <span className="text-danger">*</span>
                    </label>
                    <div>
                        <DatePicker
                            autoComplete="off"
                            selected={model.proposedDate}
                            id="dateOfDoposit"
                            className="form-control w-100"
                            onChange={(e) => {
                                handleInput("proposedDate", e);
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/MM/yyyy"
                        />
                        {isDirty && errors.proposedDate && <span className="text-danger">{errors.proposedDate}</span>}
                    </div>
                </div>

                {/* BANK DROPDOWN */}
                {/* <div className="col-md-6">
                    <label className="form-label">Bank <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.bankDetailId}
                        options={enums.banks}
                        setEventId={(e) => handleInput("bankDetailId", e)}
                    />
                    {errors.bankDetailId && <span className="text-danger">{errors.bankDetailId}</span>}
                </div> */}

                {/* AMOUNTS */}
                {/* <div className="col-md-6">
                    <label className="form-label">Amount Payable</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amountPayable || ""}
                        onChange={(e) => handleInput("amountPayable", e)}
                    />
                </div> */}

                {/* <div className="col-md-6">
                    <label className="form-label">TDS Amount
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amountOfTds || ""}
                        onChange={(e) => handleInput("amountOfTds", e)}
                    />
                    {isDirty && errors.amountOfTds && <span className="text-danger">{errors.amountOfTds}</span>}
                </div> */}

                {/* <div className="col-md-6">
                    <label className="form-label">Actual Remittance After TDS</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.actualRemittanceAfterTds || ""}
                        onChange={(e) => handleInput("actualRemittanceAfterTds", e)}
                    />
                </div> */}




                {/* TDS DATE */}
                {/* <div className="col-md-6">
                    <label className="form-label">TDS Deduction Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={model.tdsDeductionDate ?? ""}
                        onChange={(e) => handleInput("tdsDeductionDate", e)}
                    />
                </div> */}

                {/* <div className="col-md-6">
                    <label className="form-label">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.country || ""}
                        onChange={(e) => handleInput("country", e)}
                    />
                </div> */}

                {/* Aggregate Amount */}


                {/* Amount Payable */}
                {/* <div className="col-md-6">
                    <label className="form-label">Amount Payable</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amountPayable || ""}
                        onChange={(e) => handleInput("amountPayable", e)}
                    />
                </div> */}

                {/* Amount Of TDS */}
                {/* <div className="col-md-6">
                    <label className="form-label">TDS Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amountOfTds || ""}
                        onChange={(e) => handleInput("amountOfTds", e)}
                    />
                </div> */}

                {/* In Foreign */}
                {/* <div className="col-md-6">
                    <label className="form-label">Amount Payable (Foreign Currency)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.inForiegn || ""}
                        onChange={(e) => handleInput("inForiegn", e)}
                    />
                </div> */}

                {/* In Indian */}
                {/* <div className="col-md-6">
                    <label className="form-label">Amount Payable (INR)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.inIndian || ""}
                        onChange={(e) => handleInput("inIndian", e)}
                    />
                </div> */}

                {/* Grossed Up */}
                {/* <div className="col-md-6">
                    <label className="form-label">Grossed Up Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.grossedUp || ""}
                        onChange={(e) => handleInput("grossedUp", e)}
                    />
                </div> */}

                {/* IT Act Section */}
                {/* <div className="col-md-6">
                    <label className="form-label">IT Act Relevant Section</label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.itActRelevantSection || ""}
                        onChange={(e) => handleInput("itActRelevantSection", e)}
                    />
                </div> */}

                {/* IT Act Income Chargeable */}
                {/* <div className="col-md-6">
                    <label className="form-label">Income Chargeable (IT Act)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.itActIncomeChargeable || ""}
                        onChange={(e) => handleInput("itActIncomeChargeable", e)}
                    />
                </div> */}

                {/* IT Act Tax Liability */}
                {/* <div className="col-md-6">
                    <label className="form-label">Tax Liability (IT Act)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.itActTaxLiability || ""}
                        onChange={(e) => handleInput("itActTaxLiability", e)}
                    />
                </div> */}

                {/* DTAA Available */}
                {/* <div className="col-md-6">
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
                </div> */}

                {/* DTAA Relevant */}
                {/* <div className="col-md-6">
                    <label className="form-label">DTAA Relevant</label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.dtaaRelevant || ""}
                        onChange={(e) => handleInput("dtaaRelevant", e)}
                    />
                </div> */}

                {/* DTAA Article */}
                {/* <div className="col-md-6">
                    <label className="form-label">DTAA Relevant Article</label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.dtaaRelevantArticle || ""}
                        onChange={(e) => handleInput("dtaaRelevantArticle", e)}
                    />
                </div> */}

                {/* DTAA TDS Rate */}
                {/* <div className="col-md-6">
                    <label className="form-label">DTAA TDS Rate (%)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.dtaaTdsRatePercentage || ""}
                        onChange={(e) => handleInput("dtaaTdsRatePercentage", e)}
                    />
                </div> */}

                {/* TDS Rate */}
                {/* <div className="col-md-6">
                    <label className="form-label">Rate Of TDS
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.tdsRate || ""}
                        onChange={(e) => handleInput("tdsRate", e)}
                    />
                    {isDirty && errors.tdsRate && <span className="text-danger">{errors.tdsRate}</span>}
                </div> */}

                {/* Actual Remittance */}
                {/* <div className="col-md-6">
                    <label className="form-label">Actual Remittance After TDS</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.actualRemittanceAfterTds || ""}
                        onChange={(e) => handleInput("actualRemittanceAfterTds", e)}
                    />
                </div> */}

                {/* TDS Deduction Date */}
                {/* <div className="col-md-6">
                    <label className="form-label">TDS Deduction Date</label>
                    <div>
                        <DatePicker
                            autoComplete="off"
                            selected={model.tdsDeductionDate}
                            id="dateOfDoposit"
                            className="form-control w-100"
                            onChange={(e) => {
                                handleInput("tdsDeductionDate", e);
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/MM/yyyy"
                        />
                    </div>
                </div> */}

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
