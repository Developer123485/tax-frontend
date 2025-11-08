"use client";
import React, { useState, use, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { saveAs } from "file-saver";
import "react-toastify/dist/ReactToastify.css";
import { DeductorsService } from "@/app/services/deductors.service";
import { Dropdown, Form } from "react-bootstrap";
import SearchableDropdown from "../deductors/searchable-dropdown";
import api from "@/app/utils/interceptors";

export default function ImportDeductorTXTPopup(props) {
  const pathname = usePathname();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSalaryFile, setSelectedSalaryFile] = useState(null);
  const [financialYear, setFinancialYear] = useState("");
  const [fileName, setFileName] = useState("");
  const [deductorList, setDeductorList] = useState([]);
  const [deductorCode, setDeductorCode] = useState("");
  const [citAddress, setCitAddress] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [employeePannumbers, setEmployeePannumbers] = useState([]);
  const [uploadSalaryProgress, setSalaryUploadProgress] = useState(0);
  const [exportProgress, setExportProgress] = useState(100);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isSalaryUploading, setIsSalaryUploading] = useState(false);
  const [openGeneratePopup, setOpenGeneratePopup] = useState(false);
  const [type, setType] = useState("new");
  const [showLoader, setShowLoader] = useState(false);
  const [deductorInfo, setDeductorInfo] = useState(null);
  const [selected, setSelected] = useState("Choose Deductor");
  const [deductorId, setDeductorId] = useState(null);

  useEffect(() => {
    getDeductorDropdownList();
  }, []);

  function getDeductorDropdownList() {
    DeductorsService.getDeductorDropdownList().then((res) => {
      if (res) {
        setDeductorList(res);
      }
    });
  }

  const fileSelectHandler = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
    lines.map((line) => {
      const fields = line.split("^");
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
    });
  };

  async function submitTxtFile(e, value) {
    e.preventDefault();
    setIsloading(true);
    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("type", type);
    formData.append("deductorCode", deductorCode);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      let result;
      if (pathname === "deductors") {
        formData.append("deductorId", deductorId ? parseInt(deductorId) : 0);
        result = await api.post(`forms/uploadTXTFile`, formData, {
          timeout: 300000 // 5 minutes (in ms)
        }, config);
      }
      if (pathname !== "deductors") {
        formData.append("deductorId", props.deductorId);
        formData.append("quarter", props.quarter);
        formData.append("financialYear", props.financialYear);
        result = await api.post(`correctionStatements/uploadTDSFile`, formData, {
          timeout: 300000 // 5 minutes (in ms)
        }, config);
      }
      if (result && result.status == true) {
        toast.success("File upload successfully");
        setTimeout(() => {
          setIsloading(false);
          setFileName("");
          props.setShow(false);
          setSelectedFile(null);
          props.fetchDeductors(1);
        }, 500);
      } else {
        const blob = new Blob([result], { type: "text/plain" });
        saveAs(blob, "errors.txt");
        toast.error("File upload failed");
        setIsloading(false);
      }
    } catch (e) {
      if (e?.response?.data?.errorMessage) {
        toast.error(e?.response?.data?.errorMessage);
      }
      else {
        toast.error(e?.message);
      }
      setIsloading(false);
    }
  }

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
          props.setShow(false);
          setSelectedFile(null);
          setDeductorInfo(null);
          setDeductorCode("");
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
                                accept={pathname === "deductors" ? ".txt" : ".tds"}
                              />
                              {pathname === "deductors" && <h5 className="fw-bold mb-0">Import from TXT/TDS</h5>}
                              {pathname !== "deductors" && <h5 className="fw-bold mb-0">Import from tds</h5>}
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
                            setSelectedFile(null);
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
              {selectedFile && (
                <>
                  <div className="col-md-12 my-4">
                    <div className="border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                      <div className="row g-3">
                        <div className="col-md-5">
                          <span className="me-1">Deductor Name:</span>
                          <span className="fw-bold text-uppercase">
                            {deductorInfo?.deductorName}
                          </span>
                        </div>
                        <div className="col-md-4">
                          <span className="me-1">TAN:</span>
                          <span className="fw-bold text-uppercase">
                            {deductorInfo?.tan}
                          </span>
                        </div>
                        <div className="col-md-3">
                          <span className="me-1">PAN:</span>
                          <span className="fw-bold text-uppercase">
                            {deductorInfo?.pan}
                          </span>
                        </div>
                        <div className="col-md-5">
                          <span className="me-1">Financial Year:</span>
                          <span className="fw-bold text-uppercase">
                            {deductorInfo?.financialYear}
                          </span>
                        </div>
                        <div className="col-md-4">
                          <span className="me-1">Quarter:</span>
                          <span className="fw-bold text-uppercase">
                            {deductorInfo?.quarter}
                          </span>
                        </div>
                        <div className="col-md-3">
                          <span className="me-1">Form No:</span>
                          <span className="fw-bold text-uppercase">
                            {deductorInfo?.form}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-0">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="ImportNewClient"
                        checked={type == "new"}
                        value={type}
                        onChange={(e) => {
                          setType("new");
                          setSelected("Choose Deductor");
                        }}
                      />
                      <label
                        className="form-check-label mb-2"
                        for="ImportNewClient"
                      >
                        Import New Client with Code No.
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="ImportExistingClient"
                        checked={type == "exist"}
                        value={type}
                        onChange={(e) => {
                          setType("exist");
                          setDeductorCode("");
                        }}
                      />
                      <label
                        className="form-check-label mb-2"
                        for="ImportExistingClient"
                      >
                        Import with Existing Client
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7 mt-2">
                    <div className="w-100">
                      {type == "new" && (
                        <input
                          type="text"
                          maxLength={10}
                          value={deductorCode}
                          className="form-control"
                          onChange={(e) => setDeductorCode(e.target.value)}
                          id="deductorCode"
                        ></input>
                      )}
                      {deductorList && deductorList.length > 0 && type == "exist" && (
                        <SearchableDropdown
                          setEventId={setDeductorId}
                          options={deductorList}
                          id={deductorId}
                        ></SearchableDropdown>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-end">
                      <button
                        type="button"
                        onClick={(e) => submitTxtFile(e)}
                        className="btn btn btn-primary"
                        disabled={
                          !selectedFile ||
                          (!deductorCode && !deductorId)
                        }
                      >
                        {isLoading && (
                          <span>
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </span>
                        )}
                        Save
                      </button>
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
