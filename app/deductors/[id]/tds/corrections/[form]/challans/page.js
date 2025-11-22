"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ChallanService } from "@/app/services/challan.service";
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

export default function Challans({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const form = resolvedParams?.form;
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [toggledClearRows, setToggledClearRows] = useState(false); // 👈 control flag
  const [pageSize, setPageSize] = useState(50);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [challans, setChallans] = useState(null);
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
      href: `/deductors/${deductorId}/tds/corrections/${form}?correctionId=${searchParams.get(
        "correctionId"
      )}&categoryId=${searchParams.get(
        "categoryId"
      )}&financial_year=${searchParams.get(
        "financial_year"
      )}&quarter=${searchParams.get("quarter")}`,
    },
    {
      name: "Challans",
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
      name: "Serial No",
      selector: (row, index) => (currentPage - 1) * pageSize + (index + 1),
    },
    {
      name: "Correction",
      selector: (row) => (row.correction ? "Yes" : "No"),
      width: "120px",
    },
    {
      name: "TDS",
      selector: (row) => (row.tdsAmount ? row.tdsAmount.toFixed(2) : "-"),
      grow: 1.4,
    },
    {
      name: "Surcharge",
      selector: (row) =>
        row.surchargeAmount ? row.surchargeAmount.toFixed(2) : "-",
      grow: 1.5,
    },
    {
      name: "Health & Education Cess",
      selector: (row) => row.healthAndEducationCess.toFixed(2) || "-",
      grow: 2,
    },
    {
      name: "Interest",
      selector: (row) => `${row?.interestAmount.toFixed(2) || "-"}`,
    },
    {
      name: "Fee",
      selector: (row) => `${row?.fee.toFixed(2) || "-"}`,
    },
    {
      name: "Others",
      selector: (row) => `${row?.others.toFixed(2) || "-"}`,
    },
    {
      name: "Tds/Tcs Interest",
      selector: (row) => `${row?.tdsInterest.toFixed(2) || "-"}`,
    },
    {
      name: "Tds/Tcs Others",
      selector: (row) => `${row?.tdsOther.toFixed(2) || "-"}`,
    },
    {
      name: "Total Tax",
      selector: (row) => row.totalTaxDeposit.toFixed(2) || "-",
      grow: 1.5,
    },
    {
      name: "BSR Code",
      selector: (row) => row.bsrCode || "-",
      grow: 1.5,
    },
    {
      name: "Date Of Deposit",
      selector: (row) => row.dateOfDeposit || "-",
      width: "110px"
    },
    {
      name: "Voucher No",
      selector: (row) => row.challanVoucherNo || "-",
      grow: 1.5,
    },
    {
      name: "TDS Deposited By Entry",
      selector: (row) => (row.tdsDepositByBook == "Y" ? "Yes" : "No") || "-",
      grow: 2,
    },
    {
      name: "Minor Head",
      selector: (row) => row.minorHeadChallan || "-",
      grow: 1.5,
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
                    pathname +
                    `/challan-detail${window.location.search}&id=${row.id}`
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
  const conditionalRowStyles =
    [{
      when: row => row.correction,
      style: {
        backgroundColor: "#FFF9C4",   // soft yellow
        color: "#795548",
      },
    }];
  useEffect(() => {
    if (
      searchParams.get("financial_year") &&
      searchParams.get("quarter") &&
      searchParams.get("categoryId")
    ) {
      fetchCorrectionChallans();
    } else {
      router.push("/deductors");
    }
  }, [currentPage, pageSize]);

  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };

  function undoChallan(e) {
    e.preventDefault();
    if (selectedData && selectedData.length > 0) {
      setLoading(true);
      const model = {
        Ids: selectedData.map((p) => p.id),
        deductorId: deductorId,
        correctionId: parseInt(searchParams.get("correctionId"))
      };
      CorrectionsService.undoChallans(model)
        .then((res) => {
          if (res) {
            setToggledClearRows(!toggledClearRows);
            toast.success("Undo Challan Successfully");
            fetchCorrectionChallans("");
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

  function fetchCorrectionChallans() {
    setShowLoader(true);
    const model = {
      pageSize: pageSize,
      pageNumber: currentPage,
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: parseInt(searchParams.get("correctionId")),
      categoryId: parseInt(searchParams.get("categoryId")),
    };
    CorrectionsService.getCorrectionChallans(model)
      .then((res) => {
        if (res) {
          setChallans(res);
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
              <div className="col-md-6">
                <h4 className="mb-0">
                  {searchParams.get("financial_year")},{" "}
                  {searchParams.get("quarter")}, Challans
                </h4>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  disabled={
                    (challans && challans.challanList.length == 0 ? true : false) || loading}
                  onClick={(e) => undoChallan(e)}
                  className="btn btn-primary"
                >
                  {loading && (
                    <div className="spinner-border me-2" role="status"></div>
                  )}
                  Undo
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <div>
                    {challans &&
                      challans.challanList &&
                      challans.challanList.length > 0 && (
                        <DataTable
                          className="tax_table"
                          fixedHeader
                          fixedHeaderScrollHeight="340px"
                          columns={columns}
                          data={challans.challanList}
                          pagination={true}
                          paginationServer
                          selectableRows={true}
                          customStyles={customStyles}
                          paginationTotalRows={challans.totalRows}
                          paginationPerPage={pageSize}
                          onSelectedRowsChange={handleChange}
                          selectableRowDisabled={row => !row.correction}
                          conditionalRowStyles={conditionalRowStyles}
                          selectableRowsNoSelectAll={true}
                          clearSelectedRows={toggledClearRows}
                          customInput={<CustomCheckbox />}
                          paginationComponentOptions={{
                            noRowsPerPage: true,
                          }}
                          onChangePage={(page) => {
                            setCurrentPage(page);
                            fetchCorrectionChallans(page);
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
        delete={(e) => deleteChallan(e)}
      ></DeleteConfirmation>
    </>
  );
}
