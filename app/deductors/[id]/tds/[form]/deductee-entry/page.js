"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ChallanService } from "@/app/services/challan.service";
import { usePathname } from "next/navigation";
import { DeducteeEntryService } from "@/app/services/deducteeEntry.service";
import DataTable from "react-data-table-component";
import CustomCheckbox from "@/app/components/deductee-entry/custom-checkbox";
import ProcessPopup from "@/app/components/modals/processing";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Challans({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const form = resolvedParams?.form;
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [challanId, setChallanId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  const [deducteeEntrys, setDeducteeEntrys] = useState(null);
  const [challanDropdowns, setChallanDropdowns] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [totalItems, setTotalItems] = useState(0);
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
      href: `/deductors/${deductorId}/tds/${form}${typeof window !== "undefined" ? window.location.search : ""
        }`,
    },
    {
      name: "Deductee Entries",
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
      name: "Deductee Name",
      selector: (row) => (row.nameOfDeductee ? row.nameOfDeductee : "-"),

      grow: 3,
    },
    {
      name: "Pan",
      selector: (row) => (row.panOfDeductee ? row.panOfDeductee : "-"),
      grow: 2.2,
    },
    {
      name: "Section Code",
      selector: (row) => (row.sectionCode ? row.sectionCode : "-"),
      grow: 1.5,
    },
    {
      name: "Amount",
      selector: (row) => `${row?.amountPaidCredited?.toFixed(2) || "-"}`,
    },
    {
      name: "Total Value",
      selector: (row) => `${row?.totalValueOfTheTransaction || "-"}`,
      grow: 2.5,
      omit: searchParams.get("categoryId") != "3"
    },
    {
      name: "Date Of Payment",
      selector: (row) => `${row?.dateOfPaymentCredit || "-"}`,
      grow: 2.5,
    },
    {
      name: "Date Of Deduction",
      selector: (row) => `${row?.dateOfDeduction || "-"}`,
      grow: 2.5,
    },
    {
      name: "TDS",
      selector: (row) => row.tds?.toFixed(2) || "-",
      grow: 2,
    },
    {
      name: "Surcharge",
      selector: (row) => row.surcharge?.toFixed(2) || "-",
      grow: 2,
    },
    {
      name: "Health & Education Cess",
      selector: (row) => row.healthEducationCess?.toFixed(2) || "-",
      grow: 3,
    },
    {
      name: "Tax Deducted",
      selector: (row) => row.totalTaxDeducted?.toFixed(2) || "-",
      grow: 2,
    },
    {
      name: "Tax Deposited",
      selector: (row) => row.totalTaxDeposited?.toFixed(2) || "-",
      grow: 2,
    },
    {
      name: "Reasons",
      selector: (row) => row.reasons || "-",
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
                  setConfirmTitle("Deductee Entry");
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
    if (
      searchParams.get("financial_year") &&
      searchParams.get("quarter") &&
      searchParams.get("categoryId")
    ) {
      fetchDeducteeEntrys();
    } else {
      router.push("/deductors");
    }
  }, [currentPage, pageSize, challanId]);

  function deleteDeducteeEntry(e) {
    e.preventDefault();
    setDeleteConfirm(false);
    setShowLoader(true);
    if (confirmTitle === "All Deductee Entry") {
      const model = {
        financialYear: searchParams.get("financial_year"),
        quarter: searchParams.get("quarter"),
        deductorId: deductorId,
        categoryId: parseInt(searchParams.get("categoryId")),
      };
      DeducteeEntryService.deleteAllDeducteeEntry(model)
        .then((res) => {
          if (res) {
            toast.success("Delete All Deductee Entry Successfully!");
            setShowLoader(false);
            fetchDeducteeEntrys("");
          }
        })
        .catch((e) => {
          setDeleteConfirm(false);
        });
    } else if (confirmTitle === "Deductee Entry") {
      DeducteeEntryService.deleteDeducteeEntry(deleteId)
        .then((res) => {
          if (res) {
            toast.success("Delete Deductee Entry Successfully!");
            fetchDeducteeEntrys("");
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
        DeducteeEntryService.deleteBulkDeducteeEntry(model)
          .then((res) => {
            if (res) {
              toast.success("Delete Bulk Deductee Entry Successfully!");
              fetchDeducteeEntrys("");
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

  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };

  function fetchDeducteeEntrys() {
    setShowLoader(true);
    const model = {
      pageSize: pageSize,
      pageNumber: currentPage,
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      challanId: challanId,
      categoryId: parseInt(searchParams.get("categoryId")),
    };
    DeducteeEntryService.getDeducteeEntries(model)
      .then((res) => {
        if (res) {
          setDeducteeEntrys(res);
          setChallanDropdowns(res.challans);
        }
      }).catch(e => {
        if (e?.response?.data) {
          toast.error(e?.response?.data);
        }
        else {
          toast.error(e?.message);
        }
        setDeleteConfirm(false);
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
      <section className="py-5 py-md-4 bg-light-gray">
        <div className="container">
          <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
            <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
              <div className="col-md-4">
                <h4 className="mb-0">
                  {searchParams.get("financial_year")},{" "}
                  {searchParams.get("quarter")}, Deductee Entries
                </h4>
              </div>
              <div className="col-md-8 d-flex align-items-center justify-content-end">
                <span className="me-2">Challan's: </span>
                <select
                  className="form-select me-3 w-auto"
                  aria-label=""
                  autoComplete="off"
                  onChange={(e) => setChallanId(e.target.value)}
                >
                  <option value={0}>All</option>
                  {challanDropdowns &&
                    challanDropdowns.map((res, index) => (
                      <option key={index} value={res.id}>
                        {res.name}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={(e) => {
                    if (challanId && parseInt(challanId) > 0) {
                      router.push(pathname + "/detail" + window.location.search + "&challanId=" + challanId);
                    } else {
                      router.push(pathname + "/detail" + window.location.search);
                    }
                  }}
                  className="btn btn-primary me-3"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    setConfirmTitle("Bulk Deductee Entry");
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
                    setConfirmTitle("All Deductee Entry");
                    setDeleteConfirm(true);
                  }}
                  disabled={
                    deducteeEntrys &&
                      deducteeEntrys.deducteeEntryList?.length == 0
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
                    {deducteeEntrys &&
                      deducteeEntrys.deducteeEntryList &&
                      deducteeEntrys.deducteeEntryList.length > 0 && (
                        <DataTable
                          fixedHeader
                          fixedHeaderScrollHeight="400px"
                          columns={columns}
                          data={deducteeEntrys.deducteeEntryList}
                          highlightOnHover
                          pagination={true}
                          paginationServer
                          selectableRows={true}
                          customStyles={customStyles}
                          paginationTotalRows={deducteeEntrys.totalRows}
                          paginationPerPage={pageSize}
                          selectableRowsNoSelectAll={true}
                          onSelectedRowsChange={handleChange}
                          customInput={<CustomCheckbox />}
                          paginationComponentOptions={{
                            noRowsPerPage: true,
                          }}
                          onChangePage={(page) => {
                            setCurrentPage(page);
                            fetchDeducteeEntrys(page);
                          }}
                        />
                      )}
                  </div>
                </div>
              </div>
              {/* <div className="row my-3">
              <div className="col-md-12 col-md-12 d-flex align-items-center justify-content-end">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>

                <label className="mx-2 mx-md-3">Items per page:</label>
                <select
                  className="form-select w-auto"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </section>
      <ProcessPopup showLoader={showLoader}></ProcessPopup>
      <DeleteConfirmation
        show={deleteConfirm}
        name={confirmTitle}
        setDeleteConfirm={(e) => setDeleteConfirm(e)}
        delete={(e) => deleteDeducteeEntry(e)}
      ></DeleteConfirmation>
    </>
  );
}
