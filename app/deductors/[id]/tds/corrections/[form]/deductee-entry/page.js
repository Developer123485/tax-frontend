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
import HeaderList from "@/app/components/header/header-list";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CorrectionsService } from "@/app/services/corrections.service";

export default function DeducteeEntry({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const form = resolvedParams?.form;
  const [searchValue, setSearchValue] = useState("");
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [challanId, setChallanId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  const [deducteeEntrys, setDeducteeEntrys] = useState(null);
  const [challanDropdowns, setChallanDropdowns] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggledClearRows, setToggledClearRows] = useState(false); // 👈 control flag
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
      href: `/deductors/${deductorId}/tds/corrections/${form}${typeof window !== "undefined" ? window.location.search : ""
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
      name: "Correction",
      selector: (row) => (row.correction),
      width: "120px",
    },
    {
      name: "Deductee Name",
      selector: (row) => (row.nameOfDeductee ? row.nameOfDeductee : "-"),
      width: "170px",
    },
    {
      name: "Pan",
      selector: (row) => (row.panOfDeductee ? row.panOfDeductee : "-"),
      width: "140px",
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

  const conditionalRowStyles = [
    {
      when: row => row.correction === "Add",
      style: {
        backgroundColor: "#8bc34a",   // green
        color: "#000",
      },
    },
    {
      when: row => row.correction === "Modify",
      style: {
        backgroundColor: "#ffeb3b",   // yellow
        color: "#000",
      },
    },
    {
      when: row => row.correction === "PAN Update",
      style: {
        backgroundColor: "#2196f3",   // blue
        color: "#fff",
      },
    },
    {
      when: row => row.correction === "Mark Nil",
      style: {
        backgroundColor: "#f44336",   // red
        color: "#fff",
      },
    },
  ];


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
  }, [currentPage, pageSize, challanId, searchValue]);

  function deleteCorrectionDeducteeEntry(e) {
    e.preventDefault();
    setDeleteConfirm(false);
    setShowLoader(true);
    if (confirmTitle === "All Deductee Entry") {
    } else if (confirmTitle === "Deductee Entry") {
      CorrectionsService.deleteCorrectionDeducteeEntry(deleteId)
        .then((res) => {
          if (res) {
            setToggledClearRows(!toggledClearRows);
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
        CorrectionsService.deleteCorrectionBulkDeducteeEntry(model)
          .then((res) => {
            if (res) {
              setToggledClearRows(!toggledClearRows);
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
      deductorId: parseInt(searchParams.get("correctionId")),
      challanId: challanId,
      search: searchValue,
      categoryId: parseInt(searchParams.get("categoryId")),
    };
    CorrectionsService.getCorrectionDeducteeEntries(model)
      .then((res) => {
        if (res) {
          setDeducteeEntrys(res);
          setChallanDropdowns(res.challans);
        }
      }).catch(e => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
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

  function undoDeducteeEntry(e) {
    e.preventDefault();
    if (selectedData && selectedData.length > 0) {
      setLoading(true);
      const model = {
        Ids: selectedData.map((p) => p.id),
        deductorId: deductorId,
        correctionId: parseInt(searchParams.get("correctionId"))
      };
      CorrectionsService.undoDeducteeEntrys(model)
        .then((res) => {
          if (res) {
            setToggledClearRows(!toggledClearRows);
            toast.success("Undo Deductee Entry Successfully");
            fetchDeducteeEntrys("");
          }
        }).catch(e => {
          if (e?.response?.data?.errorMessage) {
            toast.error(e?.response?.data?.errorMessage);
          }
          else {
            toast.error(e?.message);
          }
        })
        .finally((f) => {
          setLoading(false);
        });
    }
  }



  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="py-5 py-md-4 bg-light-gray">
        <div className="container">
          <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
            <div className="col-md-4">
              <h4 className="mb-0">
                {searchParams.get("financial_year")},{" "}
                {searchParams.get("quarter")}, Deductee Entries
              </h4>
            </div>
          </div>
          <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">

            <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
              <div className="col-md-2">
              </div>
              <div className="col-md-7 d-flex align-items-center justify-content-end">
                <span className="me-2">Challan's: </span>
                <select
                  className="form-select me-3"
                  style={{ width: "250px" }}
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
                  disabled={
                    (!selectedData || selectedData.length == 0 ? true : false)
                  }
                  onClick={(e) => undoDeducteeEntry(e)}
                  className="btn btn-outline-primary me-3"
                >
                  {loading && (
                    <div className="spinner-border me-2" role="status"></div>
                  )}
                  Undo
                </button>
              </div>
              <div className="col-sm-3 col-md-3">
                <div className="d-flex align-items-center">
                  <div className="input-group searchbox">
                    <input
                      type="search"
                      placeholder="Search here"
                      className="form-control bg-light-gray border-end-0"
                      id="search"
                      onChange={(e) => {
                        setTimeout(() => {
                          setSearchValue(e.target.value);
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
                          conditionalRowStyles={conditionalRowStyles}
                          clearSelectedRows={toggledClearRows}
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
            </div>
          </div>
        </div>
      </section>
      <ProcessPopup showLoader={showLoader}></ProcessPopup>
      <DeleteConfirmation
        show={deleteConfirm}
        name={confirmTitle}
        setDeleteConfirm={(e) => setDeleteConfirm(e)}
        delete={(e) => deleteCorrectionDeducteeEntry(e)}
      ></DeleteConfirmation>
    </>
  );
}
