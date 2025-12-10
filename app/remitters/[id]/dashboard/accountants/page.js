"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import ProcessPopup from "@/app/components/modals/processing";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import DataTable from "react-data-table-component";
import HeaderList from "@/app/components/header/header-list";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { AccountantService } from "@/app/services/accountant.service";

export default function AccountantList({ params }) {
    const resolvedParams = use(params);
    const remitterId = resolvedParams?.id;
    const router = useRouter();

    const [accountants, setAccountants] = useState([]);
    const [search, setSearch] = useState("");
    const [showLoader, setShowLoader] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(50);
    const [totalItems, setTotalItems] = useState(0);
    const [deleteId, setDeleteId] = useState(0);

    const [breadcrumbs] = useState([
        { name: "Remitters", isActive: false, href: "/remitters" },
        { name: "Dashboard", isActive: false, href: `/remitters/${remitterId}/dashboard` },
        { name: "Accountants", isActive: true }
    ]);

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
                whiteSpace: "nowrap",
                overflow: "hidden"
            },
        },
    };

    const columns = [
        {
            name: "S No",
            selector: (row, index) => (currentPage - 1) * pageSize + index + 1,
            width: "80px",
        },
        {
            name: "Name",
            selector: (row) => row.accountantName || "-",
            width: "180px",
        },
        {
            name: "Firm Name",
            selector: (row) => row.accountantFirmName || "-",
        },
        {
            name: "Registration No",
            selector: (row) => row.registrationNo || "-",
        },
        {
            name: "Actions",
            width: "140px",
            selector: (row) => (
                <div className="d-flex justify-content-center">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(
                                `/remitters/${remitterId}/dashboard/accountants/accountant-detail?id=${row.id}`
                            );
                        }}
                    >
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                            <Image
                                src="/images/dashboards/table_edit_icon.svg"
                                width={16}
                                height={16}
                                alt="edit"
                            />
                        </OverlayTrigger>
                    </a>

                    <span className="mx-2 opacity-50">|</span>

                    <a
                        onClick={() => {
                            setDeleteId(row.id);
                            setDeleteConfirm(true);
                        }}
                    >
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                            <Image
                                src="/images/dashboards/table_delete_icon.svg"
                                width={16}
                                height={16}
                                alt="delete"
                            />
                        </OverlayTrigger>
                    </a>
                </div>
            ),
        },
    ];

    useEffect(() => {
        fetchAccountants(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search) fetchAccountants(1, search);
        }, 1200);

        return () => clearTimeout(timer);
    }, [search]);

    function fetchAccountants(page, searchValue) {
        setShowLoader(true);
        const model = {
            pageSize,
            pageNumber: page,
            search: searchValue || "",
            remitterId
        };

        AccountantService.getAccountants(model)
            .then((res) => {
                setAccountants(res.accountantDetailList || []);
                setTotalItems(res.totalRows || 0);
            })
            .catch((e) => toast.error(e?.response?.data?.errorMessage || e.message))
            .finally(() => setTimeout(() => setShowLoader(false), 500));
    }

    function deleteAccountant(e) {
        e.preventDefault();
        setDeleteLoading(true);

        AccountantService.deleteAccountant(deleteId)
            .then(() => {
                toast.success("Accountant deleted successfully");
                fetchAccountants(currentPage);
            })
            .catch((e) => toast.error(e?.response?.data?.errorMessage || e.message))
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
                                Data Instantly for Remittee!
                            </p>
                        </div>
                        <div className="col-md-8">
                            <div className="row justify-content-between">
                                <div
                                    className="col-md-4"

                                    onClick={(e) => router.push(`/remitters/${remitterId}/dashboard/accountants/accountant-detail`)}
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
                                                    Add Accountant
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

            <section className="py-5 bg-light-gray">
                <div className="container">
                    <div className="bg-white border rounded-3 pb-2">

                        {/* Header */}
                        <div className="row px-3 py-3 datatable-header">
                            <div className="col-md-8">
                                <h4 className="fw-bold">Accountants</h4>
                            </div>
                            <div className="col-md-4">
                                <div className="input-group searchbox">
                                    <input
                                        type="search"
                                        className="form-control bg-light-gray border-end-0"
                                        placeholder="Search here"
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            if (!e.target.value) fetchAccountants(1, "");
                                        }}
                                    />
                                    <button className="btn btn-outline-secondary border px-2 py-1">
                                        <Image
                                            src="/images/dashboards/search_icon.svg"
                                            width={24}
                                            height={24}
                                            alt="search"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="table-responsive px-2">
                            {!showLoader && accountants.length > 0 && (
                                <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="350px"
                                    columns={columns}
                                    data={accountants}
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
                deleteLoading={deleteLoading}
                setDeleteConfirm={setDeleteConfirm}
                delete={deleteAccountant}
            />
        </>
    );
}
