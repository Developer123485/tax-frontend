"use client";
import React from "react";
import Image from "next/image";
import Accordion from "react-bootstrap/Accordion";
import Slider from "react-slick";
import Header from "../components/header/header";

export default function Features() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Header></Header>
      <section className="py-5 subhero subhero-grd">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 py-md-5">
              <span className="fs-18">Streamline your</span>
              <h1 className="fw-bold mt-4 mt-md-2">
                <span className="text-blue">Automated TDS Software</span> for
                CAs & Multinational Enterprises - Anytime, Anywhere Access
              </h1>
            </div>
            <div className="col-md-5 d-flex justify-content-center">
              <Image
                className="w-100 img-fluid d-none d-md-block"
                src="/images/features_banner.svg"
                alt="features_banner"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="main-features py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <h1 className="fw-bold">Key Features of TaxVahan</h1>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/anytime_anywhere_icon.svg"
                      alt="anytime_anywhere_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      Anytime Anywhere
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-orange w-50 opacity-100"
                />

                <p className="mb-1">
                  Access TDS Filing Anytime, Anywhere Prepare and file TDS
                  returns remotely—no physical visits, no paperwork. Trusted by
                  CAs and multinational teams for 24/7 availability and seamless
                  digital operations.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/verify_pan_icon.svg"
                      alt="verify_pan_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">Verify PAN</h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-blue w-50 opacity-100"
                />

                <p className="mb-1">
                  Bulk PAN Verification Made Effortless Instantly validate
                  hundreds of PANs in one go—maximize accuracy, minimize manual
                  work, and keep your TDS filings error-free.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/easy_challan_icon.svg"
                      alt="easy_challan_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      Smart Challan-to-Transaction Mapping
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-orange w-50 opacity-100"
                />

                <p className="mb-1">
                  Auto-map Challans to transactions in one step with intelligent
                  drag-and-drop—speed up reconciliation with zero hassle.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/early_warnings_icon.svg"
                      alt="early_warnings_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      Proactive Error Detection
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-blue w-50 opacity-100"
                />

                <p className="mb-1">
                  Get early-stage alerts with 100+ built-in validations to
                  ensure smooth FVU file generation in a single attempt.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/error_fixing_icon.svg"
                      alt="error_fixing_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      One-Click Error Resolution
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-orange w-50 opacity-100"
                />

                <p className="mb-1">
                  Validate and correct returns effortlessly—no complex
                  navigation or manual fixes needed.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/balance_sheet_icon.svg"
                      alt="balance_sheet_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      Visual Ledger for Challans & Liabilities
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-blue w-50 opacity-100"
                />

                <p className="mb-1">
                  Track available Challans and liabilities through a dynamic
                  balance sheet view—gain financial clarity instantly.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/list_of_icon.svg"
                      alt="list_of_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      Auto-Detection of Unconsumed Challans
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-orange w-50 opacity-100"
                />

                <p className="mb-1">
                  Eliminate manual entries—TaxVahan auto-fetches and lists
                  unutilized Challans for faster processing.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/error_free_icon.svg"
                      alt="error_free_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      JAVA-Free FVU Generation
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-blue w-50 opacity-100"
                />

                <p className="mb-1">
                  Generate FVU files without installing or updating
                  JAVA—experience smooth, error-free return filing.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/no_morecsi_icon.svg"
                      alt="no_morecsi_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      CSI Handling Simplified
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-orange w-50 opacity-100"
                />

                <p className="mb-1">
                  Skip the tech headaches—we automatically manage CSI file
                  validations and linking in the background.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/conso_file_icon.svg"
                      alt="conso_file_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      Built-In Conso File Requests
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-blue w-50 opacity-100"
                />

                <p className="mb-1">
                  No more logging into TRACES—download Conso Files directly
                  within the platform in just a few clicks.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/detailed_tds_icon.svg"
                      alt="detailed_tds_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      In-Depth TDS Calculations
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-orange w-50 opacity-100"
                />

                <p className="mb-1">
                  Access full return breakdowns and TDS computations
                  instantly—transparency at every step.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-4 py-md-4 border border-1 rounded-3">
                <div className="row align-items-center">
                  <div className="col-5 col-md-5">
                    <Image
                      className=""
                      src="/images/features/no_training_icon.svg"
                      alt="no_training_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="col-7 col-md-7">
                    <h4 className="fw-bold text-capitalize mb-0">
                      Zero Learning Curve
                    </h4>
                  </div>
                </div>
                <hr
                  style={{ height: "3px" }}
                  className="border-0 bg-blue w-50 opacity-100"
                />

                <p className="mb-1">
                  Get started instantly with single sign-up and intuitive
                  navigation—no training or guidance required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-0 py-md-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 pe-md-5 features-list">
              <h2 className="fw-bold">
                How Simple Is TDS Filing with TaxVahan?
              </h2>
              <p>
                Experience hassle-free, automated TDS return preparation—no
                technical barriers, no repetitive tasks.
              </p>
              <ul className="list-group">
                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Prepare your entire TDS return using just one smart Excel
                  upload
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Instantly verify PANs in bulk—no manual entry
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Fully cloud-based, with no need to install or update Java
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  No CSI file download needed—system handles it for you
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Auto-fetches Challans from the govt. portal—zero data entry
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Effortless drag-and-drop mapping of Deductee to Challan
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  In-built return health check reduces error rates and
                  correction filings
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <Image
                className="w-100 img-fluid rounded-3 mt-3 mt-md-0"
                src="/images/features/how_easy.webp"
                alt="how_easy"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 order-2">
              <Image
                className="w-100 img-fluid rounded-3 mt-3 mt-md-0"
                src="/images/features/online_anywhere.webp"
                alt="online_anywhere"
                width={500}
                height={500}
              />
            </div>
            <div className="col-md-6 ps-md-5 order-md-2 features-list">
              <h2 className="fw-bold">
                File All Major TDS Forms Seamlessly — Anytime, Anywhere
              </h2>
              <p>
                Prepare and file Form 24Q (Salary), 26Q (Non-salary), 27Q
                (Non-resident), 27EQ, and correction returns entirely online
                using TaxVahan.
              </p>
              <ul className="list-group">
                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Upload a single smart Excel sheet to generate all forms
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Complete support for original and correction TDS returns
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Automatic error detection before FVU file generation—no
                  surprises
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Instantly locate and fix errors with guided in-app navigation
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  All actions are performed online—no software installations or
                  location-based limits
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-0 py-md-5 bg-semi-blue">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <h2 className="fw-bold">
                Smart, Scalable & Secure{" "}
                <span className="text-blue">TDS Filing Software</span> for CAs
                and Enterprises
              </h2>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6 pe-md-5 features-list">
              <p>
                TaxVahan is the preferred TDS return filing platform for CAs,
                tax practitioners, corporates, and enterprises—thanks to its
                intelligent automation and seamless user experience. Prepare TDS
                returns effortlessly using a single Excel upload or import TXT
                files directly. Manage bulk data with ease, auto-create client
                masters, and request justifications or correction returns—all
                from one cloud-based dashboard.
              </p>
              <ul className="list-group bg-semi-blue">
                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Cloud-accessible from anywhere with secure login
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Auto-fetch Challan data directly from the government portal—no
                  switching tabs
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Perform bulk PAN verifications at scale—ideal for high-volume
                  clients
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Designed to handle large datasets with accuracy and speed
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Built for professionals who demand reliability, efficiency,
                  and compliance assurance
                </li>
              </ul>
              <p>
                Experience the smarter way to manage TDS compliance—fully
                online, fully automated.
              </p>
            </div>
            <div className="col-md-6">
              <Image
                className="w-100 img-fluid rounded-3 mt-3 mt-md-0"
                src="/images/features/cloud_based.webp"
                alt="cloud_based"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="home-reviews py-5">
        <div className="container pb-md-5">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <h1 className="fw-bold">See what our users say about us</h1>
              <p>Users love our tax filing service</p>
            </div>
            <div className="col-md-2"></div>
          </div>
          <Slider {...settings}>
            <div className="g-3 bg-light-orange home-reviews-wrap px-3 py-4 px-md-4 py-md-4 rounded-4 align-items-center justify-content-between">
              <div className="col-md-12">
                <div className="d-flex flex-column">
                  <div className="img-wrap d-flex justify-content-center">
                    <Image
                      className="rounded-pill mb-4"
                      src="/images/review_user_thumbnail.png"
                      alt="user_thumbnail"
                      width={150}
                      height={150}
                    />
                  </div>
                  <h6 className="fw-bold mb-3">Kathy Jones</h6>
                  <p className="fs-14">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum.
                  </p>
                  <div className="d-flex">
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="g-3 bg-light-orange home-reviews-wrap px-3 py-4 px-md-4 py-md-4 rounded-4 align-items-center justify-content-between">
              <div className="col-md-12">
                <div className="d-flex flex-column">
                  <div className="img-wrap d-flex justify-content-center">
                    <Image
                      className="rounded-pill mb-4"
                      src="/images/review_user_thumbnail.png"
                      alt="user_thumbnail"
                      width={150}
                      height={150}
                    />
                  </div>
                  <h6 className="fw-bold mb-3">Kathy Jones</h6>
                  <p className="fs-14">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum.
                  </p>
                  <div className="d-flex">
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="g-3 bg-light-orange home-reviews-wrap px-3 py-4 px-md-4 py-md-4 rounded-4 align-items-center justify-content-between">
              <div className="col-md-12">
                <div className="d-flex flex-column">
                  <div className="img-wrap d-flex justify-content-center">
                    <Image
                      className="rounded-pill mb-4"
                      src="/images/review_user_thumbnail.png"
                      alt="user_thumbnail"
                      width={150}
                      height={150}
                    />
                  </div>
                  <h6 className="fw-bold mb-3">Kathy Jones</h6>
                  <p className="fs-14">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum.
                  </p>
                  <div className="d-flex">
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="g-3 bg-light-orange home-reviews-wrap px-3 py-4 px-md-4 py-md-4 rounded-4 align-items-center justify-content-between">
              <div className="col-md-12">
                <div className="d-flex flex-column">
                  <div className="img-wrap d-flex justify-content-center">
                    <Image
                      className="rounded-pill mb-4"
                      src="/images/review_user_thumbnail.png"
                      alt="user_thumbnail"
                      width={150}
                      height={150}
                    />
                  </div>
                  <h6 className="fw-bold mb-3">Kathy Jones</h6>
                  <p className="fs-14">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum.
                  </p>
                  <div className="d-flex">
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                    <Image
                      className=""
                      src="/images/icons/star_yelllow.svg"
                      alt="star"
                      width={14}
                      height={14}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </>
  );
}
