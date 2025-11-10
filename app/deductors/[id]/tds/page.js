"use client";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import React, { useState, use, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DeductorsService } from "@/app/services/deductors.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { TDSDashboardService } from "@/app/services/tdsDashboard.service";
import { ProgressBar } from "react-bootstrap";
import api from "@/app/utils/interceptors";
import ProcessPopup from "@/app/components/modals/processing";
import HeaderList from "@/app/components/header/header-list";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FormsService } from "@/app/services/forms.service";
import { saveAs } from "file-saver";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImportDeductorTXTPopup from "@/app/components/modals/import-deductor-txt-popup";
import { CorrectionsService } from "@/app/services/corrections.service";
import DataTable from "react-data-table-component";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";

export default function TDSDashboard({ params }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const resolvedParams = use(params);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [deductorInfo, setDeductorInfo] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const deductorId = resolvedParams?.id;
  const [selectedFile, setSelectedFile] = useState(null);
  const [formsData, setFormsData] = useState(null);
  const [financialYear, setFinancialYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [fileName, setFileName] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deducteeCount, setDeducteeCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [financialYears, setFinancialYears] = useState([]);
  const [correctionStatements, setCorrectionStatements] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [quarters, setQuarters] = useState(["Q1", "Q2", "Q3", "Q4"]);
  const [key, setKey] = useState("");
  const [reportsData, setReportsData] = useState([
    {
      name: "Filing Status Dashboard",
      code: "FSD",
      descrption:
        "Track filings status, filing history and e-filing order status",
    },
    {
      name: "Form 3CD - Clause 34",
      code: "3CD",
      descrption: "Report of TDS Rationalisation (Form 3CD) for Audit Form",
    },
    {
      name: "Salary Reports",
      code: "SR",
      descrption: "Monthly earnings and deductions summary",
    },
    {
      name: "TDS Deducted",
      code: "TD",
      descrption: "TDS Deducted Report Table shows details of tax deducted at source",
    },
  ]);
  const [tracesData, setTraces] = useState([
    {
      name: "TRACES activities",
      code: "TAS",
      descrption:
        "Online Traces Functions",
    },
    {
      name: "Traces Lower Deduction",
      code: "TLD",
      descrption: "Validate Lower Deduction Certificate u/s 197/195(3)/195(2)",
    },
    {
      name: "26AS Reconcilation",
      code: "INT",
      descrption: "Reconcile Form 26AS against your TDS receivables",
    },
    {
      name: "24G Form",
      code: "24G",
      descrption: "Monthly statement submitted by a DDO to report TDS/TCS payments without challan through book adjustment",
    },
  ]);
  const [breadcrumbs, setBreadcrumbs] = useState([
    {
      name: "Deductors",
      isActive: false,
      href: "/deductors",
    },
    {
      name: "TDS Dashboard",
      isActive: true,
    },
  ]);
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
      selector: (row, index) => (currentPage - 1) * pageSize + index + 1,
      width: "80px",
    },
    {
      name: "Financial Year",
      selector: (row) => row.financialYear || "-",
      width: "140px",
    },
    {
      name: "Quarter",
      selector: (row) => row.quarter || "-",
      width: "100px",
    },
    {
      name: "Form",
      selector: (row) => row?.form || "",
      width: "100px",
    },
    {
      name: "Deductor Name",
      selector: (row) => row?.deductorName || "",
      width: "425px",
    },
    {
      name: "Tan",
      selector: (row) => row?.deductorTan || "",
      width: "120px",
    },
    {
      name: "Pan",
      selector: (row) => row?.deductorPan || "",
      width: "120px",
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <>
            {" "}
            <div className="d-flex justify-content-center">
              <span>
                <a onClick={(e) => {
                  let cateObj = getCateObj(row.form);
                  router.push(`/deductors/${deductorId}/tds/corrections/${cateObj.path}?correctionId=${row.id}&categoryId=${cateObj.id}&financial_year=${financialYear}&quarter=${quarter}`)
                }}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>View</Tooltip>}
                  >
                    <div>
                      <Image
                        className=""
                        src="/images/dashboards/table_view_icon.svg"
                        alt="table_view_icon"
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
                    e.preventDefault();
                    router.push(`/deductors/${deductorId}/tds/detail/${row.id}`);
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
        </>
      ),
      width: "135px",
    },
  ];
  useEffect(() => {
    let keyValue = localStorage.getItem("tabKey");
    if (keyValue == "corrections") {
      fetchCorrectionStatements(currentPage);
    } else {
      localStorage.setItem("tabKey", "tds");
    }
  }, [currentPage, key]);

  useEffect(() => {
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
    quart = sessionStorage.getItem("quart")
      ? sessionStorage.getItem("quart")
      : quart;
    setQuarter(quart);
    setFinancialYears(array);
    let startYear = currentDate.getFullYear();
    if (currentMonth >= 6) {
      // If month is after March, it's in the current FY
      startYear = currentDate.getFullYear();
    } else {
      // If month is before April, it's in the previous FY
      startYear = currentDate.getFullYear() - 1;
    }

    const fy = sessionStorage.getItem("financialYear")
      ? sessionStorage.getItem("financialYear")
      : `${startYear}-${(startYear + 1).toString().slice(-2)}`;

    setFinancialYear(fy);
    if (deductorId) {
      setShowLoader(true);
      TDSDashboardService.getTDSDashboard(parseInt(deductorId))
        .then((res) => {
          if (res && res.category) {
            setFormsData(res.category);
            setDeducteeCount(res.deducteeCount);
          }
        }).catch(e => {
          if (e?.response?.data?.errorMessage) {
            toast.error(e?.response?.data?.errorMessage);
          }
          else {
            toast.error(e?.message);
          }
        })
        .finally((f) => {
          setTimeout(() => {
            setShowLoader(false);
          }, 500);
        });
    }
  }, []);

  function fetchCorrectionStatements(currentPage, searchValue) {
    setShowLoader(true);
    setCorrectionStatements([]);
    const model = {
      pageSize: pageSize,
      pageNumber: currentPage,
      search: searchValue,
      deductorId: deductorId
    };
    CorrectionsService.getCorrectionsStatement(model)
      .then((res) => {
        if (res && res.deductorList && res.deductorList.length > 0) {
          setCorrectionStatements(res.deductorList);
          setTotalItems(res.totalRows);
        }
      })
      .catch(e => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
        }
        else {
          toast.error(e?.message);
        }
      })
      .finally((f) => {
        setTimeout(() => {
          setShowLoader(false);
        }, 500);
      });
  }

  function getCateObj(val) {
    let obj = formsData.find(p => p.name == val);
    return obj;
  }

  useEffect(() => {
    getDeductorDetail();
  }, []);

  function getDeductorDetail() {
    DeductorsService.getDeductor(deductorId).then(
      (res) => {
        if (res) {
          setDeductorInfo(res);
        }
      });
  }

  async function handleFileChange(file) {
    let formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(Math.round(percent));
        }
      },
    };
    try {
      setIsUploading(true);
      setIsLoading(true);
      const result = await api.post(
        `deductee/uploadExcelFile/${deductorId}`,
        formData,
        config
      );
      if (result) {
        setIsLoading(false);
        toast.success("File upload successfully");
      } else {
        setIsLoading(false);
        toast.error("File upload failed");
      }
    } catch (e) {
      if (e?.response?.data?.errorMessage) {
        toast.error(e?.response?.data?.errorMessage);
      }
      else {
        toast.error(e?.message);
      }
    } finally {
      setIsUploading(false);
      setIsLoading(false);
      setSelectedFile("");
      setFileName("");
    }
  }

  function deleteCorrectionDeductor(e) {
    e.preventDefault();
    setDeleteLoading(true);
    CorrectionsService.deleteCorrectionDeductor(deleteId)
      .then((res) => {
        if (res) {
          toast.success("Delete Correction Deductor Successfully");
          fetchCorrectionStatements(currentPage);
          setDeleteLoading(false);
        }
      }).catch(e => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
        }
        else {
          toast.error(e?.message);
        }
        setDeleteLoading(false);
      })
      .finally((f) => {
        setDeleteConfirm(false);
      });
  }

  const handleRowDoubleClick = (row) => {
    router.push(`/deductors/${row.id}/tds`);
  };

  const fileSelectHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    handleFileChange(event.target.files[0]);
  };

  function download() {
    const url = "/static/pdf/Deductee_Employee_Master_Template.xlsx";
    const link = document.createElement("a");
    link.href = url;
    link.download = "Deductee_Employee_Master_Template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      {formsData && (
        <section className="py-5 py-md-4 bg-light-gray tds-dash-tabs">
          <div className="container">
            <div className="row pb-3 align-items-center">
              <div className={localStorage.getItem("tabKey") == "corrections" ? "col-md-6" : "col-md-8"}>
                <h4 className="mb-4 mb-md-0 fw-bold text-capitalize">
                  Tax Deducted at Source
                </h4>
              </div>
              <>
                <div style={{ marginBottom: "-10px" }} className="col-md-2">
                  <select
                    className="form-select m-100"
                    aria-label="Default select example"
                    value={financialYear}
                    onChange={(e) => {
                      setFinancialYear(e.target.value);
                      sessionStorage.setItem("financialYear", e.target.value);
                    }}
                  >
                    {financialYears?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: "-10px" }} className="col-md-2">
                  <select
                    className="form-select m-100"
                    aria-label="Default select example"
                    value={quarter}
                    onChange={(e) => {
                      setQuarter(e.target.value);
                      sessionStorage.setItem("quart", e.target.value);
                    }}
                  >
                    {quarters?.map((option, index) => (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </>
              {localStorage.getItem("tabKey") == "corrections" &&
                <div className="col-md-2 text-end" style={{ marginBottom: "-60px" }}>
                  <button type="button" onClick={(e) => setShow(true)} className="btn btn-primary me-2">Import TDS File</button>
                </div>
              }
            </div>
          </div>
          <div className="container">
            <Tabs
              id=""
              activeKey={localStorage.getItem("tabKey")}
              onSelect={(k) => {
                localStorage.setItem("tabKey", k)
                setKey(k)
              }}
              className=""
            >
              <Tab eventKey="tds" title="TDS Deductors">
                <div className="">
                  <div className="row">
                    <div className="col-md-8 border-end pe-md-4">
                      <div className="mb-3">
                        <div className="col-md-12">
                          <h5 className="text-uppercase fw-bold mb-3">
                            Filing
                          </h5>
                        </div>
                      </div>
                      <div className="row g-3">
                        {formsData?.map((option, index) => (
                          <div
                            key={index}
                            className="col-md-3"
                            onClick={(e) => {
                              if (
                                deductorId &&
                                parseInt(deductorId) > 0 &&
                                financialYear &&
                                quarter
                              ) {
                                router.push(
                                  `/deductors/${deductorId}/tds/${option.path}?categoryId=${option.id}&financial_year=${financialYear}&quarter=${quarter}`
                                );
                              } else {
                                toast.error(
                                  "Please select financial Year and quarter value"
                                );
                              }
                            }}
                          >
                            <span className="d-flex flex-column justify-content-center align-items-center text-center py-2 py-md-2 px-2 px-md-2 border border-1 rounded-4 bg-light-blue countbox">
                              <span
                                style={{
                                  width: 65,
                                  height: 65,
                                }}
                                className="fs-6 rounded-4 fw-bold bg-dark-blue d-flex align-items-center justify-content-center"
                              >
                                {option.name}
                              </span>
                              <div className="d-flex gap-2 w-100 justify-content-between mt-md-3">
                                <div>
                                  <h6 className="fw-bold"> {option.title}</h6>
                                  <p className="mb-0 fs-10">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                            </span>
                          </div>
                        ))}
                      </div>
                      <hr
                        style={{
                          borderColor: "#DDDDDD",
                        }}
                        className="my-4 opacity-100"
                      />
                      <div className="my-3">
                        <div className="col-md-12">
                          <h5 className="text-uppercase fw-bold mb-3">
                            Reports
                          </h5>
                        </div>
                      </div>
                      <div className="row g-3"
                      >
                        {reportsData?.map((option, index) => (
                          <div className="col-md-3" key={index}
                            onClick={(e) => {
                              if (
                                financialYear
                              ) {
                                if (option.name == "Filing Status Dashboard") {
                                  router.push(
                                    `/deductors/${deductorId}/tds/tds-return?financial_year=${financialYear}`
                                  );
                                }
                                if (
                                  option.name == "Form 3CD - Clause 34"
                                ) {
                                  // router.push(
                                  //   `/deductors/${deductorId}/tds/miscellaneous?financial_year=${financialYear}`
                                  // );
                                }
                                if (
                                  option.name == "TDS Deducted"
                                ) {
                                  router.push(
                                    `/deductors/${deductorId}/tds/tds-deducted?financial_year=${financialYear}`
                                  );
                                }
                                if (
                                  option.name == "Salary Reports"
                                ) {
                                  router.push(
                                    `/deductors/${deductorId}/tds/salary-report?financial_year=${financialYear}`
                                  );
                                }
                              } else {
                                toast.error(
                                  "Please select financial Year value"
                                );
                              }
                            }}
                          >
                            <span className="d-flex flex-column justify-content-center align-items-center text-center py-2 py-md-2 px-2 px-md-2 border border-1 rounded-4 bg-light-blue countbox">
                              <span
                                style={{
                                  width: 65,
                                  height: 65,
                                }}
                                className="fs-6 rounded-4 fw-bold bg-dark-blue d-flex align-items-center justify-content-center"
                              >
                                {option.code}
                              </span>
                              <div className="d-flex gap-2 w-100 justify-content-between mt-md-3">
                                <div>
                                  <h6 className="fw-bold">{option.name}</h6>
                                  <p className="mb-0 fs-10">
                                    {option.descrption}
                                  </p>
                                </div>
                              </div>
                            </span>
                          </div>
                        ))}
                      </div>
                      <hr
                        style={{
                          borderColor: "#DDDDDD",
                        }}
                        className="my-4 opacity-100"
                      />
                      <div className="my-3">
                        <div className="col-md-12">
                          <h5 className="text-uppercase fw-bold mb-3">
                            TRACES, 24G Form and more
                          </h5>
                        </div>
                      </div>
                      <div className="row g-3">
                        {tracesData?.map((option, index) => (
                          <div className="col-md-3" key={index}
                            onClick={(e) => {
                              if (
                                option.name == "TRACES activities"
                              ) {
                                router.push(
                                  `/deductors/${deductorId}/tds/traces-activities`
                                );
                              }
                              if (
                                option.name == "24G Form"
                              ) {
                                if (deductorInfo.identificationNumber) {
                                  router.push(
                                    `/deductors/${deductorId}/tds/24g-form`
                                  )
                                } else {
                                  toast.error("Cannot proceed without the Deductor AIN code")
                                }
                              }
                              if (
                                option.name == "Traces Lower Deduction"
                              ) {
                                router.push(
                                  `/deductors/${deductorId}/tds/traces-lower-deductions`
                                )
                              }
                            }
                            }
                          >
                            <span className="d-flex flex-column justify-content-center align-items-center text-center py-2 py-md-2 px-2 px-md-2 border border-1 rounded-4 bg-light-blue countbox">
                              <span
                                style={{
                                  width: 65,
                                  height: 65,
                                }}
                                className="fs-6 rounded-4 fw-bold bg-dark-blue d-flex align-items-center justify-content-center"
                              >
                                {option.code}
                              </span>
                              <div className="d-flex gap-2 w-100 justify-content-between mt-md-3">
                                <div>
                                  <h6 className="fw-bold">{option.name}</h6>
                                  <p className="mb-0 fs-10">
                                    {option.descrption}
                                  </p>
                                </div>
                              </div>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-4 ps-md-4">
                      <div className="mb-4">
                        <h5 className="fw-bold text-uppercase">
                          Deductee/Employee Master
                        </h5>
                      </div>
                      <div className="deductees-master-sidebar">
                        <div className="row g-3">
                          <div className="col-md-12"
                            onClick={() => router.push("tds/deductees")}
                          >
                            <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-2 rounded-3">
                              <div className="row align-items-center">
                                <div className="col-md-4">
                                  <Image
                                    className="img-fluid"
                                    src="/images/dashboards/users_icon.svg"
                                    alt="users_icon"
                                    width={80}
                                    height={80}
                                  />
                                </div>
                                <div
                                  className="col-md-8"
                                >
                                  <h5 className="fw-bold text-uppercase mb-0">
                                    Master List
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12"
                            onClick={(e) =>
                              router.push(
                                `/deductors/${deductorId}/tds/deductees/detail`
                              )
                            }
                          >
                            <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-2 rounded-3">
                              <div className="row align-items-center">
                                <div className="col-md-4">
                                  <Image
                                    className="img-fluid"
                                    src="/images/dashboards/enter_data_manually_icon.svg"
                                    alt="enter_data_manually_icon"
                                    width={80}
                                    height={80}
                                  />
                                </div>
                                <div
                                  className="col-md-8"

                                >
                                  <h5 className="fw-bold text-uppercase mb-0">
                                    Add Master Entry
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-2 rounded-3">
                              <div className="row align-items-center">
                                <div className="col-md-4">
                                  <Image
                                    className="img-fluid"
                                    src="/images/dashboards/import_excel_file_icon.svg"
                                    alt="import_excel_file_icon"
                                    width={80}
                                    height={80}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <h5 className="fw-bold text-capitalize mb-0">
                                    <label className="w-100 text-capitalize">
                                      <span className="fw-bold"> </span>
                                      <input
                                        type="file"
                                        onChange={fileSelectHandler}
                                        className="visually-hidden"
                                        accept=".xlsx"
                                      />
                                      <h5 className="fw-bold text-uppercase mb-0">
                                        {" "}
                                        {isloading ? "Uploading..." : "Import"}
                                        <span className="ms-1">Excel File</span>
                                      </h5>
                                    </label>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12"
                            onClick={download}
                          >
                            <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-2 rounded-3">
                              <div className="row align-items-center">
                                <div className="col-md-4">
                                  <Image
                                    className="img-fluid"
                                    src="/images/dashboards/download_excel_file_icon.svg"
                                    alt="download_excel_file_icon"
                                    width={80}
                                    height={80}
                                  />
                                </div>
                                <div className="col-md-8" >
                                  <h5 className="fw-bold text-uppercase mb-0">
                                    Download Excel Template
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-2 rounded-3">
                              <div className="row align-items-center">
                                <div className="col-md-4">
                                  <Image
                                    className="img-fluid"
                                    src="/images/dashboards/generate_form_icon.svg"
                                    alt="download_excel_file_icon"
                                    width={80}
                                    height={80}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <h5
                                    className="fw-bold text-uppercase mb-0"
                                  // onClick={() => router.push("tds/forms")}
                                  >
                                    Generate Manual Forms (16/16A/27D)
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              {/* <Tab eventKey="dashboard" disabled title="Dashboard">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="border border-1 px-1 py-2 px-md-4 py-md-3 rounded-3">
                      <h6 className="fw-bold">
                        Liability of Last Five Quarters
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border border-1 px-1 py-2 px-md-4 py-md-3 rounded-3">
                      <h6 className="fw-bold">Total Deductees</h6>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="border border-1 px-1 py-2 px-md-4 py-md-3 rounded-3">
                      <h6 className="fw-bold">
                        Liability of Last Five Quarters
                      </h6>
                    </div>
                  </div>
                </div>
              </Tab> */}
              <Tab eventKey="corrections" title="Corrections">

                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <div>
                        {!showLoader && correctionStatements && correctionStatements.length > 0 && (
                          <DataTable
                            fixedHeader
                            fixedHeaderScrollHeight="340px"
                            columns={columns}
                            data={correctionStatements}
                            highlightOnHover
                            pagination={true}
                            paginationServer
                            customStyles={customStyles}
                            paginationTotalRows={totalItems}
                            paginationPerPage={pageSize}
                            selectableRowsNoSelectAll={true}
                            paginationDefaultPage={currentPage}
                            paginationComponentOptions={{
                              noRowsPerPage: true,
                            }}
                            onRowDoubleClicked={handleRowDoubleClick}
                            onChangePage={(page) => {
                              if (currentPage !== page) {
                                setCurrentPage(page);
                              }
                            }}
                          />
                        )}
                        {/* {!showLoader && deductors && deductors.length == 0 && (
                      <NotFound></NotFound>
                    )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </section >
      )
      }
      <DeleteConfirmation
        show={deleteConfirm}
        deleteLoading={deleteLoading}
        setDeleteConfirm={(e) => setDeleteConfirm(e)}
        delete={(e) => deleteCorrectionDeductor(e)}
      ></DeleteConfirmation>
      {showLoader && <ProcessPopup showLoader={showLoader}></ProcessPopup>}
      {show && <ImportDeductorTXTPopup fetchDeductors={fetchCorrectionStatements} show={show} deductorId={deductorId} financialYear={financialYear} quarter={quarter} setShow={(e) => setShow(e)}></ImportDeductorTXTPopup>}
    </>
  );
}
