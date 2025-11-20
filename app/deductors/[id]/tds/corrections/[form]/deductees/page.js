"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import ProcessPopup from "@/app/components/modals/processing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import HeaderList from "@/app/components/header/header-list";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import api from "@/app/utils/interceptors";
import { CommonService } from "@/app/services/common.service";
import { usePathname } from "next/navigation";
import { CorrectionsService } from "@/app/services/corrections.service";
export default function Deductees({ params }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams(null);
  const deductorId = resolvedParams?.id;
  const form = resolvedParams?.form;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const [employeePageSize, setEmployeePageSize] = useState(50);
  const [employeePageNumber, setEmployeePageNumber] = useState(1);
  const [deductees, setDeductees] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [allLoading, setAllLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [deducteeStatus, setDeducteeStatus] = useState("All");
  const [employeeStatus, setEmployeeStatus] = useState("All");
  const [verifyType, setVerifyType] = useState("");
  const [captchaBase64, setCaptchaBase64] = useState('');
  const pathname = usePathname();
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
      name: form,
      isActive: false,
      href: `/deductors/${deductorId}/tds/corrections/${form}${typeof window !== "undefined" ? window.location.search : ""
        }`,
    },
    {
      name: form == "form-24Q" ? "Employees" : "Deductees",
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
      name: "New Pan",
      selector: (row) => (row.newPannumber ? row.newPannumber : "-"),
      grow: 2,
    },
    {
      name: "Name as per PAN",
      selector: (row) => (row.nameAsPerPan ? row.nameAsPerPan : "-"),
      grow: 2,
    },
    {
      name: "Deductee Detail Count",
      selector: (row) => (row.deducteeDetailCount ? row.deducteeDetailCount : "-"),
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
                  debugger
                  router.push(
                    pathname +
                    `/detail${window.location.search}&id=${row.id}&token=RW1wbG95ZWU=`
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
      name: "New pan",
      selector: (row) => row.newPannumber || "-",
      grow: 2,
    },
    {
      name: "Name as per PAN",
      selector: (row) => (row.nameAsPerPan ? row.nameAsPerPan : "-"),
      grow: 2,
    },
    {
      name: "Employee Detail Count",
      selector: (row) => (row.employeeDetailCount ? row.employeeDetailCount : "-"),
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
                    pathname +
                    `/detail${window.location.search}&id=${row.id}&token=RGVkdWN0ZWU=`
                  );
                }}
              >
                Edit
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
    if (form != "form-24Q")
      fetchCorrectionDeductees("");
    getDeductorDetail()
  }, [currentPage, pageSize, deducteeStatus]);

  useEffect(() => {
    if (form == "form-24Q")
      fetchCorrectionEmployees("");
  }, [employeePageSize, employeePageNumber, employeeStatus]);

  function getDeductorDetail() {
    CorrectionsService.getCorrectionStatement(deductorId, parseInt(searchParams.get("correctionId")))
      .then((res) => {
        if (res) {
          setDeductorInfo(res);
        }
      })
      .catch((e) => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
        }
        else {
          toast.error(e?.message);
        }
      });
  }

  function fetchCorrectionDeductees(searchValue) {
    if (!searchValue) {
      setShowLoader(true);
    }
    const model = {
      pageSize: searchValue ? 20 : pageSize,
      pageNumber: searchValue ? 1 : currentPage,
      search: searchValue,
      status: deducteeStatus
    };
    CorrectionsService.getCorrectionDeductees(model, parseInt(searchParams.get("correctionId")))
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

  function fetchCorrectionEmployees(searchValue) {
    if (!searchValue) {
      setShowLoader(true);
    }
    const model = {
      pageSize: searchValue ? 20 : employeePageSize,
      pageNumber: searchValue ? 1 : employeePageNumber,
      search: searchValue,
      status: employeeStatus
    };
    CorrectionsService.getCorrectionEmployees(model, parseInt(searchParams.get("correctionId")))
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

  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>

      <section className="py-5 py-md-4 bg-light-gray">
        <div className="container">
          <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
            <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
              <div className="col-md-7">
                <h4 className="fw-bold mb-0">
                  {form != "form-24Q" ? "Deductees" : "Employees"}
                </h4>
              </div>
              {form != "form-24Q" &&
                <>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) =>
                        router.push(pathname + `/detail${window.location.search}&token=RW1wbG95ZWU=`)
                      }
                    >
                      Add Deductee
                    </button>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group searchbox me-3">
                      <input
                        type="search"
                        placeholder={`Search`}
                        className="form-control bg-light-gray border-end-0"
                        id="SearchDeductees"
                        onChange={(e) => {
                          setTimeout(() => {
                            fetchCorrectionDeductees(e.target.value);
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
                </>
              }
              {form == "form-24Q" &&
                <>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) =>
                        router.push(pathname + `/detail${window.location.search}&token=RGVkdWN0ZWU=`)
                      }
                    >
                      Add Employee
                    </button>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group searchbox me-3">
                      <input
                        type="search"
                        placeholder={`Search`}
                        className="form-control bg-light-gray border-end-0"
                        id="SearchEmployee"
                        onChange={(e) => {
                          setTimeout(() => {
                            fetchCorrectionEmployees(e.target.value);
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
                </>
              }
            </div>
            <div className="">
              <div className="col-md-12">
                {form !== "form-24Q" && (
                  <div className="table-responsive">
                    <div>
                      {deductees && deductees && deductees.length > 0 && (
                        <DataTable
                          className="tax_table"
                          fixedHeader
                          fixedHeaderScrollHeight="340px"
                          columns={deducteeColumns}
                          data={deductees}
                          
                          pagination={true}
                          paginationServer
                          // selectableRows={true}
                          clearSelectedRows={toggleCleared}  // ✅ This clears checkboxes
                          customStyles={customStyles}
                          // selectableRowsNoSelectAll={true}
                          paginationTotalRows={totalItems}
                          paginationPerPage={pageSize}
                          paginationComponentOptions={{
                            noRowsPerPage: true,
                          }}
                          onChangePage={(page) => {
                            setCurrentPage(page);
                            fetchCorrectionDeductees("");
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
                {form === "form-24Q" && (
                  <div className="table-responsive">
                    <div>
                      {employees && employees && employees.length > 0 && (
                        <DataTable
                          className="tax_table"
                          fixedHeader
                          fixedHeaderScrollHeight="340px"
                          columns={employeeColumns}
                          data={employees}
                          
                          pagination={true}
                          paginationServer
                          clearSelectedRows={toggleCleared}  // ✅ This clears checkboxes
                          customStyles={customStyles}
                          paginationTotalRows={totalEmployeeItems}
                          paginationPerPage={employeePageSize}
                          paginationComponentOptions={{
                            noRowsPerPage: true,
                          }}
                          onChangePage={(page) => {
                            setEmployeePageNumber(page);
                            fetchCorrectionEmployees("");
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
    </>
  );
}
