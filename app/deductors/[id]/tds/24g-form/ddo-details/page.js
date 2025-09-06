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
import { saveAs } from "file-saver";

export default function DdoDetails({ params }) {
    const resolvedParams = use(params);
    const deductorId = resolvedParams?.id;
    const pathname = usePathname();
    const [showLoader, setShowLoader] = useState(false);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [ddoDetails, setDdoDetails] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
    const [confirmTitle, setConfirmTitle] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const [isloading, setIsLoading] = useState(false);
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
            name: "24G Details",
            isActive: false,
            href: `/deductors/${deductorId}/tds/24g-form`,
        },
        {
            name: "DDO Details",
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
            name: "Name",
            selector: (row) => (row.name ? row.name : "-"),
            grow: 3,
        },
        {
            name: "Tan",
            selector: (row) => (row.tan ? row.tan : "-"),
            grow: 2.2,
        },
        {
            name: "Address",
            selector: (row) => (row.address1 ? row.address1 : "-"),
            grow: 1.5,
        },
        {
            name: "City",
            selector: (row) => `${row?.city || "-"}`,
        },
        {
            name: "State",
            selector: (row) => `${row?.state || "-"}`,
            grow: 2.5,
        },
        {
            name: "Pincode",
            selector: (row) => `${row?.pincode || "-"}`,
            grow: 2.5,
        },
        {
            name: "Email ID",
            selector: (row) => `${row?.emailID || "-"}`,
            grow: 2.5,
        },
        {
            name: "Ddo RegNo",
            selector: (row) => row.ddoRegNo || "-",
            grow: 2,
        },
        {
            name: "Ddo Code",
            selector: (row) => row.ddoCode || "-",
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
                                        pathname + `/detail?id=${row.id}`
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
                                    setConfirmTitle("Delete DDO Detail");
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
        fetchDdoDetails();
    }, [currentPage, pageSize]);

    function deleteEntry(e) {
        e.preventDefault();
        setDeleteConfirm(false);
        setShowLoader(true);
        if (confirmTitle === "All DDO Details") {
            const model = {
                deductorId: deductorId,
            };
            DdoDetailService.deleteAllDdoDetail(model, deductorId)
                .then((res) => {
                    if (res) {
                        toast.success("Delete All Successfully!");
                        setShowLoader(false);
                        fetchDdoDetails("");
                    }
                })
                .catch((e) => {
                    setDeleteConfirm(false);
                });
        } else if (confirmTitle === "Delete DDO Detail") {
            DdoDetailService.deleteDdoDetail(deleteId, deductorId)
                .then((res) => {
                    if (res) {
                        toast.success("Delete DDO Successfully!");
                        fetchDdoDetails("");
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
                DdoDetailService.deleteBulkDdoDetail(model, deductorId)
                    .then((res) => {
                        if (res) {
                            toast.success("Delete Bulk DDO Detail Successfully!");
                            fetchDdoDetails("");
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

    const fileSelectHandler = (event) => {
        handleFileChange(event.target.files[0]);
    };

    async function handleFileChange(file) {
        let formData = new FormData();
        let isFormValidation = true;
        let fy = "";
        let month = "";
        let type = "1"
        formData.append("file", file);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            setIsLoading(true);
            const result = await api.post(
                `ddoDetails/uploadDDODetailExcelFile/${deductorId}/${type}/${isFormValidation}/${fy}/${month}`,
                formData,
                config
            );
            if (result) {
                setIsLoading(false);
                toast.success("File upload successfully");
                fetchDdoDetails();
            } else {
                const blob = new Blob([result], { type: "text/plain" });
                saveAs(blob, "errors.txt");
                toast.error("File upload failed");
            }
        } catch (e) {
            if (e?.response?.data) {
                toast.error(e?.response?.data);
            }
            else {
                toast.error(e?.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (state) => {
        setSelectedData(state.selectedRows);
    };

    function fetchDdoDetails() {
        setShowLoader(true);
        const model = {
            pageSize: pageSize,
            pageNumber: currentPage,
            deductorId: deductorId,
        };
        DdoDetailService.getDdoDetails(model)
            .then((res) => {
                if (res) {
                    setDdoDetails(res);
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
                                Data Instantly for DDO Details!
                            </p>
                        </div>
                        <div className="col-md-8">
                            <div className="row justify-content-between">
                                <div
                                    className="col-md-4"
                                    onClick={(e) =>
                                        router.push(`/deductors/${deductorId}/tds/24g-form/ddo-details/detail`)
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
                                                        <input
                                                            type="file"
                                                            onChange={fileSelectHandler}
                                                            className="visually-hidden"
                                                            accept=".xlsx"
                                                        />
                                                        <h5 className="fw-bold mb-0">
                                                            {" "}
                                                            {isloading ? "Uploading..." : "Import Excel File"}
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
                                    DDO Details
                                </h4>
                            </div>
                            <div className="col-md-8 d-flex align-items-center justify-content-end">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        setConfirmTitle("Bulk DDO Details");
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
                                        setConfirmTitle("All DDO Details");
                                        setDeleteConfirm(true);
                                    }}
                                    disabled={
                                        ddoDetails &&
                                            ddoDetails.ddoDetailList?.length == 0
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
                                        {ddoDetails &&
                                            ddoDetails.ddoDetailList &&
                                            ddoDetails.ddoDetailList.length > 0 && (
                                                <DataTable
                                                    fixedHeader
                                                    fixedHeaderScrollHeight="400px"
                                                    columns={columns}
                                                    data={ddoDetails.ddoDetailList}
                                                    highlightOnHover
                                                    pagination={true}
                                                    paginationServer
                                                    selectableRows={true}
                                                    customStyles={customStyles}
                                                    paginationTotalRows={ddoDetails.totalRows}
                                                    paginationPerPage={pageSize}
                                                    selectableRowsNoSelectAll={true}
                                                    onSelectedRowsChange={handleChange}
                                                    customInput={<CustomCheckbox />}
                                                    paginationComponentOptions={{
                                                        noRowsPerPage: true,
                                                    }}
                                                    onChangePage={(page) => {
                                                        setCurrentPage(page);
                                                        fetchDdoDetails(page);
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
        </>
    );
}
