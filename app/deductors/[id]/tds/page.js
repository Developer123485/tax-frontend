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

export default function TDSDashboard({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [deductorInfo, setDeductorInfo] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const deductorId = resolvedParams?.id;
  const [selectedFile, setSelectedFile] = useState(null);
  const [formsData, setFormsData] = useState(null);
  const [financialYear, setFinancialYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [fileName, setFileName] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [deducteeCount, setDeducteeCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const currentYear = new Date().getFullYear();
  const [financialYears, setFinancialYears] = useState([]);
  const [quarters, setQuarters] = useState(["Q1", "Q2", "Q3", "Q4"]);
  const [key, setKey] = useState("tds");
  const [reportsData, setReportsData] = useState([
    {
      name: "Filling Status Dashboard",
      code: "FSD",
      descrption:
        "Track fillings status, filling history and e-filling order status",
    },
    {
      name: "Form 3CD - Clause 34",
      code: "3CD",
      descrption: "Report of TDS Rationallsation (Form 3CD) for Audit Form",
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
        "Track fillings status, filling history and e-filling order status",
    },
    {
      name: "Traces Lower Deduction",
      code: "TLD",
      descrption: "Validate Lower Deduction Certificate u/s 197/195(3)/195(2)",
    },
    {
      name: "26AS Reconcilation",
      code: "INT",
      descrption: "Reconcile Form 26AS against your TDS recievables",
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
        })
        .finally((f) => {
          setTimeout(() => {
            setShowLoader(false);
          }, 500);
        });
    }
  }, []);

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
      if (e?.response?.data) {
        toast.error(e?.response?.data);
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

  const fileSelectHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    handleFileChange(event.target.files[0]);
  };

  function download() {
    const url = "/static/pdf/DEDUCTEE-EMPLOYEE-MASTER-FINAL.xlsx";
    const link = document.createElement("a");
    link.href = url;
    link.download = "DEDUCTEE-EMPLOYEE-MASTER-FINAL.xlsx";
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
              <div className="col-md-8">
                <h4 className="mb-4 mb-md-0 fw-bold text-capitalize">
                  Tax Deducted at Source
                </h4>
              </div>
              <div className="col-md-2">
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
              <div className="col-md-2">
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
            </div>
          </div>
          <div className="container">
            <Tabs
              id=""
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className=""
            >
              <Tab eventKey="tds" title="TDS Deductors">
                <div className="">
                  <div className="row">
                    <div className="col-md-8 border-end pe-md-4">
                      <div className="mb-3">
                        <div className="col-md-12">
                          <h5 className="text-uppercase fw-bold mb-3">
                            Filling
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
                                if (option.name == "Filling Status Dashboard") {
                                  router.push(
                                    `/deductors/${deductorId}/tds/tds-return`
                                  );
                                }
                                if (
                                  option.name == "Form 3CD - Clause 34"
                                ) {
                                  router.push(
                                    `/deductors/${deductorId}/tds/miscellaneous?financial_year=${financialYear}`
                                  );
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
                                option.name == "24G Form" && deductorInfo.ainCode
                              ) {
                                router.push(
                                  `/deductors/${deductorId}/tds/24g-form`
                                )
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
                            {option.name == "24G Form" && deductorInfo.ainCode && <span className="d-flex flex-column justify-content-center align-items-center text-center py-2 py-md-2 px-2 px-md-2 border border-1 rounded-4 bg-light-blue countbox">
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
                            </span>}
                            {option.name != "24G Form" && <span className="d-flex flex-column justify-content-center align-items-center text-center py-2 py-md-2 px-2 px-md-2 border border-1 rounded-4 bg-light-blue countbox">
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
                            </span>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-4 ps-md-4">
                      <div className="mb-4">
                        <h5 className="fw-bold text-uppercase">
                          Deductees Master
                        </h5>
                      </div>
                      <div className="deductees-master-sidebar">
                        <div className="row g-3">
                          <div className="col-md-12">
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
                                  onClick={() => router.push("tds/deductees")}
                                >
                                  <h5 className="fw-bold text-uppercase mb-0">
                                    Go to Deductees
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
                                    src="/images/dashboards/enter_data_manually_icon.svg"
                                    alt="enter_data_manually_icon"
                                    width={80}
                                    height={80}
                                  />
                                </div>
                                <div
                                  className="col-md-8"
                                  onClick={(e) =>
                                    router.push(
                                      `/deductors/${deductorId}/tds/deductees/detail`
                                    )
                                  }
                                >
                                  <h5 className="fw-bold text-uppercase mb-0">
                                    Enter data manually
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
                          <div className="col-md-12">
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
                                <div className="col-md-8" onClick={download}>
                                  <h5 className="fw-bold text-uppercase mb-0">
                                    Download Excel File
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
                                    onClick={() => router.push("tds/forms")}
                                  >
                                    Generate Forms
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
              <Tab eventKey="dashboard" title="Dashboard">
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
              </Tab>
            </Tabs>
          </div>
        </section >
      )
      }
      {showLoader && <ProcessPopup showLoader={showLoader}></ProcessPopup>}

    </>
  );
}
