"use client";
import React from "react";
import Image from "next/image";

export default function BreadcrumbList(props) {
  const { breadcrumbs } = props;

  return (
    <>
      <section className="mt-2 breadcrumbs-sec bg-white sticky-top">
        <div className="container">
          <div className="row py-2">
            <div className="col-6">
              <nav aria-label="breadcrumb fs-14">
                <ul className="breadcrumb mb-0">
                  {breadcrumbs?.map((option, index) => (
                    <li
                      key={index}
                      className={
                        option.isActive
                          ? "breadcrumb-item fs-10 text-capitalize active ps-1"
                          : "breadcrumb-item fs-10 text-capitalize text-blue"
                      }
                    >
                      {!option.isActive ? (
                        <a className="d-flex align-items-center"

                          onClick={(e) => (window.location.href = option.href)}
                        >
                          {option.name} <Image
                            className="d-flex ms-1"
                            src="/images/dashboards/breadcumb_arrow.svg"
                            alt="breadcumb_arrow"
                            width={12}
                            height={12}
                          />
                        </a>
                      ) : (
                        <>{option.name}</>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="col-6 text-end">
              {typeof window != "undefined" && <p className="mb-0"><strong>{sessionStorage.getItem("deductorName")}</strong></p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
