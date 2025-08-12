"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { DdoDetailService } from "@/app/services/ddoDetail.service";
import { usePathname } from "next/navigation";
import DataTable from "react-data-table-component";
import CustomCheckbox from "@/app/components/deductee-entry/custom-checkbox";
import ProcessPopup from "@/app/components/modals/processing";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FormConfirmation from "@/app/components/modals/form-confimation";
import { FormsService } from "@/app/services/forms.service";

export default function DdoWiseDetails({ params }) {
    const resolvedParams = use(params);
    const deductorId = resolvedParams?.id;
    const ddoId = resolvedParams?.ddoId;
    const pathname = usePathname();
    const [showLoader, setShowLoader] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [financialYear, setFinancialYear] = useState("");
    const monthsShort = [
        { value: '01', label: 'Jan' },
        { value: '02', label: 'Feb' },
        { value: '03', label: 'Mar' },
        { value: '04', label: 'Apr' },
        { value: '05', label: 'May' },
        { value: '06', label: 'Jun' },
        { value: '07', label: 'Jul' },
        { value: '08', label: 'Aug' },
        { value: '09', label: 'Sep' },
        { value: '10', label: 'Oct' },
        { value: '11', label: 'Nov' },
        { value: '12', label: 'Dec' }
    ];
    const [selectedMonth, setSelectedMonth] = useState("");
    const [ddoWiseDetails, setDdoWiseDetails] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
    const [confirmTitle, setConfirmTitle] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const searchParams = useSearchParams(null);
    const [isDownloadFormConfirmation, setIsDownloadFormConfirmation] =
        useState(false);
    const [quarter, setQuarter] = useState("");
    const currentYear = new Date().getFullYear();
    const [financialYears, setFinancialYears] = useState([]);
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
            name: "DDO Details",
            isActive: false,
            href: `/deductors/${deductorId}/tds/ddo-details`,
        },
        {
            name: "DDO Wise Details",
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
            name: "DDO Name",
            selector: (row) => (row.name ? row.name : "-"),
            grow: 3,
        },
        {
            name: "DDO Tan",
            selector: (row) => (row.tan ? row.tan : "-"),
            grow: 2,
        },
        {
            name: "Tax Amount",
            selector: (row) => (row.taxAmount ? row.taxAmount?.toFixed(2) : "-"),
            grow: 1.5,
        },
        {
            name: "Total Tds",
            selector: (row) => (row.totalTds ? row.totalTds?.toFixed(2) : "-"),
            grow: 1.5,
        },
        {
            name: "nature",
            selector: (row) => (row.nature ? row.nature : "-"),
            grow: 3,
        },
        {
            name: "Actions",
            button: true,
            selector: (row) => (
                <>
                    {" "}
                    <div className="d-flex justify-content-center">
                        <span>
                            {" "}
                            <a
                                onClick={(e) => {
                                    router.push(
                                        pathname + `/detail?ddoWiseId=${row.id}&financial_year=${financialYear}&month=${selectedMonth}`
                                    );
                                }}
                            >
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>Edit</Tooltip>}
                                >
                                    <div>
                                        <Image
                                            className=""
                                            src="/images/dashboards/table_edit_icon.svg"
                                            alt="table_edit_icon"
                                            width={16}
                                            height={16}
                                        />
                                    </div>
                                </OverlayTrigger>
                            </a>
                        </span>
                        <span className="mx-2 opacity-50">|</span>
                        <span>
                            {" "}
                            <a
                                onClick={(e) => {
                                    setConfirmTitle("Delete DDO Wise Detail");
                                    setDeleteId(row.id);
                                    setDeleteConfirm(true);
                                }}
                            >
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>Delete</Tooltip>}
                                >
                                    <div>
                                        <Image
                                            className=""
                                            src="/images/dashboards/table_delete_icon.svg"
                                            alt="table_delete_icon"
                                            width={16}
                                            height={16}
                                        />
                                    </div>
                                </OverlayTrigger>
                            </a>
                        </span>
                    </div>
                </>
            ),
            style: {
                position: "sticky",
                right: 0,
                zIndex: 1,
                backgroundColor: "#fff",
            },
            grow: 2,
            width: "135px",
        },
    ];

    const totalPages = Math.ceil(totalItems / pageSize);

    useEffect(() => {
        let array = [];
        const tdsQuarterMonths = {
            Q1: [
                { value: "04", label: "Apr" },
                { value: "05", label: "May" },
                { value: "06", label: "Jun" }
            ],
            Q2: [
                { value: "07", label: "Jul" },
                { value: "08", label: "Aug" },
                { value: "09", label: "Sep" }
            ],
            Q3: [
                { value: "10", label: "Oct" },
                { value: "11", label: "Nov" },
                { value: "12", label: "Dec" }
            ],
            Q4: [
                { value: "01", label: "Jan" },
                { value: "02", label: "Feb" },
                { value: "03", label: "Mar" }
            ]
        };
        const currentDate = new Date();
        for (let index = 6; index >= 0; index--) {
            const startYear = currentYear - index;
            const endYear = startYear + 1;
            const finYear = `${startYear}-${endYear.toString().slice(-2)}`;
            array.push(finYear);
        }
        let quarter = "";
        const now = new Date();
        const month = now.getMonth(); // Jan=0, Dec=11
        if (month >= 3 && month <= 5) quarter = "Q1"; // Apr–Jun
        else if (month >= 6 && month <= 8) quarter = "Q2"; // Jul–Sep
        else if (month >= 9 && month <= 11) quarter = "Q3"; // Oct–Dec
        else quarter = "Q4"; // Jan–Mar
        setFinancialYears(array);
        let startYear = currentDate.getFullYear();
        if (month >= 6) {
            // If month is after March, it's in the current FY
            startYear = currentDate.getFullYear();
        } else {
            // If month is before April, it's in the previous FY
            startYear = currentDate.getFullYear() - 1;
        }

        const fy = `${startYear}-${(startYear + 1).toString().slice(-2)}`;
        const currentMonthValue = String(month).padStart(2, "0");
        setSelectedMonth(currentMonthValue);
        setFinancialYear(fy);
    }, []);

    useEffect(() => {
        fetchDdoWiseDetails();
    }, [financialYear, selectedMonth, currentPage, pageSize]);

    function deleteEntry(e) {
        e.preventDefault();
        setDeleteConfirm(false);
        setShowLoader(true);
        if (confirmTitle === "All DDO Wise Details") {
            DdoDetailService.deleteAllDdoWiseDetail(ddoId)
                .then((res) => {
                    if (res) {
                        toast.success("Delete All Successfully!");
                        setShowLoader(false);
                        fetchDdoWiseDetails("");
                    }
                })
                .catch((e) => {
                    setDeleteConfirm(false);
                });
        } else if (confirmTitle === "Delete DDO Wise Detail") {
            DdoDetailService.deleteDdoWiseDetail(deleteId)
                .then((res) => {
                    if (res) {
                        toast.success("Delete Successfully!");
                        fetchDdoWiseDetails("");
                        setDeleteConfirm(false);
                    }
                })
                .catch((e) => {
                    setDeleteConfirm(false);
                });
        } else {
            if (selectedData && selectedData.length > 0) {
                const model = {
                    Ids: selectedData.map((p) => p.id),
                };
                DdoDetailService.deleteBulkDdoWiseDetail(model)
                    .then((res) => {
                        if (res) {
                            toast.success("Delete Bulk DDO Wise Detail Successfully!");
                            fetchDdoWiseDetails("");
                            setDeleteConfirm(false);
                            setSelectedData([]);
                        }
                    })
                    .catch((e) => {
                        setDeleteConfirm(false);
                    });
            }
        }
    }

    function downloadFile(e) {
        setIsloading(true);
        e.preventDefault();
        const model = {
            financialYear: financialYear,
            deductorId: deductorId,
        };
        FormsService.final24GReport(model)
            .then((res) => {
                const blob = new Blob([res], { type: "text/plain" });
                saveAs(blob, "24G" + ".txt");
            })
            .finally((f) => {
                setIsDownloadFormConfirmation(false);
                setIsloading(false);
            });
    }


    const handleChange = (state) => {
        setSelectedData(state.selectedRows);
    };

    function fetchDdoWiseDetails() {
        setShowLoader(true);
        const model = {
            pageSize: pageSize,
            pageNumber: currentPage,
            ddoDetailId: ddoId,
            deductorId: deductorId,
            financialYear: financialYear,
            month: selectedMonth
        };
        DdoDetailService.getDdoWiseDetails(model)
            .then((res) => {
                if (res) {
                    setDdoWiseDetails(res);
                }
            })
            .finally((f) => {
                setTimeout(() => {
                    setShowLoader(false);
                }, 100);
            });
    }
    return (
        <>
            <ToastContainer />
            <HeaderList></HeaderList>
            <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
            <section className="py-5 py-md-3">
                <div className="container">
                    <div className="row align-items-center deductors-sec">
                        <div className="col-md-4">
                            <h2 className="fw-bold">Simplify TDS Filing -</h2>
                            <p className="fs-18 mb-0">
                                Enter, Import, or Download <br />
                                Data Instantly for DDO Wise Details!
                            </p>
                        </div>
                        <div className="col-md-8">
                            <div className="row justify-content-between">
                                <div
                                    className="col-md-4"
                                    onClick={(e) =>
                                        router.push(`/deductors/${deductorId}/tds/ddo-details/${ddoId}/ddo-wise-details/detail?financial_year=${financialYear}&month=${selectedMonth}`)
                                    }
                                >
                                    <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <Image
                                                    className="img-fluid"
                                                    src="/images/dashboards/enter_data_manually_icon.svg"
                                                    alt="enter_data_manually_icon"
                                                    width={121}
                                                    height={121}
                                                />
                                            </div>
                                            <div className="col-md-7">
                                                <h5 className="fw-bold text-capitalize mb-0">
                                                    Enter data
                                                    <br /> manually
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <label className="col-md-4">
                                    <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <Image
                                                    className="img-fluid"
                                                    src="/images/dashboards/import_excel_file_icon.svg"
                                                    alt="import_excel_file_icon"
                                                    width={121}
                                                    height={121}
                                                />
                                            </div>
                                            <div className="col-md-7">
                                                <h5 className="fw-bold text-capitalize mb-0">
                                                    {/* {fileName && <span className="text-danger">{fileName}</span>} */}
                                                    <label className="w-100 text-capitalize cursor-pointer">
                                                        <span className="fw-bold"> </span>
                                                        {/* <input
                                                            type="file"
                                                            className="visually-hidden"
                                                            accept=".xlsx"
                                                        /> */}
                                                        <h5 className="fw-bold mb-0">
                                                            {" "}
                                                            {/* {isloading ? "Uploading..." : "Import Excel File"} */}
                                                            {"Import Excel File"}
                                                        </h5>
                                                    </label>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <div className="col-md-4">
                                    <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <Image
                                                    className="img-fluid"
                                                    src="/images/dashboards/download_excel_file_icon.svg"
                                                    alt="download_excel_file_icon"
                                                    width={121}
                                                    height={121}
                                                />
                                            </div>
                                            <div className="col-md-7">
                                                <h5 className="fw-bold text-capitalize mb-0">
                                                    Download
                                                    <br /> Excel File
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 py-md-4 bg-light-gray">
                <div className="container">
                    <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
                        <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
                            <div className="col-md-4">
                                <h4 className="mb-0">
                                    DDO Wise Details
                                </h4>
                            </div>
                            <div className="col-md-2">
                                <select
                                    className="form-select m-100"
                                    aria-label="Default select example"
                                    value={financialYear}
                                    onChange={(e) => {
                                        setFinancialYear(e.target.value);
                                    }}
                                >
                                    {financialYears?.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-1">
                                <select
                                    className="form-select m-100"
                                    aria-label="Default select example"
                                    value={selectedMonth}
                                    onChange={(e) => {
                                        setSelectedMonth(e.target.value);
                                    }}
                                >
                                    {monthsShort && monthsShort?.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-5 d-flex align-items-center">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        setIsDownloadFormConfirmation(true);
                                    }}
                                    className="btn btn-outline-primary me-3"
                                >
                                    Download
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        setConfirmTitle("Bulk DDO Wise Details");
                                        setDeleteConfirm(true);
                                    }}
                                    disabled={
                                        !selectedData || selectedData.length == 0 ? true : false
                                    }
                                    className="btn btn-outline-primary me-3"
                                >
                                    Bulk Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        setConfirmTitle("All DDO Wise Details");
                                        setDeleteConfirm(true);
                                    }}
                                    disabled={
                                        ddoWiseDetails &&
                                            ddoWiseDetails.ddoWiseDetailList?.length == 0
                                            ? true
                                            : false
                                    }
                                    className="btn btn-primary"
                                >
                                    Delete All
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <div>
                                        {ddoWiseDetails &&
                                            ddoWiseDetails.ddoWiseDetailList &&
                                            ddoWiseDetails.ddoWiseDetailList.length > 0 && (
                                                <DataTable
                                                    fixedHeader
                                                    fixedHeaderScrollHeight="400px"
                                                    columns={columns}
                                                    data={ddoWiseDetails.ddoWiseDetailList}
                                                    highlightOnHover
                                                    pagination={true}
                                                    paginationServer
                                                    selectableRows={true}
                                                    customStyles={customStyles}
                                                    paginationTotalRows={ddoWiseDetails.totalRows}
                                                    paginationPerPage={pageSize}
                                                    selectableRowsNoSelectAll={true}
                                                    onSelectedRowsChange={handleChange}
                                                    customInput={<CustomCheckbox />}
                                                    paginationComponentOptions={{
                                                        noRowsPerPage: true,
                                                    }}
                                                    onChangePage={(page) => {
                                                        setCurrentPage(page);
                                                        fetchDdoWiseDetails(page);
                                                    }}
                                                />
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProcessPopup showLoader={showLoader}></ProcessPopup>
            <DeleteConfirmation
                show={deleteConfirm}
                name={confirmTitle}
                setDeleteConfirm={(e) => setDeleteConfirm(e)}
                delete={(e) => deleteEntry(e)}
            ></DeleteConfirmation>
            <FormConfirmation
                isFormConfirmation={isDownloadFormConfirmation}
                setIsFormConfirmation={setIsDownloadFormConfirmation}
                isLoading={isLoading}
                name={"Download Final Report for 24G"}
                submitForm={downloadFile}
            ></FormConfirmation>
        </>
    );
}
