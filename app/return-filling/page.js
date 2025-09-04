"use client";
import React, { useState, useEffect, use } from "react";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import { ReportingService } from "../services/reporting.service";
import { useSearchParams } from "next/navigation";
import ProcessPopup from "../components/modals/processing";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CommonService } from "../services/common.service";
import { ToastContainer, toast } from "react-toastify";
import DeleteConfirmation from "../components/modals/delete-confirmation";
import Image from "next/image";
import HeaderList from "../components/header/header-list";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ReturnFilling() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [returnFillings, setReturnFillings] = useState(null);
  const [pageSize, setPageSize] = useState(500);
  const searchParams = useSearchParams(null);
  const [showLoader, setShowLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [financialYears, setFinancialYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState(null);
  const [formType, setFormType] = useState("");
  const [financialYear, setFinancialYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [quarters, setQuarters] = useState(["Q1", "Q2", "Q3", "Q4"]);
  const currentYear = new Date().getFullYear();
  const [deleteId, setDeleteId] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const highlightStyle = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused ? "#007bff" : "#ccc",
    boxShadow: isFocused ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const highlightStyle1 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused1 ? "#007bff" : "#ccc",
    boxShadow: isFocused1 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const highlightStyle2 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused2 ? "#007bff" : "#ccc",
    boxShadow: isFocused2 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };
  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#F2F7FF!important",
        },
        minHeight: "45px",
      },
    },
    headCells: {
      style: {
        justifyContent: "start",
        outline: "1px",
        border: "1px solid #F2F7FF",
        fontSize: "12px",
      },
    },
    cells: {
      style: {
        justifyContent: "start",
        outline: "1px",
        border: "1px solid #FFFFFF",
        fontSize: "12px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
  };
  const columns = [
    {
      name: "Serial No",
      selector: (row, index) => (currentPage - 1) * pageSize + (index + 1),
    },
    {
      name: "Form Type",
      selector: (row) => row.formType || "-",
    },
    {
      name: "Quarter",
      selector: (row) => row?.quarter || "",
    },
    {
      name: "Financial Year",
      selector: (row) => row?.financialYear || "",
    },
    {
      name: "Due Date",
      selector: (row) =>
        row.dueDates ? CommonService.dateFormat(row.dueDates) : "-",
    },
    {
      name: "Extended Date",
      selector: (row) =>
        row.extendedDate ? CommonService.dateFormat(row.extendedDate) : "-",
    },
    {
      name: "Notification",
      selector: (row) => row.notification || "-",
    },
    {
      name: "Actions",
      button: true,
      selector: (row) => (
        <>
          {" "}
          <div className="d-flex justify-content-center">
            <span>
              {" "}
              <a
                onClick={(e) => {
                  openUpdateModal(e, row.id);
                }}
              >
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Edit</Tooltip>}
                >
                  <div>
                    <Image
                      className=""
                      src="/images/dashboards/table_edit_icon.svg"
                      alt="table_edit_icon"
                      width={16}
                      height={16}
                    />
                  </div>
                </OverlayTrigger>
              </a>
            </span>
            <span className="mx-2 opacity-50">|</span>
            <span>
              {" "}
              <a
                onClick={(e) => {
                  setDeleteId(row.id);
                  setConfirmTitle("Return Filling");
                  setDeleteConfirm(true);
                }}
              >
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Delete</Tooltip>}
                >
                  <div>
                    <Image
                      className=""
                      src="/images/dashboards/table_delete_icon.svg"
                      alt="table_delete_icon"
                      width={16}
                      height={16}
                    />
                  </div>
                </OverlayTrigger>
              </a>
            </span>
          </div>
        </>
      ),
      style: {
        position: "sticky",
        right: 0,
        backgroundColor: "white",
        zIndex: 1, // Ensure it stays on top of other columns
      },
      width: "135px",
    },
  ];

  const [returnFilling, setReturnFilling] = useState({
    id: 0,
    formType: "",
    quarter: "",
    financialYear: "",
    dueDates: null,
    extendedDate: null,
    notification: null,
  });

  useEffect(() => {
    fetchReturnFilling("");
    setFinancialYearData();
  }, [currentPage, pageSize]);

  const handleChange = (state) => {
    if (state.selectedRows && state.selectedRows.length > 0)
      setSelectedData(state.selectedRows);
  };

  function setFinancialYearData(params) {
    let array = [];
    const currentDate = new Date();
    for (let index = 6; index >= 0; index--) {
      const startYear = currentYear - index;
      const endYear = startYear + 1;
      const financialYear = `${startYear}-${endYear.toString().slice(-2)}`;
      array.push(financialYear);
    }
    const currentMonth = new Date().getMonth();
    let quart = "";
    if (currentMonth >= 3 && currentMonth <= 5) {
      quart = "Q4";
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      quart = "Q1";
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      quart = "Q2";
    } else {
      quart = "Q3";
    }
    setReturnFilling((prevState) => ({
      ...prevState,
      quarter: quart,
    }));
    setFinancialYears(array);
    let startYear = currentDate.getFullYear();
    if (currentMonth >= 6) {
      // If month is after March, it's in the current FY
      startYear = currentDate.getFullYear() + 1;
    } else {
      // If month is before April, it's in the previous FY
      startYear = currentDate.getFullYear();
    }

    const fy = `${startYear}-${(startYear + 1).toString().slice(-2)}`;

    setReturnFilling((prevState) => ({
      ...prevState,
      financialYear: fy,
    }));
  }

  function deleteReturnFilling(e) {
    e.preventDefault();
    if (confirmTitle == "Bulk") {
      if (selectedData && selectedData.length > 0) {
        const model = {
          Ids: selectedData.map((p) => p.id),
        };
        ReportingService.deleteBulk(model).then(res => {
          if (res) {
            toast.success("Return Filling Deleted!");
            fetchReturnFilling();
            selectedData(null);
          }
        }).finally((f) => {
          setDeleteConfirm(false);
        });
      }
    }
    else {
      ReportingService.deleteFillingReturn(deleteId)
        .then((res) => {
          if (res) {
            toast.success("Return Filling Deleted!");
            fetchReturnFilling();
          }
        })
        .finally((f) => {
          setDeleteConfirm(false);
        });
    }
  }

  function openUpdateModal(e, id) {
    e.preventDefault();
    ReportingService.getFillingReturn(id).then((res) => {
      if (res) {
        setReturnFilling(res);
        setCreateModal(true);
      }
    });
  }

  function handleInput(name, e) {
    if (name === "dueDates" || name === "extendedDate") {
      setReturnFilling((prevState) => ({
        ...prevState,
        [name]: e,
      }));
    } else {
      setReturnFilling((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    }
  }

  function openModal() {
    setReturnFilling((prevState) => ({
      ...prevState,
      id: 0,
      formType: "",
      quarter: "",
      dueDates: null,
      extendedDate: null,
      notification: null,
    }));
    setFinancialYearData();
    setCreateModal(true);
  }

  function fetchReturnFilling() {
    setShowLoader(true);
    const model = {
      pageSize: pageSize,
      pageNumber: currentPage,
      financialYear: financialYear,
      quarter: quarter,
      formType: formType,
    };
    if (
      searchParams.get("token") ==
      "u85eddfes4edesw98548wswfe584478445545w5ss4d51sd55w"
    ) {
      ReportingService.getFillingReturns(model)
        .then((res) => {
          if (res && res.returnFillingDueDatesList) {
            setReturnFillings(res);
            setSelectedData(null);
          }
        })
        .finally((f) => {
          setShowLoader(false);
        });
    }
  }

  const fileSelectHandler = (event) => {
    const selectedFile = event.target.files[0];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (fileExtension === "xls" || fileExtension === "xlsx") {
      if (selectedFile) {
        setSelectedFile(selectedFile);
        uploadExcel(selectedFile);
      }
    } else {
      toast.error("Please upload a valid Excel file (.xls or .xlsx).");
    }
  };

  function uploadExcel(file) {
    setIsLoading(true);
    let formData = new FormData();
    formData.append("file", file);
    ReportingService.uploadFillingReturnData(formData)
      .then((res) => {
        if (res) {
          toast.success("File Uploaded");
          fetchReturnFilling();
        }
      })
      .catch((e) => {
        if (e?.response?.data) {
          toast.error(e.response.data);
        }
      })
      .finally((f) => {
        setSelectedFile(null);
        setIsLoading(false);
      });
  }

  function saveFillingReturn(e) {
    e.preventDefault();
    setLoading(true);
    if (returnFilling.dueDates) {
      returnFilling.dueDates = CommonService.tdsDateFormat(
        new Date(returnFilling.dueDates)
      );
    }
    if (returnFilling.extendedDate) {
      returnFilling.extendedDate = CommonService.tdsDateFormat(
        new Date(returnFilling.extendedDate)
      );
    }
    ReportingService.saveFillingReturn(returnFilling)
      .then((res) => {
        if (res) {
          toast.success("Return Filling Created!");
          fetchReturnFilling();
        }
      })
      .finally((f) => {
        setLoading(false);
        setCreateModal(false);
      });
  }

  function download() {
    const url = "/static/pdf/DEDUCTOR_MASTER-FINAL.xlsx";
    const link = document.createElement("a");
    link.href = url;
    link.download = "DEDUCTOR_MASTER-FINAL.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      {searchParams.get("token") ==
        "u85eddfes4edesw98548wswfe584478445545w5ss4d51sd55w" && (
          <>
            <section className="py-5 py-md-3">
              <div className="container">
                <div className="row align-items-center deductors-sec">
                  <div className="col-md-4">
                    <h2 className="fw-bold">Simplify TDS Filing -</h2>
                    <p className="fs-18 mb-0">
                      Enter, Import, or Download <br />
                      Data Instantly for Deductors!
                    </p>
                  </div>
                  <div className="col-md-8">
                    <div className="row justify-content-between">
                      <div className="col-md-4" onClick={(e) => openModal()}>
                        <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                          <div className="row align-items-center">
                            <div className="col-md-5">
                              <Image
                                className="img-fluid"
                                src="/images/dashboards/enter_data_manually_icon.svg"
                                alt="enter_data_manually_icon"
                                width={121}
                                height={121}
                              />
                            </div>
                            <div className="col-md-7">
                              <h5 className="fw-bold text-capitalize mb-0">
                                Enter data
                                <br /> manually
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <label className="col-md-4" onChange={fileSelectHandler}>
                        <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                          <div className="row align-items-center">
                            <div className="col-md-5">
                              <Image
                                className="img-fluid"
                                src="/images/dashboards/import_excel_file_icon.svg"
                                alt="import_excel_file_icon"
                                width={121}
                                height={121}
                              />
                            </div>
                            <div className="col-md-7">
                              <h5 className="fw-bold text-capitalize mb-0">
                                {/* {fileName && <span className="text-danger">{fileName}</span>} */}
                                <label className="w-100 text-capitalize">
                                  <span className="fw-bold"> </span>
                                  <input
                                    type="file"
                                    className="visually-hidden"
                                    accept=".xlsx"
                                  />
                                  <h5 className="fw-bold">
                                    {" "}
                                    {isloading ? "Uploading..." : "Import"}
                                    <br /> Excel File
                                  </h5>
                                </label>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div className="col-md-4" onClick={download}>
                        <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                          <div className="row align-items-center">
                            <div className="col-md-5">
                              <Image
                                className="img-fluid"
                                src="/images/dashboards/download_excel_file_icon.svg"
                                alt="download_excel_file_icon"
                                width={121}
                                height={121}
                              />
                            </div>
                            <div className="col-md-7">
                              <h5 className="fw-bold text-capitalize mb-0">
                                Download
                                <br /> Excel File
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="py-5 py-md-4 bg-light-gray">
              <div className="container">
                <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
                  <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
                    <div className="col-md-3">
                      <h4 className="fw-bold mb-0">Return Fillings</h4>
                    </div>
                    <div className="col-md-6">
<div className="d-flex">
                       <div className="d-flex align-items-center justify-content-end w-100">
                      <span className="me-2">Forms: </span>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        autoComplete="off"
                        value={formType}
                        style={highlightStyle}
                        onChange={(e) => setFormType(e.target.value)}
                      >
                        <option value={""} hidden>
                          Select
                        </option>
                        <option value={"26Q"}>26Q</option>
                        <option value={"27EQ"}>27EQ</option>
                        <option value={"27Q"}>27Q</option>
                        <option value={"24Q"}>24Q</option>
                      </select>
                    </div>
                    <div className="d-flex align-items-center justify-content-end w-100 ms-2">
                      <span className="me-2">FY: </span>
                      <select
                        className="form-select m-100"
                        aria-label="Default select example"
                        value={financialYear}
                        style={highlightStyle1}
                        onChange={(e) => setFinancialYear(e.target.value)}
                      >
                        <option value={""} hidden>
                          Select
                        </option>
                        {financialYears?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex align-items-center justify-content-end w-100 ms-2">
                      <span className="me-2">Quarter: </span>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        autoComplete="off"
                        value={quarter}
                        style={highlightStyle1}
                        onChange={(e) => setQuarter(e.target.value)}
                      >
                        <option value={""} hidden>
                          Select
                        </option>
                        <option value={"Q1"}>Q1</option>
                        <option value={"Q2"}>Q2</option>
                        <option value={"Q3"}>Q3</option>
                        <option value={"Q4"}>Q4</option>
                      </select>
                      
                    </div>
</div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex">
                         <button
                        className="btn btn-outline-primary"
                        type="button"
                        disabled={!formType && !financialYear && !quarter}
                        onClick={(e) => fetchReturnFilling()}
                      >
                        Search
                      </button>
                                            <button
                        className="btn btn-outline-primary ms-2"
                        type="button"
                        onClick={(e) => {
                          setQuarter("");
                          setFinancialYear("");
                          setFormType("");
                          setTimeout(() => {
                            fetchReturnFilling()
                          }, 500);
                        }}
                      >
                        Reset
                      </button>
                                            <button
                        className="btn btn-outline-primary ms-2"
                        type="button"
                        disabled={!selectedData}
                        onClick={(e) => {
                          setConfirmTitle("Bulk");
                          setDeleteConfirm(true);
                        }}
                      >
                        Delete
                      </button>
                      </div>
                    </div>
                    {/* <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="input-group searchbox">
                        <input
                          type="search"
                          placeholder="Search here"
                          className="form-control bg-light-gray border-end-0"
                          id="SearchDeductors"
                          onChange={(e) => {
                            if (e.target.value && e.target.value.length > 2) {
                              fetchReturnFilling(e.target.value);
                            } else {
                              if (e.target.value.length === 0) {
                                fetchReturnFilling("");
                              }
                            }
                          }}
                        />
                        <button
                          className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                          type="button"
                        >
                          {" "}
                          <Image
                            className=""
                            src="/images/dashboards/search_icon.svg"
                            alt="search_icon"
                            width={24}
                            height={24}
                          />
                        </button>
                      </div>
                    </div>
                  </div> */}
                    {/*            <div className="col-md-2">
                {!selectedFile && (
                  <label className="btn btn-outline-primary w-100">
                    <span className="fw-bold"> </span>
                    <input
                      type="file"
                      onChange={fileSelectHandler}
                      className="visually-hidden"
                      accept=".xlsx"
                    />
                    Import from Excel
                  </label>
                )}
                {selectedFile && (
                  <button
                    type="button"
                    className="btn btn-outline-primary w-100"
                    onClick={uploadExcel}
                    disabled={isloading}
                  >
                    {isloading && (
                      <span
                        classname="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Upload
                  </button>
                )}
              </div>
              <div className="col-sm-4 col-md-1">
                <button
                  type="button"
                  onClick={(e) => {
                    openModal();
                  }}
                  className="btn btn-primary w-100"
                >
                  Add
                </button>
              </div> */}
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <div>
                          {returnFillings &&
                            returnFillings.returnFillingDueDatesList &&
                            returnFillings.returnFillingDueDatesList.length >
                            0 && (
                              <DataTable
                                fixedHeader
                                fixedHeaderScrollHeight="340px"
                                columns={columns}
                                data={returnFillings.returnFillingDueDatesList}
                                highlightOnHover
                                pagination={true}
                                paginationServer
                                customStyles={customStyles}
                                paginationTotalRows={returnFillings.totalRows}
                                paginationPerPage={pageSize}
                                selectableRows={true}
                                selectableRowsNoSelectAll={false}
                                onSelectedRowsChange={handleChange}
                                paginationComponentOptions={{
                                  noRowsPerPage: true,
                                }}
                                onChangePage={(page) => {
                                  setCurrentPage(page);
                                }}
                              />
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      <Modal
        className=""
        size="lg"
        centered
        keyboard={false}
        backdrop="static"
        show={createModal}
        onHide={() => setCreateModal(false)}
      >
        <Modal.Header className="border-0" closeButton>
          {" "}
          <h3 className="mb-0">Return Filling</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <row className="row g-3 mb-3 mb-md-3">
              <div className="col-md-6">
                <label for="inputFormType" className="form-label">
                  Form Type
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={returnFilling.formType}
                  style={highlightStyle}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => handleInput("formType", e)}
                >
                  <option value={""} hidden>
                    Select
                  </option>
                  <option value={"26Q"}>26Q</option>
                  <option value={"27EQ"}>27EQ</option>
                  <option value={"27Q"}>27Q</option>
                  <option value={"24Q"}>24Q</option>
                </select>
              </div>
              <div className="col-md-6">
                <label for="quarter" className="form-label">
                  Quarter
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={returnFilling.quarter}
                  style={highlightStyle1}
                  onFocus={() => setIsFocused1(true)}
                  onBlur={() => setIsFocused1(false)}
                  onChange={(e) => handleInput("quarter", e)}
                >
                  <option value={""} hidden>
                    Select
                  </option>
                  <option value={"Q1"}>Q1</option>
                  <option value={"Q2"}>Q2</option>
                  <option value={"Q3"}>Q3</option>
                  <option value={"Q4"}>Q4</option>
                </select>
              </div>
              <div className="col-md-6">
                <label for="quarter" className="form-label">
                  Financial Year
                </label>
                <select
                  className="form-select m-100"
                  aria-label="Default select example"
                  value={returnFilling.financialYear}
                  style={highlightStyle2}
                  onFocus={() => setIsFocused2(true)}
                  onBlur={() => setIsFocused2(false)}
                  onChange={(e) => handleInput("financialYear", e)}
                >
                  <option value={""} hidden>
                    Select
                  </option>
                  {financialYears?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label for="dueDate" className="form-label">
                  Due Date
                </label>
                <DatePicker
                  autoComplete="off"
                  selected={returnFilling.dueDates}
                  id="dueDate"
                  className="form-control w-100"
                  onChange={(e) => handleInput("dueDates", e)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                />
              </div>
              <div className="col-md-6">
                <label for="extendedDate" className="form-label">
                  Extended Date
                </label>
                <DatePicker
                  autoComplete="off"
                  selected={returnFilling.extendedDate}
                  id="extendedDate"
                  minDate={
                    returnFilling.extendedDate
                      ? new Date(returnFilling.extendedDate)
                      : null
                  }
                  className="form-control w-100"
                  onChange={(e) => handleInput("extendedDate", e)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                />
              </div>
              <div className="col-md-6">
                <label for="notification" className="form-label">
                  Notification
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="notification"
                  rows={2}
                  value={returnFilling.notification}
                  onChange={(e) => handleInput("notification", e)}
                />
              </div>
            </row>
            <div className="row g-3 justify-content-end">
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn btn-secondary w-100"
                  onClick={() => setCreateModal(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  onClick={(e) => saveFillingReturn(e)}
                  className="btn btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading && (
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  Save
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ProcessPopup showLoader={showLoader}></ProcessPopup>
      <DeleteConfirmation
        show={deleteConfirm}
        name={confirmTitle}
        setDeleteConfirm={(e) => setDeleteConfirm(e)}
        delete={(e) => deleteReturnFilling(e)}
      ></DeleteConfirmation>
    </>
  );
}
