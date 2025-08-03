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
import { FormsService } from "@/app/services/forms.service";
import { saveAs } from "file-saver";
import InterestList from "@/app/components/potential-notices/interest-calculate/page";

export default function InterestCalculate({ params }) {
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
    const [sdPageSize, setSdPageSize] = useState(100);
    const [tdPageSize, setTdPageSize] = useState(100);
    const [lcPageSize, setLcPageSize] = useState(100);
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
            name: "Generate-Fvu",
            isActive: false,
            href: `/deductors/${deductorId}/tds/${form}/generate-fvu${typeof window !== "undefined" ? window.location.search : ""
                }`,
        },
        {
            name: "Interest Calculates",
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
            fetchInterestCalculate(1, "", false);
        } else {
            router.push("/deductors");
        }
    }, [currentPage, pageSize]);



    function fetchInterestCalculate(pageNum, searchValue, value) {
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
            .catch((e) => {
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
            <section className="py-5 py-md-4 bg-light-gray">
                <div className="container">
                    <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
                        <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
                            <div className="col-sm-4 col-md-6">
                                <h4 className="mb-0">
                                    Interest Calculate
                                </h4>
                            </div>
                            <>
                                <div className="col-sm-4 col-md-2">
                                    <div className="d-flex align-items-center">
                                        <div className="input-group">
                                            <button
                                                className="btn btn-outline-secondary px-2 py-1"
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
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <div>
                                        {
                                            interestCalculate &&
                                            interestCalculate.interestCalculateReportList && (
                                                <InterestList
                                                    response={interestCalculate}
                                                    currentPage={icCurrentPage}
                                                    setCurrentPage={(e) => {
                                                        setIcCurrentPage(e);
                                                        fetchInterestCalculate(e);
                                                    }}
                                                    pageSize={tdPageSize}
                                                ></InterestList>
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
