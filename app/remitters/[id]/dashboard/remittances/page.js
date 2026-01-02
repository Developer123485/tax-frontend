"use client";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import DataTable from "react-data-table-component";
import HeaderList from "@/app/components/header/header-list";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import ProcessPopup from "@/app/components/modals/processing";
import { useSearchParams } from "next/navigation";
import { RemittanceService } from "@/app/services/remittances.service";
import { Modal } from "react-bootstrap";

export default function RemittanceList({ params }) {
    const resolvedParams = use(params);
    const remitterId = resolvedParams?.id;
    const router = useRouter();

    // STATE
    const [remittances, setRemittances] = useState([]);
    const [errors, setErrors] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(50);
    const [totalRows, setTotalRows] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const searchParams = useSearchParams(null);
    const [showErrorFile, setShowErrorFile] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [model, setModel] = useState({
        remitterId: null,
        formType: null,
        partType: null,
        creationInfo: {},
        formDetails: {},
        remitter: {},
        remittee: {},
        remittance: {},
        declaration: {},
        itActDetails: {},
        dtaadetails: {},
        tdsDetails: {},
        acctntDetls: {}
    });



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
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            },
        },
    };

    // DATATABLE COLUMNS
    const columns = [
        {
            name: "S. No",
            width: "80px",
            selector: (row, index) => (currentPage - 1) * pageSize + index + 1
        },
        {
            name: "Nature",
            selector: (row) => row.nature || "-"
        },
        {
            name: "Amount Payable(INR)",
            selector: (row) => row.inIndian?.toLocaleString() || "-"
        },
        {
            name: "Amount Payable(In Foriegn)",
            selector: (row) => row.inForiegn?.toLocaleString() || "-"
        },
        {
            name: "TDS Amount",
            selector: (row) => row.amountOfTds?.toLocaleString() || "-"
        },
        {
            name: "Actions",
            width: "180px",
            selector: (row) => (
                <div className="d-flex justify-content-center">
                    <a
                        onClick={() => {
                            if (searchParams.get("formType")) {
                                router.push(`/remitters/${remitterId}/dashboard/remittances/remittance-detail?id=${row.id}&partType=${searchParams.get("partType")}&formType=${searchParams.get("formType")}`)
                            } else {
                                router.push(`/remitters/${remitterId}/dashboard/remittances/remittance-detail?id=${row.id}&partType=${searchParams.get("partType")}`)
                            }

                        }}
                    >
                        <Image
                            src="/images/dashboards/table_edit_icon.svg"
                            width={16}
                            height={16}
                            alt="edit"
                        />
                    </a>
                    <span className="mx-2 opacity-50">|</span>
                    <a
                        onClick={() => {
                            setDeleteId(row.id);
                            setDeleteConfirm(true);
                        }}
                    >
                        <Image
                            src="/images/dashboards/table_delete_icon.svg"
                            width={16}
                            height={16}
                            alt="delete"
                        />
                    </a>
                    <span className="mx-2 opacity-50">|</span>
                    <a
                        onClick={() => {
                            generateXml(row.id);
                        }}
                    >
                        Generate
                    </a>
                </div>
            )
        }
    ];


    const breadcrumbs = [
        { name: "Remitters", isActive: false, href: "/remitters" },
        { name: "Dashboard", isActive: false, href: `/remitters/${remitterId}/dashboard` },
        { name: "Remittance", isActive: true }
    ];

    // Fetch data
    function fetchRemittances(page = 1, searchValue = "") {
        setShowLoader(true);
        const model = {
            pageNumber: page,
            pageSize,
            search: searchValue,
            remitterId,
            formType: searchParams.get("partType"),
            type: searchParams.get("formType"),
        };
        RemittanceService.fetchRemittances(model)
            .then((res) => {
                if (res) {
                    setRemittances(res?.remittanceList || []);
                    setTotalRows(res?.totalRows || 0);
                }
            })
            .catch((err) => {
                toast.error(err?.response?.data?.errorMessage || err.message);
            })
            .finally(() => {
                setTimeout(() => setShowLoader(false), 300);
            });
    }

    const getValue = (parent, tag) =>
        parent?.getElementsByTagName(tag)?.[0]?.textContent || "";


    useEffect(() => {
        fetchRemittances(currentPage);
    }, [currentPage]);

    // Search debounce
    useEffect(() => {
        const t = setTimeout(() => {
            if (search !== "") {
                fetchRemittances(1, search);
            }
        }, 600);
        return () => clearTimeout(t);
    }, [search]);

    function generateXml(id) {
        setErrors([]);
        RemittanceService.generateXml(id, remitterId).then(res => {
            const url = window.URL.createObjectURL(new Blob([res]));
            const a = document.createElement("a");
            a.href = url;
            a.download = `FORM15CA_${id}.xml`;; // suggested filename
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }).catch(err => {
            if (err?.response?.data && err?.response?.data?.length > 0) {
                setErrors(err?.response?.data);
                setShowErrorFile(true);
            }
        })
    }

    // DELETE HANDLER
    function deleteRemittance(e) {
        e.preventDefault();
        setDeleteLoading(true);

        RemittanceService.deleteRemittance(deleteId)
            .then(() => {
                toast.success("Remittance deleted successfully");
                fetchRemittances(currentPage);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.errorMessage || err.message);
            })
            .finally(() => {
                setDeleteLoading(false);
                setDeleteConfirm(false);
            });
    }

    const handleXmlUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async (event) => {
            const xmlText = event.target.result;
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, "text/xml");

            const creationInfoNode = xml.getElementsByTagName("Form:CreationInfo")[0];
            const formDetailsNode = xml.getElementsByTagName("Form:Form_Details")[0];
            const remitterNode = xml.getElementsByTagName("FORM15CB:RemitterDetails")[0];
            const remitteeNode = xml.getElementsByTagName("FORM15CB:RemitteeDetls")[0];
            const remitteeAddrNode = remitteeNode?.getElementsByTagName("FORM15CB:RemitteeAddrs")[0];
            const remittanceNode = xml.getElementsByTagName("FORM15CB:RemittanceDetails")[0];
            const itActNode = xml.getElementsByTagName("FORM15CB:ItActDetails")[0];
            const dtaaNode = xml.getElementsByTagName("FORM15CB:DTAADetails")[0];
            const tdsNode = xml.getElementsByTagName("FORM15CB:TDSDetails")[0];
            const acctntNode = xml.getElementsByTagName("FORM15CB:AcctntDetls")[0];
            const acctntAddrNode = acctntNode?.getElementsByTagName("FORM15CB:AcctntAddrs")[0];

            const parsedModel = {
                remitterId: remitterId,
                formType: searchParams.get("formType"),
                partType: searchParams.get("partType"),

                /* ---------------- Creation Info ---------------- */
                creationInfo: {
                    swVersionNo: getValue(creationInfoNode, "Form:SWVersionNo"),
                    swCreatedBy: getValue(creationInfoNode, "Form:SWCreatedBy"),
                    xmlCreatedBy: getValue(creationInfoNode, "Form:XMLCreatedBy"),
                    xmlCreationDate: getValue(creationInfoNode, "Form:XMLCreationDate"),
                    intermediaryCity: getValue(creationInfoNode, "Form:IntermediaryCity")
                },

                /* ---------------- Form Details ---------------- */
                formDetails: {
                    formName: getValue(formDetailsNode, "Form:FormName"),
                    description: getValue(formDetailsNode, "Form:Description"),
                    assessmentYear: getValue(formDetailsNode, "Form:AssessmentYear"),
                    schemaVer: getValue(formDetailsNode, "Form:SchemaVer"),
                    formVer: getValue(formDetailsNode, "Form:FormVer")
                },

                /* ---------------- Remitter ---------------- */
                remitter: {
                    iorWe: getValue(remitterNode, "FORM15CB:IorWe"),
                    remitterHonorific: getValue(remitterNode, "FORM15CB:RemitterHonorific"),
                    nameRemitter: getValue(remitterNode, "FORM15CB:NameRemitter"),
                    pan: getValue(remitterNode, "FORM15CB:PAN"),
                    beneficiaryHonorific: getValue(remitterNode, "FORM15CB:BeneficiaryHonorific")
                },

                /* ---------------- Remittee ---------------- */
                remittee: {
                    nameRemittee: getValue(remitteeNode, "FORM15CB:NameRemittee"),
                    remitteeAddrs: {
                        premisesBuildingVillage: getValue(remitteeAddrNode, "FORM15CB:PremisesBuildingVillage"),
                        townCityDistrict: getValue(remitteeAddrNode, "FORM15CB:TownCityDistrict"),
                        flatDoorBuilding: getValue(remitteeAddrNode, "FORM15CB:FlatDoorBuilding"),
                        areaLocality: getValue(remitteeAddrNode, "FORM15CB:AreaLocality"),
                        zipCode: getValue(remitteeAddrNode, "FORM15CB:ZipCode"),
                        state: getValue(remitteeAddrNode, "Form:State"),
                        roadStreet: getValue(remitteeAddrNode, "FORM15CB:RoadStreet"),
                        country: getValue(remitteeAddrNode, "FORM15CB:Country")
                    }
                },

                /* ---------------- Remittance ---------------- */
                remittance: {
                    countryRemMadeSecb: getValue(remittanceNode, "FORM15CB:CountryRemMadeSecb"),
                    currencySecbCode: getValue(remittanceNode, "FORM15CB:CurrencySecbCode"),
                    amtPayForgnRem: getValue(remittanceNode, "FORM15CB:AmtPayForgnRem"),
                    amtPayIndRem: getValue(remittanceNode, "FORM15CB:AmtPayIndRem"),
                    nameBankCode: getValue(remittanceNode, "FORM15CB:NameBankCode"),
                    branchName: getValue(remittanceNode, "FORM15CB:BranchName"),
                    bsrCode: getValue(remittanceNode, "FORM15CB:BsrCode"),
                    propDateRem: getValue(remittanceNode, "FORM15CB:PropDateRem"),
                    natureRemCategory: getValue(remittanceNode, "FORM15CB:NatureRemCategory"),
                    revPurCategory: getValue(remittanceNode, "FORM15CB:RevPurCategory"),
                    revPurCode: getValue(remittanceNode, "FORM15CB:RevPurCode"),
                    taxPayGrossSecb: getValue(remittanceNode, "FORM15CB:TaxPayGrossSecb")
                },

                /* ---------------- IT Act ---------------- */
                itActDetails: {
                    remittanceCharIndia: getValue(itActNode, "FORM15CB:RemittanceCharIndia"),
                    secRemCovered: getValue(itActNode, "FORM15CB:SecRemCovered"),
                    amtIncChrgIt: getValue(itActNode, "FORM15CB:AmtIncChrgIt"),
                    taxLiablIt: getValue(itActNode, "FORM15CB:TaxLiablIt"),
                    basisDeterTax: getValue(itActNode, "FORM15CB:BasisDeterTax")
                },

                /* ---------------- DTAA ---------------- */
                dtaaDetails: {
                    taxResidCert: getValue(dtaaNode, "FORM15CB:TaxResidCert"),
                    relevantDtaa: getValue(dtaaNode, "FORM15CB:RelevantDtaa"),
                    relevantArtDtaa: getValue(dtaaNode, "FORM15CB:RelevantArtDtaa"),
                    taxIncDtaa: getValue(dtaaNode, "FORM15CB:TaxIncDtaa"),
                    taxLiablDtaa: getValue(dtaaNode, "FORM15CB:TaxLiablDtaa"),
                    remForRoyFlg: getValue(dtaaNode, "FORM15CB:RemForRoyFlg"),
                    artDtaa: getValue(dtaaNode, "FORM15CB:ArtDtaa"),
                    rateTdsADtaa: getValue(dtaaNode, "FORM15CB:RateTdsADtaa"),
                    remAcctBusIncFlg: getValue(dtaaNode, "FORM15CB:RemAcctBusIncFlg"),
                    incLiabIndiaFlg: getValue(dtaaNode, "FORM15CB:IncLiabIndiaFlg"),
                    arrAtRateDedTax: getValue(dtaaNode, "FORM15CB:ArrAtRateDedTax"),
                    remOnCapGainFlg: getValue(dtaaNode, "FORM15CB:RemOnCapGainFlg"),
                    amtLongTrm: getValue(dtaaNode, "FORM15CB:AmtLongTrm"),
                    amtShortTrm: getValue(dtaaNode, "FORM15CB:AmtShortTrm"),
                    basisTaxIncDtaa: getValue(dtaaNode, "FORM15CB:BasisTaxIncDtaa"),
                    otherRemDtaa: getValue(dtaaNode, "FORM15CB:OtherRemDtaa"),
                    natureRemDtaa: getValue(dtaaNode, "FORM15CB:NatureRemDtaa"),
                    taxIndDtaaFlg: getValue(dtaaNode, "FORM15CB:TaxIndDtaaFlg"),
                    rateTdsDDtaa: getValue(dtaaNode, "FORM15CB:RateTdsDDtaa")
                },

                /* ---------------- TDS ---------------- */
                tdsDetails: {
                    amtPayForgnTds: getValue(tdsNode, "FORM15CB:AmtPayForgnTds"),
                    amtPayIndianTds: getValue(tdsNode, "FORM15CB:AmtPayIndianTds"),
                    rateTdsSecbFlg: getValue(tdsNode, "FORM15CB:RateTdsSecbFlg"),
                    rateTdsSecB: getValue(tdsNode, "FORM15CB:RateTdsSecB"),
                    actlAmtTdsForgn: getValue(tdsNode, "FORM15CB:ActlAmtTdsForgn"),
                    dednDateTds: getValue(tdsNode, "FORM15CB:DednDateTds")
                },

                /* ---------------- Accountant ---------------- */
                acctntDetls: {
                    nameAcctnt: getValue(acctntNode, "FORM15CB:NameAcctnt"),
                    nameFirmAcctnt: getValue(acctntNode, "FORM15CB:NameFirmAcctnt"),
                    membershipNumber: getValue(acctntNode, "FORM15CB:MembershipNumber"),
                    regNoAcctnt: getValue(acctntNode, "FORM15CB:RegNoAcctnt"),
                    acctntAddrs: {
                        premisesBuildingVillage: getValue(acctntAddrNode, "FORM15CB:PremisesBuildingVillage"),
                        townCityDistrict: getValue(acctntAddrNode, "FORM15CB:TownCityDistrict"),
                        flatDoorBuilding: getValue(acctntAddrNode, "FORM15CB:FlatDoorBuilding"),
                        areaLocality: getValue(acctntAddrNode, "FORM15CB:AreaLocality"),
                        pincode: getValue(acctntAddrNode, "FORM15CB:Pincode"),
                        state: getValue(acctntAddrNode, "Form:State"),
                        roadStreet: getValue(acctntAddrNode, "FORM15CB:RoadStreet"),
                        country: getValue(acctntAddrNode, "FORM15CB:Country")
                    }

                }
            };

            RemittanceService.uploadXmlApi(parsedModel).then(res => {
                if (res) {
                    toast.success("xml file sucessfully!")
                }
            }).finally(f => {

            });
        };

        reader.readAsText(file);
    };



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
                                Data Instantly for Remittances!
                            </p>
                        </div>
                        <div className="col-md-8">
                            <div className="row justify-content-between">
                                <div
                                    className="col-md-4"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (searchParams.get("formType")) {
                                            router.push(`/remitters/${remitterId}/dashboard/remittances/remittance-detail?partType=${searchParams.get("partType")}&formType=${searchParams.get("formType")}`);
                                        } else {
                                            router.push(`/remitters/${remitterId}/dashboard/remittances/remittance-detail?partType=${searchParams.get("partType")}`);
                                        }
                                    }}
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
                                                    Add Remittance
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
                                                        <input type="file" accept=".xml,.xlsx"
                                                            className="visually-hidden"
                                                            onChange={handleXmlUpload} />
                                                        <h5 className="fw-bold mb-0">
                                                            {" "}
                                                            {false ? "Uploading..." : "Import"}
                                                            <br />  {searchParams.get("partType") == "C" && searchParams.get("formType") == "15CA" ? "XML/" : ""}Excel File
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
            <section className="py-5 py-md-4 bg-light-gray">
                <div className="container">
                    <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
                        <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
                            <div className="col-md-8">
                                <h4 className="fw-bold mb-0">Remittances</h4>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex">
                                    <div className="input-group searchbox">
                                        <input
                                            type="search"
                                            placeholder="Search here"
                                            className="form-control bg-light-gray border-end-0"
                                            id="SearchRemitters"
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                                if (!e.target.value) {
                                                    setTimeout(() => {
                                                        fetchRemittances(1, e.target.value)
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
                                        {!showLoader && remittances && remittances.length > 0 && (
                                            <DataTable
                                                fixedHeader
                                                fixedHeaderScrollHeight="340px"
                                                columns={columns}
                                                data={remittances}
                                                pagination={true}
                                                paginationServer
                                                customStyles={customStyles}
                                                paginationTotalRows={totalRows}
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
            <Modal
                size="md"
                centered
                backdrop="static"
                keyboard={false}
                show={showErrorFile}
                onHide={() => setShowErrorFile(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">
                        Validation Errors
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {errors && errors.length > 0 ? (
                        <ul className="list-group list-group-flush">
                            {errors.map((error, index) => (
                                <li
                                    key={index}
                                    className="list-group-item text-danger border-0 px-0"
                                >
                                    • {error}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted text-center mb-0">No errors found.</p>
                    )}
                </Modal.Body>
            </Modal>

            {/* MODALS */}
            <ProcessPopup showLoader={showLoader} />
            <DeleteConfirmation
                show={deleteConfirm}
                deleteLoading={deleteLoading}
                setDeleteConfirm={(v) => setDeleteConfirm(v)}
                delete={deleteRemittance}
            />
        </>
    );
}
