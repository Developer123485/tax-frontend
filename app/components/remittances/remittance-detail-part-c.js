"use client";

import React from "react";
import SearchableDropdown from "../deductors/searchable-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RemittanceDetailCA({
    model,
    errors,
    handleInput,
    handleSave,
    enums,
    dropdowns,
    isDirty,
    formType,
    remitterId
}) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const financialYearStart =
        today.getMonth() + 1 >= 4
            ? new Date(currentYear, 3, 1) // April 1st of this year
            : new Date(currentYear - 1, 3, 1); // A
    return (
        <form autoComplete="off">
            <div className="row bg-light-gray px-2 py-2 rounded-3 g-3 my-4">
                <h5 className="text-blue fw-bold">Remittance Details (CB)</h5>

                {/* REMITTEE */}
                <div className="col-md-4">
                    <label className="form-label">Remittee <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.remitteeId}
                        url={`/remitters/${remitterId}/dashboard/remittees/remittee-detail`}
                        options={dropdowns.remittees}
                        setEventId={(e) => handleInput("remitteeId", e)}
                    />
                    {isDirty && errors.remitteeId && <span className="text-danger">{errors.remitteeId}</span>}
                </div>

                {/* BANK */}
                <div className="col-md-4">
                    <label className="form-label">Bank <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.bankDetailId}
                        url={`/remitters/${remitterId}/dashboard/banks/banks-detail`}
                        options={dropdowns.banks}
                        setEventId={(e) => handleInput("bankDetailId", e)}
                    />
                    {isDirty && errors.bankDetailId && <span className="text-danger">{errors.bankDetailId}</span>}
                </div>

                {/* ACCOUNTANT */}
                <div className="col-md-4">
                    <label className="form-label">Accountant <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.accountantDetailId}
                        url={`/remitters/${remitterId}/dashboard/accountants/accountant-detail`}
                        options={dropdowns.accountants}
                        setEventId={(e) => handleInput("accountantDetailId", e)}
                    />
                    {isDirty && errors.accountantDetailId && <span className="text-danger">{errors.accountantDetailId}</span>}
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
                            className="form-control"
                            value={model.countryOther || ""}
                            maxLength={125}
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
                            className="form-control"
                            value={model.currencyOther || ""}
                            onChange={(e) => handleInput("currencyOther", e)}
                        />
                        {isDirty && errors.currencyOther && <span className="text-danger">{errors.currencyOther}</span>}
                    </div>
                )}

                {/* AMOUNTS */}
                <div className="col-md-4">
                    <label className="form-label">Amount Payable (INR) <span className="text-danger">*</span></label>
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
                    <label className="form-label">Amount Payable (Foreign) <span className="text-danger">*</span></label>
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


                {/* PROPOSED DATE */}
                <div className="col-md-4">
                    <label className="form-label">Proposed Date <span className="text-danger">*</span></label>
                    <DatePicker
                        placeholderText="dd/MM/yyyy"
                        onKeyDown={(e) => e.preventDefault()}
                        selected={model.proposedDate}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => handleInput("proposedDate", e)}
                    />
                    {isDirty && errors.proposedDate && <span className="text-danger">{errors.proposedDate}</span>}
                </div>


                {/* NATURE */}
                <div className="col-md-4">
                    <label className="form-label">Nature <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.nature}
                        options={enums.incomeNatureType}
                        setEventId={(e) => handleInput("nature", e)}
                    />
                    {isDirty && errors.nature && <span className="text-danger">{errors.nature}</span>}
                </div>

                {model.nature === "16.99" && (
                    <div className="col-md-4">
                        <label className="form-label">Other Nature <span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            value={model.otherNature || ""}
                            maxLength={255}
                            onChange={(e) => handleInput("otherNature", e)}
                        />
                        {isDirty && errors.otherNature && <span className="text-danger">{errors.otherNature}</span>}
                    </div>
                )}

                {/* PURPOSE CODE */}
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
                    <label className="form-label">Rev Pur Code (Select before Rev Pur Category)*</label>
                    <SearchableDropdown
                        id={model.purposeCode1}
                        options={
                            model.purposeCode
                                ? enums.rbiPurposeCode.filter(x =>
                                    x.key.startsWith(model.purposeCode)
                                )
                                : []
                        }
                        setEventId={(e) => handleInput("purposeCode1", e)}
                    />
                    {isDirty && errors.purposeCode1 && <span className="text-danger">{errors.purposeCode1}</span>}
                </div>

                {/* GROSSED UP */}
                <div className="col-md-4">
                    <label className="form-label">Grossed Up <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.grossedUp || "N"}
                        onChange={(e) => handleInput("grossedUp", e)}
                    >
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                    </select>
                    {isDirty && errors.grossedUp && <span className="text-danger">{errors.grossedUp}</span>}
                </div>

                <div className="col-md-12">
                    <h5 className="fw-bold mt-3">I.T. Act</h5>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Remittance Char India <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.remittanceCharIndia || ""}
                        onChange={(e) => handleInput("remittanceCharIndia", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.remittanceCharIndia && <span className="text-danger">{errors.remittanceCharIndia}</span>}
                </div>

                {model.remittanceCharIndia == "N" && <div className="col-md-4">
                    <label className="form-label">Reason Not
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control"
                        value={model.reasonNot || ""}
                        maxLength={125}
                        onChange={(e) => handleInput("reasonNot", e)}
                    />
                    {isDirty && errors.reasonNot && <span className="text-danger">{errors.reasonNot}</span>}
                </div>
                }

                {model.remittanceCharIndia == "Y" && <div className="col-md-4">
                    <label className="form-label">IT Act Relevant Section
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control"
                        value={model.itActRelevantSection || ""}
                        maxLength={30}
                        onChange={(e) => handleInput("itActRelevantSection", e)}
                    />
                    {isDirty && errors.itActRelevantSection && <span className="text-danger">{errors.itActRelevantSection}</span>}
                </div>
                }

                {model.remittanceCharIndia == "Y" && <div className="col-md-4">
                    <label className="form-label">Income Chargeable (IT Act)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("itActIncomeChargeable", value);
                        }}
                        className="form-control"
                        value={model.itActIncomeChargeable || ""}
                    />
                    {isDirty && errors.itActIncomeChargeable && <span className="text-danger">{errors.itActIncomeChargeable}</span>}
                </div>}

                {model.remittanceCharIndia == "Y" && < div className="col-md-4">
                    <label className="form-label">Tax Liability (IT Act)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("itActTaxLiability", value);
                        }}
                        className="form-control"
                        value={model.itActTaxLiability || ""}
                    />
                    {isDirty && errors.itActTaxLiability && <span className="text-danger">{errors.itActTaxLiability}</span>}
                </div>}

                {model.remittanceCharIndia == "Y" && <div className="col-md-4">
                    <label className="form-label">Basis for Tax (IT Act)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control"
                        value={model.itActBasisForTax || ""}
                        onChange={(e) => handleInput("itActBasisForTax", e)}
                    />
                    {isDirty && errors.itActBasisForTax && <span className="text-danger">{errors.itActBasisForTax}</span>}
                </div>}

                <div className="col-md-12">
                    <h5 className="fw-bold mt-4">DTAA</h5>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Tax Residency Certificate <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.taxResidCert || ""}
                        onChange={(e) => handleInput("taxResidCert", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.taxResidCert && <span className="text-danger">{errors.taxResidCert}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Relevant DTAA</label>
                    <input
                        className="form-control"
                        value={model.relevantDtaa || ""}
                        onChange={(e) => handleInput("relevantDtaa", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Relevant Article (DTAA)</label>
                    <input
                        className="form-control"
                        value={model.relevantArtDtaa || ""}
                        onChange={(e) => handleInput("relevantArtDtaa", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Taxable Income (DTAA)</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("taxIncDtaa", value);
                        }}
                        className="form-control"
                        value={model.taxIncDtaa || ""}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Tax Liability (DTAA)</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("taxLiablDtaa", value);
                        }}
                        className="form-control"
                        value={model.taxLiablDtaa || ""}
                    />
                </div>
                <div className="col-md-4"></div>

                <div className="col-md-4">
                    <label className="form-label">Remittance for Royalty <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.remForRoyFlg || ""}
                        onChange={(e) => handleInput("remForRoyFlg", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.remForRoyFlg && <span className="text-danger">{errors.remForRoyFlg}</span>}
                </div>

                {model.remForRoyFlg == "Y" && <div className="col-md-4">
                    <label className="form-label">Art Dtaa
                        {model.remForRoyFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.artDtaa || ""}
                        disabled={model.remForRoyFlg == "N"}
                        onChange={(e) => handleInput("artDtaa", e)}
                    />
                    {isDirty && model.remForRoyFlg == "Y" && errors.artDtaa && <span className="text-danger">{errors.artDtaa}</span>}
                </div>}

                {model.remForRoyFlg == "Y" && <div className="col-md-4">
                    <label className="form-label">DTAA TDS Rate (%)
                        {model.remForRoyFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("rateTdsADtaa", value);
                        }}
                        className="form-control"
                        value={model.rateTdsADtaa || ""}
                        disabled={model.remForRoyFlg == "N"}
                    />
                    {isDirty && model.remForRoyFlg == "Y" && errors.rateTdsADtaa && <span className="text-danger">{errors.rateTdsADtaa}</span>}
                </div>
                }


                <div className="col-md-4">
                    <label className="form-label">
                        In case the remittance is on account of business income
                        <span className="text-danger">*</span>
                    </label>
                    <select
                        className="form-select"
                        value={model.remAcctBusIncFlg || ""}
                        onChange={(e) => handleInput("remAcctBusIncFlg", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.remAcctBusIncFlg && <span className="text-danger">{errors.remAcctBusIncFlg}</span>}
                </div>

                {model.remAcctBusIncFlg == "Y" && <div className="col-md-4">
                    <label className="form-label">Whether such income is liable to tax in India
                        {model.remAcctBusIncFlg == "Y" && <span className="text-danger">*</span>}</label>
                    <select
                        className="form-select"
                        value={model.IncLiabIndiaFlg || ""}
                        onChange={(e) => handleInput("IncLiabIndiaFlg", e)}
                        disabled={model.remAcctBusIncFlg == "N"}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.IncLiabIndiaFlg && <span className="text-danger">{errors.IncLiabIndiaFlg}</span>}
                </div>}

                {model.IncLiabIndiaFlg == "Y" && <div className="col-md-4">
                    <label className="form-label">If so, the basis of arriving at rate of deduction of tax
                        {model.IncLiabIndiaFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("amtToTaxInd", value);
                        }}
                        className="form-control"
                        value={model.amtToTaxInd || ""}
                        disabled={model.IncLiabIndiaFlg == "N"}
                    />
                    {isDirty && model.remAcctBusIncFlg == "Y" && errors.amtToTaxInd && <span className="text-danger">{errors.amtToTaxInd}</span>}
                </div>
                }

                {errors.IncLiabIndiaFlg == "N" && <div className="col-md-4">
                    <label className="form-label">specifying relevant article of DTAA
                        {errors.IncLiabIndiaFlg == "N" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.rateDednDtaa || ""}
                        disabled={model.IncLiabIndiaFlg == "Y"}
                        onChange={(e) => handleInput("rateDednDtaa", e)}
                    />
                    {isDirty && model.remAcctBusIncFlg == "N" && errors.rateDednDtaa && <span className="text-danger">{errors.rateDednDtaa}</span>}
                </div>}


                <div className="col-md-4">
                    <label className="form-label">Rem On Cap Gain Flg <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.remOnCapGainFlg || ""}
                        onChange={(e) => handleInput("remOnCapGainFlg", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.remOnCapGainFlg && <span className="text-danger">{errors.remOnCapGainFlg}</span>}
                </div>


                {model.remOnCapGainFlg == "Y" && <div className="col-md-4">
                    <label className="form-label">Long Term Capital Gain
                        {model.remOnCapGainFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("amtLongTrm", value);
                        }}
                        className="form-control"
                        value={model.amtLongTrm || ""}
                        disabled={model.remOnCapGainFlg == "N"}
                    />
                    {isDirty && model.remOnCapGainFlg == "Y" && errors.amtLongTrm && <span className="text-danger">{errors.amtLongTrm}</span>}
                </div>
                }

                {model.remOnCapGainFlg == "Y" && <div className="col-md-4">
                    <label className="form-label">Short Term Capital Gain
                        {model.remOnCapGainFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("amtShortTrm", value);
                        }}
                        className="form-control"
                        value={model.amtShortTrm || ""}
                        disabled={model.remOnCapGainFlg == "N"}
                    />
                    {isDirty && model.remOnCapGainFlg == "Y" && errors.amtShortTrm && <span className="text-danger">{errors.amtShortTrm}</span>}
                </div>
                }

                {model.remOnCapGainFlg == "Y" && <div className="col-md-4">
                    <label className="form-label">Basis Tax Inc Dtaa
                        {model.remOnCapGainFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.basisTaxIncDtaa || ""}
                        disabled={model.remOnCapGainFlg == "N"}
                        onChange={(e) => handleInput("basisTaxIncDtaa", e)}
                    />
                    {isDirty && model.remOnCapGainFlg == "Y" && errors.basisTaxIncDtaa && <span className="text-danger">{errors.basisTaxIncDtaa}</span>}
                </div>
                }
                <div className="col-md-8"></div>
                <div className="col-md-4">
                    <label className="form-label">Other Rem Dtaa <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.otherRemDtaa || ""}
                        onChange={(e) => handleInput("otherRemDtaa", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.otherRemDtaa && <span className="text-danger">{errors.otherRemDtaa}</span>}
                </div>

                {model.otherRemDtaa == "Y" && <div className="col-md-4">
                    <label className="form-label">Nature Rem Dtaa
                        {model.otherRemDtaa == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.natureRemDtaa || ""}
                        disabled={model.otherRemDtaa === "N"}
                        onChange={(e) => handleInput("natureRemDtaa", e)}
                    />
                    {isDirty && model.otherRemDtaa == "Y" && errors.natureRemDtaa && <span className="text-danger">{errors.natureRemDtaa}</span>}
                </div>
                }
                <div className="col-md-4"></div>

                <div className="col-md-4">
                    <label className="form-label">Tax Ind Dtaa Flg <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.taxIndDtaaFlg || ""}
                        onChange={(e) => handleInput("taxIndDtaaFlg", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.taxIndDtaaFlg && <span className="text-danger">{errors.taxIndDtaaFlg}</span>}
                </div>

                {model.taxIndDtaaFlg == "Y" && <div className="col-md-4">
                    <label className="form-label">Rate Tds DDtaa
                        {model.taxIndDtaaFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("rateTdsDDtaa", value);
                        }}
                        className="form-control"
                        value={model.rateTdsDDtaa || ""}
                        disabled={model.taxIndDtaaFlg === "N"}
                    />
                    {isDirty && model.taxIndDtaaFlg == "Y" && errors.rateTdsDDtaa && <span className="text-danger">{errors.rateTdsDDtaa}</span>}
                </div>
                }

                {model.taxIndDtaaFlg == "N" && <div className="col-md-4">
                    <label className="form-label">Rel Art DetlD Dtaa
                        {model.taxIndDtaaFlg == "N" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.relArtDetlDDtaa || ""}
                        disabled={model.taxIndDtaaFlg === "Y"}
                        maxLength={125}
                        onChange={(e) => handleInput("relArtDetlDDtaa", e)}
                    />
                    {isDirty && model.taxIndDtaaFlg == "N" && errors.relArtDetlDDtaa && <span className="text-danger">{errors.relArtDetlDDtaa}</span>}
                </div>}


                <div className="col-md-12">
                    <h5 className="fw-bold mt-4">TDS</h5>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Amount Payable (Foreign)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("amtPayForgnTds", value);
                        }}
                        className="form-control"
                        value={model.amtPayForgnTds || ""}
                    />
                    {isDirty && errors.amtPayForgnTds && <span className="text-danger">{errors.amtPayForgnTds}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Amount Payable (Indian)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("amtPayIndianTds", value);
                        }}
                        className="form-control"
                        value={model.amtPayIndianTds || ""}
                    />
                    {isDirty && errors.amtPayIndianTds && <span className="text-danger">{errors.amtPayIndianTds}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Rate Tds Secb Flg</label>
                    <select
                        className="form-select"
                        value={model.rateTdsSecbFlg || ""}
                        onChange={(e) => handleInput("rateTdsSecbFlg", e)}
                    >
                        <option value="">Select</option>
                        <option value="1">As Per Income-Tax Act</option>
                        <option value="2">As Per DTAA</option>
                    </select>
                    {isDirty && errors.rateTdsSecbFlg && <span className="text-danger">{errors.rateTdsSecbFlg}</span>}
                </div>


                <div className="col-md-4">
                    <label className="form-label">Rate Tds Sec B</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("rateTdsSecB", value);
                        }}
                        className="form-control"
                        value={model.rateTdsSecB || ""}
                    />
                </div>


                <div className="col-md-4">
                    <label className="form-label">Actual TDS Amount (Foreign)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="decimal"
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d{0,14}(\.\d{0,2})?$/;
                            if (!regex.test(value)) return;
                            handleInput("actlAmtTdsForgn", value);
                        }}
                        className="form-control"
                        value={model.actlAmtTdsForgn || ""}
                    />
                    {isDirty && errors.actlAmtTdsForgn && <span className="text-danger">{errors.actlAmtTdsForgn}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">TDS Deduction Date
                        <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                        placeholderText="dd/MM/yyyy"
                        onKeyDown={(e) => e.preventDefault()}
                        selected={model.dednDateTds}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date(2004, 3, 1)}
                        maxDate={new Date()}
                        onChange={(e) => handleInput("dednDateTds", e)}
                    />
                    {isDirty && errors.dednDateTds && <span className="text-danger">{errors.dednDateTds}</span>}
                </div>


                {/* SAVE */}
                <div className="col-md-12 mt-3">
                    <button type="button" className="btn btn-primary" onClick={handleSave}>
                        Save Remittance
                    </button>
                </div>
            </div>
        </form >
    );
}
