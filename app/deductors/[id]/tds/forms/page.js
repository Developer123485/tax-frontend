"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FormsService } from "@/app/services/forms.service";
import { usePathname } from "next/navigation";
import { Button, ProgressBar } from "react-bootstrap";
import api from "@/app/utils/interceptors";
import { ToastContainer, toast } from "react-toastify";
import { saveAs } from "file-saver";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import ProcessPopup from "@/app/components/modals/processing";
import FormConfirmation from "@/app/components/modals/form-confimation";
import htmlDocx from "html-docx-js/dist/html-docx";
import ValidationConfirmation from "@/app/components/modals/validation-confirm";
import HeaderList from "@/app/components/header/header-list";
import Select from "react-select";
import CheckboxSelect from "@/app/components/form/select";

export default function TDSForm({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const pathname = usePathname();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSalaryFile, setSelectedSalaryFile] = useState(null);
  const [financialYear, setFinancialYear] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSalaryName, setFileSalaryName] = useState("");
  const [citAddress, setCitAddress] = useState("");
  const [citCity, setCitCity] = useState("");
  const [citPincode, setCitPincode] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [employeePannumbers, setEmployeePannumbers] = useState([]);
  const [uploadSalaryProgress, setSalaryUploadProgress] = useState(0);
  const [exportProgress, setExportProgress] = useState(100);
  const [financialYears, setFinancialYears] = useState([]);
  const [quarters, setQuarters] = useState(["Q1", "Q2", "Q3", "Q4"]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isSalaryUploading, setIsSalaryUploading] = useState(false);
  const [openGeneratePopup, setOpenGeneratePopup] = useState(false);
  const [isExportFormConfirmation, setIsExportFormConfirmation] =
    useState(false);
  const [isGenerateFormConfirmation, setIsGenerateFormConfirmation] =
    useState(false);
  const [isDownloadFormConfirmation, setIsDownloadFormConfirmation] =
    useState(false);
  const [isFormValidationConfirmation, setIsFormValidationConfirmation] =
    useState(false);
  const [isDownloading, setIsDownloding] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const currentYear = new Date().getFullYear();
  const [partType, setPartType] = useState("B");
  const [categoryId, setCategory] = useState("2");
  const [formType, setFormType] = useState("");
  const [downloadType, setDownloadType] = useState("Combined");
  const [quarter, setQuarter] = useState("");
  const form = resolvedParams?.form;
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(null);
  const [formsDashboardDetail, setFormsDashboardDetail] = useState({
    deducteeCount: 0,
    challanCount: 0,
    deducteeDetailCount: 0,
    salaryDetailCount: 0,
  });
  const [breadcrumbs, setBreadcrumbs] = useState([
    {
      name: "Deductors",
      isActive: false,
      href: "/deductors",
    },
    {
      name: "TDS Dashboard",
      isActive: false,
      href: `/deductors/${deductorId}/tds`,
    },
    {
      name: "Generate Forms",
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
    const fy = `${startYear}-${(startYear + 1).toString().slice(-2)}`;
    setFinancialYear(fy);
  }, []);

  function openGenerateForm(type, value) {
    FormsService.getUniquePannumbers(deductorId, value).then((res) => {
      if (res) {
        const newItems = [...res]; // create a copy first
        newItems.unshift({ value: "*", label: "Select All" });
        setEmployeePannumbers(res);
        setOpenGeneratePopup(true);
      }
    });
  }

  function generateForm16() {
    setIsloading(true);
    const model = {
      financialYear: financialYear,
      quarter: quarter,
      deductorId: deductorId,
      categoryId: 1,
      pannumbers: selectedOptions.map((p) => p.label),
      partType: partType,
      downloadType: downloadType,
      citAddress: citAddress,
      citCity: citCity,
      citPincode: citPincode,
    };
    const startYear = parseInt(financialYear.split("-")[0]);
    const endYear = startYear + 1;
    model.assesmentYear =
      `${endYear}` + "-" + "" + `${endYear + 1}`.toString().slice(-2);
    FormsService.generateForm16(model)
      .then((res) => {
        if (res) {
          res.forEach((element) => {
            const blob = htmlDocx.asBlob(element);
            saveAs(blob, "document.docx");
          });
          toast.success("Genrate Form Successfully!");
        }
      })
      .finally((f) => {
        setIsDownloding(false);
        setIsGenerateFormConfirmation(false);
        setIsloading(false);
      });
  }

  function generateForm16A() {
    setIsloading(true);
    const model = {
      financialYear: financialYear,
      quarter: quarter,
      deductorId: deductorId,
      categoryId: parseInt(categoryId),
      pannumbers: selectedOptions.map((p) => p.label),
      partType: partType,
      downloadType: downloadType,
      citAddress: citAddress,
      citCity: citCity,
      citPincode: citPincode,
    };
    const startYear = parseInt(financialYear.split("-")[0]);
    const endYear = startYear + 1;
    model.assesmentYear =
      `${endYear}` + "-" + "" + `${endYear + 1}`.toString().slice(-2);
    FormsService.generateForm16A(model)
      .then((res) => {
        if (res) {
          res.forEach((element) => {
            const blob = htmlDocx.asBlob(element);
            saveAs(blob, "document.docx");
          });
          toast.success("Genrate Form Successfully!");
        }
      }).catch(e => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
        }
        else {
          toast.error(e?.message);
        }
        setShowLoader(false);
      })
      .finally((f) => {
        setIsDownloding(false);
        setIsGenerateFormConfirmation(false);
        setIsloading(false);
      });
  }

  function generateForm27D() {
    setIsloading(true);
    const model = {
      financialYear: financialYear,
      quarter: quarter,
      deductorId: deductorId,
      categoryId: 1,
      pannumbers: selectedOptions.map((p) => p.label),
      partType: partType,
      downloadType: downloadType,
      citAddress: citAddress,
      citCity: citCity,
      citPincode: citPincode,
    };
    const startYear = parseInt(financialYear.split("-")[0]);
    const endYear = startYear + 1;
    model.assesmentYear =
      `${endYear}` + "-" + "" + `${endYear + 1}`.toString().slice(-2);
    FormsService.generateForm27D(model)
      .then((res) => {
        if (res) {
          res.forEach((element) => {
            const blob = htmlDocx.asBlob(element);
            saveAs(blob, "document.docx");
          });
          toast.success("Genrate Form Successfully!");
        }
      }).catch(e => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
        }
        else {
          toast.error(e?.message);
        }
        setShowLoader(false);
      })
      .finally((f) => {
        setIsDownloding(false);
        setIsGenerateFormConfirmation(false);
        setIsloading(false);
      });
  }

  function generateForm12BA() {
    setIsloading(true);
    const model = {
      financialYear: financialYear,
      quarter: quarter,
      deductorId: deductorId,
      categoryId: 3,
      pannumbers: selectedOptions.map((p) => p.label),
      partType: partType,
      downloadType: downloadType,
      citAddress: citAddress,
      citCity: citCity,
      citPincode: citPincode,
    };
    const startYear = parseInt(financialYear.split("-")[0]);
    const endYear = startYear + 1;
    model.assesmentYear =
      `${endYear}` + "-" + "" + `${endYear + 1}`.toString().slice(-2);
    FormsService.generateForm27D(model)
      .then((res) => {
        if (res) {
          res.forEach((element) => {
            const blob = htmlDocx.asBlob(element);
            saveAs(blob, "document.docx");
          });
          toast.success("Genrate Form Successfully!");
        }
      }).catch(e => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
        }
        else {
          toast.error(e?.message);
        }
        setShowLoader(false);
      })
      .finally((f) => {
        setIsDownloding(false);
        setIsGenerateFormConfirmation(false);
        setIsloading(false);
      });
  }

  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section class="py-5 bg-light">
        <div class="container">
          <div class="row mb-4">
            <div class="col-12">
              <h3 class="fw-bold">Generate Forms</h3>
            </div>
          </div>
          <div class="row g-4 justify-content-center">
            <div class="col-12 col-sm-6 col-md-3">
              <div class="card h-100 text-center shadow-sm border-0"
               onClick={(e) => {
                setFormType("16");
                openGenerateForm("16", true);
              }}>
                <div class="card-body d-flex flex-column align-items-center">
                  <img src="/images/dashboards/generate_form_icon.svg" alt="Form 16 Icon" width="80" height="80" class="mb-3" />
                  <h5 class="text-uppercase fw-bold mb-0">Generate Form-16</h5>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3">
              <div class="card h-100 text-center shadow-sm border-0" onClick={(e) => {
                setFormType("16A");
                openGenerateForm("16A", false);
              }}>
                <div class="card-body d-flex flex-column align-items-center">
                  <img src="/images/dashboards/generate_form_icon.svg" alt="Form 16A Icon" width="80" height="80" class="mb-3" />
                  <h5 class="text-uppercase fw-bold mb-0">Generate Form-16A</h5>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3">
              <div class="card h-100 text-center shadow-sm border-0" 
              
              onClick={(e) => {
                setFormType("27D");
                openGenerateForm("27D", false);
              }}>
                <div class="card-body d-flex flex-column align-items-center">
                  <img src="/images/dashboards/generate_form_icon.svg" alt="Form 27D Icon" width="80" height="80" class="mb-3" />
                  <h5 class="text-uppercase fw-bold mb-0">Generate Form-27D</h5>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3">
              <div class="card h-100 text-center shadow-sm border-0" 
              onClick={(e) => {
                setFormType("12BA");
                openGenerateForm("12BA", false);
              }}
              >
                <div class="card-body d-flex flex-column align-items-center">
                  <img src="/images/dashboards/generate_form_icon.svg" alt="Form 12BA Icon" width="80" height="80" class="mb-3" />
                  <h5 class="text-uppercase fw-bold mb-0">Generate Form-12BA</h5>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Modal
        className=""
        size="md"
        centered
        keyboard={false}
        backdrop="static"
        show={openGeneratePopup}
        onHide={() => setOpenGeneratePopup(false)}
      >
        <Modal.Header className="border-0" closeButton>
          <h5>Generate Form-{formType}</h5>
        </Modal.Header>
        <Modal.Body className="px-md-3 pb-md-5">
          <div className="container">
            <div className="row">
              <label>Pan Numbers</label>
              <CheckboxSelect
                options={employeePannumbers}
                selectedOptions={selectedOptions}
                setSelectedOptions={(e) => {
                  setSelectedOptions(e);
                }}
              ></CheckboxSelect>
            </div>
            <div className="row mt-4">
              {formType == "16" && (
                <div className="col-md-6">
                  <label>Part Type</label>
                  <select
                    className="form-select m-100"
                    aria-label="Default select example"
                    value={partType}
                    onChange={(e) => setPartType(e.target.value)}
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="Combine">Combine</option>
                  </select>
                </div>
              )}
              <div className="col-md-6">
                <label>Download Type</label>
                <select
                  className="form-select m-100"
                  aria-label="Default select example"
                  value={downloadType}
                  onChange={(e) => setDownloadType(e.target.value)}
                >
                  <option value="Combined">Combined</option>
                  <option value="NonCombined">NonCombined</option>
                </select>
              </div>
              {formType == "16A" && (
                <div className="col-md-6">
                  <label>Category Type</label>
                  <select
                    className="form-select m-100"
                    aria-label="Default select example"
                    value={categoryId}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="2">26Q</option>
                    <option value="4">27Q</option>
                  </select>
                </div>
              )}
            </div>
            <div className="row  mt-4">
              <div className="col-md-6">
                <label htmlFor="citAddress" className="form-label">
                  <span>Financial Year</span>
                </label>
                <select
                  className="form-select m-100"
                  aria-label="Default select example"
                  value={financialYear}
                  onChange={(e) => {
                    setFinancialYear(e.target.value);
                  }}
                >
                  {financialYears?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="citAddress" className="form-label">
                  <span>Quarter</span>
                </label>
                <select
                  className="form-select m-100"
                  aria-label="Default select example"
                  value={quarter}
                  onChange={(e) => {
                    setQuarter(e.target.value);
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
            <div className="row mt-4">
              <div className="col-md-12">
                <label htmlFor="citAddress" className="form-label">
                  <span>CIT Address</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  rows={1}
                  className="form-control"
                  id="citAddress"
                  value={citAddress}
                  onChange={(e) => setCitAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <label htmlFor="citCity" className="form-label">
                  <span>CIT City</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  rows={1}
                  className="form-control"
                  id="citCity"
                  value={citCity}
                  onChange={(e) => setCitCity(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="citPincode" className="form-label">
                  <span>CIT Pincode</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  rows={1}
                  className="form-control"
                  id="citPincode"
                  value={citPincode}
                  onChange={(e) => setCitPincode(e.target.value)}
                />
              </div>
            </div>

            <div className="row  mt-4">
              <div className="col-md-12">
                <button
                  type="button"
                  onClick={(e) => {
                    if (formType == "16") {
                      generateForm16(e);
                    }
                    if (formType == "16A") {
                      generateForm16A(e);
                    }
                    if (formType == "27D") {
                      generateForm27D(e);
                    }
                    if (formType == "12BA") {
                      generateForm12BA(e);
                    }
                  }}
                  className="btn btn btn-primary px-md-5 w-auto"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
