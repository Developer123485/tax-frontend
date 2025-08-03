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
import { saveAs } from "file-saver";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";


export default function TDSDeducted({ params }) {
    const resolvedParams = use(params);
    const deductorId = resolvedParams?.id;
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [showLoader, setShowLoader] = useState(false);
    const [tdsDeductedList, setTdsDeductedList] = useState(null);
    const [category, setCategoryId] = useState(1);
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
            name: "Name",
            selector: (row) => row.name ?? "-",
        },
        {
            name: "Pan",
            selector: (row) => row.panNumber ?? "-",
        },
        {
            name: "Amount Paid(Q1)",
            selector: (row) => row?.quater1AmountPaid ?? "-",
        },
        {
            name: "Tax Deducted Paid(Q1)",
            selector: (row) => row?.quater1TaxDeducted ?? "-",
        },
        {
            name: "Amount Paid(Q2)",
            selector: (row) => row?.quater2AmountPaid ?? "-",
        },
        {
            name: "Tax Deducted Paid(Q2)",
            selector: (row) => row?.quater2TaxDeducted ?? "-",
        },
        {
            name: "Amount Paid(Q3)",
            selector: (row) => row?.quater3AmountPaid ?? "-",
        },
        {
            name: "Tax Deducted Paid(Q3)",
            selector: (row) => row?.quater3TaxDeducted ?? "-",
        },
        {
            name: "Amount Paid(Q4)",
            selector: (row) => row?.quater4AmountPaid ?? "-",
        },
        {
            name: "Tax Deducted Paid(Q4)",
            selector: (row) => row?.quater4TaxDeducted ?? "-",
        },
        {
            name: "Amount Paid Credited",
            selector: (row) => row?.amountPaidCredited ?? "-",
        },
        {
            name: "Total Tds Amount",
            selector: (row) => row?.totalTdsAmount ?? "-",
        },
    ];
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
            name: "TDS Deducted",
            isActive: true,
        },
    ]);
    useEffect(() => {
        if (
            searchParams.get("financial_year")
        ) {
            setShowLoader(true);
            getTDSDeductedReports("", false);
        } else {
            router.push("/deductors");
        }
    }, [pageSize, currentPage, category]);


    function getTDSDeductedReports(searchValue, value) {
        const model = {
            pageSize: pageSize,
            pageNumber: currentPage,
            financialYear: searchParams.get("financial_year"),
            quarter: "",
            deductorId: deductorId,
            categoryId: category,
            search: searchValue,
        };
        ReportingService.getTDSDeductedReports(model, value)
            .then((res) => {
                if (value) {
                    let fileName = "";

                    fileName =
                        "Final-Report-TDS_TCS-Deducted-Collected.xlsx";
                    let url = window.URL.createObjectURL(new Blob([res]));
                    toast.success("Export Data Successfully!");
                    saveAs(url, fileName);
                } else {
                    if (res) {
                        setTdsDeductedList(res);
                    }
                }
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
            </section>
            <section className="py-5 pt-md-0 pb-md-5 bg-light-gray">
                <div className="container">
                    <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
                        <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
                            <div className="col-sm-6 col-md-6">
                                <h4 className="fw-bold mb-0">
                                    TDS Deducted Reports
                                </h4>
                            </div>
                            <>
                                <div className="col-sm-6 col-md-6">

                                    <div className="d-flex align-items-center">
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            autoComplete="off"
                                            value={category}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                        >
                                            <option value={""} hidden>
                                                Select
                                            </option>
                                            <option value={1}>24Q</option>
                                            <option value={2}>26Q</option>
                                            <option value={3}>27EQ</option>
                                            <option value={4}>27Q</option>
                                        </select>
                                        <button
                                            className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                                            type="button"
                                            onClick={(e) => {
                                                getTDSDeductedReports("", true);
                                            }}
                                        >
                                            Download
                                        </button>
                                        <div className="input-group searchbox">
                                            <input
                                                type="search"
                                                placeholder="Search here"
                                                className="form-control bg-light-gray border-end-0"
                                                id="34a"
                                                onChange={(e) => {
                                                    setTimeout(() => {
                                                        getTDSDeductedReports(e.target.value, false);
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
                        </div>
                        <div className="table-responsive">
                            <div>
                                {tdsDeductedList?.tdsDeductedReport &&
                                    tdsDeductedList?.tdsDeductedReport.length > 0 && (
                                        <>
                                            <DataTable
                                                fixedHeader
                                                fixedHeaderScrollHeight="340px"
                                                columns={columns}
                                                data={tdsDeductedList?.tdsDeductedReport}
                                                highlightOnHover
                                                pagination={true}
                                                paginationServer
                                                customStyles={customStyles}
                                                paginationTotalRows={tdsDeductedList?.totalRows}
                                                paginationPerPage={pageSize}
                                                paginationDefaultPage={currentPage}
                                                paginationComponentOptions={{
                                                    noRowsPerPage: true,
                                                }}
                                                onChangePage={(page) => {
                                                    if (currentPage !== page) {
                                                        setCurrentPage(currentPage)
                                                    }
                                                }}
                                            />
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProcessPopup showLoader={showLoader}></ProcessPopup>
        </>
    );
}
