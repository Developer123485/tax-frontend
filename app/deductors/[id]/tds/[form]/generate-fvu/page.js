"use client";
import React, { useState, useEffect, use } from "react";
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

export default function GenerateFVU({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const form = resolvedParams?.form;
  const pathname = usePathname();
  const [isError, setIsError] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
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
  const [returnErrors, setReturnErrors] = useState("");
  const [interestAndfines, setInterestAndfines] = useState(null);
  const [deductorInfo, setDeductorInfo] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [tokenNo, setTokenNo] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [outputPath, setOutputPath] = useState('');
  const searchParams = useSearchParams(null);
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
          setIsResponsibleChange(res.isChangeResponsibleAddress == "Y" ? res.isChangeResponsibleAddress : "N");
          setIsDeductorChange(res.isChangeDeductorAddress == "Y" ? res.isChangeDeductorAddress : "N");
          setIsTdsReturn(res.isChangeTdsReturn == "Y" ? res.isChangeTdsReturn : "N");
          setTokenNo(res.tokenNo);
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
      .catch((e) => {
        setShowLoader(false);
      })
      .finally((f) => {
        setShowLoader(false);
      });
  }

  useEffect(() => {
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
      })
      .catch((e) => {
        setShowLoader(false);
      })
      .finally((f) => {
        setShowLoader(false);
      });
  }

  async function updateDeductorFuv() {
    const model = {
      isChangeDeductorAddress: isDeductorChange,
      isChangeResponsibleAddress: isResponsibleChange,
      isChangeTdsReturn: isTdsReturn,
      tokenNo: tokenNo,
    }
    await DeductorsService.updateDeductorFvu(model, deductorId);
  }

  const fileSelectHandler = (event) => {
    setSelectedData(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  function generateFuv(e) {
    let isValidation = false;
    if (folderInputPath) {
      setTokenError("");
      if (isTdsReturn == "Y" && !tokenNo) {
        setTokenError("token number is required");
        isValidation = true;
      }
      if (isTdsReturn == "Y" && tokenNo && tokenNo.length != 15) {
        setTokenError("token number should be 15 digit");
        isValidation = true;
      }
      if (isError) {
        toast.error("Fix Validation Errors");
        isValidation = true;
      }
      if (!isValidation) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("csiFile", selectedData);
        formData.append("financialYear", searchParams.get("financial_year"));
        formData.append("quarter", searchParams.get("quarter"));
        formData.append("deductorId", deductorId);
        formData.append("categoryId", parseInt(searchParams.get("categoryId")));
        formData.append("folderInputPath", folderInputPath);
        const startYear = parseInt(searchParams.get("financial_year").split("-")[0]);
        const endYear = startYear + 1;
        formData.append("assesmentYear", `${endYear}` + "-" + "" + `${endYear + 1}`.toString().slice(-2));
        FuvValidateReturnService.generateFVU(formData)
          .then((res) => {
            if (res) {
              setShowFvuFile(false);
            }
          }).catch(e => {
            toast.error(e?.message);
          })
          .finally((f) => {
            setShowFvuFile(false);
          });
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>;
      <section className="py-5 py-md-4 bg-light-gray">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-9">
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
                      Validating your return. Please wait until your return is
                      validated. Do not refresh or press the back button.
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
                      <h6 className="fw-bold mb-0">Late Filling</h6>
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
                          checked={isDeductorChange == "Y"}
                          onChange={(e) => {
                            setIsDeductorChange("Y")
                            setIsDirty(!isDirty);
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
                            setIsDirty(!isDirty);
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
                            setIsDirty(!isDirty);
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
                            setIsDirty(!isDirty);
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
                            setIsDirty(!isDirty);
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
                            setIsDirty(!isDirty);
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
                      Provide the 15-digit token number (Provisional Receipt
                      Number) of the last return.
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
                          setIsDirty(!isDirty);
                        }
                      }}
                    />
                  </div>
                  <span className="text-danger"> {tokenError}</span>
                </div>
                <div className="row px-2 py-3 bg-light-blue rounded-4 align-items-center">
                  <div className="col-md-7">
                    <p className="mb-0">
                      Please upload a unzipped .csl file generated from OLTAS.
                    </p>
                    <p className="mt-2 mb-0">
                      <a className="text-decoration-underline" href="">
                        How to download .csl file
                      </a>
                    </p>
                  </div>
                  <div className="col-md-5 d-flex justify-content-end">
                    <div className="d-flex">
                      {/* <div className="bg-white px-3 py-2 border border-1 rounded-3 d-flex align-items-center">
                        <span></span>
                        <Image
                          className="ms-3"
                          src="/images/icons/close_icon.svg"
                          alt="close_icon"
                          width={24}
                          height={24}
                        />
                      </div> */}
                      <input type="file" accept=".csi" onChange={fileSelectHandler} />
                      {/* <button
                        type="file"
                        className="btn btn-primary px-3 py-2 ms-3"
                      >
                        Browse .csl file
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <div className="row">
                  <div className="col-md-12">
                    <button type="button" className="btn btn-primary" onClick={(e) => setShowFvuFile(true)}>
                      Generate FVU
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-4 px-4 py-4 my-3">
                <div className="row">
                  <div className="col-md-6 border-end">
                    <h6 className="fw-bold">Non Salary</h6>
                    <p>
                      You can Download the FVU file and dile TDS return manually
                    </p>
                    <button type="button" className="btn btn-primary px-3 py-2">
                      Download FVU file
                    </button>
                  </div>
                  <div className="col-md-6 ps-md-4">
                    <button
                      type="button"
                      className="btn btn-primary px-3 py-2 mb-3"
                    >
                      Direct e-filling
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
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div>
                <label>Folder Path:</label>
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
    </>
  );
}
