"use client";
import React, { useState, use, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImportTdsTXTPopup(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [deductorInfo, setDeductorInfo] = useState(null);

    const fileSelectHandler = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        props.setSelectedTxtFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
        const text = await file.text();
        const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
        lines.map((line) => {
            const fields = line.split("^");
            if (fields[4] && (fields[4] == "24Q" || fields[4] == "26Q" || fields[4] == "27Q" || fields[4] == "27EQ")) {
                if (fields && fields[1] == "BH") {
                    const obj = {
                        deductorName: fields[18] || "",
                        pan: fields[14] || "",
                        tan: fields[12] || "",
                        financialYear:
                            fields[16].substring(0, 4) + "-" + fields[16].substring(6, 4) || "",
                        form: fields[4] || "",
                        quarter: fields[17] || "",
                    };
                    setDeductorInfo(obj);
                }
            } else {
                toast.error("Select Valid file")
            }
        });
    };

    return (
        <>
            <ToastContainer autoClose={3500} />
            <Modal
                className=""
                size="lg"
                centered
                keyboard={false}
                backdrop="static"
                show={props.show}
                onHide={() => {
                    props.setShowModal(false);
                    props.setSelectedTxtFile(null);
                    setDeductorInfo(null);
                    setFileName("");
                }}
            >
                <Modal.Header className="border-0" closeButton>
                    {" "}
                    <h3 className="mb-0">Upload File</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <form className="row g-3 mb-3 mb-md-3 align-items-center">
                            <div className="col-md-12">
                                <div className="row align-items-center">
                                    <div className="deductors-sec col-md-5">
                                        <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                                            <div className="row align-items-center">
                                                <div className="col-md-3">
                                                    <Image
                                                        className="img-fluid"
                                                        src="/images/dashboards/import_txt_file_icon.svg"
                                                        alt="import_txt_file_icon"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                                <div className="col-md-9" onChange={fileSelectHandler}>
                                                    <h5 className="fw-bold text-capitalize mb-0">
                                                        {/* {fileName && <span className="text-danger">{fileName}</span>} */}
                                                        <label className="text-capitalize cursor-pointer">
                                                            <span className="fw-bold"> </span>
                                                            <input
                                                                type="file"
                                                                className="visually-hidden"
                                                                accept=".txt"
                                                            />
                                                            <h5 className="fw-bold mb-0">Import from TXT</h5>
                                                        </label>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        {fileName && (
                                            <span className="bg-light-gray fs-18 px-4 py-2 rounded-pill">{fileName}<span className="ms-3">
                                                <a href="Javascript:void(0)"
                                                    onClick={(e) => {
                                                        props.setSelectedTxtFile(null);
                                                        setDeductorInfo(null);
                                                        setFileName("");
                                                    }}
                                                >
                                                    <i className="fa-regular fa-circle-xmark" ></i>
                                                </a>
                                            </span></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {props.selectedTxtFile && deductorInfo?.tan && (
                                <>
                                    <div className="col-md-12 my-4">
                                        <div className="border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                                            <table className="table table-bordered align-middle mb-0">
                                                <thead className="table-light">
                                                    <tr className="bg-crm-grey">
                                                        <th scope="col"></th>
                                                        <th scope="col">Client Detail</th>
                                                        <th scope="col">Detail as per TXT</th>
                                                        <th scope="col">Remark</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <>
                                                        <tr>
                                                            <td className={"bg-crm-grey fw-bold"}>Tan</td>
                                                            <td>{sessionStorage.getItem("deductorTan")}</td>
                                                            <td>{deductorInfo?.tan}</td>
                                                            <td>{sessionStorage.getItem("deductorTan") != deductorInfo?.tan ? <span className="text-danger">Mismatched</span> : "Matched"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={"bg-crm-grey fw-bold"}>FY</td>
                                                            <td>{props?.financialYear}</td>
                                                            <td>{deductorInfo?.financialYear}</td>
                                                            <td>{props?.financialYear != deductorInfo?.financialYear ? <span className="text-danger">Mismatched</span> : "Matched"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={"bg-crm-grey fw-bold"}>Form</td>
                                                            <td>{props?.form}</td>
                                                            <td>{deductorInfo?.form}</td>
                                                            <td>{props?.form != deductorInfo?.form ? <span className="text-danger">Mismatched</span> : "Matched"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={"bg-crm-grey fw-bold"}>Quarter</td>
                                                            <td>{props?.quarter}</td>
                                                            <td>{deductorInfo?.quarter}</td>
                                                            <td>{props?.quarter != deductorInfo?.quarter ? <span className="text-danger">Mismatched</span> : "Matched"}</td>
                                                        </tr>
                                                    </>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 d-flex justify-content-end">
                                            {props?.quarter == deductorInfo?.quarter &&
                                                props?.form == deductorInfo?.form &&
                                                props?.financialYear == deductorInfo?.financialYear &&
                                                sessionStorage.getItem("deductorTan") == deductorInfo?.tan &&
                                                <button
                                                    type="button"
                                                    onClick={(e) => props.submitTxtFile(e)}
                                                    className="btn btn btn-primary"
                                                >
                                                    Save
                                                </button>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
