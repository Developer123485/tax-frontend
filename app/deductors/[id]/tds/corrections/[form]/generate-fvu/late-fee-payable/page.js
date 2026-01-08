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
import { saveAs } from "file-saver";
import LateFeePayable from "@/app/components/potential-notices/late-fee-payable/page";
import { CorrectionsService } from "@/app/services/corrections.service";

export default function LateFeePayables({ params }) {
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
            href: `/deductors/${deductorId}/tds/corrections/${form}${typeof window !== "undefined" ? window.location.search : ""
                }`,
        },
        {
            name: "Generate-Fvu",
            isActive: false,
            href: `/deductors/${deductorId}/tds/corrections/${form}/generate-fvu${typeof window !== "undefined" ? window.location.search : ""
                }`,
        },
        {
            name: "Late Fee Payable",
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
            fetchLateFeePayable(1, false);
        } else {
            router.push("/deductors");
        }
    }, [currentPage, pageSize]);

    function fetchLateFeePayable(pageNum, value) {
        setShowLoader(true);
        const model = {
            pageSize: pageSize,
            pageNumber: pageNum,
            financialYear: searchParams.get("financial_year"),
            quarter: searchParams.get("quarter"),
            correctionId: parseInt(searchParams.get("correctionId")),
            deductorId: deductorId,
            categoryId: parseInt(searchParams.get("categoryId")),
            search: "",
        };
        CorrectionsService.fetchLateFeePayable(model, value)
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
            <section className="py-5 py-md-4 bg-light-gray">
                <div className="container">
                    <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
                        <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
                            <div className="col-sm-4 col-md-6">
                                <h4 className="mb-0">
                                    Late Fee Payable
                                </h4>
                            </div>
                            <>
                                <div className="col-sm-4 col-md-6">
                                    <div className="d-flex align-items-center">
                                        <div className="input-group justify-content-end">
                                            <button
                                                className="btn btn-outline-secondary px-2 py-1"
                                                type="button"
                                                onClick={(e) => {
                                                    fetchLateFeePayable(1, true);
                                                }}
                                            >
                                                Download
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
                                            lateFeePayable &&
                                            (
                                                <LateFeePayable
                                                    response={lateFeePayable}
                                                    currentPage={currentPage}
                                                    setCurrentPage={(e) => {
                                                        setCurrentPage(e);
                                                        fetchLateFeePayable(e);
                                                    }}
                                                    pageSize={pageSize}
                                                ></LateFeePayable>
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
