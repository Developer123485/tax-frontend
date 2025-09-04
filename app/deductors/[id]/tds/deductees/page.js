"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { DeducteeService } from "@/app/services/deductee.service";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import ProcessPopup from "@/app/components/modals/processing";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeService } from "@/app/services/employee.service";
import DataTable from "react-data-table-component";
import HeaderList from "@/app/components/header/header-list";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import api from "@/app/utils/interceptors";
import { DeductorsService } from "@/app/services/deductors.service";
import { TracesActivitiesService } from "@/app/services/tracesActivities.service";
export default function Deductees({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [deleteId, setDeleteId] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [employeePageSize, setEmployeePageSize] = useState(20);
  const [employeePageNumber, setEmployeePageNumber] = useState(1);
  const [deductees, setDeductees] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [allLoading, setAllLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [type, setType] = useState("Deductees");
  const [verifyType, setVerifyType] = useState("");
  const [captchaBase64, setCaptchaBase64] = useState('');
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [totalEmployeeItems, setTotalEmployeeItems] = useState(0);
  const [selectedDeducteeData, setSelectedDeducteeData] = useState([]);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState([]);
  const [deductorInfo, setDeductorInfo] = useState(null);
  const [toggleCleared, setToggleCleared] = useState(false);
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
      name: "Deductees | Employees",
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

  const deducteeColumns = [
    {
      name: "Name",
      selector: (row) => (row.name ? row.name : "-"),
      grow: 1.4,
    },
    {
      name: "Pan",
      selector: (row) => (row.panNumber ? row.panNumber : "-"),
      grow: 1.5,
    },
    {
      name: "PAN Status",
      selector: (row) => (row.status ? row.status : "-"),
      grow: 2,
    },
    {
      name: "Name as per PAN",
      selector: (row) => (row.nameAsPerPan ? row.nameAsPerPan : "-"),
      grow: 2,
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
                  e.preventDefault();
                  router.push(
                    `/deductors/${deductorId}/tds/deductees/detail?id=${row.id}&token=RW1wbG95ZWU=`
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
                  setDeleteId(row.id);
                  setDeleteConfirm(true);
                  setDeleteConfirmName("Deductee");
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
        backgroundColor: "white",
        zIndex: 1, // Ensure it stays on top of other columns
      },
      grow: 3,
      width: "135px",
    },
  ];

  const employeeColumns = [
    {
      name: "Name",
      selector: (row) => (row.name ? row.name : "-"),
      grow: 1.4,
    },
    {
      name: "Pan",
      selector: (row) => (row.panNumber ? row.panNumber : "-"),
      grow: 1.5,
    },
    {
      name: "Sex",
      selector: (row) => row.sex || "-",
      grow: 2,
    },
    {
      name: "Pan Status",
      selector: (row) => `${row?.status || "NA"}`,
    },
    {
      name: "Name as per PAN",
      selector: (row) => (row.nameAsPerPan ? row.nameAsPerPan : "-"),
      grow: 2,
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
                  e.preventDefault();
                  router.push(
                    `/deductors/${deductorId}/tds/deductees/detail?id=${row.id}&token=RGVkdWN0ZWU=`
                  );
                }}
              >
                Edit
              </a>
            </span>
            <span className="mx-2 opacity-50">|</span>
            <span>
              {" "}
              <a
                onClick={(e) => {
                  setDeleteId(row.id);
                  setDeleteConfirm(true);
                  setDeleteConfirmName("Employee");
                }}
              >
                Delete
              </a>
            </span>
          </div>
        </>
      ),
      style: {
        position: "sticky",
        right: 0,
        backgroundColor: "white",
        zIndex: 1, // Ensure it stays on top of other columns
      },
      grow: 3,
      width: "135px",
    },
  ];
  useEffect(() => {
    fetchDeductees("");
    getDeductorDetail()
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchEmployees("");
  }, [employeePageSize, employeePageNumber]);

  function getDeductorDetail() {
    DeductorsService.getDeductor(deductorId)
      .then((res) => {
        if (res) {
          setDeductorInfo(res);
        }
      })
      .catch((e) => {
        toast.error(e?.message);
      });
  }

  function submitLogin(e) {
    setCaptcha("");
    if (deductorInfo.tracesLogin && deductorInfo.tracesPassword) {
      const model = {
        userName: deductorInfo.tracesLogin,
        password: deductorInfo.tracesPassword,
        tanNumber: deductorInfo?.deductorTan
      }
      TracesActivitiesService.startLogin(model).then(res => {
        if (res) {
          setCaptchaBase64(res.captcha);
          setConfirmModal(true);
          setBulkLoading(false);
          setAllLoading(false);
        }
      }).catch(e => {
        toast.error(e?.message);
        setBulkLoading(false);
        setAllLoading(false);
      })
    } else {
      setAllLoading(false);
      setBulkLoading(false);
      setCaptchaBase64("");
      setToggleCleared(false);
      setVerifyType("");
      setCaptcha("");
      toast.error("TRACES username and password do not exist for the deductor");
    }
  }

  function handleSubmit() {
    setSubmitLoading(true);
    if (!captcha) {
      toast.error("Input Captcha is required");
      return false;
    }
    const model = {
      captcha: captcha,
      deductorId: deductorId,
      ids: (verifyType == "all" ? [] : selectedDeducteeData.map(p => p.id))
    }
    if (type === "Deductees") {
      TracesActivitiesService.verifyDeducteePans(model).then(res => {
        if (res) {
          setSelectedDeducteeData([]);
        }
        toast.success(res);
        fetchDeductees("");
        setConfirmModal(false);
        setVerifyType("");
        setSubmitLoading(false);
        setToggleCleared(!toggleCleared);
        setCaptchaBase64("");
      }).catch(e => {
        toast.error(e?.message);
        setVerifyType("");
        setConfirmModal(false);
        setSubmitLoading(false);
        setSelectedDeducteeData([]);
        setToggleCleared(!toggleCleared);
        setCaptchaBase64("");
      })
    } else {
      TracesActivitiesService.verifyEmployeePans(model).then(res => {
        if (res) {
          setSelectedEmployeeData([]);
          fetchEmployees("");
        }
        toast.success(res);
        setConfirmModal(false);
        setVerifyType("");
        setSubmitLoading(false);
        setToggleCleared(!toggleCleared);
        setCaptchaBase64("");
      }).catch(e => {
        toast.error(e?.message);
        setVerifyType("");
        setConfirmModal(false);
        setToggleCleared(!toggleCleared);
        setSubmitLoading(false);
        setCaptchaBase64("");
      })
    }
  }

  function deleteDeductee(e) {
    e.preventDefault();
    if (deleteConfirmName === "Deductee") {
      DeducteeService.deleteDeductee(deleteId)
        .then((res) => {
          if (res) {
            toast.success("Delete Deductee Successfully");
            fetchDeductees("");
          }
        })
        .finally((e) => {
          setDeleteConfirm(false);
        });
    } else {
      EmployeeService.deleteEmployee(deleteId)
        .then((res) => {
          if (res) {
            toast.success("Delete Employee Successfully");
            fetchEmployees("");
          }
        })
        .finally((e) => {
          setDeleteConfirm(false);
        });
    }
  }

  function download() {
    const url = "/static/pdf/DEDUCTEE-EMPLOYEE-MASTER-FINAL.xlsx";
    const link = document.createElement("a");
    link.href = url;
    link.download = "DEDUCTEE-EMPLOYEE-MASTER-FINAL.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function fetchDeductees(searchValue) {
    if (!searchValue) {
      setShowLoader(true);
    }
    const model = {
      pageSize: searchValue ? 20 : pageSize,
      pageNumber: searchValue ? 1 : currentPage,
      search: searchValue,
    };
    DeducteeService.getDeductees(model, parseInt(deductorId))
      .then((res) => {
        if (res) {
          setDeductees(res.deducteeList);
          setTotalItems(res.totalRows);
          setShowLoader(false);
        }
      })
      .catch((e) => {
        setShowLoader(false);
      });
  }

  async function handleFileChange(file) {
    let formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      setShowLoader(true);
      setIsLoading(true);
      const result = await api.post(
        `deductee/uploadExcelFile/${deductorId}`,
        formData,
        config
      );
      if (result == "Uploaded Deductor File successFully") {
        setIsLoading(false);
        toast.success("File upload successfully");
        fetchDeductees("");
        fetchEmployees("");
      } else {
        setIsLoading(false);
        toast.error("Validation Errors");
        const blob = new Blob([result], { type: "text/plain" });
        saveAs(blob, "errors.txt");
        setShowLoader(false);
      }
    } catch (error) {
      toast.error("Error during file upload");
    } finally {
      setIsLoading(false);
      setShowLoader(false);
      setSelectedFile("");
      setFileName("");
    }
  }

  const handleDeducteeChange = (state) => {
    setSelectedDeducteeData(state.selectedRows);
  };

  const handleEmployeeChange = (state) => {
    setSelectedEmployeeData(state.selectedRows);
  };

  const fileSelectHandler = (event) => {
    handleFileChange(event.target.files[0]);
  };

  function fetchEmployees(searchValue) {
    if (!searchValue) {
      setShowLoader(true);
    }
    const model = {
      pageSize: searchValue ? 20 : employeePageSize,
      pageNumber: searchValue ? 1 : employeePageNumber,
      search: searchValue,
    };
    EmployeeService.getEmployees(model, parseInt(deductorId))
      .then((res) => {
        if (res) {
          setEmployees(res.employeeList);
          setTotalEmployeeItems(res.totalRows);
          setShowLoader(false);
        }
      })
      .catch((e) => {
        setShowLoader(false);
      });
  }

  function exportFile(e) {
    setShowLoader(true);
    DeducteeService.exportExcelFile(parseInt(deductorId))
      .then((res) => {
        if (res) {
          if (res) {
            let url = window.URL.createObjectURL(new Blob([res]));
            saveAs(url, "DEDUCTEE-EMPLOYEE-MASTER-FINAL.xlsx");
            toast.success("Export Data Successfully!");
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
      <section className="py-5 py-md-3">
        <div className="container">
          <div className="row align-items-center deductors-sec">
            <div className="col-md-4">
              <div className="">
                <div className="form-check form-check-inline fs-18">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="deductees"
                    id="deductees"
                    value="deductees"
                    checked={type === "Deductees"}
                    onChange={(e) => {
                      setAllLoading(false);
                      setBulkLoading(false);
                      setVerifyType("");
                      setCaptchaBase64("");
                      setToggleCleared(false);
                      setCaptcha("");
                      setType("Deductees", e)
                    }}
                  />
                  <label
                    className="form-check-label  fw-bold"
                    htmlFor="deductees"
                  >
                    Deductees
                  </label>
                </div>
                <div className="form-check form-check-inline fs-18">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="employees"
                    id="employees"
                    value="employees"
                    checked={type === "Employees"}
                    onChange={(e) => {
                      setAllLoading(false);
                      setBulkLoading(false);
                      setCaptchaBase64("");
                      setToggleCleared(false);
                      setVerifyType("");
                      setCaptcha("");
                      setType("Employees", e);
                    }}
                  />
                  <label
                    className="form-check-label fw-bold"
                    htmlFor="employees"
                  >
                    Employees
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row justify-content-between">
                <div
                  className="col-md-4"
                  onClick={(e) =>
                    router.push(`/deductors/${deductorId}/tds/deductees/detail`)
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
                              {isloading ? "Uploading..." : "Import Excel File"}
                            </h5>
                          </label>
                        </h5>
                      </div>
                    </div>
                  </div>
                </label>
                <div className="col-md-4" onClick={download}>
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
          {/*           <div className="">
            <div className="col-md-12">
              <div className="pb-3">
                <div className="form-check form-check-inline fs-18">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="deductees"
                    id="deductees"
                    value="deductees"
                    checked={type === "Deductees"}
                    onChange={(e) => setType("Deductees", e)}
                  />
                  <label
                    className="form-check-label  fw-bold"
                    htmlFor="deductees"
                  >
                    Deductees
                  </label>
                </div>
                <div className="form-check form-check-inline fs-18">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="employees"
                    id="employees"
                    value="employees"
                    checked={type === "Employees"}
                    onChange={(e) => {
                      setType("Employees", e);
                    }}
                  />
                  <label
                    className="form-check-label fw-bold"
                    htmlFor="employees"
                  >
                    Employees
                  </label>
                </div>
              </div>
            </div>
          </div> */}
          <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
            <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
              <div className="col-md-5">
                <h4 className="fw-bold mb-0">
                  {type === "Deductees" ? "Deductees" : "Employees"}
                </h4>
              </div>
              {type == "Deductees" &&
                <div className="col-md-7 d-flex align-items-center">
                  <button type="button"
                    disabled={selectedDeducteeData.length == 0 || bulkLoading}
                    className="btn btn-primary me-3"
                    onClick={(e) => {
                      setBulkLoading(true);
                      setVerifyType("bulk");
                      submitLogin(e);
                    }}
                  >
                    {bulkLoading && (
                      <div className="spinner-border me-2" role="status"></div>
                    )}
                    Bulk PAN Verify
                  </button>
                  <button type="button"
                    disabled={deductees.length == 0 || allLoading}
                    className="btn btn-primary me-3"
                    onClick={(e) => {
                      setAllLoading(true);
                      setVerifyType("all");
                      submitLogin(e)
                    }}
                  >
                    {allLoading && (
                      <div className="spinner-border me-2" role="status"></div>
                    )}
                    Verify All PANs
                  </button>
                  <button
                    type="button"
                    onClick={exportFile}
                    className="btn btn-primary me-3"
                  >
                    Export
                  </button>
                  <div className="input-group searchbox me-3">
                    <input
                      type="search"
                      placeholder={`Search ${type}`}
                      className="form-control bg-light-gray border-end-0"
                      id="SearchDeductees"
                      onChange={(e) => {
                        setTimeout(() => {
                          fetchDeductees(e.target.value);
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
              }
              {type == "Employees" &&
                <div className="col-md-6 d-flex align-items-center">
                  <button type="button"
                    disabled={selectedEmployeeData.length == 0 || bulkLoading}
                    className="btn btn-primary me-3"
                    onClick={(e) => {
                      setAllLoading(true);
                      setVerifyType("bulk");
                      submitLogin(e)
                    }}
                  >
                    {bulkLoading && (
                      <div className="spinner-border me-2" role="status"></div>
                    )}
                    Bulk PAN Verify
                  </button>
                  <button type="button" className="btn btn-primary me-3"
                    disabled={employees.length == 0 || allLoading}
                    onClick={(e) => {
                      setAllLoading(true);
                      setVerifyType("all");
                      submitLogin(e)
                    }}
                  >
                    {allLoading && (
                      <div className="spinner-border me-2" role="status"></div>
                    )}
                    Verify All PANs
                  </button>
                  <button
                    type="button"
                    onClick={exportFile}
                    className="btn btn-primary me-3"
                  >
                    Export
                  </button>
                  <div className="input-group searchbox me-3">
                    <input
                      type="search"
                      placeholder={`Search ${type}`}
                      className="form-control bg-light-gray border-end-0"
                      id="SearchEmployee"
                      onChange={(e) => {
                        setTimeout(() => {
                          fetchEmployees(e.target.value);
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

                  {/* <button
                  type="button"
                  onClick={(e) =>
                    router.push(`/deductors/${deductorId}/tds/deductees/detail`)
                  }
                  className="btn btn-primary me-3"
                >
                  Add
                </button> */}
                  {/*                 <button
                  type="button"
                  onClick={(e) =>
                    router.push(
                      `/deductors/${deductorId}/tds/deductees/dashboard`
                    )
                  }
                  className="btn btn-primary"
                >
                  Import
                </button> */}
                </div>
              }
            </div>
            <div className="">
              <div className="col-md-12">
                {type == "Deductees" && (
                  <div className="table-responsive">
                    <div>
                      {deductees && deductees && deductees.length > 0 && (
                        <DataTable
                          className="tax_table"
                          fixedHeader
                          fixedHeaderScrollHeight="340px"
                          columns={deducteeColumns}
                          data={deductees}
                          highlightOnHover
                          pagination={true}
                          paginationServer
                          selectableRows={true}
                          clearSelectedRows={toggleCleared}  // ✅ This clears checkboxes
                          customStyles={customStyles}
                          selectableRowsNoSelectAll={true}
                          onSelectedRowsChange={handleDeducteeChange}
                          paginationTotalRows={totalItems}
                          paginationPerPage={pageSize}
                          paginationComponentOptions={{
                            noRowsPerPage: true,
                          }}
                          onChangePage={(page) => {
                            setCurrentPage(page);
                            fetchDeductees("");
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
                {type == "Employees" && (
                  <div className="table-responsive">
                    <div>
                      {employees && employees && employees.length > 0 && (
                        <DataTable
                          className="tax_table"
                          fixedHeader
                          fixedHeaderScrollHeight="340px"
                          columns={employeeColumns}
                          data={employees}
                          highlightOnHover
                          pagination={true}
                          selectableRows={true}
                          paginationServer
                          clearSelectedRows={toggleCleared}  // ✅ This clears checkboxes
                          customStyles={customStyles}
                          onSelectedRowsChange={handleEmployeeChange}
                          selectableRowsNoSelectAll={true}
                          paginationTotalRows={totalEmployeeItems}
                          paginationPerPage={employeePageSize}
                          paginationComponentOptions={{
                            noRowsPerPage: true,
                          }}
                          onChangePage={(page) => {
                            setEmployeePageNumber(page);
                            fetchEmployees("");
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section >
      <ProcessPopup showLoader={showLoader}></ProcessPopup>
      <Modal
        className=""
        size="sm"
        centered
        keyboard={false}
        backdrop="static"
        show={confirmModal}
        onHide={() => {
          setAllLoading(false);
          setBulkLoading(false);
          setCaptchaBase64("");
          setToggleCleared(false);
          setVerifyType("");
          setCaptcha("");
          setConfirmModal(false)
        }}
      >
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <div className="container">
            <div style={{ padding: 10 }}>
              {captchaBase64 && (
                <img src={captchaBase64} alt="CAPTCHA" style={{ marginBottom: 10 }} />
              )}
              <br />
              <input
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(
                  e.target.value,
                )}
                style={{ padding: 10, fontSize: 16, marginBottom: 10 }}
              />
              <br />
              <button
                className="btn btn-primary"
                disabled={submitLoading}
                onClick={handleSubmit} style={{ padding: 10, fontSize: 16 }}>
                {submitLoading && (
                  <div className="spinner-border me-2" role="status"></div>
                )}
                Submit
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <DeleteConfirmation
        show={deleteConfirm}
        setDeleteConfirm={(e) => setDeleteConfirm(e)}
        name={deleteConfirmName}
        delete={(e) => deleteDeductee(e)}
      ></DeleteConfirmation>
    </>
  );
}
