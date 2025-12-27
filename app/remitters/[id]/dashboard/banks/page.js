"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import ProcessPopup from "@/app/components/modals/processing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import DataTable from "react-data-table-component";
import HeaderList from "@/app/components/header/header-list";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { BankDetailService } from "@/app/services/bank.service";

export default function BankDetailList({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const remitterId = resolvedParams?.id;

    const [bankDetails, setBankDetails] = useState([]);
    const [search, setSearch] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showLoader, setShowLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(50);
    const [totalItems, setTotalItems] = useState(0);

    const breadcrumbs = [
        { name: "Remitters", isActive: false, href: "/remitters" },
        { name: "Dashboard", isActive: false, href: `/remitters/${remitterId}/dashboard` },
        { name: "Bank Details", isActive: true }
    ];

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

    const columns = [
        {
            name: "S No",
            selector: (row, index) => (currentPage - 1) * pageSize + index + 1,
        },
        {
            name: "Bank Code",
            selector: (row) => row.code || "-",
            width: "170px",
        },
        {
            name: "Bank Name",
            selector: (row) => row.bankName || "-",
        },
        {
            name: "Branch Name",
            selector: (row) => row.bankBranchName || "-",
        },
        {
            name: "BSR Code",
            selector: (row) => row.bsrCode || "-",
        },
        {
            name: "Actions",
            selector: (row) => (
                <div className="d-flex justify-content-center">
                    <span>
                        <a
                            onClick={() =>
                                router.push(
                                    `/remitters/${remitterId}/dashboard/bank-details/bank-detail?id=${row.id}`
                                )
                            }
                        >
                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                                <div>
                                    <Image src="/images/dashboards/table_edit_icon.svg" width={16} height={16} alt="edit" />
                                </div>
                            </OverlayTrigger>
                        </a>
                    </span>

                    <span className="mx-2 opacity-50">|</span>

                    <span>
                        <a
                            onClick={() => {
                                setDeleteId(row.id);
                                setDeleteConfirm(true);
                            }}
                        >
                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                                <div>
                                    <Image src="/images/dashboards/table_delete_icon.svg" width={16} height={16} alt="delete" />
                                </div>
                            </OverlayTrigger>
                        </a>
                    </span>
                </div>
            ),
            width: "135px",
        },
    ];

    useEffect(() => {
        fetchBankDetails(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchBankDetails(1, search);
        }, 600);

        return () => clearTimeout(debounce);
    }, [search]);

    function fetchBankDetails(page, searchValue) {
        setShowLoader(true);
        const model = {
            pageSize,
            pageNumber: page,
            search: searchValue || "",
            remitterId
        };

        BankDetailService.getBankDetails(model)
            .then((res) => {
                if (res?.bankDetailList) {
                    setBankDetails(res.bankDetailList);
                    setTotalItems(res.totalRows);
                }
            })
            .catch((e) => {
                toast.error(e?.response?.data?.errorMessage || e.message);
            })
            .finally(() => {
                setTimeout(() => setShowLoader(false), 300);
            });
    }

    function deleteBankDetail(e) {
        e.preventDefault();
        BankDetailService.deleteBankDetail(deleteId)
            .then(() => {
                toast.success("Deleted successfully");
                fetchBankDetails(currentPage);
            })
            .catch((e) => {
                toast.error(e?.response?.data?.errorMessage || e.message);
            })
            .finally(() => setDeleteConfirm(false));
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
                                Data Instantly for Banks!
                            </p>
                        </div>
                        <div className="col-md-8">
                            <div className="row justify-content-between">
                                <div
                                    className="col-md-4"

                                    onClick={(e) => router.push(`/remitters/${remitterId}/dashboard/banks/banks-detail`)}
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
                                                    Add Bank
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
                    <div className="bg-white pb-3 border rounded-3">
                        <div className="row px-3 py-3 datatable-header">
                            <div className="col-md-8">
                                <h4 className="fw-bold mb-0">Bank Details</h4>
                            </div>

                            <div className="col-md-4">
                                <div className="d-flex">
                                    <div className="input-group searchbox">
                                        <input
                                            type="search"
                                            className="form-control bg-light-gray border-end-0"
                                            placeholder="Search..."
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button className="btn btn-outline-secondary border-start-0">
                                            <Image src="/images/dashboards/search_icon.svg" width={24} height={24} alt="search" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive px-2">
                            {!showLoader && (
                                <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="340px"
                                    columns={columns}
                                    data={bankDetails}
                                    pagination
                                    paginationServer
                                    paginationTotalRows={totalItems}
                                    paginationPerPage={pageSize}
                                    paginationDefaultPage={currentPage}
                                    customStyles={customStyles}
                                    onChangePage={(page) => setCurrentPage(page)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <ProcessPopup showLoader={showLoader} />
            <DeleteConfirmation
                show={deleteConfirm}
                delete={deleteBankDetail}
                deleteLoading={false}
                setDeleteConfirm={setDeleteConfirm}
            />
        </>
    );
}
