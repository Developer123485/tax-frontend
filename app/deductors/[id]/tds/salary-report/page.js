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


export default function SalaryReport({ params }) {
    const resolvedParams = use(params);
    const deductorId = resolvedParams?.id;
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [showLoader, setShowLoader] = useState(false);
    const [salaryReports, setSalaryReports] = useState(null);
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
            name: "Salary",
            selector: (row) => row?.salary ?? "-",
        },
        {
            name: "Other Income",
            selector: (row) => row?.otherIncome ?? "-",
        },
        {
            name: "Gross Total Income",
            selector: (row) => row?.grossTotalIncome ?? "-",
        },
        {
            name: "Deductions Under VI-A",
            selector: (row) => row?.deductions ?? "-",
        },
        {
            name: "Total Taxable",
            selector: (row) => row?.totalTaxable ?? "-",
        },
        {
            name: "Total Tax Payable",
            selector: (row) => row?.totalTaxPayable ?? "-",
        },
        {
            name: "Relief u/s 89",
            selector: (row) => row?.relief ?? "-",
        },
        {
            name: "Net Tax Payable",
            selector: (row) => row?.netTaxpayable ?? "-",
        },
        {
            name: "Total TDS",
            selector: (row) => row?.totalTDS ?? "-",
        },
        {
            name: "Shortfall",
            selector: (row) => row?.shortfall ?? "-",
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
            name: "Salary Report",
            isActive: true,
        },
    ]);
    useEffect(() => {
        if (
            searchParams.get("financial_year")
        ) {
            setShowLoader(true);
            getSalaryReports("", false);
        } else {
            router.push("/deductors");
        }
    }, [pageSize, currentPage, category]);


    function getSalaryReports(searchValue, value) {
        const model = {
            pageSize: pageSize,
            pageNumber: currentPage,
            financialYear: searchParams.get("financial_year"),
            quarter: "",
            deductorId: deductorId,
            categoryId: category,
            search: searchValue,
        };
        ReportingService.getSalaryReports(model, value)
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
                        setSalaryReports(res);
                    }
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
                                    Salary Reports
                                </h4>
                            </div>
                            <>
                                <div className="col-sm-6 col-md-6">
                                    <div className="d-flex align-items-center">
                                        <button
                                            className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                                            type="button"
                                            onClick={(e) => {
                                                getSalaryReports("", true);
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
                                                        getSalaryReports(e.target.value, false);
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
                                {salaryReports?.salaryReport &&
                                    salaryReports?.salaryReport.length > 0 && (
                                        <>
                                            <DataTable
                                                className="tax_table"
                                                fixedHeader
                                                fixedHeaderScrollHeight="340px"
                                                columns={columns}
                                                data={salaryReports?.salaryReport}
                                                highlightOnHover
                                                pagination={true}
                                                paginationServer
                                                customStyles={customStyles}
                                                paginationTotalRows={salaryReports?.totalRows}
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
