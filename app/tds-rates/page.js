"use client";
import React, { useState, useEffect, use } from "react";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import { ReportingService } from "../services/reporting.service";
import { useRouter, useSearchParams } from "next/navigation";
import ProcessPopup from "../components/modals/processing";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CommonService } from "../services/common.service";
import { ToastContainer, toast } from "react-toastify";
import DeleteConfirmation from "../components/modals/delete-confirmation";
import Image from "next/image";
import HeaderList from "../components/header/header-list";
import { EnumService } from "../services/enum.service";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function TDSRates() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [tdsRates, setTDSRates] = useState(null);
  const [pageSize, setPageSize] = useState(500);
  const [category, setCategory] = useState(2);
  const searchParams = useSearchParams(null);
  const [showLoader, setShowLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [addTdsModal, setAddTdsModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [enumList, setEnumList] = useState({});
  const router = useRouter(null);
  const [deleteId, setDeleteId] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

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

  const highlightStyle3 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused3 ? "#007bff" : "#ccc",
    boxShadow: isFocused3 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
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
      name: "S No",
      selector: (row, index) => (currentPage - 1) * pageSize + (index + 1),
      width: "80px",
    },
    {
      name: "Section Code",
      selector: (row) => (row.sectionCode ? row.sectionCode : "-"),
    },
    {
      name: "Description",
      selector: (row) => (row.description ? row.description : "-"),
      width: "350px",
    },
    {
      name: "Deductee Type",
      selector: (row) => row.deducteeType || "-",
    },
    {
      name: "PAN 4th Character",
      selector: (row) => row.pan || "-",
    },
    {
      name: "Nature",
      selector: (row) => row.nature || "-",
    },
    {
      name: "Amount Exceeding",
      selector: (row) => `${row?.amountExceeding.toFixed(2) || "0.00"}`,
    },
    {
      name: "Amount UpTo",
      selector: (row) => `${row?.amountUpto.toFixed(2) || "0.00"}`,
    },
    {
      name: "Applicable From",
      selector: (row) =>
        row.applicableFrom ? CommonService.dateFormat(row.applicableFrom) : "-",
    },
    {
      name: "Applicable To",
      selector: (row) =>
        row.applicableTo ? CommonService.dateFormat(row.applicableTo) : "-",
    },
    {
      name: "Applicable Rate",
      selector: (row) => row.applicableRate.toFixed(2) || "0.00",
    },
    {
      name: "TDS Rate",
      selector: (row) => row.tdsRate.toFixed(2) || "0.00",
    },
    {
      name: "Surcharge Rate",
      selector: (row) => row.surchargeRate.toFixed(2) || "0.00",
    },
    {
      name: "Health Cess Rate",
      selector: (row) => row.healthCessRate.toFixed(2) || "0.00",
    },
    {
      name: "Opting Regime",
      selector: (row) => (row.optingForRegime == true ? "Yes" : "No"),
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
                  openUpdateTdsModal(e, row.id);
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
                  setConfirmTitle("TDS Rate");
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

  const [tdsRate, setTdsRate] = useState({
    id: 0,
    sectionCode: "",
    description: "",
    deducteeType: "",
    amount: "",
    applicableFrom: null,
    applicableTo: null,
    applicableRate: 0,
    tdsRate: 0,
    surchargeRate: 0,
    healthCessRate: 0,
    amountExceeding: 0,
    amountUpto: 0,
    optingForRegime: false,
    type: 1,
    nature: null,
    pan: null,
  });

  useEffect(() => {
    fetchTdsRates("");
    EnumService.getEnumStatues().then((res) => {
      if (res) {
        setEnumList(res);
      }
    });
  }, [currentPage, pageSize, category]);

  useEffect(() => {
    getApplicableRate();
  }, [tdsRate.tdsRate, tdsRate.surchargeRate, tdsRate.healthCessRate]);

  const handleChange = (state) => {
    if (state.selectedRows && state.selectedRows.length > 0)
      setSelectedData(state.selectedRows);
  };

  function deleteTDS(e) {
    e.preventDefault();
    if (confirmTitle == "Bulk") {
      if (selectedData && selectedData.length > 0) {
        const model = {
          Ids: selectedData.map((p) => p.id),
        };
        ReportingService.deleteTDSBulk(model).then(res => {
          if (res) {
            toast.success("TDS Return Deleted!");
            fetchReturnFilling();
            selectedData(null);
          }
        }).finally((f) => {
          setDeleteConfirm(false);
        });
      }
    }
    else {
      ReportingService.deleteTds(deleteId)
        .then((res) => {
          if (res) {
            toast.success("TDS Rate Deleted!");
            fetchTdsRates();
          }
        })
        .finally((f) => {
          setDeleteConfirm(false);
        });
    }
  }

  function openUpdateTdsModal(e, id) {
    e.preventDefault();
    ReportingService.getTdsRate(id).then((res) => {
      if (res) {
        setTdsRate(res);
        setAddTdsModal(true);
      }
    });
  }

  function handleInput(name, e) {
    if (name === "applicableFrom" || name === "applicableTo") {
      setTdsRate((prevState) => ({
        ...prevState,
        [name]: e,
      }));
    } else {
      let newValue = e.target.value;
      if (
        name === "tdsRate" ||
        name === "healthCessRate" ||
        name === "surchargeRate" ||
        name === "amountExceeding" ||
        name === "amountUpto"
      ) {
        if (newValue) {
          newValue = newValue.replace(/[^0-9]/g, "");
          if (newValue) newValue = parseFloat(newValue);
        }
      }
      setTdsRate((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  }

  function openModal(params) {
    setTdsRate((prevState) => ({
      ...prevState,
      id: 0,
      sectionCode: "",
      description: "",
      deducteeType: "",
      amount: "",
      applicableFrom: null,
      applicableTo: null,
      applicableRate: 0,
      tdsRate: 0,
      surchargeRate: 0,
      healthCessRate: 0,
      amountExceeding: 0,
      amountUpto: 0,
      optingForRegime: false,
      type: 1,
    }));
    setAddTdsModal(true);
  }

  function fetchTdsRates(searchValue) {
    if (!searchValue) setShowLoader(true);
    const model = {
      pageSize: pageSize,
      pageNumber: currentPage,
      search: searchValue,
    };
    if (
      searchParams.get("token") ==
      "u85eddfes4edesw98548wswfe584478445545w5ss4d51sd55w"
    ) {
      ReportingService.getTdsRates(model, category)
        .then((res) => {
          if (res && res.tdsRatesList) {
            setTDSRates(res);
            setSelectedData(null);
          }
        })
        .finally((f) => {
          setShowLoader(false);
        });
    }
  }

  function getApplicableRate() {
    let tdsRateValue = tdsRate.tdsRate > 0 ? parseFloat(tdsRate.tdsRate) : 0;
    const surchargeRateValue =
      tdsRate.surchargeRate > 0 ? parseFloat(tdsRate.surchargeRate) : 0;
    const healthCessRateValue =
      tdsRate.healthCessRate > 0 ? parseFloat(tdsRate.healthCessRate) : 0;
    if (tdsRateValue > 0) {
      if (surchargeRateValue > 0) {
        tdsRateValue = (tdsRateValue * surchargeRateValue) / 100 + tdsRateValue;
      }
      if (healthCessRateValue > 0) {
        tdsRateValue =
          (tdsRateValue * healthCessRateValue) / 100 + tdsRateValue;
      }
    }
    setTdsRate((prevState) => ({
      ...prevState,
      ["applicableRate"]: tdsRateValue.toFixed(2),
    }));
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
    ReportingService.uploadTdsData(formData, category)
      .then((res) => {
        if (res) {
          toast.success("File Uploaded");
          setSelectedFile(null);
          fetchTdsRates();
          setIsLoading(false);
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

  function saveTdsRate(e) {
    e.preventDefault();
    setLoading(true);
    if (tdsRate.applicableFrom) {
      tdsRate.applicableFrom = CommonService.tdsDateFormat(
        new Date(tdsRate.applicableFrom)
      );
    }
    if (tdsRate.applicableTo) {
      tdsRate.applicableTo = CommonService.tdsDateFormat(
        new Date(tdsRate.applicableTo)
      );
    }
    tdsRate.optingForRegime = tdsRate.optingForRegime;

    tdsRate.type = category;
    ReportingService.saveTdsRate(tdsRate)
      .then((res) => {
        if (res) {
          toast.success("TDS Rate Created!");
          fetchTdsRates();
        }
      })
      .finally((f) => {
        setAddTdsModal(false);
        setLoading(false);
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
                    <div className="col-md-7">
                      <h4 className="fw-bold mb-0">TDS Rates</h4>
                    </div>

                    <div className="col-md-4 d-flex align-items-center justify-content-end">

                      <span className="me-2">Forms: </span>
                      <select
                        className="form-select me-2 w-auto"
                        aria-label="Default select example"
                        autoComplete="off"
                        value={category}
                        onChange={(e) => {
                          setShowLoader(false);
                          setCategory(e.target.value);
                        }}
                      >
                        <option value={2}>26Q</option>
                        <option value={3}>27EQ</option>
                        <option value={4}>27Q</option>
                        <option value={1}>24Q</option>
                        <option value={5}>Surcharge TDS</option>
                      </select>
                      <div className="d-flex">
                        <div className="input-group searchbox">
                          <input
                            type="search"
                            placeholder="Search here"
                            className="form-control bg-light-gray border-end-0"
                            id="SearchDeductors"
                            onChange={(e) => {
                              setTimeout(() => {
                                fetchTdsRates(e.target.value);
                              }, 800);
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

                    </div>
                    <div className="col-md-1">
                      <button
                        className="btn btn-outline-primary"
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
                                fetchDeductors(e.target.value);
                              } else {
                                if (e.target.value.length === 0) {
                                  fetchDeductors("");
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
                    {/*       <div className="col-md-2">
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
                          {tdsRates &&
                            tdsRates.tdsRatesList &&
                            tdsRates.tdsRatesList.length > 0 && (
                              <DataTable
                                fixedHeader
                                fixedHeaderScrollHeight="340px"
                                columns={columns}
                                data={tdsRates.tdsRatesList}
                                highlightOnHover
                                pagination={true}
                                paginationServer
                                customStyles={customStyles}
                                paginationTotalRows={tdsRates.totalRows}
                                paginationPerPage={pageSize}
                                selectableRows={true}
                                selectableRowsNoSelectAll={false}
                                onSelectedRowsChange={handleChange}
                                paginationDefaultPage={currentPage}
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
        show={addTdsModal}
        onHide={() => setAddTdsModal(false)}
      >
        <Modal.Header className="border-0" closeButton>
          {" "}
          <h3 className="mb-0">TDS Rate</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <row className="row g-3 mb-3 mb-md-3">
              <div className="col-md-6">
                <label for="inputCode" className="form-label">
                  Section Code
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={tdsRate.sectionCode}
                  style={highlightStyle}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => {
                    handleInput("sectionCode", e);
                  }}
                >
                  <option value={""} hidden>
                    Select
                  </option>
                  {category == 2 &&
                    enumList.sections26Q?.map((option, index) => (
                      <option key={index} value={option.key}>
                        {option.value}
                      </option>
                    ))}
                  {category == 4 &&
                    enumList.sections27Q?.map((option, index) => (
                      <option key={index} value={option.key}>
                        {option.value}
                      </option>
                    ))}
                  {category == 3 &&
                    enumList.sections27EQ?.map((option, index) => (
                      <option key={index} value={option.key}>
                        {option.value}
                      </option>
                    ))}
                  {category == 1 &&
                    enumList.sections24Q?.map((option, index) => (
                      <option key={index} value={option.key}>
                        {option.value}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-6">
                <label for="inputDeducteeType" className="form-label">
                  Deductee Type
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={tdsRate.deducteeType}
                  style={highlightStyle1}
                  onFocus={() => setIsFocused1(true)}
                  onBlur={() => setIsFocused1(false)}
                  onChange={(e) => handleInput("deducteeType", e)}
                >
                  <option selected hidden>
                    Select
                  </option>
                  {category == 2 &&
                    enumList.deductee26Q?.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  {(category == 4 || category == 3) &&
                    enumList.deductee27EQAnd27Q?.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-6">
                <label for="pan" className="form-label">
                  PAN 4th Character
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={tdsRate.pan}
                  onChange={(e) => handleInput("pan", e)}
                  id="pan"
                />
              </div>
              {category == 4 && (
                <div className="col-md-6">
                  <label for="nature" className="form-label">
                    Natures
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    autoComplete="off"
                    value={tdsRate.nature}
                    style={highlightStyle2}
                    onFocus={() => setIsFocused2(true)}
                    onBlur={() => setIsFocused2(false)}
                    onChange={(e) => handleInput("nature", e)}
                  >
                    <option selected hidden>
                      Select
                    </option>
                    {enumList.natures?.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="col-md-6">
                <label for="inputFrom" className="form-label">
                  Applicable From
                </label>
                <DatePicker
                  autoComplete="off"
                  selected={tdsRate.applicableFrom}
                  id="applicableFrom"
                  className="form-control w-100"
                  onChange={(e) => handleInput("applicableFrom", e)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                />
              </div>
              <div className="col-md-6">
                <label for="inputTo" className="form-label">
                  Applicable To
                </label>
                <DatePicker
                  autoComplete="off"
                  selected={tdsRate.applicableTo}
                  id="applicableTo"
                  minDate={
                    tdsRate.applicableFrom
                      ? new Date(tdsRate.applicableFrom)
                      : null
                  }
                  className="form-control w-100"
                  onChange={(e) => handleInput("applicableTo", e)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                />
              </div>
              <div className="col-md-6">
                <label for="amountExceeding" className="form-label">
                  Amount Exceeding
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={tdsRate.amountExceeding}
                  onChange={(e) => handleInput("amountExceeding", e)}
                  id="amountExceeding"
                />
              </div>
              <div className="col-md-6">
                <label for="amountUpto" className="form-label">
                  Amount UpTo
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={tdsRate.amountUpto}
                  onChange={(e) => handleInput("amountUpto", e)}
                  id="inputAmount"
                />
              </div>
              <div className="col-md-6">
                <label for="inputTdsRate" className="form-label">
                  TDS Rate
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={tdsRate.tdsRate}
                  onChange={(e) => {
                    handleInput("tdsRate", e);
                  }}
                  id="inputTdsRate"
                />
              </div>
              <div className="col-md-6">
                <label for="inputSurcharge" className="form-label">
                  Surcharge Rate
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={tdsRate.surchargeRate}
                  onChange={(e) => {
                    handleInput("surchargeRate", e);
                  }}
                  id="inputSurcharge"
                />
              </div>
              <div className="col-md-6">
                <label for="inputHealth" className="form-label">
                  Health Cess Rate
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={tdsRate.healthCessRate}
                  onChange={(e) => {
                    handleInput("healthCessRate", e);
                  }}
                  id="inputHealth"
                />
              </div>
              <div className="col-md-6">
                <label for="applicableRate" className="form-label">
                  Applicable Rate
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={tdsRate.applicableRate}
                  onChange={(e) => {
                    handleInput("applicableRate", e);
                  }}
                  readOnly
                  disabled
                  id="applicableRate"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Opting" className="form-label">
                  <span>Opting for Regime</span>
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={tdsRate.optingForRegime}
                  style={highlightStyle3}
                  onFocus={() => setIsFocused3(true)}
                  onBlur={() => setIsFocused3(false)}
                  onChange={(e) => handleInput("optingForRegime", e)}
                >
                  <option selected value={false}>
                    No
                  </option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="col-md-12">
                <label for="inputDescription" className="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  rows={3}
                  value={tdsRate.description}
                  onChange={(e) => handleInput("description", e)}
                />
              </div>
            </row>
            <div className="row g-3 justify-content-end">
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn btn-secondary w-100"
                  onClick={() => setAddTdsModal(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  onClick={(e) => saveTdsRate(e)}
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
        delete={(e) => deleteTDS(e)}
      ></DeleteConfirmation>
    </>
  );
}
