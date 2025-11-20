"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import DataTable from "react-data-table-component";
import CustomCheckbox from "@/app/components/deductee-entry/custom-checkbox";
import ProcessPopup from "@/app/components/modals/processing";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SalaryDetailservice } from "@/app/services/salaryDetail.service";
import HeaderList from "@/app/components/header/header-list";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function SaalryDetails({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const form = resolvedParams?.form;
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [confirmTitle, setConfirmTitle] = useState("");
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
      name: form,
      isActive: false,
      href: `/deductors/${deductorId}/tds/${form}${
        typeof window !== "undefined" ? window.location.search : ""
      }`,
    },
    {
      name: "Salary",
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
      name: "Name Of Employe",
      selector: (row) => (
        <a
          href="Javascript:void(0)"
          onClick={(e) => {
            router.push(
              pathname + `/detail${window.location.search}&id=${row.id}`
            );
          }}
        >
          {row.nameOfEmploye ? row.nameOfEmploye : "-"}
        </a>
      ),
      grow: 2,
    },
    {
      name: "Pan Of Employee",
      selector: (row) => (row.panOfEmployee ? row.panOfEmployee : "-"),
      grow: 1.5,
    },
    {
      name: "Gross Salary",
      selector: (row) => (row.grossSalary ? row.grossSalary : "-"),
      grow: 1.5,
    },
    {
      name: "Total Amount",
      selector: (row) => (row.totalAmount ? row.totalAmount : "-"),
      grow: 2,
    },
    {
      name: "Taxable Income",
      selector: (row) => `${row?.totalTaxableIncome || "-"}`,
    },
    {
      name: "TDS deducted",
      selector: (row) => `${row?.totalTDS || "-"}`,
    },
    {
      name: "Shortfall Excess",
      selector: (row) => `${row?.shortfallExcess || "-"}`,
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
                    pathname + `/detail${window.location.search}&id=${row.id}`
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
                  setConfirmTitle("Salary Detail");
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
        backgroundColor: "white",
        zIndex: 1, // Ensure it stays on top of other columns
      },
      grow: 3,
      width: "135px",
    },
  ];
  useEffect(() => {
    if (
      searchParams.get("financial_year") &&
      searchParams.get("quarter") &&
      searchParams.get("categoryId")
    ) {
      fetchSalaryDetails("");
    } else {
      router.push("/deductors");
    }
  }, [currentPage, pageSize]);

  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };

  const handleRowDoubleClick = (row) => {
    router.push(pathname + `/detail${window.location.search}&id=${row.id}`);
  };

  function deleteSalaryDetail(e) {
    e.preventDefault();
    setDeleteConfirm(false);
    setShowLoader(true);
    if (confirmTitle === "All Salary Detail") {
      const model = {
        financialYear: searchParams.get("financial_year"),
        quarter: searchParams.get("quarter"),
        deductorId: deductorId,
        categoryId: parseInt(searchParams.get("categoryId")),
      };
      SalaryDetailservice.deleteAllSalaryDetail(model)
        .then((res) => {
          if (res) {
            toast.success("Delete All Salary Detail Successfully");
            setShowLoader(false);
            fetchSalaryDetails("");
          }
        })
        .catch((e) => {
          setDeleteConfirm(false);
        });
    } else if (confirmTitle === "Salary Detail") {
      SalaryDetailservice.deleteSalaryDetail(deleteId)
        .then((res) => {
          if (res) {
            setDeleteConfirm(false);
            toast.success("Delete Salary Detail Successfully");
            fetchSalaryDetails("");
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
        SalaryDetailservice.deleteBulkSalaryDetail(model)
          .then((res) => {
            if (res) {
              toast.success("Delete Bulk Salary Detail Successfully");
              fetchSalaryDetails("");
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

  function fetchSalaryDetails(value) {
    setShowLoader(true);
    const model = {
      pageSize: pageSize,
      pageNumber: currentPage,
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
      search: value,
    };
    SalaryDetailservice.getSalaryDetails(model)
      .then((res) => {
        if (res) {
          setSalaryDetails(res);
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
              <div className="col-md-4">
                <h4 className="mb-0">
                  {searchParams.get("financial_year")},{" "}
                  {searchParams.get("quarter")}, Salary
                </h4>
              </div>
              <div className="col-md-8 d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  onClick={(e) => {
                    router.push(pathname + "/detail" + window.location.search);
                  }}
                  className="btn btn-primary me-3"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    setConfirmTitle("Bulk Delete");
                    setDeleteConfirm(true);
                  }}
                  disabled={
                    selectedData && selectedData.length == 0 ? true : false
                  }
                  className="btn btn-outline-primary me-3"
                >
                  Bulk Delete
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    setConfirmTitle("All Salary Detail");
                    setDeleteConfirm(true);
                  }}
                  className="btn btn-primary me-2"
                >
                  Delete All
                </button>
                <div className="d-flex">
                  <div className="input-group searchbox">
                    <input
                      type="search"
                      placeholder="Search here"
                      className="form-control bg-light-gray border-end-0"
                      id="SearchSalary"
                      onChange={(e) => {
                        setTimeout(() => {
                          fetchSalaryDetails(e.target.value);
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
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <div>
                    {salaryDetails &&
                      salaryDetails.salaryDetailList &&
                      salaryDetails.salaryDetailList.length > 0 && (
                        <DataTable
                          className="tax_table"
                          fixedHeader
                          fixedHeaderScrollHeight="340px"
                          columns={columns}
                          data={salaryDetails.salaryDetailList}
                          
                          pagination={true}
                          paginationServer
                          selectableRows={true}
                          customStyles={customStyles}
                          paginationTotalRows={salaryDetails.totalRows}
                          paginationPerPage={pageSize}
                          // onRowDoubleClicked={handleRowDoubleClick}
                          onSelectedRowsChange={handleChange}
                          selectableRowsNoSelectAll={true}
                          customInput={<CustomCheckbox />}
                          paginationComponentOptions={{
                            noRowsPerPage: true,
                          }}
                          onChangePage={(page) => {
                            setCurrentPage(page);
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
        delete={(e) => deleteSalaryDetail(e)}
      ></DeleteConfirmation>
    </>
  );
}
