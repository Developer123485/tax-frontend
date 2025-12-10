"use client";

import React, { useEffect, useState } from "react";
import SearchableDropdown from "../../deductors/searchable-dropdown";
// import { CurrencyList, NatureList } from "@/app/enums/remittance.enums";

export default function RemittanceDetail({
    model,
    errors,
    handleInput,
    handleSave,
    remitteeList,
    bankList
}) {

    return (
        <></>
        // <form autoComplete="off">
        //     <div className="row bg-light-gray px-3 py-4 rounded-3 g-3 my-4">
        //         <h5 className="text-blue fw-bold">Remittance Details</h5>

        //         {/* COUNTRY */}
        //         <div className="col-md-3">
        //             <label className="form-label">Country</label>
        //             <input
        //                 type="text"
        //                 className="form-control"
        //                 value={model.country || ""}
        //                 onChange={(e) => handleInput("country", e)}
        //             />
        //         </div>

        //         {/* CURRENCY */}
        //         <div className="col-md-3">
        //             <label className="form-label">Currency <span className="text-danger">*</span></label>
        //             <select
        //                 className="form-select"
        //                 value={model.currency ?? ""}
        //                 onChange={(e) => handleInput("currency", e)}
        //             >
        //                 <option value="">Select</option>
        //                 {CurrencyList.map(c => (
        //                     <option key={c.id} value={c.id}>{c.name}</option>
        //                 ))}
        //             </select>
        //             {model.currency === "OTHERS" && (
        //                 <input
        //                     type="text"
        //                     className="form-control mt-2"
        //                     placeholder="Enter other currency"
        //                     value={model.currencyOther || ""}
        //                     onChange={(e) => handleInput("currencyOther", e)}
        //                 />
        //             )}
        //             {errors.currency && <span className="text-danger">{errors.currency}</span>}
        //         </div>

        //         {/* NATURE */}
        //         <div className="col-md-3">
        //             <label className="form-label">Nature <span className="text-danger">*</span></label>
        //             <select
        //                 className="form-select"
        //                 value={model.nature ?? ""}
        //                 onChange={(e) => handleInput("nature", e)}
        //             >
        //                 <option value="">Select</option>
        //                 {NatureList.map(n => (
        //                     <option key={n.id} value={n.id}>{n.name}</option>
        //                 ))}
        //             </select>

        //             {model.nature === "OTHERS" && (
        //                 <input
        //                     type="text"
        //                     className="form-control mt-2"
        //                     placeholder="Enter other nature"
        //                     value={model.otherNature || ""}
        //                     onChange={(e) => handleInput("otherNature", e)}
        //                 />
        //             )}

        //             {errors.nature && <span className="text-danger">{errors.nature}</span>}
        //         </div>

        //         {/* REMITTEE DROPDOWN */}
        //         <div className="col-md-3">
        //             <label className="form-label">Remittee <span className="text-danger">*</span></label>
        //             <SearchableDropdown
        //                 id={model.remitteeId}
        //                 options={remitteeList}
        //                 setEventId={(e) => handleInput("remitteeId", e)}
        //             />
        //             {errors.remitteeId && <span className="text-danger">{errors.remitteeId}</span>}
        //         </div>

        //         {/* BANK DROPDOWN */}
        //         <div className="col-md-3">
        //             <label className="form-label">Bank <span className="text-danger">*</span></label>
        //             <SearchableDropdown
        //                 id={model.bankDetailId}
        //                 options={bankList}
        //                 setEventId={(e) => handleInput("bankDetailId", e)}
        //             />
        //             {errors.bankDetailId && <span className="text-danger">{errors.bankDetailId}</span>}
        //         </div>

        //         {/* AMOUNTS */}
        //         <div className="col-md-3">
        //             <label className="form-label">Amount Payable</label>
        //             <input
        //                 type="number"
        //                 className="form-control"
        //                 value={model.amountPayable || ""}
        //                 onChange={(e) => handleInput("amountPayable", e)}
        //             />
        //         </div>

        //         <div className="col-md-3">
        //             <label className="form-label">TDS Amount</label>
        //             <input
        //                 type="number"
        //                 className="form-control"
        //                 value={model.amountOfTds || ""}
        //                 onChange={(e) => handleInput("amountOfTds", e)}
        //             />
        //         </div>

        //         <div className="col-md-3">
        //             <label className="form-label">Actual Remittance After TDS</label>
        //             <input
        //                 type="number"
        //                 className="form-control"
        //                 value={model.actualRemittanceAfterTds || ""}
        //                 onChange={(e) => handleInput("actualRemittanceAfterTds", e)}
        //             />
        //         </div>

        //         {/* TDS DATE */}
        //         <div className="col-md-3">
        //             <label className="form-label">TDS Deduction Date</label>
        //             <input
        //                 type="date"
        //                 className="form-control"
        //                 value={model.tdsDeductionDate ?? ""}
        //                 onChange={(e) => handleInput("tdsDeductionDate", e)}
        //             />
        //         </div>

        //         {/* SAVE BUTTON */}
        //         <div className="col-md-12 mt-4">
        //             <button className="btn btn-primary" type="button" onClick={handleSave}>
        //                 Save Remittance
        //             </button>
        //         </div>
        //     </div>
        // </form>
    );
}
