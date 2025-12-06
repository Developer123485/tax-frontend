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
// import api from "../utils/interceptors";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { saveAs } from "file-saver";
import { RemitteeService } from "@/app/services/remittee.service";

export default function Remittee({ params }) {
    const [show, setShow] = useState(false);
    const resolvedParams = use(params);
    const [selectedFile, setSelectedFile] = useState(null);
    const remitterId = resolvedParams?.id;
    const [isloading, setIsLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [remittees, setRemittees] = useState([]);
    const [search, setSearch] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [totalItems, setTotalItems] = useState(10);
    const router = useRouter(null);
    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            name: "Remitters",
            isActive: false,
            href: "/remitters",
        },
        {
            name: "Dashboard",
            isActive: false,
            href: `/remitters/${remitterId}/dashboard`,
        },
        {
            name: "Remittees",
            isActive: true,
        },
    ]);
    const customStyles = {
        rows: {
            style: {

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
            name: "S No",
            selector: (row, index) => (currentPage - 1) * pageSize + index + 1,
            width: "80px",
        },
        {
            name: "Name",
            selector: (row) => row.name || "-",
            width: "160px",
        },
        {
            name: "Pan",
            selector: (row) => row?.remitteePan || "",
        },
        {
            name: "Email",
            selector: (row) => row?.remitteeEmail || "",
        },
        {
            name: "Actions",
            selector: (row) => (
                <>
                    {" "}
                    <div className="d-flex justify-content-center">
                        <span>
                            {" "}
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push(`/remitters/${remitterId}/dashboard/remittee/remittee-detail?id=${row.id}`);
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
            width: "135px",
        },
    ];

    useEffect(() => {
        fetchRemittees(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search)
                fetchRemittees(1, search);
        }, 2000);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    function deleteRemittee(e) {
        e.preventDefault();
        setDeleteLoading(true);
        RemitteeService.deleteRemittee(deleteId)
            .then((res) => {
                if (res) {
                    toast.success("Delete Remittee Successfully");
                    fetchRemittees(currentPage);
                    setDeleteLoading(false);
                }
            }).catch(e => {
                if (e?.response?.data?.errorMessage) {
                    toast.error(e?.response?.data?.errorMessage);
                }
                else {
                    toast.error(e?.message);
                }
                setDeleteLoading(false);
            })
            .finally((f) => {
                setDeleteConfirm(false);
            });
    }
    function fetchRemittees(currentPage, searchValue) {
        setShowLoader(true);
        setRemittees([]);
        const model = {
            pageSize: pageSize,
            pageNumber: currentPage,
            search: searchValue,
        };

        RemitteeService.getRemittees(model)
            .then((res) => {
                if (res && res.remitteeList && res.remitteeList.length > 0) {
                    setRemittees(res.remitteeList);
                    setTotalItems(res.totalRows);
                }
            })
            .catch(e => {
                if (e?.response?.data?.errorMessage) {
                    toast.error(e?.response?.data?.errorMessage);
                }
                else {
                    toast.error(e?.message);
                }
            })
            .finally((f) => {
                setTimeout(() => {
                    setShowLoader(false);
                }, 500);
            });
    }

    const fileSelectHandler = (event) => {
        // setSelectedFile(event.target.files[0]);
        // setFileName(event.target.files[0].name);
        // handleFileChange(event);
    };

    // async function handleFileChange(event) {
    //     setIsLoading(true);
    //     const formData = new FormData();
    //     formData.append("file", event.target.files[0]);
    //     const config = {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //     };
    //     try {
    //         setIsLoading(true);
    //         const result = await api.post(
    //             `deductor/uploadExcelFile`,
    //             formData,
    //             config
    //         );
    //         if (result === "Uploaded Deductor File successFully") {
    //             toast.success("Upload Excel file successfully!");
    //         } else {
    //             toast.error(
    //                 "Invalid File. check error in deductor errors text downloded file"
    //             );
    //             const blob = new Blob([result], { type: "text/plain" });
    //             saveAs(blob, "errors.txt");
    //         }
    //     } catch (e) {
    //         if (e?.response?.data?.errorMessage) {
    //             toast.error(e?.response?.data?.errorMessage);
    //         }
    //         else {
    //             toast.error(e?.message);
    //         }
    //     } finally {
    //         setIsLoading(false);
    //         setSelectedFile("");
    //         setFileName("");
    //     }
    // }

    function download() {
        // const url = "/static/pdf/Deductor_Master_Template.xlsx";
        // const link = document.createElement("a");
        // link.href = url;
        // link.download = "Deductor_Master_Template.xlsx";
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    }

    // function getRandomColor() {
    //   const letters = "0123456789ABCDEF";
    //   let color = "#";
    //   for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    //   }
    //   return color;
    // }

    // function exportFile(e) {
    //     setShowLoader(true);
    //     DeductorsService.exportExcelFile()
    //         .then((res) => {
    //             if (res) {
    //                 if (res) {
    //                     let url = window.URL.createObjectURL(new Blob([res]));
    //                     saveAs(url, "DEDUCTOR-MASTER-FINAL-EXPORT.xlsx");
    //                     toast.success("Export Data Successfully!");
    //                 }
    //             }
    //         }).catch(e => {
    //             if (e?.response?.data?.errorMessage) {
    //                 toast.error(e?.response?.data?.errorMessage);
    //             }
    //             else {
    //                 toast.error(e?.message);
    //             }
    //         })
    //         .finally((f) => {
    //             setShowLoader(false);
    //         });
    // }

    return (
        <>
            <ToastContainer />
            <HeaderList></HeaderList>
            {/* <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList> */}
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

                                    onClick={(e) => router.push(`/remitters/${remitterId}/dashboard/remittee/remittee-detail`)}
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
                                                    Add Remittee
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <label className="col-md-4" onChange={fileSelectHandler}>
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
                                                            {isloading ? "Uploading..." : "Import"}
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
                                        <div className="row align-items-center" onClick={download}>
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
                                <h4 className="fw-bold mb-0">Remittees</h4>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex">
                                    <div className="input-group searchbox">
                                        <input
                                            type="search"
                                            placeholder="Search here"
                                            className="form-control bg-light-gray border-end-0"
                                            id="SearchRemittees"
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                                if (!e.target.value) {
                                                    setTimeout(() => {
                                                        fetchRemittees(1, e.target.value)
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
                                        {!showLoader && remittees && remittees.length > 0 && (
                                            <DataTable
                                                fixedHeader
                                                fixedHeaderScrollHeight="340px"
                                                columns={columns}
                                                data={remittees}
                                                pagination={true}
                                                paginationServer
                                                customStyles={customStyles}
                                                paginationTotalRows={totalItems}
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
            <ProcessPopup showLoader={showLoader}></ProcessPopup>
            <DeleteConfirmation
                show={deleteConfirm}
                deleteLoading={deleteLoading}
                setDeleteConfirm={(e) => setDeleteConfirm(e)}
                delete={(e) => deleteRemittee(e)}
            ></DeleteConfirmation>
        </>
    );
}
