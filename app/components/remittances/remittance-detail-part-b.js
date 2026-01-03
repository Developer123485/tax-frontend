"use client";

import React from "react";
import SearchableDropdown from "../deductors/searchable-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* ---------- NUMERIC HANDLER ----------
   Positive | Max 14 digits | Max 2 decimals
-------------------------------------- */
const handlePositiveDecimal = (value, onValid) => {
    const regex = /^\d{0,14}(\.\d{0,2})?$/;
    if (regex.test(value)) {
        onValid(value);
    }
};

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

                {/* REMITTEE */}
                <div className="col-md-4">
                    <label className="form-label">
                        Remittees <span className="text-danger">*</span>
                    </label>
                    <SearchableDropdown
                        id={model.remitteeId}
                        options={dropdowns.remittees}
                        url={`/remitters/${remitterId}/dashboard/remittees/remittee-detail`}
                        setEventId={(e) => handleInput("remitteeId", e)}
                    />
                    {isDirty && errors.remitteeId && <span className="text-danger">{errors.remitteeId}</span>}
                </div>

                {/* BANK */}
                <div className="col-md-4">
                    <label className="form-label">
                        Banks <span className="text-danger">*</span>
                    </label>
                    <SearchableDropdown
                        id={model.bankDetailId}
                        options={dropdowns.banks}
                        url={`/remitters/${remitterId}/dashboard/banks/banks-detail`}
                        setEventId={(e) => handleInput("bankDetailId", e)}
                    />
                    {isDirty && errors.bankDetailId && <span className="text-danger">{errors.bankDetailId}</span>}
                </div>

                {/* AO DETAILS */}
                <div className="col-md-4">
                    <label className="form-label">
                        AO Details <span className="text-danger">*</span>
                    </label>
                    <SearchableDropdown
                        id={model.aoOrderDetailId}
                        options={dropdowns.aoDetails}
                        url={`/remitters/${remitterId}/dashboard/ao-order/ao-order-detail`}
                        setEventId={(e) => handleInput("aoOrderDetailId", e)}
                    />
                    {isDirty && errors.aoOrderDetailId && <span className="text-danger">{errors.aoOrderDetailId}</span>}
                </div>

                {/* AGGREGATE AMOUNT */}
                <div className="col-md-4">
                    <label className="form-label">Aggregate Amount</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        className="form-control"
                        value={model.aggregateAmount || ""}
                        onChange={(e) =>
                            handlePositiveDecimal(e.target.value, (v) =>
                                handleInput("aggregateAmount", v)
                            )
                        }
                    />
                </div>

                {/* COUNTRY */}
                <div className="col-md-4">
                    <label className="form-label">
                        Country <span className="text-danger">*</span>
                    </label>
                    <SearchableDropdown
                        id={model.country}
                        options={enums.countryCodeRemitter}
                        setEventId={(e) => handleInput("country", e)}
                    />
                    {isDirty && errors.country && <span className="text-danger">{errors.country}</span>}
                </div>

                {model.country === "9999" && (
                    <div className="col-md-4">
                        <label className="form-label">
                            Other Country <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={model.countryOther || ""}
                            onChange={(e) => handleInput("countryOther", e.target.value)}
                        />
                        {isDirty && errors.countryOther && <span className="text-danger">{errors.countryOther}</span>}
                    </div>
                )}

                {/* CURRENCY */}
                <div className="col-md-4">
                    <label className="form-label">
                        Currency <span className="text-danger">*</span>
                    </label>
                    <SearchableDropdown
                        id={model.currency}
                        options={enums.currencies}
                        setEventId={(e) => handleInput("currency", e)}
                    />
                    {isDirty && errors.currency && <span className="text-danger">{errors.currency}</span>}
                </div>

                {model.currency === "99" && (
                    <div className="col-md-4">
                        <label className="form-label">
                            Other Currency <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={model.currencyOther || ""}
                            onChange={(e) => handleInput("currencyOther", e.target.value)}
                        />
                        {isDirty && errors.currencyOther && <span className="text-danger">{errors.currencyOther}</span>}
                    </div>
                )}

                {/* AMOUNT INR */}
                <div className="col-md-4">
                    <label className="form-label">
                        Amount Payable (INR) <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        className="form-control"
                        value={model.inIndian || ""}
                        onChange={(e) =>
                            handlePositiveDecimal(e.target.value, (v) =>
                                handleInput("inIndian", v)
                            )
                        }
                    />
                    {isDirty && errors.inIndian && <span className="text-danger">{errors.inIndian}</span>}
                </div>

                {/* AMOUNT FOREIGN */}
                <div className="col-md-4">
                    <label className="form-label">
                        Amount Payable (Foreign) <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        className="form-control"
                        value={model.inForiegn || ""}
                        onChange={(e) =>
                            handlePositiveDecimal(e.target.value, (v) =>
                                handleInput("inForiegn", v)
                            )
                        }
                    />
                    {isDirty && errors.inForiegn && <span className="text-danger">{errors.inForiegn}</span>}
                </div>

                {/* NATURE */}
                <div className="col-md-4">
                    <label className="form-label">
                        Natures <span className="text-danger">*</span>
                    </label>
                    <SearchableDropdown
                        id={model.nature}
                        options={enums.incomeNatureType}
                        setEventId={(e) => handleInput("nature", e)}
                    />
                    {isDirty && errors.nature && <span className="text-danger">{errors.nature}</span>}
                </div>

                {model.nature === "16.99" && (
                    <div className="col-md-4">
                        <label className="form-label">
                            Other Nature <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={model.otherNature || ""}
                            onChange={(e) => handleInput("otherNature", e.target.value)}
                        />
                        {isDirty && errors.otherNature && <span className="text-danger">{errors.otherNature}</span>}
                    </div>
                )}

                {/* PURPOSE CATEGORY */}
                <div className="col-md-4">
                    <label className="form-label">
                        Rev Pur Category <span className="text-danger">*</span>
                    </label>
                    <SearchableDropdown
                        id={model.purposeCode}
                        options={enums.revPurCategory}
                        setEventId={(e) => handleInput("purposeCode", e)}
                    />
                    {isDirty && errors.purposeCode && <span className="text-danger">{errors.purposeCode}</span>}
                </div>

                {/* PURPOSE CODE */}
                <div className="col-md-4">
                    <label className="form-label">
                        Rev Pur Code <span className="text-danger">*</span>
                    </label>
                    <SearchableDropdown
                        id={model.purposeCode1}
                        options={
                            model.purposeCode
                                ? enums.revPurCode.filter((i) =>
                                    i.key.startsWith(model.purposeCode)
                                )
                                : []
                        }
                        setEventId={(e) => handleInput("purposeCode1", e)}
                    />
                    {isDirty && errors.purposeCode1 && <span className="text-danger">{errors.purposeCode1}</span>}
                </div>

                {/* PROPOSED DATE */}
                <div className="col-md-4">
                    <label className="form-label">
                        Proposed Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                        placeholderText="dd/MM/yyyy"
                        selected={model.proposedDate}
                        className="form-control w-100"
                        dateFormat="dd/MM/yyyy"
                        onKeyDown={(e) => e.preventDefault()}
                        onChange={(e) => handleInput("proposedDate", e)}
                    />
                    {isDirty && errors.proposedDate && <span className="text-danger">{errors.proposedDate}</span>}
                </div>

                {/* TDS AMOUNT */}
                <div className="col-md-4">
                    <label className="form-label">
                        TDS Amount <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        className="form-control"
                        value={model.amountOfTds || ""}
                        onChange={(e) =>
                            handlePositiveDecimal(e.target.value, (v) =>
                                handleInput("amountOfTds", v)
                            )
                        }
                    />
                    {isDirty && errors.amountOfTds && <span className="text-danger">{errors.amountOfTds}</span>}
                </div>

                {/* TDS RATE */}
                <div className="col-md-4">
                    <label className="form-label">
                        Rate Of TDS <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        className="form-control"
                        value={model.tdsRate || ""}
                        onChange={(e) =>
                            handlePositiveDecimal(e.target.value, (v) =>
                                handleInput("tdsRate", v)
                            )
                        }
                    />
                    {isDirty && errors.tdsRate && <span className="text-danger">{errors.tdsRate}</span>}
                </div>

                {/* TDS DEDUCTION DATE */}
                <div className="col-md-4">
                    <label className="form-label">TDS Deduction Date</label>
                    <DatePicker
                        placeholderText="dd/MM/yyyy"
                        selected={model.dateOfDeduction}
                        className="form-control w-100"
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date(2004, 3, 1)}
                        maxDate={new Date()}
                        onKeyDown={(e) => e.preventDefault()}
                        onChange={(e) => handleInput("dateOfDeduction", e)}
                    />
                </div>

                {/* DECLARATION */}
                <div className="col-md-12">
                    <h5 className="fw-bold mt-4">Declaration</h5>
                </div>

                <div className="col-md-4">
                    <label className="form-label">
                        I / We <span className="text-danger">*</span>
                    </label>
                    <select
                        className="form-select"
                        value={model.i_We}
                        onChange={(e) => handleInput("i_We", e.target.value)}
                    >
                        <option value="1">I</option>
                        <option value="2">WE</option>
                    </select>
                    {isDirty && errors.i_We && <span className="text-danger">{errors.i_We}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">
                        Verification Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                        placeholderText="dd/MM/yyyy"
                        selected={model.verificationDate}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        onKeyDown={(e) => e.preventDefault()}
                        onChange={(e) => handleInput("verificationDate", e)}
                    />
                    {isDirty && errors.verificationDate && <span className="text-danger">{errors.verificationDate}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">
                        Place <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.verificationPlace || ""}
                        onChange={(e) => handleInput("verificationPlace", e.target.value)}
                    />
                    {isDirty && errors.verificationPlace && <span className="text-danger">{errors.verificationPlace}</span>}
                </div>

                {/* SAVE */}
                <div className="col-md-12 mt-4">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={handleSave}
                    >
                        Save Remittance
                    </button>
                </div>
            </div>
        </form>
    );
}
