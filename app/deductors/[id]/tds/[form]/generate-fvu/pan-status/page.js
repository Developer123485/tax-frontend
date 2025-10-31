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
import { DeducteeEntryService } from "@/app/services/deducteeEntry.service";

export default function PanStatus({ params }) {
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
    const [selectedData, setSelectedData] = useState(null);
    const [lateDeductions, setLateDeductions] = useState(null);
    const [shortDeductions, setShortDeductions] = useState(null);
    const [taxDeposit, setTaxDeposit] = useState(null);
    const [panStatusResponse, setPanStatusResponse] = useState(null);
    const [interestCalculate, setInterestCalculate] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [searchValue, setSearchValue] = useState("");
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
            href: `/deductors/${deductorId}/tds/${form}?categoryId=${searchParams.get("categoryId")}&financial_year=${searchParams.get("financial_year")}&quarter=${searchParams.get("quarter")}}`,
        },
        {
            name: "Generate-Fvu",
            isActive: false,
            href: `/deductors/${deductorId}/tds/${form}/generate-fvu?categoryId=${searchParams.get("categoryId")}&financial_year=${searchParams.get("financial_year")}&quarter=${searchParams.get("quarter")}`,
        },
        {
            name: "Late Fee Payable",
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
            name: "Serial No",
            selector: (row, index) => (currentPage - 1) * pageSize + (index + 1),
        },
        {
            name: "Pan Number",
            selector: (row) => row?.panNumber || "-"
        },
        {
            name: "Name",
            selector: (row) => row.name || "-",
        },
        {
            name: "Pan Status",
            selector: (row) => row?.status || "-"
        },
        {
            name: "Verified Name",
            selector: (row) => row?.verifiedName ?? "-",
        },
        {
            name: "Last Verified On",
            selector: (row) => row?.verifiedDate ?? "-",
        },
    ];
    useEffect(() => {
        if (
            searchParams.get("financial_year") &&
            searchParams.get("quarter") &&
            searchParams.get("categoryId")
        ) {
            setShowLoader(true);
            fetchPanList(1, false);
        } else {
            router.push("/deductors");
        }
    }, [currentPage, pageSize, searchValue]);

    function fetchPanList(pageNum, value) {
        setShowLoader(true);
        const model = {
            pageSize: pageSize,
            pageNumber: pageNum,
            financialYear: searchParams.get("financial_year"),
            quarter: searchParams.get("quarter"),
            deductorId: deductorId,
            categoryId: parseInt(searchParams.get("categoryId")),
            type: searchParams.get("type") ? searchParams.get("type") : null,
            search: searchValue,
        };
        DeducteeEntryService.getPanLists(model, value)
            .then((res) => {
                if (value) {
                    let fileName = "";
                    fileName = "Interest-Calculation-Export-" + form + ".xlsx";
                    let url = window.URL.createObjectURL(new Blob([res]));
                    toast.success("Export Data Successfully!");
                    saveAs(url, fileName);
                } else {
                    if (panStatusResponse?.panLists && panStatusResponse?.panLists?.length > 0) {
                        setPanStatusResponse(res);
                        setShowLoader(false);
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
                                <h5 className="mb-0">
                                    {searchParams.get("categoryId") == "1" ? "Employee " : "Dedcutee "}  Pan Status
                                </h5>
                            </div>
                            <>
                                <div className="col-sm-4 col-md-2">
                                    <div className="d-flex align-items-center">
                                        <div className="input-group">
                                            <button
                                                className="btn btn-outline-secondary px-2 py-1"
                                                type="button"
                                                onClick={(e) => {
                                                    fetchPanList(1, true);
                                                }}
                                                disabled={!panStatusResponse}
                                            >
                                                Download
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
                                                id="pan"
                                                onChange={(e) => {
                                                    setTimeout(() => {
                                                        setSearchValue(e.target.value);
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
                                            panStatusResponse?.panLists &&
                                            panStatusResponse.panLists.length > 0 && (
                                                <>
                                                    <DataTable
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="420px"
                                                        columns={columns}
                                                        data={panStatusResponse.panLists}
                                                        highlightOnHover
                                                        paginationServer
                                                        paginationTotalRows={panStatusResponse.totalRows}
                                                        paginationPerPage={pageSize}
                                                        selectableRows={true}
                                                        customStyles={customStyles}
                                                        pagination={true}
                                                        paginationComponentOptions={{
                                                            noRowsPerPage: true,
                                                        }}
                                                        onChangePage={(page) => {
                                                            if (currentPage !== page) {
                                                                setCurrentPage(page);
                                                            }
                                                        }}
                                                    />
                                                </>
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
