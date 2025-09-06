"use client";
import React, { useState, use, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import "react-toastify/dist/ReactToastify.css";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { DeductorsService } from "@/app/services/deductors.service";
import ProcessPopup from "@/app/components/modals/processing";

export default function TracesActivities({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const [showLoader, setShowLoader] = useState(true);
  const router = useRouter();
  const [deductorInfo, setDeductorInfo] = useState(null);
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
      name: "Traces Activities",
      isActive: true,
    },
  ]);

  useEffect(() => {
    if (
      deductorId > 0
    ) {
      getDeductorDetail();
    } else {
      router.push("/deductors");
    }
  }, []);


  function getDeductorDetail() {
    DeductorsService.getDeductor(deductorId).then(
      (res) => {
        if (res) {
          setDeductorInfo(res);
          setShowLoader(false);
        }
      }).catch(e => {
        if (e?.response?.data) {
          toast.error(e?.response?.data);
        }
        else {
          toast.error(e?.message);
        }
      })
  }

  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="py-4 pb-md-0 bg-light-gray"></section>
      <section className="py-5 pt-md-0 pb-md-5 bg-light-gray">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 bg-white border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
              <div className="row g-3">
                <div className="col-md-12">
                  <span className="me-1">Deductor Name:</span>
                  <span className="fw-bold text-uppercase">
                    {deductorInfo?.deductorName}
                  </span>
                </div>
                <div className="col-md-12">
                  <span className="me-1">TAN:</span>
                  <span className="fw-bold text-uppercase"> {deductorInfo?.deductorTan}</span>
                </div>
                <div className="col-md-12">
                  <span className="me-1">PAN:</span>
                  <span className="fw-bold text-uppercase">{deductorInfo?.deductorPan}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 bg-white border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
              <div className="row g-3 align-items-start traces-act-wrap">
                <div className="col-md-4 d-flex flex-column ">
                  <button className="btn btn-primary ">Edit Details</button>
                  <button className="btn btn-secondary"
                    onClick={(e) => {
                      if (
                        deductorId &&
                        parseInt(deductorId) > 0
                      ) {
                        router.push(
                          `/deductors/${deductorId}/tds/traces-activities/request-conso-file`
                        );
                      }
                    }}
                  >
                    Request Conso File
                  </button>
                  <button className="btn btn-info  text-dark">
                    View Requested Downloads
                  </button>
                  <button className="btn btn-outline-primary">
                    emSigner Download Link
                  </button>
                </div>

                <div className="col-md-4 d-flex flex-column ">
                  <button className="btn btn-warning ">Forgot Password</button>
                  <button className="btn btn-dark"
                    onClick={(e) => {
                      if (
                        deductorId &&
                        parseInt(deductorId) > 0
                      ) {
                        router.push(
                          `/deductors/${deductorId}/tds/traces-activities/request-form-16-16a-27d`
                        );
                      }
                    }}
                  >
                    Request Form 16/16A/27D
                  </button>
                  <button className="btn btn-warning  text-white">
                    Declaration for Non-FilinG
                  </button>
                  <button className="btn btn-dark ">
                    Request Tr. based Report (27Q)
                  </button>
                </div>

                <div className="col-md-4 d-flex flex-column ">
                  <button className="btn btn-success ">Login</button>
                  <button className="btn btn-secondary "
                    onClick={(e) => {
                      if (
                        deductorId &&
                        parseInt(deductorId) > 0
                      ) {
                        router.push(
                          `/deductors/${deductorId}/tds/traces-activities/request-justification-report`
                        );
                      }
                    }}
                  >
                    Request Justification Report
                  </button>
                  <button className="btn btn-danger ">View/Edit ProFile</button>
                  <button className="btn btn-success "
                    onClick={(e) => {
                      if (
                        deductorId &&
                        parseInt(deductorId) > 0
                      ) {
                        router.push(
                          `/deductors/${deductorId}/tds/traces-activities/request-for-online-correction`
                        );
                      }
                    }}
                  >
                    Request for Online Correction
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ProcessPopup showLoader={showLoader}></ProcessPopup>
        </div>
      </section>
    </>
  );
}
