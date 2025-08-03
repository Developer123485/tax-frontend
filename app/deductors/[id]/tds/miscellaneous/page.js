"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ProcessPopup from "@/app/components/modals/processing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import { ReportingService } from "@/app/services/reporting.service";
import Miscellaneous34A from "@/app/components/miscellaneous/34_a/page";
import Miscellaneous34B from "@/app/components/miscellaneous/34_b/page";
import Miscellaneous34C from "@/app/components/miscellaneous/34_c/page";
import { saveAs } from "file-saver";

export default function Miscellaneous({ params }) {
    const resolvedParams = use(params);
    const deductorId = resolvedParams?.id;
    const router = useRouter();
    const [aCurrentPage, setACurrentPage] = useState(1);
    const [bCurrentPage, setBCurrentPage] = useState(1);
    const [cCurrentPage, setCCurrentPage] = useState(1);
    const [aPageSize, setAPageSize] = useState(100);
    const [bPageSize, setBPageSize] = useState(100);
    const [cPageSize, setCPageSize] = useState(100);
    const [showLoader, setShowLoader] = useState(false);
    const [listType, setListType] = useState("34a");
    const [miscellaneousAReport, setMiscellaneousAReport] = useState(null);
    const [miscellaneousBReport, setMiscellaneousBReport] = useState(null);
    const [miscellaneousCReport, setMiscellaneousCReport] = useState(null);
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
            name: "Miscellaneous",
            isActive: true,
        },
    ]);
    useEffect(() => {
        if (
            searchParams.get("financial_year")
        ) {
            setShowLoader(true);
            getMiscellaneousAReports("", false);
        } else {
            router.push("/deductors");
        }
    }, [aPageSize, aCurrentPage]);


    function getMiscellaneousAReports(searchValue) {
        const model = {
            pageSize: aPageSize,
            pageNumber: aCurrentPage,
            financialYear: searchParams.get("financial_year"),
            quarter: "",
            deductorId: deductorId,
            categoryId: 0,
            search: searchValue,
        };
        ReportingService.getMiscellaneousAReports(model)
            .then((res) => {
                if (res) {
                    setMiscellaneousAReport(res);
                }
            })
            .finally((f) => {
                setShowLoader(false);
            });
    }

    function getMiscellaneousBReports(pageNum, searchValue) {
        setShowLoader(true);
        const model = {
            pageSize: bPageSize,
            pageNumber: pageNum,
            financialYear: searchParams.get("financial_year"),
            quarter: "",
            deductorId: deductorId,
            categoryId: 0,
            search: searchValue,
        };
        ReportingService.getMiscellaneousBReports(model)
            .then((res) => {
                if (res) {
                    setMiscellaneousBReport(res);
                }
            })
            .finally((f) => {
                setShowLoader(false);
            });
    }

    function getMiscellaneousCReports(pageNum, searchValue) {
        setShowLoader(true);
        const model = {
            pageSize: cPageSize,
            pageNumber: pageNum,
            financialYear: searchParams.get("financial_year"),
            quarter: "",
            deductorId: deductorId,
            categoryId: 0,
            search: searchValue,
        };
        ReportingService.getMiscellaneousCReports(model)
            .then((res) => {
                setMiscellaneousCReport(res);
                setShowLoader(false);
            })
            .finally((f) => {
                setShowLoader(false);
            });
    }

    function downloadReports() {
        setShowLoader(true);
        const model = {
            pageSize: 10,
            pageNumber: 10,
            financialYear: searchParams.get("financial_year"),
            quarter: "",
            deductorId: deductorId,
            categoryId: 0,
            search: "",
        };
        ReportingService.downloadReports(model)
            .then((res) => {
                let fileName = "";
                fileName =
                    "Spectrum-Blank-3CD-" + searchParams.get("financial_year") + ".xlsx";
                let url = window.URL.createObjectURL(new Blob([res]));
                toast.success("Export Data Successfully!");
                saveAs(url, fileName);
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
                                        name="34a"
                                        id="34a"
                                        value="34a"
                                        checked={listType === "34a"}
                                        onChange={(e) => {
                                            getMiscellaneousAReports("");
                                            setShowLoader(true);
                                            setListType("34a", e);
                                        }}
                                    />
                                    <label className="form-check-label fw-bold" htmlFor="late">
                                        34A
                                    </label>
                                </div>
                                <div className="form-check form-check-inline fs-18">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="34b"
                                        id="34b"
                                        value="34b"
                                        checked={listType === "34b"}
                                        onChange={(e) => {
                                            getMiscellaneousBReports(1, "");
                                            setShowLoader(true);
                                            setListType("34b", e);
                                        }}
                                    />
                                    <label className="form-check-label fw-bold" htmlFor="short">
                                        34B
                                    </label>
                                </div>
                                <div className="form-check form-check-inline fs-18">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="34c"
                                        id="34c"
                                        value="34C"
                                        checked={listType === "34c"}
                                        onChange={(e) => {
                                            getMiscellaneousCReports(1, "");
                                            setShowLoader(true);
                                            setListType("34c", e);
                                        }}
                                    />
                                    <label
                                        className="form-check-label fw-bold"
                                        htmlFor="34C"
                                    >
                                        34C
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <button
                                        className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                                        type="button"
                                        onClick={(e) => {
                                            downloadReports();
                                        }}
                                    >
                                        Download Report
                                    </button>
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
                            <div className="col-sm-8 col-md-8">
                                <h4 className="fw-bold mb-0">
                                    {listType === "34a" ? "34A" : ""}
                                    {listType === "34b" ? "34B" : ""}
                                    {listType === "34c" ? "34C" : ""}
                                </h4>
                            </div>
                            {listType == "34a" && (
                                <>
                                    <div className="col-sm-4 col-md-4">
                                        <div className="d-flex align-items-center">
                                            <div className="input-group searchbox">
                                                <input
                                                    type="search"
                                                    placeholder="Search here"
                                                    className="form-control bg-light-gray border-end-0"
                                                    id="34a"
                                                    onChange={(e) => {
                                                        setTimeout(() => {
                                                            getMiscellaneousAReports(e.target.value, false);
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
                            {listType == "34b" && (
                                <>
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
                                                            getMiscellaneousBReports(1, e.target.value);
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
                            {listType == "34c" && (
                                <>
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
                                                            getMiscellaneousCReports(1, e.target.value);
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
                                        {listType == "34a" &&
                                            miscellaneousAReport &&
                                            miscellaneousAReport.miscellaneousAReportList && (
                                                <Miscellaneous34A
                                                    response={miscellaneousAReport}
                                                    currentPage={aCurrentPage}
                                                    setCurrentPage={(e) => setACurrentPage(e)}
                                                    pageSize={aPageSize}
                                                ></Miscellaneous34A>
                                            )}
                                        {listType == "34b" &&
                                            miscellaneousBReport &&
                                            miscellaneousBReport.miscellaneousBReportList && (
                                                <Miscellaneous34B
                                                    response={miscellaneousBReport}
                                                    currentPage={bCurrentPage}
                                                    setCurrentPage={(e) => {
                                                        setBCurrentPage(e);
                                                        getMiscellaneousBReports(e);
                                                    }}
                                                    pageSize={bPageSize}
                                                ></Miscellaneous34B>
                                            )}
                                        {listType == "34c" &&
                                            miscellaneousCReport &&
                                            miscellaneousCReport.miscellaneousCReportList && (
                                                <Miscellaneous34C
                                                    response={miscellaneousCReport}
                                                    currentPage={cCurrentPage}
                                                    setCurrentPage={(e) => {
                                                        setCCurrentPage(e);
                                                        getMiscellaneousCReports(e);
                                                    }}
                                                    pageSize={cPageSize}
                                                ></Miscellaneous34C>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProcessPopup showLoader={showLoader}></ProcessPopup>
        </>
    );
}
