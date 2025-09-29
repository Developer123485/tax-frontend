"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ChallanService } from "@/app/services/challan.service";
import { usePathname } from "next/navigation";
import DataTable from "react-data-table-component";
import CustomCheckbox from "@/app/components/deductee-entry/custom-checkbox";
import ProcessPopup from "@/app/components/modals/processing";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import ShortDeductions from "@/app/components/potential-notices/short-deduction/page";
import LateDeductions from "@/app/components/potential-notices/late-deduction/page";
import { FormsService } from "@/app/services/forms.service";
import TaxDepositList from "@/app/components/potential-notices/tax-deposit/page";
import { saveAs } from "file-saver";
import InterestList from "@/app/components/potential-notices/interest-calculate/page";
import LateFeePayable from "@/app/components/potential-notices/late-fee-payable/page";

export default function PotentialNotices({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const form = resolvedParams?.form;
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [sdCurrentPage, setSdCurrentPage] = useState(1);
  const [tdCurrentPage, setTdCurrentPage] = useState(1);
  const [icCurrentPage, setIcCurrentPage] = useState(1);
  const [lpCurrentPage, setLpCurrentPage] = useState(1);
  const [sdPageSize, setSdPageSize] = useState(100);
  const [tdPageSize, setTdPageSize] = useState(100);
  const [lcPageSize, setLcPageSize] = useState(100);
  const [lpPageSize, setLpPageSize] = useState(100);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [listType, setListType] = useState("late");
  const [selectedData, setSelectedData] = useState(null);
  const [lateDeductions, setLateDeductions] = useState(null);
  const [shortDeductions, setShortDeductions] = useState(null);
  const [taxDeposit, setTaxDeposit] = useState(null);
  const [lateFeePayable, setLateFeePayable] = useState(null);
  const [interestCalculate, setInterestCalculate] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [confirmTitle, setConfirmTitle] = useState("");
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
      name: "Potential Notices",
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
      setLateDeductions(null);
      fetchLateDeductions("", false);
    } else {
      router.push("/deductors");
    }
  }, [currentPage, pageSize]);

  // useEffect(() => {
  //   if (
  //     searchParams.get("financial_year") &&
  //     searchParams.get("quarter") &&
  //     searchParams.get("categoryId")
  //   ) {
  //     setShortDeductions(null);
  //     fetchShortDeductions();
  //   } else {
  //     router.push("/deductors");
  //   }
  // }, [sdCurrentPage, sdPageSize]);

  function fetchLateDeductions(searchValue, value) {
    const model = {
      pageSize: pageSize,
      pageNumber: currentPage,
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
      search: searchValue,
    };
    FormsService.fetchLateDeductions(model, value)
      .then((res) => {
        if (value) {
          let fileName = "";
          if (
            parseInt(searchParams.get("categoryId")) == 2 ||
            parseInt(searchParams.get("categoryId")) == 3 ||
            parseInt(searchParams.get("categoryId")) == 1
          ) {
            fileName = "Final-Report-Late-Deduction-" + form + ".xlsx";
          }
          if (parseInt(searchParams.get("categoryId")) == 4) {
            fileName = "Final-Report-Late-Collection-" + form + ".xlsx";
          }
          let url = window.URL.createObjectURL(new Blob([res]));
          toast.success("Export Data Successfully!");
          saveAs(url, fileName);
        } else {
          if (res) {
            setLateDeductions(res);
          }
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
      .finally((f) => {
        setShowLoader(false);
      });
  }

  function fetchShortDeductions(pageNum, searchValue, value) {
    setShowLoader(true);
    const model = {
      pageSize: sdPageSize,
      pageNumber: pageNum,
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
      search: searchValue,
    };
    FormsService.fetchShortDeductions(model, value)
      .then((res) => {
        if (value) {
          let fileName = "";
          if (
            parseInt(searchParams.get("categoryId")) == 2 ||
            parseInt(searchParams.get("categoryId")) == 3
          ) {
            fileName =
              "Final-Report-showing-Short-Deduction-Export-" + form + ".xlsx";
          }
          if (parseInt(searchParams.get("categoryId")) == 4) {
            fileName =
              "Final-Report-showing-Short-Collection-Export-" + form + ".xlsx";
          }
          let url = window.URL.createObjectURL(new Blob([res]));
          toast.success("Export Data Successfully!");
          saveAs(url, fileName);
        } else {
          if (res) {
            setShortDeductions(res);
          }
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
      .finally((f) => {
        setShowLoader(false);
      });
  }

  function fetchTaxDeposits(pageNum, searchValue, value) {
    setShowLoader(true);
    const model = {
      pageSize: tdPageSize,
      pageNumber: pageNum,
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
      search: searchValue,
    };
    FormsService.fetchTaxDeposits(model, value)
      .then((res) => {
        if (value) {
          let fileName = "";
          if (
            parseInt(searchParams.get("categoryId")) == 2 ||
            parseInt(searchParams.get("categoryId")) == 3
          ) {
            fileName = "Final-Report-Late-Deposit-TDS-Export-" + form + ".xlsx";
          }
          if (parseInt(searchParams.get("categoryId")) == 4) {
            fileName = "Final-Report-Late-Deposit-TCS-Export-" + form + ".xlsx";
          }
          let url = window.URL.createObjectURL(new Blob([res]));
          toast.success("Export Data Successfully!");
          saveAs(url, fileName);
        } else {
          setTaxDeposit(res);
          setShowLoader(false);
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
      .finally((f) => {
        setShowLoader(false);
      });
  }

  function fetchInterestCalculate(pageNum, searchValue, value) {
    setShowLoader(true);
    const model = {
      pageSize: lcPageSize,
      pageNumber: pageNum,
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
      search: searchValue,
    };
    FormsService.fetchInterestCalculate(model, value)
      .then((res) => {
        if (value) {
          let fileName = "";
          if (
            parseInt(searchParams.get("categoryId")) == 2 ||
            parseInt(searchParams.get("categoryId")) == 3
          ) {
            fileName = "Interest-Calculation-Export-" + form + ".xlsx";
          }
          if (parseInt(searchParams.get("categoryId")) == 4) {
            fileName = "Interest-Calculation-Export-" + form + ".xlsx";
          }
          let url = window.URL.createObjectURL(new Blob([res]));
          toast.success("Export Data Successfully!");
          saveAs(url, fileName);
        } else {
          setInterestCalculate(res);
          setShowLoader(false);
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
      .finally((f) => {
        setShowLoader(false);
      });
  }

  function fetchLateFeePayable(pageNum, value) {
    setShowLoader(true);
    const model = {
      pageSize: lpPageSize,
      pageNumber: pageNum,
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
      search: "",
    };
    FormsService.fetchLateFeePayable(model, value)
      .then((res) => {
        if (value) {
          let fileName = "";
          if (
            parseInt(searchParams.get("categoryId")) == 2 ||
            parseInt(searchParams.get("categoryId")) == 3
          ) {
            fileName = "Interest-Calculation-Export-" + form + ".xlsx";
          }
          if (parseInt(searchParams.get("categoryId")) == 4) {
            fileName = "Interest-Calculation-Export-" + form + ".xlsx";
          }
          let url = window.URL.createObjectURL(new Blob([res]));
          toast.success("Export Data Successfully!");
          saveAs(url, fileName);
        } else {
          setLateFeePayable(res);
          setShowLoader(false);
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
      .finally((f) => {
        setShowLoader(false);
      });
  }

  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="py-4 pb-md-0 bg-light-gray">
        <div className="container">
          <div className="">
            <div className="col-md-12">
              <div className="pb-3">
                <div className="form-check form-check-inline fs-18">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="late"
                    id="late"
                    value="late"
                    checked={listType === "late"}
                    onChange={(e) => {
                      fetchLateDeductions("", false);
                      setShowLoader(true);
                      setListType("late", e);
                    }}
                  />
                  <label className="form-check-label fw-bold" htmlFor="late">
                    Late Deductions
                  </label>
                </div>
                <div className="form-check form-check-inline fs-18">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="short"
                    id="short"
                    value="short"
                    checked={listType === "short"}
                    onChange={(e) => {
                      fetchShortDeductions(1, "", false);
                      setShowLoader(true);
                      setListType("short", e);
                    }}
                  />
                  <label className="form-check-label fw-bold" htmlFor="short">
                    Short Deductions
                  </label>
                </div>
                <div className="form-check form-check-inline fs-18">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tax-deposit"
                    id="tax-deposit"
                    value="tax-deposit"
                    checked={listType === "tax-deposit"}
                    onChange={(e) => {
                      fetchTaxDeposits(1, "", false);
                      setShowLoader(true);
                      setListType("tax-deposit", e);
                    }}
                  />
                  <label
                    className="form-check-label fw-bold"
                    htmlFor="tax-deposit"
                  >
                    Late Deposit
                  </label>
                </div>
                <div className="form-check form-check-inline fs-18">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="interest"
                    id="interest"
                    value="interest"
                    checked={listType === "interest"}
                    onChange={(e) => {
                      fetchInterestCalculate(1, "", false);
                      setShowLoader(true);
                      setListType("interest", e);
                    }}
                  />
                  <label
                    className="form-check-label fw-bold"
                    htmlFor="interest"
                  >
                    Interest Payable
                  </label>
                </div>
                <div className="form-check form-check-inline fs-18">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="late-fee"
                    id="late-fee"
                    value="late-fee"
                    checked={listType === "late-fee"}
                    onChange={(e) => {
                      fetchLateFeePayable(1, false);
                      setShowLoader(true);
                      setListType("late-fee", e);
                    }}
                  />
                  <label
                    className="form-check-label fw-bold"
                    htmlFor="late-fee"
                  >
                    Late Fee Payable
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 pt-md-0 pb-md-5 bg-light-gray">
        <div className="container">
          <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
            <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
              <div className="col-sm-4 col-md-6">
                <h4 className="fw-bold mb-0">
                  {listType === "late" ? "Late Deductions" : ""}
                  {listType === "short" ? "Short Deductions" : ""}
                  {listType === "tax-deposit" ? "Late Deposit " : ""}
                  {listType === "interest" ? "Interest Payable" : ""}
                  {listType === "late-fee" ? "Late Fee Payable" : ""}
                </h4>
              </div>
              {listType == "late" && (
                <>
                  <div className="col-sm-4 col-md-2">
                    <div className="d-flex align-items-center">
                      <div className="input-group searchbox">
                        <button
                          className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                          type="button"
                          onClick={(e) => {
                            fetchLateDeductions("", true);
                          }}
                        >
                          Download Report
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="input-group searchbox">
                        <input
                          type="search"
                          placeholder="Search here"
                          className="form-control bg-light-gray border-end-0"
                          id="lateDeductions"
                          onChange={(e) => {
                            setTimeout(() => {
                              fetchLateDeductions(e.target.value, false);
                            }, 600);
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
                </>
              )}
              {listType == "late-fee" && (
                <>
                  <div className="col-sm-4 col-md-2">
                    <div className="d-flex align-items-center">
                      <div className="input-group searchbox">
                        <button
                          className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                          type="button"
                          onClick={(e) => {
                            fetchLateFeePayable(1, true);
                          }}
                        >
                          Download Report
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {listType == "short" && (
                <>
                  <div className="col-sm-4 col-md-2">
                    <div className="d-flex align-items-center">
                      <div className="input-group searchbox">
                        <button
                          className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                          type="button"
                          onClick={(e) => {
                            fetchShortDeductions(1, "", true);
                          }}
                        >
                          Download Report
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="input-group searchbox">
                        <input
                          type="search"
                          placeholder="Search here"
                          className="form-control bg-light-gray border-end-0"
                          id="shortDeductions"
                          onChange={(e) => {
                            setTimeout(() => {
                              fetchShortDeductions(1, e.target.value, false);
                            }, 1000);
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
                </>
              )}
              {listType == "tax-deposit" && (
                <>
                  <div className="col-sm-4 col-md-2">
                    <div className="d-flex align-items-center">
                      <div className="input-group searchbox">
                        <button
                          className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                          type="button"
                          onClick={(e) => {
                            fetchTaxDeposits(1, "", true);
                          }}
                        >
                          Download Report
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="input-group searchbox">
                        <input
                          type="search"
                          placeholder="Search here"
                          className="form-control bg-light-gray border-end-0"
                          id="shortDeductions"
                          onChange={(e) => {
                            setTimeout(() => {
                              fetchTaxDeposits(1, e.target.value, false);
                            }, 1000);
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
                </>
              )}
              {listType == "interest" && (
                <>
                  <div className="col-sm-4 col-md-2">
                    <div className="d-flex align-items-center">
                      <div className="input-group searchbox">
                        <button
                          className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                          type="button"
                          onClick={(e) => {
                            fetchInterestCalculate(1, "", true);
                          }}
                        >
                          Download Report
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="input-group searchbox">
                        <input
                          type="search"
                          placeholder="Search here"
                          className="form-control bg-light-gray border-end-0"
                          id="interest"
                          onChange={(e) => {
                            setTimeout(() => {
                              fetchInterestCalculate(1, e.target.value, false);
                            }, 1000);
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
                </>
              )}
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <div>
                    {listType == "late" &&
                      lateDeductions &&
                      lateDeductions.lateDeductionsList && (
                        <LateDeductions
                          lateDeductionReports={lateDeductions}
                          currentPage={currentPage}
                          setCurrentPage={(e) => setCurrentPage(e)}
                          pageSize={pageSize}
                        ></LateDeductions>
                      )}
                    {listType == "short" &&
                      shortDeductions &&
                      shortDeductions.shortDeductionsList && (
                        <ShortDeductions
                          shortDeductionReports={shortDeductions}
                          currentPage={sdCurrentPage}
                          setCurrentPage={(e) => {
                            setSdCurrentPage(e);
                            fetchShortDeductions(e);
                          }}
                          pageSize={sdPageSize}
                        ></ShortDeductions>
                      )}
                    {listType == "tax-deposit" &&
                      taxDeposit &&
                      taxDeposit.lateDepositReportList && (
                        <TaxDepositList
                          response={taxDeposit}
                          currentPage={tdCurrentPage}
                          setCurrentPage={(e) => {
                            setTdCurrentPage(e);
                            fetchTaxDeposits(e);
                          }}
                          pageSize={tdPageSize}
                        ></TaxDepositList>
                      )}
                    {listType == "interest" &&
                      interestCalculate &&
                      interestCalculate.interestCalculateReportList && (
                        <InterestList
                          response={interestCalculate}
                          currentPage={icCurrentPage}
                          setCurrentPage={(e) => {
                            setLpCurrentPage(e);
                            fetchInterestCalculate(e);
                          }}
                          pageSize={lcPageSize}
                        ></InterestList>
                      )}
                    {listType == "late-fee" &&
                      lateFeePayable &&
                      (
                        <LateFeePayable
                          response={lateFeePayable}
                          currentPage={lpCurrentPage}
                          setCurrentPage={(e) => {
                            setLpCurrentPage(e);
                            fetchLateFeePayable(e);
                          }}
                          pageSize={lpPageSize}
                        ></LateFeePayable>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-5 py-md-5 bg-light-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary rounded-pill py-1 px-3"
                data-bs-toggle="collapse"
                href="#searchrecords"
                role="button"
                aria-expanded="false"
                aria-controls=""
              >
                <i className="me-2 fa-solid fa-filter"></i>
                Filter
              </button>
            </div>
            <div className="col-md-12">
              <div
                className={
                  pathname === "/"
                    ? "col-12 mt-3 px-0"
                    : "col-12 collapse mt-3 px-0"
                }
                id="searchrecords"
              >
                <div className="card rounded-0 shadow-sm border border-1 rounded-3 px-0 mb-3">
                  <div className="card-body">
                    <form>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label for="inputDeducteeName" className="form-label">
                            Deductee Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputDeducteeName"
                          />
                        </div>
                        <div className="col-md-4">
                          <label for="inputPANNumber" className="form-label">
                            PAN Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPANNumber"
                          />
                        </div>
                        <div className="col-md-4">
                          <label for="inputSectionCode" className="form-label">
                            Section Code
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputSectionCode"
                          />
                        </div>

                        <div className="col-md-12 d-flex align-items-center">
                          <div className="mb-1">
                            <label className="form-label mb-0 text-black-50  py-1 fs-12 d-none"></label>
                            <div className="rounded-0 rounded-2 py-1 d-flex align-items-center">
                              <button
                                type="submit"
                                className="btn w-auto btn-primary py-1 rounded-pill px-3 rounded-0 fs-12"
                              >
                                Search
                              </button>
                              <button
                                type="submit"
                                className="btn w-auto btn-primary py-1 rounded-pill px-3 rounded-0 mx-2 fs-12"
                              >
                                Reset Filter
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <ProcessPopup showLoader={showLoader}></ProcessPopup>
    </>
  );
}
