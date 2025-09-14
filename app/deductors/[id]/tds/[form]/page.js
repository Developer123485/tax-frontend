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
import ValidationConfirmation from "@/app/components/modals/validation-confirm";
import HeaderList from "@/app/components/header/header-list";
import ImportTdsTXTPopup from "@/app/components/modals/import-tds-txt-popup";
import { CommonService } from "@/app/services/common.service";
import { TracesActivitiesService } from "@/app/services/tracesActivities.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function TDSForm({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const pathname = usePathname();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTxtFile, setSelectedTxtFile] = useState(null);
  const [financialYear, setFinancialYear] = useState("");
  const [fileName, setFileName] = useState("");
  const [txtFileName, setTxtFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deductorInfo, setDeductorInfo] = useState(null);
  const [uploadTxtProgress, setUploadTxtProgress] = useState(0);
  const [exportProgress, setExportProgress] = useState(100);
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isTxtUploading, setIsTxtUploading] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [submitLoginLoading, setSubmitLoginLoading] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [openLowerDeduction, setOpenLowerDeduction] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [captchaBase64, setCaptchaBase64] = useState('');
  const [placeValue, setPlaceValue] = useState('');
  const [verificationDate, setVerificationDate] = useState("");
  const [openGenerateInputPopup, setOpenGenerateInputPopup] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [isExportFormConfirmation, setIsExportFormConfirmation] =
    useState(false);
  const [isGenerateFormConfirmation, setIsGenerateFormConfirmation] =
    useState(false);
  const [isDownloadFormConfirmation, setIsDownloadFormConfirmation] =
    useState(false);
  const [isFormValidationConfirmation, setIsFormValidationConfirmation] =
    useState(false);
  const [isDownloading, setIsDownloding] = useState(false);
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
  const [generateFormErrors, setGenerateFormErrors] = useState({
    placeError: "",
    dateError: "",
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
      name: form,
      isActive: true,
    },
  ]);

  useEffect(() => {
    if (
      searchParams.get("financial_year") &&
      searchParams.get("quarter") &&
      searchParams.get("categoryId")
    ) {
      setFinancialYear(searchParams.get("financial_year"));
      setQuarter(searchParams.get("quarter"));
      getFormsDetails();
    }
  }, []);

  useEffect(() => {
    validateGenerateInput();
  }, [placeValue, verificationDate]);

  const handleChange = (selected) => {
    setSelectedPANs(selected || []);
  };

  function downloadFile(e) {
    if (formsDashboardDetail.challanCount > 0) {
      setIsloading(true);
      e.preventDefault();
      const model = {
        financialYear: searchParams.get("financial_year"),
        quarter: searchParams.get("quarter"),
        deductorId: deductorId,
        categoryId: parseInt(searchParams.get("categoryId")),
      };
      const startYear = parseInt(model.financialYear.split("-")[0]);
      const endYear = startYear + 1;
      model.assesmentYear =
        `${endYear}` + "-" + "" + `${endYear + 1}`.toString().slice(-2);
      FormsService.finalReport(model)
        .then((res) => {
          const blob = new Blob([res], { type: "text/plain" });
          saveAs(blob, form + searchParams.get("quarter") + ".txt");
        })
        .finally((f) => {
          setIsDownloadFormConfirmation(false);
          setIsloading(false);
        });
    } else {
      setIsDownloadFormConfirmation(false);
      toast.error("Create one challan first!");
    }
  }

  function resetGenerateInput() {
    setPlaceValue("");
    setVerificationDate("");
  }

  function generateForm() {
    setIsDirty(true);
    if(validateGenerateInput()){
    if (formsDashboardDetail.challanCount > 0) {
      setGenerateLoading(true);
      const model = {
        financialYear: searchParams.get("financial_year"),
        quarter: searchParams.get("quarter"),
        deductorId: deductorId,
        categoryId: parseInt(searchParams.get("categoryId")),
        verificationPlace: placeValue,
        verificationDate: CommonService.dateFormat(verificationDate)
      };
      FormsService.generateForm(model)
        .then(async (res) => {
          if (res) {
            const url = window.URL.createObjectURL(new Blob([res]));
            const a = document.createElement("a");
            a.href = url;
            a.download = form + searchParams.get("quarter") + ".docx"; // suggested filename
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            // const blob = new Blob([res], { type: "docx" });
            // saveAs(blob, form + searchParams.get("quarter") + ".docx");
            toast.success("Genrate Form Successfully!");
          }
        }).catch(e => {
          if (e?.response?.data) {
            toast.error(e?.response?.data);
          }
          else {
            toast.error(e?.message);
          }
        })
        .finally((f) => {
          setIsDownloding(false);
          setIsGenerateFormConfirmation(false);
          setGenerateLoading(false);
          setOpenGenerateInputPopup(false);
          resetGenerateInput();
        });
    } else {
      setIsGenerateFormConfirmation(false);
      toast.error("Create one challan first!");
    }
  }
  }
  
    function validateGenerateInput() {
      debugger
        let placeError = "";
        let dateError = "";
        if (!placeError) {
            placeError = "Place Name is required";
        }
        if (!verificationDate) {
            dateError = "Verification Date is required";
        }
        if (
            placeError ||
            dateError
        ) {
            setGenerateFormErrors((prevState) => ({
                ...prevState,
                dateError,
                placeError,
            }));
            return false;
        }
        setTdsReturnErrors((prevState) => ({
            ...prevState,
            dateError,
            placeError,
        }));
        return true;
    }

  const fileSelectHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setUploadProgress(0); // Reset progress on file change
  };

  function exportFormData() {
    if (
      formsDashboardDetail.challanCount > 0 ||
      formsDashboardDetail.salaryDetailCount > 0
    ) {
      setIsDownloding(true);
      setIsExportFormConfirmation(false);
      const model = {
        financialYear: searchParams.get("financial_year"),
        quarter: searchParams.get("quarter"),
        deductorId: deductorId,
        categoryId: parseInt(searchParams.get("categoryId")),
      };
      FormsService.exportFormData(model)
        .then((res) => {
          if (res) {
            let url = window.URL.createObjectURL(new Blob([res]));
            toast.success("Export Data Successfully!");
            saveAs(url, "CHALLAN-DEDUCCTEE-EXPORT-" + form + ".xlsx");
          }
        }).catch(e => {
          if (e?.response?.data) {
            toast.error(e?.response?.data);
          }
          else {
            toast.error(e?.message);
          }
        })
        .finally((f) => {
          setIsDownloding(false);
        });
    } else {
      setIsExportFormConfirmation(false);
      toast.error("Create one challan/Salary detail first!");
    }
  }

  async function handleFileChange(e, value) {
    let formData = new FormData();
    formData.append("file", selectedFile);
    const model = {
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
      file: formData,
      isFormValidation: value,
    };
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
      let result;
      if (selectedFile.type != "text/plain") {
        setIsUploading(true);
        result = await api.post(
          `forms/uploadExcelFile/${model.categoryId}/${model.deductorId}/${model.financialYear}/${model.quarter}/${model.isFormValidation}`,
          model.file,
          config
        );
      }
      if (result && result.status == true) {
        getFormsDetails();
        toast.success("File upload successfully");
      } else {
        const blob = new Blob([result], { type: "text/plain" });
        saveAs(blob, "errors.txt");
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
      setFileName("");
      setSelectedFile("");
      setIsTxtUploading(false);
      setTxtFileName("");
      setSelectedTxtFile("");
    }
  }

  async function submitTxtFile() {
    setShowModal(false);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const percent = (progressEvent.loaded / progressEvent.total) * 100;
            setUploadTxtProgress(Math.round(percent));
          }
        },
      };
      setIsTxtUploading(true);
      let formData = new FormData();
      formData.append("file", selectedTxtFile);
      formData.append("deductorId", deductorId ? parseInt(deductorId) : 0);
      formData.append("deductorCode", "");
      formData.append("quarter", searchParams.get("quarter"));
      formData.append("categoryId", parseInt(searchParams.get("categoryId")));
      formData.append("financialYear", searchParams.get("financial_year"));
      result = await api.post(
        `forms/uploadTXTFile`,
        formData,
        config
      );
    }
    catch (error) {
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      }
      else {
        toast.error(e?.message);
      }
    } finally {
      getFormsDetails();
      toast.success("File upload successfully");
      setIsTxtUploading(false);
      setTxtFileName("");
      setSelectedTxtFile("");
      setShowModal(false);
    }
  }

  function download() {
    let urlPath = "";
    if (searchParams.get("categoryId") == "1") {
      urlPath = "CHALLAN-DEDUCTEE-24Q-FINAL.xlsx";
    }
    if (searchParams.get("categoryId") == "2") {
      urlPath = "CHALLAN-DEDUCTEE-26Q-FINAL.xlsx";
    }
    if (searchParams.get("categoryId") == "3") {
      urlPath = "CHALLAN-DEDUCTEE-27EQ-FINAL.xlsx";
    }
    if (searchParams.get("categoryId") == "4") {
      urlPath = "CHALLAN-DEDUCTEE-27Q-FINAL.xlsx";
    }
    const url = "/static/pdf/" + urlPath;
    const link = document.createElement("a");
    link.href = url;
    link.download = urlPath;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function getFormsDetails() {
    setShowLoader(true);
    const model = {
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
    };
    FormsService.getFormsDashboard(model)
      .then((res) => {
        if (res) {
          setFormsDashboardDetail((prevState) => ({
            ...prevState,
            deducteeCount: res.deducteesCount,
            challanCount: res.challansCount,
            deducteeDetailCount: res.deducteeDetailCount,
            salaryDetailCount: res.salaryDetailCount,
          }));
          setDeductorInfo(res.deductor);
        }
      }).catch(e => {
        if (e?.response?.data) {
          toast.error(e?.response?.data);
        }
        else {
          toast.error(e?.message);
        }
      })
      .finally((f) => {
        setTimeout(() => {
          setShowLoader(false);
        }, 100);
      });
  }
  function submitLogin(e) {
    e.preventDefault();
    setCaptcha("");
    if (deductorInfo.tracesLogin && deductorInfo.tracesPassword) {
      setSubmitLoginLoading(true);
      const model = {
        userName: deductorInfo.tracesLogin,
        password: deductorInfo.tracesPassword,
        tanNumber: deductorInfo?.deductorTan
      }
      TracesActivitiesService.startLogin(model).then(res => {
        if (res) {
          setSubmitLoginLoading(false);
          setCaptchaBase64(res.captcha);
          setConfirmModal(true);
          setOpenLowerDeduction(false);
        }
      }).catch(e => {
        setSubmitLoginLoading(false);
        if (e?.response?.data) {
          toast.error(e?.response?.data);
        }
        else {
          toast.error(e?.message);
        }
      })
    } else {
      setCaptchaBase64("");
      setCaptcha("");
      toast.error("TRACES username and password do not exist for the deductor");
    }
  }

  function handleSubmit() {
    setSubmitLoading(true);
    if (!captcha) {
      toast.error("Input Captcha is required");
      return false;
    }
    const model = {
      captcha: captcha,
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
    }
    TracesActivitiesService.getSaveLowerDeductions(model).then(res => {
      if (res) {
        toast.success("Data fetched and saved successfully!");
        setConfirmModal(false);
        setSubmitLoading(false);
        setCaptchaBase64("");
        setCaptcha("");
        setTimeout(() => {
          router.push(
            pathname + "/generate-fvu" + window.location.search
          );
        }, 1000);
      }
    }).catch(e => {
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      }
      else {
        toast.error(e?.message);
      }
      setConfirmModal(false);
      setSubmitLoading(false);
      setCaptchaBase64("");
      setCaptcha("");
    })
  }

  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="py-5 py-md-4 bg-light-gray tds-importexport-sec">
        {financialYear && form && quarter && (
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-between">
                  <h3 className="mb-0 me-3">
                    {financialYear}, {quarter}, {form.toUpperCase()}
                  </h3>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => setOpenGenerateInputPopup(true)}
                  >
                    Generate {form.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="row g-3">
                  <div
                    className={
                      searchParams.get("quarter") == "Q4" && form === "form-24Q"
                        ? "col-12 col-md-4 ps-md-0"
                        : "col-12 col-md-4 ps-md-0"
                    }
                    onClick={(e) =>
                      router.push(
                        pathname + "/challans" + window.location.search
                      )
                    }
                  >
                    <div className="bg-white position-relative d-flex flex-row justify-content-center align-items-center py-3 py-md-3 px-3 ps-md-3 pe-md-4 border border-1 rounded-4 countbox">
                      <span
                        style={{
                          width: 80,
                          height: 60,
                        }}
                        className="fs-3 rounded-4 fw-bold bg-light-gray me-3 d-flex align-items-center justify-content-center"
                      >
                        {formsDashboardDetail.challanCount}
                      </span>
                      <div className="">
                        <h6 className="text-capitalize fw-bold">Challans</h6>
                        <p className="mb-0 fs-12">
                          List of challans used in this return
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      searchParams.get("quarter") == "Q4" && form === "form-24Q"
                        ? "col-12 col-md-4"
                        : "col-12 col-md-4"
                    }
                    onClick={(e) => {
                      router.push(
                        pathname + "/deductee-entry" + window.location.search
                      );
                    }}
                  >
                    <div className="bg-white position-relative d-flex flex-row justify-content-center align-items-center py-3 py-md-3 px-3 ps-md-3 pe-md-4 border border-1 rounded-4 countbox">
                      <span
                        style={{
                          width: 80,
                          height: 60,
                        }}
                        className="fs-3 rounded-4 fw-bold bg-light-gray me-3 d-flex align-items-center justify-content-center"
                      >
                        {formsDashboardDetail.deducteeDetailCount}
                      </span>
                      <div className="">
                        <h6 className="text-capitalize fw-bold">
                          Deductees Detail
                        </h6>
                        <p className="mb-0 fs-12">
                          List of deductees used in this return
                        </p>
                      </div>
                    </div>
                  </div>
                  {searchParams.get("quarter") == "Q4" &&
                    form === "form-24Q" && (
                      <div
                        className="col-12 col-md-4 pe-md-0"
                        onClick={(e) =>
                          router.push(
                            pathname + "/salary" + window.location.search
                          )
                        }
                      >
                        <div className="bg-white position-relative d-flex flex-row justify-content-center align-items-center py-3 py-md-3 px-3 ps-md-3 pe-md-4 border border-1 rounded-4 countbox">
                          <span
                            style={{
                              width: 80,
                              height: 60,
                            }}
                            className="fs-3 rounded-4 fw-bold bg-light-gray me-3 d-flex align-items-center justify-content-center"
                          >
                            {formsDashboardDetail.salaryDetailCount}
                          </span>
                          <div className="">
                            <h6 className="text-capitalize fw-bold">
                              Salary Detail
                            </h6>
                            <p className="mb-0 fs-12">
                              List of salary detail used in this return
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                <div className="row g-3 gy-md-0 my-4 my-md-4 bg-white rounded-4 px-3 py-3 px-md-3 py-md-2 align-items-center justify-content-center text-center text-md-start">
                  <div className="col-12 col-md-2 mt-3">
                    <Image
                      className=""
                      src="/images/dashboards/import_excel_file_icon.svg"
                      alt="import_excel_file_icon"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="col-12 col-md-7">
                    <h4 className="fw-bold">Import from Excel</h4>
                    <span>
                      Auto-import of deductions, challans, deductee details,
                      {searchParams.get("quarter") == "Q4" &&
                        form === "form-24Q"
                        ? "and Salary detail "
                        : " "}{" "}
                      from excel sheets.
                    </span>
                  </div>
                  <div className="col-12 col-md-3">
                    {fileName && (
                      <span className="text-danger">{fileName}</span>
                    )}
                    {!selectedFile && (
                      <label className="btn btn-primary w-100">
                        <span className="fw-bold"> </span>
                        <input
                          type="file"
                          onChange={fileSelectHandler}
                          className="visually-hidden"
                          accept=""
                        />
                        Import from Excel
                      </label>
                    )}
                    {selectedFile && (
                      <>
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={(e) => setIsFormValidationConfirmation(true)}
                          disabled={isUploading}
                        >
                          {isUploading ? "Uploading...." : "Upload"}
                        </button>
                      </>
                    )}
                  </div>
                  <div className="mt-3">
                    {isUploading && (
                      <ProgressBar animated now={uploadProgress} />
                    )}
                  </div>
                </div>
                <div className="row g-3 gy-md-0 my-4 my-md-4 bg-white rounded-4 px-3 py-3 px-md-3 py-md-2 align-items-center justify-content-center text-center text-md-start">
                  <div className="col-12 col-md-2 mt-3">
                    <Image
                      className=""
                      src="/images/dashboards/import_txt_file_icon.svg"
                      alt="import_txt_file_icon"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="col-12 col-md-7">
                    <h4 className="fw-bold">Import from TXT/TDS</h4>
                    <span>
                      Auto-import of deductions, challans, deductee details,
                      {searchParams.get("quarter") == "Q4" &&
                        form === "form-24Q"
                        ? "and Salary detail "
                        : " "}{" "}
                      from txt sheets.
                    </span>
                  </div>
                  <div className="col-12 col-md-3">
                    {!selectedTxtFile && (
                      <label className="btn btn-primary w-100" onClick={(e) => setShowModal(true)}>
                        <span className="fw-bold"> </span>
                        Import from TXT
                      </label>
                    )}
                    {selectedTxtFile && (
                      <>
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={(e) => setIsFormValidationConfirmation(true)}
                          disabled={isTxtUploading}
                        >
                          {isTxtUploading ? "Uploading...." : "Upload"}
                        </button>
                      </>
                    )}
                  </div>
                  <div className="mt-3">
                    {isTxtUploading && (
                      <ProgressBar animated now={uploadTxtProgress} />
                    )}
                  </div>
                </div>
                <div className="row g-3 gy-md-0 my-4 my-md-4 bg-white rounded-4 px-3 py-3 px-md-3 py-md-2 align-items-center justify-content-center text-center text-md-start">
                  <div className="col-12 col-md-2 mt-3">
                    <Image
                      className=""
                      src="/images/dashboards/export_form_data.svg"
                      alt="export_form_data"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="col-12 col-md-7">
                    <h4 className="fw-bold">
                      Export {form.toUpperCase()} Data
                    </h4>
                    <span>
                      Generate {form.toUpperCase()} which has a save data of the
                      return.
                    </span>
                  </div>
                  <div className="col-12 col-md-3">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={(e) => setIsExportFormConfirmation(true)}
                    >
                      Form Export
                    </button>
                  </div>
                  <div className="mt-3">
                    {isDownloading && (
                      <ProgressBar animated now={exportProgress} />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="deductees-master-sidebar mt-3">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <div className="content-box bg-white border border-1 px-1 py-2 px-md-4 py-md-3 rounded-3">
                        <div className="row align-items-center"
                          onClick={(e) => {
                            setOpenLowerDeduction(true)
                            // router.push(
                            //   pathname + "/generate-fvu" + window.location.search
                            // );
                          }}
                        >
                          <div className="col-md-4" >
                            <Image
                              className="img-fluid"
                              src="/images/dashboards/validate_return_icon.svg"
                              alt="validate_return_icon"
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="col-md-8">
                            <h5 className="fw-bold text-uppercase mb-0">
                              Validate return & Generate FVU
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="content-box bg-white border border-1 px-1 py-2 px-md-4 py-md-3 rounded-3">
                        <div
                          className="row align-items-center"
                          onClick={(e) => {
                            router.push(
                              pathname +
                              "/potential-notices" +
                              window.location.search
                            );
                          }}
                        >
                          <div className="col-md-4">
                            <Image
                              className="img-fluid"
                              src="/images/dashboards/check_notices_icon.svg"
                              alt="check_notices_icon"
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="col-md-8">
                            <h5 className="fw-bold text-uppercase mb-0">
                              Check potential notices
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="content-box bg-white border border-1 px-1 py-2 px-md-4 py-md-3 rounded-3">
                        <div
                          className="row align-items-center"
                          onClick={(e) => setIsDownloadFormConfirmation(true)}
                        >
                          <div className="col-md-4">
                            <Image
                              className="img-fluid"
                              src="/images/dashboards/download_excel_file_icon.svg"
                              alt="download_excel_file_icon"
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="col-md-8">
                            <h5 className="fw-bold text-uppercase mb-0">
                              Download Final File
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="content-box bg-white border border-1 px-1 py-2 px-md-4 py-md-3 rounded-3">
                        <div className="row align-items-center" onClick={download}>
                          <div className="col-md-4">
                            <Image
                              className="img-fluid"
                              src="/images/dashboards/mark_filed_icon.svg"
                              alt="mark_filed_icon"
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="col-md-8">
                            <h5 className="fw-bold text-uppercase mb-0">
                              Download Excel
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
        )}
      </section>
      <Modal
        show={openGenerateInputPopup}
        onHide={() => {
          resetGenerateInput();
          setOpenGenerateInputPopup(false)
        }}
        centered
        backdrop="static"
        keyboard={false}
        size="md"
        className="confirm-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Generate File Input</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="col-md-12">
            <label for="rNumber" className="form-label">
              Place
            </label>
            <input
              type="text"
              className="form-control"
              id="place"
              rows={2}
              maxLength={15}
              value={placeValue}
              onChange={(e) => {
                setPlaceValue(e.target.value);
              }}
            />
            {isDirty &&
              generateFormErrors.placeError && (
                <span className="text-danger">
                  {generateFormErrors.placeError}
                </span>
              )}
          </div>
          <div className="col-md-12">
            <label htmlFor="verificationDate" className="form-label">
              <span>Verification Date</span>
            </label>
            <div>
              <DatePicker
                autoComplete="off"
                selected={verificationDate}
                id="verificationDate"
                className="form-control w-100"
                onChange={(e) => setVerificationDate(e)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/MM/yyyy"
              />
              {isDirty &&
                generateFormErrors.dateError && (
                  <span className="text-danger">
                    {generateFormErrors.dateError}
                  </span>
                )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 justify-content-center gap-3">
          <Button
            variant="primary"
            className="px-4 py-2 rounded-3 fw-semibold"
            disabled={generateLoading}
            onClick={(e) => generateForm()}
          >
            {generateLoading && (
              <div className="spinner-border me-2" role="status"></div>
            )}
            Generate Docx
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={openLowerDeduction}
        onHide={() => setOpenLowerDeduction(false)}
        centered
        backdrop="static"
        keyboard={false}
        size="md"
        className="confirm-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Confirm Action</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <p className="fs-6 text-muted">
            Do you want to fetch and save data from the <strong>Validate Lower Deduction Certificate</strong> u/s 197/195(3)/195(2) tables before validating the return and generating FVU?
          </p>
        </Modal.Body>

        <Modal.Footer className="border-0 justify-content-center gap-3">
          <Button
            variant="secondary"
            className="px-4 py-2 rounded-3 fw-semibold"
            onClick={() => {
              setOpenLowerDeduction(false)
              router.push(
                pathname + "/generate-fvu" + window.location.search
              );
            }}
          >
            No, Continue Without Fetching
          </Button>
          <Button
            variant="primary"
            className="px-4 py-2 rounded-3 fw-semibold"
            disabled={submitLoginLoading}
            onClick={submitLogin}
          >
            {submitLoginLoading && (
              <div className="spinner-border me-2" role="status"></div>
            )}
            Yes, Fetch & Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className=""
        size="sm"
        centered
        keyboard={false}
        backdrop="static"
        show={confirmModal}
        onHide={() => {
          setCaptchaBase64("");
          setCaptcha("");
          setConfirmModal(false)
          setSubmitLoading(false);
        }}
      >
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <div className="container">
            <div style={{ padding: 10 }}>
              {captchaBase64 && (
                <img src={captchaBase64} alt="CAPTCHA" style={{ marginBottom: 10 }} />
              )}
              <br />
              <input
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(
                  e.target.value,
                )}
                style={{ padding: 10, fontSize: 16, marginBottom: 10 }}
              />
              <br />
              <button
                className="btn btn-primary"
                disabled={submitLoading}
                onClick={handleSubmit} style={{ padding: 10, fontSize: 16 }}>
                {submitLoading && (
                  <div className="spinner-border me-2" role="status"></div>
                )}
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ProcessPopup showLoader={showLoader}></ProcessPopup>
      {/* Generate Form Modal */}
      <FormConfirmation
        isFormConfirmation={isGenerateFormConfirmation}
        setIsFormConfirmation={setIsGenerateFormConfirmation}
        isLoading={isLoading}
        name={"Generate FORM data for " + form.toUpperCase()}
        submitForm={generateForm}
      ></FormConfirmation>
      {/* Export Form Modal */}
      <FormConfirmation
        isFormConfirmation={isExportFormConfirmation}
        setIsFormConfirmation={setIsExportFormConfirmation}
        isLoading={isLoading}
        name={"Export Data for Excel" + form.toUpperCase()}
        submitForm={exportFormData}
      ></FormConfirmation>
      {/* Download Final Form Modal */}
      <FormConfirmation
        isFormConfirmation={isDownloadFormConfirmation}
        setIsFormConfirmation={setIsDownloadFormConfirmation}
        isLoading={isLoading}
        name={"Download Final Report for " + form.toUpperCase()}
        submitForm={downloadFile}
      ></FormConfirmation>
      <ValidationConfirmation
        isFormValidationConfirmation={isFormValidationConfirmation}
        setIsFormValidationConfirmation={setIsFormValidationConfirmation}
        submitForm={handleFileChange}
      ></ValidationConfirmation>
      {
        showModal && <ImportTdsTXTPopup selectedTxtFile={selectedTxtFile} setSelectedTxtFile={setSelectedTxtFile}
          isTxtUploading={isTxtUploading}
          submitTxtFile={submitTxtFile}
          financialYear={financialYear}
          quarter={quarter}
          show={showModal}
          form={CommonService.getCategory(parseInt(searchParams.get("categoryId")))}
          setShowModal={setShowModal}
        ></ImportTdsTXTPopup>
      }
    </>
  );
}
