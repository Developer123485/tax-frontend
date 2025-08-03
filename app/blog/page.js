"use client";
import React from "react";
import Image from "next/image";
import Header from "@/app/components/header/header";
import Link from "next/link";

export default function BlogList() {
  return (
    <>
      <Header></Header>

      <section className="blog-banner py-5 d-flex align-items-center">
        <div className="container align-middle h-25">
          <h1 className="display-4 text-center text-light fw-bold">
            Popular Blogs
          </h1>
        </div>
      </section>

      <section className="subhero-grd py-3">
        <div className="container">
          <div className="row salign-items-center">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link href="/">Taxvahan</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Blog
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <section className="py-5 py-md-4 blogs-list-sec">
        <div className="container">
          <div className="row d-flex">
            <div className="col-sm-4 pt-2">
              <div className="card content-box px-3 my-4 py-3 px-md-4 py-md-4 border-0 shadow rounded-4">
                <Link
                  href="/blog/how-to-file-tds-returns-online-step-by-step-guide-2025"
                  className="hover hover-3 text-decoration-none"
                >
                  <div className="rounded overflow-hidden">
                    <Image
                      src="/images/blog/file_tds_returns_online.webp"
                      alt="file_tds_returns_online"
                      className="img-fluid w-100 rounded-4"
                      loading="lazy"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="card-body px-0 pb-0 pt-3">
                    <h6 className="card-title mb-1 text-dark fw-500">
                      How to File TDS Returns Online: Step-by-Step Guide (2025)
                    </h6>
                    <small className="d-flex align-items-center text-muted">
                      <span className="me-2">
                        <i className="fa-regular fa-calendar-days"></i>
                      </span>
                      Thursday, 26 June 2025
                    </small>
                    <p className="card-text text-black my-3 my-md-3">
                      Filing TDS returns online in India has never been
                      easier—thanks to cloud-based TDS software. Whether you’re
                      a tax consultant, small business owner, or part of a
                      corporate finance team, moving your TDS process online can
                      save you hours every quarter.
                    </p>

                    <a
                      className="text-blue text-decoration-underline"
                      href="/blog/how-to-file-tds-returns-online-step-by-step-guide-2025"
                    >
                      Read More
                    </a>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
