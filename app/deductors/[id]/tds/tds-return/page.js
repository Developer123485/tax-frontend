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
import { CommonService } from "@/app/services/common.service";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function TDSReturn({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const [isDirty, setIsDirty] = useState(false);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [showLoader, setShowLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tdsReturns, setTdsReturns] = useState(null);
  const [openTdsReturn, setOpenTdsReturns] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const highlightStyle = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused ? "#007bff" : "#ccc",
    boxShadow: isFocused ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };
  const highlightStyle1 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused1 ? "#007bff" : "#ccc",
    boxShadow: isFocused1 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

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
      name: "SN",
      selector: (row, index) => (currentPage - 1) * pageSize + (index + 1),
      grow: 1,
    },
    {
      name: "Form Name",
      selector: (row) => row.formName ?? "-",
      grow: 1,
    },
    {
      name: "FY",
      selector: (row) => row?.fy ?? "-",
      grow: 1,
    },
    {
      name: "Quarter",
      selector: (row) => row?.quarter ?? "-",
      grow: 1,
    },
    {
      name: "Filed On",
      selector: (row) => row?.filedOn ?? "-",
      grow: 1,
    },
    {
      name: "Upload Type",
      selector: (row) => row?.uploadType ?? "-",
      grow: 1,
    },
    {
      name: "Token Number",
      selector: (row) => row?.token ?? "-",
      grow: 2,
    },
    {
      name: "RRR Number",
      selector: (row) => row?.rNumber ?? "-",
      grow: 2,
    },
    {
      name: "Status",
      selector: (row) => row?.status ?? "-",
      grow: 1.5,
    },
    {
      name: "Actions",
      button: true,
      selector: (row) => (
        <>
          <div className="d-flex justify-content-center">
            <span>
              {" "}
              <a
                href="Javascript:void(0)"
                onClick={(e) => {
                  openEditModal(row.id);
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
                href="Javascript:void(0)"
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
  const [tdsReturnForm, setTdsReturnForm] = useState({
    id: 0,
    formName: null,
    fy: null,
    quarter: null,
    filedOn: null,
    uploadType: "Regular",
    rNumber: null,
    status: null,
    deductorId: null,
  });

  const [tdsReturnErrors, setTdsReturnErrors] = useState({
    formNameError: "",
    quarterError: "",
    filedOnError: "",
    uploadTypeError: "",
    rNumberError: "",
  });
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
      name: "Tds Return",
      isActive: true,
    },
  ]);
  useEffect(() => {
    if (deductorId > 0) {
      setShowLoader(true);
      getTdsReturns("", false);
    } else {
      router.push("/deductors");
    }
  }, [pageSize, currentPage]);

  useEffect(() => {
    validate();
  }, [
    tdsReturnForm.filedOn,
    tdsReturnForm.formName,
    tdsReturnForm.rNumber,
    tdsReturnForm.uploadType,
    tdsReturnForm.quarter,
  ]);

  function handleInput(name, e) {
    if (name === "filedOn") {
      setTdsReturnForm((prevState) => ({
        ...prevState,
        [name]: e,
      }));
    } else {
      setTdsReturnForm((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    }
  }

  function openEditModal(id) {
    const res = tdsReturns.tdsReturnList.find((p) => p.id == id);
    setTdsReturnForm(res);
    setOpenTdsReturns(true);
  }

  function deleteTdsReturn(e) {
    e.preventDefault();
    setShowLoader(true);
    ReportingService.deleteTdsReturn(deleteId).then((res) => {
      if (res) {
        toast.success("Delete Successfully!");
        getTdsReturns();
        setDeleteConfirm(false);
        setShowLoader(false);
      }
    });
  }

  function validate() {
    let formNameError = "";
    let quarterError = "";
    let filedOnError = "";
    let uploadTypeError = "";
    let rNumberError = "";
    if (!tdsReturnForm.formName) {
      formNameError = "Form Name is required";
    }
    if (!tdsReturnForm.quarter) {
      quarterError = "Quarter is required";
    }
    if (!tdsReturnForm.filedOn) {
      filedOnError = "Filed on is required";
    }
    if (!tdsReturnForm.uploadType) {
      uploadTypeError = "Upload Type is required";
    }
    if (!tdsReturnForm.rNumber) {
      rNumberError = "RRR Number is required";
    }
    if (
      rNumberError ||
      uploadTypeError ||
      formNameError ||
      quarterError ||
      filedOnError
    ) {
      setTdsReturnErrors((prevState) => ({
        ...prevState,
        rNumberError,
        uploadTypeError,
        formNameError,
        quarterError,
        filedOnError,
      }));
      return false;
    }
    setTdsReturnErrors((prevState) => ({
      ...prevState,
      rNumberError,
      uploadTypeError,
      formNameError,
      quarterError,
      filedOnError,
    }));
    return true;
  }

  function resetForm() {
    setTdsReturnForm((prevState) => ({
      ...prevState,
      ["rNumber"]: null,
      ["formName"]: null,
      ["quarter"]: null,
      ["uploadType"]: "Regular",
      ["filedOn"]: null,
    }));
  }

  function getTdsReturns(searchValue, value) {
    const model = {
      pageSize: pageSize,
      pageNumber: currentPage,
      financialYear: searchParams.get("financial_year"),
      quarter: null,
      deductorId: deductorId,
      categoryId: 0,
      search: searchValue,
    };
    ReportingService.getTdsReturns(model, value)
      .then((res) => {
        if (value) {
          let fileName = "";
          fileName = "Final-Report-TDS_TCS-Deducted-Collected.xlsx";
          let url = window.URL.createObjectURL(new Blob([res]));
          toast.success("Export Data Successfully!");
          saveAs(url, fileName);
        } else {
          if (res) {
            setTdsReturns(res);
          }
        }
      })
      .catch((e) => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
        } else {
          toast.error(e?.message);
        }
      })
      .finally((f) => {
        setShowLoader(false);
      });
  }

  function submitTdsReturn(e) {
    e.preventDefault();
    setIsDirty(true);
    if (validate()) {
      setLoading(true);
      if (tdsReturnForm.filedOn) {
        tdsReturnForm.filedOn = CommonService.tdsDateFormat(
          new Date(tdsReturnForm.filedOn)
        );
      }
      tdsReturnForm.deductorId = deductorId;
      tdsReturnForm.fy = searchParams.get("financial_year");
      ReportingService.submitTdsReturn(tdsReturnForm)
        .then((res) => {
          if (res) {
            if (res == 0) {
              toast.error("TDS Return for already exist");
            } else {
              toast.success("TDS Return Created!");
              getTdsReturns();
              setLoading(false);
              setOpenTdsReturns(false);
              resetForm();
            }
          }
        })
        .catch((e) => {
          if (e?.response?.data?.errorMessage) {
            toast.error(e?.response?.data?.errorMessage);
          } else {
            toast.error(e?.message);
          }
          setLoading(false);
        })
        .finally((f) => {
          setAddTaxModal(false);
          setLoading(false);
        });
    }
  }

  return (
    <>
      <ToastContainer autoClose={4000} />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="py-4 pb-md-0 bg-light-gray"></section>
      <section className="py-5 pt-md-0 pb-md-5 bg-light-gray">
        <div className="container">
          <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
            <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
              <div className="col-sm-4 col-md-4">
                <h4 className="fw-bold mb-0">TDS Returns</h4>
              </div>
              <div className="col-md-4 d-flex justify-content-end">
                <button
                  className="btn btn-primary me-2"
                  type="button"
                  onClick={(e) => {
                    resetForm();
                    setOpenTdsReturns(true);
                  }}
                >
                  Add
                </button>
              </div>
              <div className="col-md-4">
                <div className="d-flex">
                  <div className="input-group searchbox">
                    <input
                      type="search"
                      placeholder="Search here"
                      className="form-control bg-light-gray border-end-0"
                      id="34a"
                      onChange={(e) => {
                        setTimeout(() => {
                          getTdsReturns(e.target.value, false);
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
            </div>
            <div className="table-responsive">
              <div>
                {tdsReturns?.tdsReturnList &&
                  tdsReturns?.tdsReturnList.length > 0 && (
                    <>
                      <DataTable
                        className="tax_table"
                        fixedHeader
                        fixedHeaderScrollHeight="340px"
                        columns={columns}
                        data={tdsReturns?.tdsReturnList}
                        
                        pagination={true}
                        paginationServer
                        customStyles={customStyles}
                        paginationTotalRows={tdsReturns?.totalRows}
                        paginationPerPage={pageSize}
                        paginationDefaultPage={currentPage}
                        paginationComponentOptions={{
                          noRowsPerPage: true,
                        }}
                        onChangePage={(page) => {
                          if (currentPage !== page) {
                            setCurrentPage(currentPage);
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
      <Modal
        className=""
        size="lg"
        centered
        keyboard={false}
        backdrop="static"
        show={openTdsReturn}
        onHide={() => {
          resetForm();
          setOpenTdsReturns(false);
        }}
      >
        <Modal.Header className="border-0" closeButton>
          {" "}
          <h3 className="mb-0">TDS Return</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <row className="row g-3 mb-3 mb-md-3">
              <div className="col-md-6">
                <label for="quarter" className="form-label">
                  Form Type
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={tdsReturnForm.formName}
                  style={highlightStyle}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => handleInput("formName", e)}
                >
                  <option value={""} hidden>
                    Select
                  </option>
                  <option value={"26Q"}>26Q</option>
                  <option value={"27EQ"}>27EQ</option>
                  <option value={"27Q"}>27Q</option>
                  <option value={"24Q"}>24Q</option>
                </select>
                {isDirty && tdsReturnErrors.formNameError && (
                  <span className="text-danger">
                    {tdsReturnErrors.formNameError}
                  </span>
                )}
              </div>
              <div className="col-md-6">
                <label for="quarter" className="form-label">
                  Quarter
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={tdsReturnForm.quarter}
                  style={highlightStyle1}
                  onFocus={() => setIsFocused1(true)}
                  onBlur={() => setIsFocused1(false)}
                  onChange={(e) => handleInput("quarter", e)}
                >
                  <option value={""} hidden>
                    Select
                  </option>
                  <option value={"Q1"}>Q1</option>
                  <option value={"Q2"}>Q2</option>
                  <option value={"Q3"}>Q3</option>
                  <option value={"Q4"}>Q4</option>
                </select>
                {isDirty && tdsReturnErrors.quarterError && (
                  <span className="text-danger">
                    {tdsReturnErrors.quarterError}
                  </span>
                )}
              </div>
              <div className="col-md-6">
                <label for="rNumber" className="form-label">
                  RRR Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="rNumber"
                  rows={2}
                  maxLength={15}
                  value={tdsReturnForm.rNumber}
                  onChange={(e) => {
                    if (CommonService.isNumeric(e.target.value)) {
                      handleInput("rNumber", e);
                    } else {
                      setTdsReturnForm((prevState) => ({
                        ...prevState,
                        ["rNumber"]: "",
                      }));
                    }
                  }}
                />
                {isDirty && tdsReturnErrors.rNumberError && (
                  <span className="text-danger">
                    {tdsReturnErrors.rNumberError}
                  </span>
                )}
              </div>
              <div className="col-md-6">
                <label for="filedOn" className="form-label">
                  Field On
                </label>
                <DatePicker
                  autoComplete="off"
                  selected={tdsReturnForm.filedOn}
                  id="filedOn"
                  // minDate={
                  //     tdsReturnForm.filedOn
                  //         ? new Date(tdsReturnForm.filedOn)
                  //         : null
                  // }
                  className="form-control w-100"
                  onChange={(e) => handleInput("filedOn", e)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                />
                {isDirty && tdsReturnErrors.filedOnError && (
                  <span className="text-danger">
                    {tdsReturnErrors.filedOnError}
                  </span>
                )}
              </div>
              <div className="col-md-6">
                <label for="uploadType" className="form-label">
                  Upload Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="uploadType"
                  maxLength={15}
                  rows={2}
                  readOnly
                  value={tdsReturnForm.uploadType}
                />
                {isDirty && tdsReturnErrors.uploadTypeError && (
                  <span className="text-danger">
                    {tdsReturnErrors.uploadTypeError}
                  </span>
                )}
              </div>
            </row>
            <div className="row g-3 justify-content-end">
              <div className="col-md-2">
                <button
                  type="button"
                  onClick={(e) => {
                    resetForm();
                    setOpenTdsReturns(false);
                  }}
                  className="btn btn-outline-secondary"
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  onClick={(e) => submitTdsReturn(e)}
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading && (
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  Save
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <DeleteConfirmation
        show={deleteConfirm}
        setDeleteConfirm={(e) => setDeleteConfirm(e)}
        delete={(e) => deleteTdsReturn(e)}
        name={"TDS Return"}
      ></DeleteConfirmation>
    </>
  );
}
