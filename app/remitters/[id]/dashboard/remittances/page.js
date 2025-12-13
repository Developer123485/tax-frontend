"use client";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import DataTable from "react-data-table-component";
import HeaderList from "@/app/components/header/header-list";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import ProcessPopup from "@/app/components/modals/processing";
import { useSearchParams } from "next/navigation";
import { RemittanceService } from "@/app/services/remittances.service";

export default function RemittanceList({ params }) {
    const resolvedParams = use(params);
    const remitterId = resolvedParams?.id;
    const router = useRouter();

    // STATE
    const [remittances, setRemittances] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(50);
    const [totalRows, setTotalRows] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const searchParams = useSearchParams(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const customStyles = {
        rows: { style: { minHeight: "45px" } },
        headCells: {
            style: {
                justifyContent: "start",
                border: "1px solid #F2F7FF",
                fontSize: "12px",
            },
        },
        cells: {
            style: {
                justifyContent: "start",
                border: "1px solid #FFFFFF",
                fontSize: "12px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            },
        },
    };

    // DATATABLE COLUMNS
    const columns = [
        {
            name: "S. No",
            width: "80px",
            selector: (row, index) => (currentPage - 1) * pageSize + index + 1
        },
        {
            name: "Country",
            selector: (row) => row.country || "-",
            width: "150px"
        },
        {
            name: "Currency",
            selector: (row) => row.currency || "-"
        },
        {
            name: "Nature",
            selector: (row) => row.nature || "-"
        },
        {
            name: "Amount Payable",
            selector: (row) => row.amountPayable?.toLocaleString() || "-"
        },
        {
            name: "TDS Amount",
            selector: (row) => row.amountOfTds?.toLocaleString() || "-"
        },
        {
            name: "Actions",
            width: "140px",
            selector: (row) => (
                <div className="d-flex justify-content-center">
                    <a
                        onClick={() => {
                            router.push(`/remitters/${remitterId}/dashboard/remittances/remittance-detail?id=${row.id}&partType=${searchParams.get("partType")}`)
                        }}
                    >
                        <Image
                            src="/images/dashboards/table_edit_icon.svg"
                            width={16}
                            height={16}
                            alt="edit"
                        />
                    </a>
                    <span className="mx-2 opacity-50">|</span>
                    <a
                        onClick={() => {
                            setDeleteId(row.id);
                            setDeleteConfirm(true);
                        }}
                    >
                        <Image
                            src="/images/dashboards/table_delete_icon.svg"
                            width={16}
                            height={16}
                            alt="delete"
                        />
                    </a>
                </div>
            )
        }
    ];


    const breadcrumbs = [
        { name: "Remitters", isActive: false, href: "/remitters" },
        { name: "Dashboard", isActive: false, href: `/remitters/${remitterId}/dashboard` },
        { name: "Remittance", isActive: true }
    ];

    // Fetch data
    function fetchRemittances(page = 1, searchValue = "") {
        setShowLoader(true);
        const model = {
            pageNumber: page,
            pageSize,
            search: searchValue,
            remitterId,
            formType: searchParams.get("partType")
        };
        RemittanceService.fetchRemittances(model)
            .then((res) => {
                debugger
                if (res) {
                    setRemittances(res?.remittanceList || []);
                    setTotalRows(res?.totalRows || 0);
                }
            })
            .catch((err) => {
                toast.error(err?.response?.data?.errorMessage || err.message);
            })
            .finally(() => {
                setTimeout(() => setShowLoader(false), 300);
            });
    }

    useEffect(() => {
        fetchRemittances(currentPage);
    }, [currentPage]);

    // Search debounce
    useEffect(() => {
        const t = setTimeout(() => {
            if (search !== "") {
                fetchRemittances(1, search);
            }
        }, 600);
        return () => clearTimeout(t);
    }, [search]);

    // DELETE HANDLER
    function deleteRemittance(e) {
        e.preventDefault();
        setDeleteLoading(true);

        RemittanceService.deleteRemittance(deleteId)
            .then(() => {
                toast.success("Remittance deleted successfully");
                fetchRemittances(currentPage);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.errorMessage || err.message);
            })
            .finally(() => {
                setDeleteLoading(false);
                setDeleteConfirm(false);
            });
    }

    return (
        <>
            <ToastContainer />
            <HeaderList />
            <BreadcrumbList breadcrumbs={breadcrumbs} />
            <section className="py-5 py-md-3">
                <div className="container">
                    <div className="row align-items-center deductors-sec">
                        <div className="col-md-4">
                            <h2 className="fw-bold">Simplify TDS Filing -</h2>
                            <p className="fs-18 mb-0">
                                Enter, Import, or Download <br />
                                Data Instantly for Remittances!
                            </p>
                        </div>
                        <div className="col-md-8">
                            <div className="row justify-content-between">
                                <div
                                    className="col-md-4"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(`/remitters/${remitterId}/dashboard/remittances/remittance-detail?partType=${searchParams.get("partType")}`);
                                    }}
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
                                                    Add Remittance
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
                                                        <input
                                                            type="file"
                                                            className="visually-hidden"
                                                            accept=".xlsx"
                                                        />
                                                        <h5 className="fw-bold mb-0">
                                                            {" "}
                                                            {false ? "Uploading..." : "Import"}
                                                            <br /> Excel File
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
                                                    <br /> Excel Template
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
                            <div className="col-md-8">
                                <h4 className="fw-bold mb-0">Remittances</h4>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex">
                                    <div className="input-group searchbox">
                                        <input
                                            type="search"
                                            placeholder="Search here"
                                            className="form-control bg-light-gray border-end-0"
                                            id="SearchRemitters"
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                                if (!e.target.value) {
                                                    setTimeout(() => {
                                                        fetchRemittances(1, e.target.value)
                                                    }, 600);
                                                }
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
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <div>
                                        {!showLoader && remittances && remittances.length > 0 && (
                                            <DataTable
                                                fixedHeader
                                                fixedHeaderScrollHeight="340px"
                                                columns={columns}
                                                data={remittances}
                                                pagination={true}
                                                paginationServer
                                                customStyles={customStyles}
                                                paginationTotalRows={totalRows}
                                                paginationPerPage={pageSize}
                                                selectableRowsNoSelectAll={true}
                                                paginationDefaultPage={currentPage}
                                                paginationComponentOptions={{
                                                    noRowsPerPage: true,
                                                }}
                                                onChangePage={(page) => {
                                                    if (currentPage !== page) {
                                                        setCurrentPage(page);
                                                    }
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
            {/* MODALS */}
            <ProcessPopup showLoader={showLoader} />
            <DeleteConfirmation
                show={deleteConfirm}
                deleteLoading={deleteLoading}
                setDeleteConfirm={(v) => setDeleteConfirm(v)}
                delete={deleteRemittance}
            />
        </>
    );
}
