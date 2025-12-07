// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import ProcessPopup from "../../modals/processing";
// import SearchableDropdown from "../../deductors/searchable-dropdown";

// export default function RemitteeDetail(props) {
//   const router = useRouter(null);

//   const {
//     handleInputRemitter,
//     remittee,
//     remitterErrors,
//     isNextDirty,
//     enumList
//   } = props;

//   function handleInput(name, e) {
//     handleInputRemitter(name, e);
//   }

//   return (
//     <>
//       <form autoComplete="off">
//         <div className="row d-flex g-3">

//           <div className="row bg-light-gray px-3 py-4 rounded-3 mb-4 g-3">
//             <div className="col-md-12 mt-0">
//               <h5 className="text-blue fw-bold">Remittee Details</h5>
//             </div>

//             {/* === NAME === */}
//             <div className="col-md-3">
//               <label className="form-label">
//                 Name <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.name || ""}
//                 onChange={(e) => handleInput("name", e)}
//               />
//               {isNextDirty && remitterErrors.remitteeNameError && (
//                 <span className="text-danger">
//                   {remitterErrors.remitteeNameError}
//                 </span>
//               )}
//             </div>

//             {/* === PAN === */}
//             <div className="col-md-3">
//               <label className="form-label">
//                 PAN <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="text"
//                 maxLength={10}
//                 className="form-control"
//                 value={
//                   remittee.remitteePan
//                     ? remittee.remitteePan.toUpperCase()
//                     : ""
//                 }
//                 onChange={(e) => {
//                   e.target.value = e.target.value.toUpperCase();
//                   handleInput("remitteePan", e);
//                 }}
//               />
//               {isNextDirty && remitterErrors.remitteePanError && (
//                 <span className="text-danger">
//                   {remitterErrors.remitteePanError}
//                 </span>
//               )}
//             </div>

//             {/* === FLAT === */}
//             <div className="col-md-3">
//               <label className="form-label">Flat / Door No.</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.remitteeFlat || ""}
//                 onChange={(e) => handleInput("remitteeFlat", e)}
//               />
//             </div>

//             {/* === BUILDING === */}
//             <div className="col-md-3">
//               <label className="form-label">Building Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.remitteeBuilding || ""}
//                 onChange={(e) => handleInput("remitteeBuilding", e)}
//               />
//             </div>

//             {/* === STREET === */}
//             <div className="col-md-3">
//               <label className="form-label">Street</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.remitteeStreet || ""}
//                 onChange={(e) => handleInput("remitteeStreet", e)}
//               />
//             </div>

//             {/* === AREA === */}
//             <div className="col-md-3">
//               <label className="form-label">Area</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.remitteeArea || ""}
//                 onChange={(e) => handleInput("remitteeArea", e)}
//               />
//             </div>

//             {/* === CITY === */}
//             <div className="col-md-3">
//               <label className="form-label">City</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.remitteeCity || ""}
//                 onChange={(e) => handleInput("remitteeCity", e)}
//               />
//             </div>

//             {/* === STATE === */}
//             <div className="col-md-3">
//               <label className="form-label">State</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.remitteeState || ""}
//                 onChange={(e) => handleInput("remitteeState", e)}
//               />
//             </div>

//             {/* === COUNTRY === */}
//             <div className="col-md-6">
//               <label htmlFor="inputCountry" className="form-label">
//                 <span>Country</span>
//                 <span className="text-danger"> *</span>
//               </label>
//               {enumList.countries && enumList.countries.length > 0 && <SearchableDropdown
//                 setEventId={(e) => handleInput("remitteeCountry", e)}
//                 id={remittee.remitteeCountry}
//                 options={enumList.countries}
//               ></SearchableDropdown>
//               }
//               {isNextDirty && remitterErrors.remitterStateError && (
//                 <span className="text-danger">
//                   {remitterErrors.remitterStateError}
//                 </span>
//               )}
//             </div>

//             {/* === PINCODE === */}
//             <div className="col-md-3">
//               <label className="form-label">
//                 Zipcode <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="text"
//                 maxLength={6}
//                 className="form-control"
//                 value={remittee.remitteePincode || ""}
//                 onChange={(e) => handleInput("remitteePincode", e)}
//               />
//               {isNextDirty && remitterErrors.remitteePincodeError && (
//                 <span className="text-danger">
//                   {remitterErrors.remitteePincodeError}
//                 </span>
//               )}
//             </div>

//             {/* === EMAIL === */}
//             <div className="col-md-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.remitteeEmail || ""}
//                 onChange={(e) => handleInput("remitteeEmail", e)}
//               />
//             </div>

//             {/* === PHONE === */}
//             <div className="col-md-3">
//               <label className="form-label">Phone</label>
//               <input
//                 type="text"
//                 maxLength={15}
//                 className="form-control"
//                 value={remittee.remitteePhone || ""}
//                 onChange={(e) => handleInput("remitteePhone", e)}
//               />
//             </div>

//             {/* === PURPOSE CODE === */}
//             {/* <div className="col-md-3">
//               <label className="form-label">Purpose Code</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.purposeCode || ""}
//                 onChange={(e) => handleInput("purposeCode", e)}
//               />
//             </div> */}

//             {/* === COUNTRY REM MADE === */}
//             <div className="col-md-6">
//               <label htmlFor="inputCountry" className="form-label">
//                 <span>Country Remittance Made</span>
//               </label>
//               {enumList.countries && enumList.countries.length > 0 && <SearchableDropdown
//                 setEventId={(e) => handleInput("countryRemMade", e)}
//                 id={remittee.countryRemMade}
//                 options={enumList.countries}
//               ></SearchableDropdown>
//               }
//               {isNextDirty && remitterErrors.remitterStateError && (
//                 <span className="text-danger">
//                   {remitterErrors.remitterStateError}
//                 </span>
//               )}
//             </div>
//             {remittee.countryRemMade == "2" && <div className="col-md-3">
//               <label className="form-label"></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.countryRemMade || ""}
//                 onChange={(e) => handleInput("countryRemMade", e)}
//               />
//             </div>}

//             {/* === PRINCIPAL PLACE OF BUSINESS === */}
//             <div className="col-md-3">
//               <label className="form-label">
//                 Principal Place of Business
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={remittee.princPlcBusRemtee || ""}
//                 onChange={(e) => handleInput("princPlcBusRemtee", e)}
//               />
//             </div>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-12 px-0">
//               <button
//                 className="btn btn-primary"
//                 type="button"
//                 onClick={(e) => props.handleSave(e)}
//               >
//                 Save Remittee
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>

//       <ProcessPopup />
//     </>
//   );
// }
