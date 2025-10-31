"use client";
import React, { useState, useEffect, use, useRef } from "react";
import Image from "next/image";
import HeaderList from "../../../../../components/header/header-list";
import BreadcrumbList from "../../../../../components/breadcrumbs/page";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FuvValidateReturnService } from "@/app/services/fuvValidateReturn.service";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormsService } from "@/app/services/forms.service";
import { DeductorsService } from "@/app/services/deductors.service";
import { Modal } from "react-bootstrap";
import JSZip from 'jszip';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { apiUrl } from "@/app/config";
import axios from "axios";
import ProcessPopup from "@/app/components/modals/processing";

export default function GenerateFVU({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const form = resolvedParams?.form;
  const pathname = usePathname();
  const [isError, setIsError] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isDirectLoading, setIsDirectLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [isCSIDownloadLoading, setIsCSIDownloadLoading] = useState(false);
  const [showFvuFile, setShowFvuFile] = useState(false);
  const [isDeductorChange, setIsDeductorChange] = useState("N");
  const [isResponsibleChange, setIsResponsibleChange] = useState("N");
  const [isTdsReturn, setIsTdsReturn] = useState("N");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [challanId, setChallanId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  const [folderInputPath, setFolderInputPath] = useState("");
  const [returnErrors, setReturnErrors] = useState(null);
  const [interestAndfines, setInterestAndfines] = useState(null);
  const [deductorInfo, setDeductorInfo] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [tokenNo, setTokenNo] = useState("");
  const [isDirty, setIsDirty] = useState(null);
  const [isFileSaved, setIsFileSaved] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [outputPath, setOutputPath] = useState('');
  const searchParams = useSearchParams(null);
  const [csiInfoError, setCsiInfoError] = useState({
    fromError: "",
    toError: "",
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
      isActive: false,
      href: `/deductors/${deductorId}/tds/${form}${typeof window !== "undefined" ? window.location.search : ""
        }`,
    },
    {
      name: "Generate FVU",
      isActive: true,
    },
  ]);

  useEffect(() => {
    if (
      searchParams.get("financial_year") &&
      searchParams.get("quarter") &&
      searchParams.get("categoryId")
    ) {
      setShowLoader(true);
      getInterestAndfines();
      getDeductor(deductorId);
      validateReturn();
    } else {
      router.push("/deductors");
    }
  }, [currentPage, pageSize]);


  const handleFolderChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const path = files[0].webkitRelativePath;
      const folderName = path.split('/')[0]; // gets the root folder name
      setOutputPath(folderName);
    }
  };

  function getDeductor(deductorId) {
    DeductorsService.getDeductor(deductorId).then(
      (res) => {
        if (res) {
          setIsResponsibleChange(res.isChangeResponsibleAddress == "Y" ? "Y" : "N");
          setIsDeductorChange(res.isChangeDeductorAddress == "Y" ? "Y" : "N");
          setIsTdsReturn(res.isChangeTdsReturn == "Y" ? "Y" : "N");
          setTokenNo(res.tokenNo);
          setDeductorInfo(res);
        }
      })
  }

  function validateReturn() {
    const model = {
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
    };
    FuvValidateReturnService.validateReturn(model)
      .then((res) => {
        if (res == true) {
          setIsError(false);
        } else {
          setIsError(true);
          setReturnErrors(res);
        }
      })
      .catch(e => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
        }
        else {
          toast.error(e?.message);
        }
        setShowLoader(false);
      })
      .catch((e) => {
      })
      .finally((f) => {
        setShowLoader(false);
      });
  }

  useEffect(() => {
    if (isDirty == true)
      updateDeductorFuv();
  }, [isDirty])

  function downloadErros() {
    const blob = new Blob([returnErrors], { type: "text/plain" });
    saveAs(blob, "errors.txt");
  }

  function getInterestAndfines() {
    const model = {
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
    };
    FuvValidateReturnService.getInterestAndfines(model)
      .then((res) => {
        if (res) {
          setInterestAndfines(res);
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
      });
  }

  function validate() {
    let toError = "";
    let fromError = "";
    if (!fromDate) {
      fromError = "From Date is required";
    }
    if (!toDate) {
      toError = "To Date is required";
    }
    if (toError || fromError) {
      setCsiInfoError((prevState) => ({
        ...prevState,
        fromError,
        toError
      }));
      return false;
    }
    setCsiInfoError((prevState) => ({
      ...prevState,
      fromError,
      toError
    }));
    return true;
  }

  function handleDownload(e) {
    e.preventDefault();
    if (deductorInfo.itdLogin && deductorInfo.itdPassword) {
      if (validate()) {
        setIsCSIDownloadLoading(true);
        const token = sessionStorage.getItem("token");
        const model = {
          password: deductorInfo.itdPassword,
          tan: deductorInfo.itdLogin,
          fromDate: fromDate,
          toDate: toDate
        }
        axios.post(apiUrl + 'tracesActivities/download-csi', model,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then(async (res) => {
          if (res) {
            const { fileName, fileContentBase64, contentType } = res.data;
            // Convert base64 to binary data
            const byteCharacters = atob(fileContentBase64);
            const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);

            // Create a Blob
            const blob = new Blob([byteArray], { type: contentType });

            // Create download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsCSIDownloadLoading(false);
            toast.success("CSI file downloaded successfully.");
          }
        }).catch(e => {
          if (e?.response?.data?.errorMessage) {
            toast.error(e?.response?.data?.errorMessage);
          }
          else {
            toast.error(e?.message);
          }
        }).finally(f => {
          setIsCSIDownloadLoading(false);
          setFromDate(null);
          setCsiInfoError((prevState) => ({
            ...prevState,
            fromError: "",
            toError: ""
          }));
          setToDate(null);
        })
      }
    } else {
      toast.error("ITD Tan and password do not exist for the deductor");
    }
  }

  async function updateDeductorFuv() {
    const model = {
      isChangeDeductorAddress: isDeductorChange,
      isChangeResponsibleAddress: isResponsibleChange,
      isChangeTdsReturn: isTdsReturn,
      tokenNo: tokenNo,
    }
    await DeductorsService.updateDeductorFvu(model, deductorId);
    setIsDirty(null);
  }

  const fileSelectHandler = (event) => {
    setSelectedData(event.target.files[0]);
  };

  async function generateFuv(e) {
    e.preventDefault();
    setIsFileSaved(false);
    // Step 1: Ask user to pick folder RIGHT NOW inside user gesture
    setTokenError("");

    if (isTdsReturn === "Y" && !tokenNo) {
      setTokenError("Token number is required");
      return;
    } else if (isTdsReturn === "Y" && tokenNo.length !== 15) {
      setTokenError("Token number should be 15 digits");
      return;
    }

    if (!selectedData) {
      toast.error("Please select CSI file");
      return;
    }
    setLoading(true);
    try {
      // Step 3: Prepare and call API
      const formData = new FormData();
      formData.append("csiFile", selectedData);
      formData.append("financialYear", searchParams.get("financial_year"));
      formData.append("quarter", searchParams.get("quarter"));
      formData.append("deductorId", deductorId);
      formData.append("categoryId", parseInt(searchParams.get("categoryId")));
      formData.append("folderInputPath", folderInputPath);

      const startYear = parseInt(searchParams.get("financial_year").split("-")[0]);
      const endYear = startYear + 1;
      formData.append("assesmentYear", `${endYear}-${(endYear + 1).toString().slice(-2)}`);

      const res = await FuvValidateReturnService.generateFVU(formData);
      if (!res) return;


      setLoading(false);
      toast.success("FVU generated successfully");

    } catch (e) {
      if (e?.response?.data?.errorMessage) {
        toast.error(e?.response?.data?.errorMessage);
      }
      else {
        toast.error(e?.message);
      }
    } finally {
      setShowFvuFile(false);
      setSelectedData(null);
      setLoading(false);
      fileInputRef.current.value = '';
    }
  }

  // async function downloadFvuFiles(e) {
  //   e.preventDefault();
  //   try {
  //     let dirHandle;
  //     try {
  //       dirHandle = await window.showDirectoryPicker();
  //     } catch (err) {
  //       toast.error("Folder access denied.");
  //       return;
  //     }
  //     const response = await fetch("https://py-api.taxvahan.site/get-fvu-all-files");
  //     if (!response.ok) {
  //       toast.error("Failed to download file");
  //       return;
  //     }
  //     setIsDownloadLoading(true);
  //     const zipBlob = await response.blob();
  //     const zip = await JSZip.loadAsync(zipBlob);

  //     // Step 4: Load all files into memory BEFORE calling getFileHandle
  //     const filesToSave = [];

  //     for (const [relativePath, file] of Object.entries(zip.files)) {
  //       if (file.dir) continue;

  //       const blob = await file.async("blob");
  //       filesToSave.push({ relativePath, blob });
  //     }

  //     // Step 5: Save files — this is close enough to user gesture to be allowed
  //     for (const { relativePath, blob } of filesToSave) {
  //       const pathParts = relativePath.split("/");

  //       let currentDir = dirHandle;
  //       for (let i = 0; i < pathParts.length - 1; i++) {
  //         currentDir = await currentDir.getDirectoryHandle(pathParts[i], { create: true });
  //       }

  //       const fileName = pathParts[pathParts.length - 1];
  //       const fileHandle = await currentDir.getFileHandle(fileName, { create: true });
  //       const writable = await fileHandle.createWritable();
  //       await writable.write(blob);
  //       await writable.close();
  //       setIsFileSaved(true);
  //       await fetch("https://py-api.taxvahan.site/delete", {
  //         method: "DELETE"
  //       });
  //     }
  //   } catch (e) {
  //     if (e?.response?.data?.errorMessage) {
  //       toast.error(e?.response?.data?.errorMessage);
  //     }
  //     else {
  //       toast.error(e?.message);
  //     }
  //   } finally {
  //     setIsDownloadLoading(false);
  //   }
  // }
  async function directEFiling(e) {
    const response = await fetch(`https://py-api.taxvahan.site/getfiles?param1=${deductorInfo.deductorName}&param2=${searchParams.get("financial_year")}&param3=${searchParams.get("quarter")}&param4=${form.replace("form-", "")}`);
    if (!response.ok) {
      toast.error("Failed to download ZIP");
      return;
    }
    const contentType = response.headers.get("Content-Type");
    // If response is JSON instead of ZIP, it's likely an error message
    if (contentType && contentType.includes("application/json")) {
      toast.error("No file is available for download. Please click on 'Generate FVU'.");
      return;
    }
    const model = {
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorName: deductorInfo.deductorName,
      categoryId: parseInt(searchParams.get("categoryId")),
      password: deductorInfo.tracesPassword,
      tan: deductorInfo.deductorTan,
    };
    if (deductorInfo.deductorTan && deductorInfo.tracesPassword) {
      setIsDirectLoading(true);
      FuvValidateReturnService.directEFiling(model)
        .then((res) => {

        }).catch(e => {
          if (e?.response?.data?.errorMessage) {
            toast.error(e?.response?.data?.errorMessage);
          }
          else {
            toast.error(e?.message);
          }
          setIsDirectLoading(false);
        })
        .finally((f) => {
          setIsDirectLoading(false);
        });
    } else {
      toast.error("TRACES Tan and password do not exist for the deductor");
    }
  }

  async function downloadFvuFiles(e) {
    e.preventDefault();
    setIsDownloadLoading(true);
    try {
      const response = await fetch(`https://py-api.taxvahan.site/getfiles?param1=${deductorInfo.deductorName}&param2=${searchParams.get("financial_year")}&param3=${searchParams.get("quarter")}&param4=${form.replace("form-", "")}`);
      if (!response.ok) {
        toast.error("Failed to download ZIP");
        return;
      }
      const contentType = response.headers.get("Content-Type");
      // If response is JSON instead of ZIP, it's likely an error message
      if (contentType && contentType.includes("application/json")) {
        toast.error("No file is available for download. Please click on 'Generate FVU'.");
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const fileName = deductorInfo.deductorName + "_" + searchParams.get("financial_year") + "_" + searchParams.get("quarter") + "_" + form.replace("form-", "") + ".zip";
      saveAs(url, fileName);
      // await fetch("https://py-api.taxvahan.site/delete", { method: "DELETE" });
      setIsFileSaved(true);
    } catch (error) {
      toast.error(error.message || "Download failed.");
    } finally {
      setIsDownloadLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>;
      <section className="py-5 py-md-4 bg-light-gray">
        <div className="container">
          <div className="row ">
            <div className="col-md-8 align-items-center">
              <div className="mb-4">
                <h3 className="fw-bold">Generate FVU</h3>
              </div>
              <div className="bg-white rounded-4">
                <div className="row">
                  <div className="col-md-9 py-4 px-4">
                    <h6 className="fw-bold">Validate Errors</h6>
                    <p>Has to be filled generate FVU.</p>
                    {showLoader && <Image
                      className=""
                      src="/images/icons/error_loading.gif"
                      alt="error_loading"
                      width={48}
                      height={48}
                    />
                    }
                    <p className="text-danger">
                      The system is validating the data. Once validation is complete, it will display either
                      'No errors found' or 'Errors found – please download the error report.
                    </p>
                    {!isError && !showLoader && <p className="text-success fw-bold">
                      No errors. Everything looks perfectly alright.
                    </p>
                    }
                    {isError && !showLoader &&
                      <a href="Javascript:void(0)" className="text-primary fw-bold" onClick={downloadErros}>Download Return Errors</a>
                    }
                  </div>
                  <div className="col-md-3 px-4">
                    <Image
                      className="w-100 img-fluid"
                      src="/images/no_errors.svg"
                      alt="no_errors"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-4 px-4 py-4 my-3">
                <div class="row mb-2">
                  <div class="col-md-12">
                    <h6 class="fw-bold">PAN Status</h6>
                  </div>
                </div>

                <div class="row g-3 rounded-4 align-items-center text-center">
                  <div class="col"
                    onClick={(e) => {
                      router.push(
                        pathname +
                        "/pan-status" +
                        window.location.search + "&type=All"
                      );
                    }}
                  >
                    <div class="border border-1 rounded-3 p-3 h-100">
                      <h6 class="fw-bold mb-1">{interestAndfines?.allPanStatus || "0"}</h6>
                      <p class="mb-0 fs-12">All</p>
                    </div>
                  </div>

                  <div class="col"
                    onClick={(e) => {
                      router.push(
                        pathname +
                        "/pan-status" +
                        window.location.search + "&type=Valid and Operative"
                      );
                    }}
                  >
                    <div class="border border-1 rounded-3 p-3 h-100">
                      <h6 class="fw-bold mb-1">{interestAndfines?.validStatus || "0"}</h6>
                      <p class="mb-0 fs-12">Active/Valid</p>
                    </div>
                  </div>

                  <div class="col"
                    onClick={() => {
                      const queryString = window.location.search;
                      const separator = queryString ? "&" : "?";
                      router.push(`${pathname}/pan-status${queryString}${separator}type=Invalid`);
                    }}
                  >
                    <div class="border border-1 rounded-3 p-3 h-100">
                      <h6 class="fw-bold mb-1">{interestAndfines?.notValidStatus || "0"}</h6>
                      <p class="mb-0 fs-12">Invalid</p>
                    </div>
                  </div>
                  <div class="col"
                    onClick={(e) => {
                      router.push(
                        pathname +
                        "/pan-status" +
                        window.location.search + "&type=InOperative"
                      );
                    }}
                  >
                    <div class="border border-1 rounded-3 p-3 h-100">
                      <h6 class="fw-bold mb-1">{interestAndfines?.inOperativeStatus || "0"}</h6>
                      <p class="mb-0 fs-12">InOperative</p>
                    </div>
                  </div>

                  <div class="col"
                    onClick={(e) => {
                      router.push(
                        pathname +
                        "/pan-status" +
                        window.location.search
                      );
                    }}
                  >
                    <div class="border border-1 rounded-3 p-3 h-100">
                      <h6 class="fw-bold mb-1">{interestAndfines?.notVerifyStatus || "0"}</h6>
                      <p class="mb-0 fs-12">Not Verified</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-4 px-4 py-4 my-3">
                <div className="row mb-2">
                  <div className="col-md-12">
                    <h6 className="fw-bold">Interest and Fines</h6>
                  </div>
                </div>
                <div className="row px-2 py-3 bg-light-blue rounded-4 align-items-center">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <Image
                        className="me-3"
                        src="/images/icons/green_tick.svg"
                        alt="green_tick"
                        width={32}
                        height={32}
                      />
                      <h6 className="fw-bold mb-0">Late Deductions</h6>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column">
                        <span>Calculate Values</span>
                        <span className="fw-bold">{interestAndfines?.interestPayableTotalAmount.toFixed(2)}</span>
                      </div>
                      <div className="d-flex flex-column">
                        <span>Your Values</span>
                        <span className="fw-bold">{interestAndfines?.interestPayableYourValue.toFixed(2)}</span>
                      </div>
                      <div className="d-flex flex-column">
                        <span>Difference</span>
                        <span className="fw-bold">{interestAndfines?.interestPayableDifference.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-end">
                    {!showLoader && <button type="button" className="btn btn-primary"
                      onClick={(e) => {
                        router.push(
                          pathname +
                          "/interest-calculates" +
                          window.location.search
                        );
                      }}>
                      View
                    </button>
                    }
                  </div>
                </div>
                <div className="row px-2 py-3 my-3 bg-light-blue rounded-4 align-items-center">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <Image
                        className="me-3"
                        src="/images/icons/green_tick.svg"
                        alt="green_tick"
                        width={32}
                        height={32}
                      />
                      <h6 className="fw-bold mb-0">Late Filing</h6>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column">
                        <span>Calculate Values</span>
                        <span className="fw-bold">{interestAndfines?.lateFeeTotalAmount.toFixed(2)}</span>
                      </div>
                      <div className="d-flex flex-column">
                        <span>Your Values</span>
                        <span className="fw-bold">{interestAndfines?.lateFeeYourValue.toFixed(2)}</span>
                      </div>
                      <div className="d-flex flex-column">
                        <span>Difference</span>
                        <span className="fw-bold">{interestAndfines?.lateFeeDifference.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-end">
                    {!showLoader && <button type="button" className="btn btn-primary" onClick={(e) => {
                      router.push(
                        pathname +
                        "/late-fee-payable" +
                        window.location.search
                      );
                    }}>
                      View
                    </button>}
                  </div>
                </div>
                <div className="row px-2 py-3 bg-light-blue rounded-4 align-items-center">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <Image
                        className="me-3"
                        src="/images/icons/green_tick.svg"
                        alt="green_tick"
                        width={32}
                        height={32}
                      />
                      <h6 className="fw-bold mb-0">Short Deductions</h6>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column">
                        <span>Calculate Values</span>
                        <span className="fw-bold">{interestAndfines?.shortDeductionTotalAmount.toFixed(2)}</span>
                      </div>
                      <div className="d-flex flex-column">
                        <span>Your Values</span>
                        <span className="fw-bold">{interestAndfines?.shortDeductionYourValue.toFixed(2)}</span>
                      </div>
                      <div className="d-flex flex-column">
                        <span>Difference</span>
                        <span className="fw-bold">{interestAndfines?.shortDeductionDifference.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-end">
                    {!showLoader && <button type="button" className="btn btn-primary" onClick={(e) => {
                      router.push(
                        pathname +
                        "/short-deduction" +
                        window.location.search
                      );
                    }}>
                      View
                    </button>}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-4 px-4 py-4 my-3">
                <div className="row mb-2">
                  <div className="col-md-12">
                    <h6 className="fw-bold">
                      Provide the necessary information to generate FVU file
                    </h6>
                  </div>
                </div>
                <div className="row px-2 py-3 bg-light-blue rounded-4 align-items-center">
                  <div className="col-md-9">
                    <p className="mb-0">
                      Has the address of Deductor changed since last return?
                    </p>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <div className="bg-white border border-1 px-3 py-2 rounded-4">
                      <div className="form-check form-check-inline mb-md-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="wpinputYes1"
                          id="inputYes"
                          value={"Y"}
                          maxLength={15}
                          checked={isDeductorChange == "Y"}
                          onChange={(e) => {
                            setIsDeductorChange("Y")
                            setIsDirty(true);
                          }}
                        />
                        <label className="form-check-label" for="wpinputYes">
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline mb-md-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="wpinputNo2"
                          id="inputNo"
                          value={"N"}
                          checked={isDeductorChange == "N"}
                          onChange={(e) => {
                            setIsDeductorChange("N")
                            setIsDirty(true);
                          }}
                        />
                        <label className="form-check-label" for="wpinputNos">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row px-2 py-3 my-3 bg-light-blue rounded-4 align-items-center">
                  <div className="col-md-9">
                    <p className="mb-0">
                      Has the address of Responsible Person changed since last
                      return?
                    </p>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <div className="bg-white border border-1 px-3 py-2 rounded-4">
                      <div className="form-check form-check-inline mb-md-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="wpinputYes3"
                          id="inputYes"
                          value={"Y"}
                          checked={isResponsibleChange == "Y"}
                          onChange={(e) => {
                            setIsResponsibleChange("Y")
                            setIsDirty(true);
                          }}
                        />
                        <label className="form-check-label" for="wpinputYes">
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline mb-md-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="wpinputNo4"
                          id="inputNo"
                          value={"N"}
                          checked={isResponsibleChange == "N"}
                          onChange={(e) => {
                            setIsResponsibleChange("N")
                            setIsDirty(true);
                          }}
                        />
                        <label className="form-check-label" for="wpinputNos">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row px-2 py-3 mb-3 bg-light-blue rounded-4 align-items-center">
                  <div className="col-md-9">
                    <p className="mb-0">
                      Was a Regular TDS Return filed last quarter?
                    </p>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <div className="bg-white border border-1 px-3 py-2 rounded-4">
                      <div className="form-check form-check-inline mb-md-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="wpinputYes"
                          id="inputYes"
                          value={"Y"}
                          checked={isTdsReturn == "Y"}
                          onChange={(e) => {
                            setIsTdsReturn("Y")
                            setIsDirty(true);
                          }}
                        />
                        <label className="form-check-label" for="wpinputYes">
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline mb-md-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="wpinputNo"
                          id="inputNo"
                          value={"N"}
                          checked={isTdsReturn == "N"}
                          onChange={(e) => {
                            setIsTdsReturn("N")
                            setIsDirty(true);
                          }}
                        />
                        <label className="form-check-label" for="wpinputNos">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row px-2 py-3 mb-3 bg-light-blue rounded-4 align-items-center">
                  <div className="col-md-9">
                    <p className="mb-0">
                      Please provide the 15-digit Token Number (Provisional Receipt Number)
                      of the last TDS return filed
                    </p>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <input
                      type="text"
                      placeholder="15 Digit PRN"
                      className="form-control"
                      maxLength={15}
                      value={tokenNo}
                      disabled={isTdsReturn == "N"}
                      onChange={(e) => {
                        setTokenNo(e.target.value);
                        if (e.target.value && e.target.value.length == 15) {
                          setIsDirty(true);
                        }
                        if (tokenNo && !e.target.value) {
                          setIsDirty(true);
                        }
                      }}
                    />
                  </div>
                  <span className="text-danger"> {tokenError}</span>
                </div>
                <div className="row px-2 py-3 bg-light-blue rounded-4 align-items-center">
                  <div className="col-md-7">
                    <p className="mb-0">
                      Please upload an unzipped <strong>.csi</strong> file generated from OLTAS.
                    </p>
                    <p className="mt-2 mb-0">
                      <a
                        className="text-decoration-underline"
                        href="Javascript:void(0)"     // put actual URL
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        How to download .csi file
                      </a>
                    </p>
                  </div>
                  <div className="col-md-5 d-flex justify-content-end">
                    <div className="d-flex">
                      <input
                        type="file"
                        accept=".csi"
                        id="cslFileUpload"
                        ref={fileInputRef}
                        name="cslFileUpload"
                        onChange={fileSelectHandler}
                      />
                    </div>
                  </div>
                </div>

              </div>
              <div className="my-4">
                <div className="row">
                  <div className="col-md-12">
                    <button type="button" className="btn btn-primary" disabled={returnErrors || loading} onClick={(e) => generateFuv(e)}>
                      {loading && (
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Generate FVU
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-4 px-4 py-4 my-3">
                <div className="row">
                  <div className="col-md-6 border-end">
                    <h6 className="fw-bold">{form == "form-24Q" && searchParams.get("quarter") == "Q4" ? "Salary" : "Non Salary"}</h6>
                    <p>
                      You can Download the FVU file and file TDS return manually
                    </p>
                    <button type="button" disabled={isDownloadLoading} onClick={(e) => downloadFvuFiles(e)} className="btn btn-primary px-3 py-2">
                      {isDownloadLoading && (
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Download FVU file
                    </button>
                  </div>
                  <div className="col-md-6 ps-md-4">
                    <button
                      type="button"
                      className="btn btn-primary px-3 py-2 mb-3"
                      disabled={isDirectLoading} onClick={(e) => directEFiling(e)}
                    >
                      {isDirectLoading && (
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Direct e-filing
                    </button>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                        {" "}
                        <Image
                          className="me-2"
                          src="/images/icons/disc_orange.svg"
                          alt="disc_orange"
                          width={8}
                          height={8}
                        />{" "}
                        Hassel free process
                      </li>
                      <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                        {" "}
                        <Image
                          className="me-2"
                          src="/images/icons/disc_orange.svg"
                          alt="disc_orange"
                          width={8}
                          height={8}
                        />{" "}
                        No need to digital signature
                      </li>
                      <li className="list-group-item border-0 ps-0 d-flex align-items-center">
                        {" "}
                        <Image
                          className="me-2"
                          src="/images/icons/disc_orange.svg"
                          alt="disc_orange"
                          width={8}
                          height={8}
                        />{" "}
                        No need to visit TIN facilitation center
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4" style={{ marginTop: "56px" }}>
              <div className="date-card bg-white rounded-4 sticky-download-box">
                <h3>Download CSI</h3>
                {/* <p>Please upload .csi file generated from Income Tax Portal.</p> */}
                <div className="date-picker-group">
                  <label>From Date:</label>
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    dateFormat="dd-MMM-yyyy"
                    placeholderText="Select From Date"
                    className="datepicker-input"
                  />
                  {csiInfoError.fromError && (
                    <span className="text-danger">
                      {csiInfoError.fromError}
                    </span>
                  )}
                </div>

                <div className="date-picker-group">
                  <label>To Date:</label>
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    dateFormat="dd-MMM-yyyy"
                    placeholderText="Select To Date"
                    className="datepicker-input"
                  />
                  {csiInfoError.toError && (
                    <span className="text-danger">
                      {csiInfoError.toError}
                    </span>
                  )}
                </div>
                <button type="button" className="btn btn-primary" disabled={isCSIDownloadLoading} onClick={(e) => handleDownload(e)}>
                  {isCSIDownloadLoading && (
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  Download
                </button>
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
        show={showFvuFile}
        onHide={() => setShowFvuFile(false)}
      >
        <Modal.Header className="border-0" closeButton>

        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div>
                <label>Paste the full path of the local folder where you want to save the files:</label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Paste Here"
                    value={folderInputPath}
                    onChange={(e) => setFolderInputPath(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 text-center">
                <button
                  type="button"
                  className="btn btn btn-primary px-5"
                  disabled={!folderInputPath}
                  onClick={(e) => generateFuv(e)}
                >
                  Run Validation
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ProcessPopup showLoader={showLoader}></ProcessPopup>
    </>
  );
}
