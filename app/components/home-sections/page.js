"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Accordion from "react-bootstrap/Accordion";
import Slider from "react-slick";
import Subscription from "../subscription/page";

export default function HomeSections() {
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

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  return (
    <>
      <section className="py-5 home-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 py-md-5">
              <h1 className="fw-bold mt-md-2 mt-4 mb-3">
                Simplify <span className="text-blue">TDS Filing.</span> Maximize{" "}
                <span className="text-blue">Compliance.</span>
              </h1>
              <span className="fs-18">
                Get ready to streamline your TDS returns with automation,
                accuracy, and zero hassle. We’re here to help you file smarter,
                faster, and with complete confidence.
              </span>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <Image
                className="w-100 img-fluid d-none d-md-block"
                src="/images/main_banner.png"
                alt="main_banner"
                width={500}
                height={500}
              />
            </div>
            <div className="col-md-10">
              <div className="mt-4 mb-4 mb-md-0">
                <h3>Our Services</h3>
              </div>
              <div className="d-flex flex-column flex-md-row mt-md-4 align-items-center">
                <div className="d-flex flex-column">
                  <Image
                    className="mb-3"
                    src="/images/fastest_refund_icon.svg"
                    alt="fastest_refund_icon"
                    width={64}
                    height={64}
                  />
                  <h5 className="text-capitalize">
                    Automated TDS Return Filing
                  </h5>
                  <p className="fs-14">
                    Speed up your TDS filing process with intelligent
                    automation—file accurate returns in minutes, not hours.
                  </p>
                </div>
                <div className="d-flex flex-column my-3 my-md-0">
                  <Image
                    className="mb-3"
                    src="/images/precision_accuracy_icon.svg"
                    alt="precision_accuracy_icon"
                    width={64}
                    height={64}
                  />
                  <h5 className="text-capitalize">
                    Precision with 100% Accuracy
                  </h5>
                  <p className="fs-14">
                    Minimize errors with built-in validations, guided
                    corrections, and real-time data checks.
                  </p>
                </div>
                <div className="d-flex flex-column">
                  <Image
                    className="mb-3"
                    src="/images/simple_hassle_free_icon.svg"
                    alt="simple_hassle_free_icon"
                    width={64}
                    height={64}
                  />
                  <h5 className="text-capitalize">
                    Simple & Hassle-Free Experience
                  </h5>
                  <p className="fs-14">
                    Prepare and file TDS returns effortlessly using a single
                    Excel upload—no technical knowledge required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-md-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 pe-md-5">
              <h2 className="fw-bold">
                File TDS Returns & Generate Form 16 – Effortlessly
              </h2>
              <p>
                TaxVahan is India’s trusted cloud-based TDS solution built for
                businesses, CAs, and tax professionals. No downloads, no
                complications—just smooth, secure, and fully compliant e-TDS
                filing from anywhere.
              </p>
              <p>
                Prepare returns, generate Form 16, and manage compliance with
                automated checks, real-time error detection, and bulk data
                processing—all from one intuitive platform.
              </p>
            </div>
            <div className="col-md-6">
              <Image
                className="w-100 img-fluid rounded-3 mt-3 mt-md-0"
                src="/images/home_about.webp"
                alt="home_about"
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
                src="/images/home_hiw.webp"
                alt="home_hiw"
                width={500}
                height={500}
              />
            </div>
            <div className="col-md-6 ps-lg-5 order-md-2">
              <p>How It Works</p>
              <h2 className="fw-bold text-capitalize">
                5 Simple Steps to File Your TDS Return with Ease
              </h2>
              <div className="row pt-3">
                <div className="col-sm-6 col-md-12 col-lg-6">
                  <div className="d-flex mt-3">
                    <div className="me-2">
                      <Image
                        className="mb-3"
                        src="/images/howitworks/easy_sign_icon.svg"
                        alt="easy_sign_icon"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="">
                      <h5 className="text-capitalize">Sign Up or Log In</h5>
                      <p className="fs-14">
                        Start by creating your account or logging in securely to
                        the dashboard.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-12 col-lg-6">
                  <div className="d-flex mt-3">
                    <div className="me-2">
                      <Image
                        className="mb-3"
                        src="/images/howitworks/upload_excel_txt_icon.svg"
                        alt="upload_excel_txt_icon"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="">
                      <h5 className="text-capitalize">
                        Upload Excel or TXT File
                      </h5>
                      <p className="fs-14">
                        Import your data using a single Excel sheet or valid TXT
                        file format.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-12 col-lg-6">
                  <div className="d-flex mt-3">
                    <div className="me-2">
                      <Image
                        className="mb-3"
                        src="/images/howitworks/pre-filled_data_icon.svg"
                        alt="pre-filled_data_icon"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="">
                      <h5 className="text-capitalize">
                        Auto-Fetch PAN & Challans
                      </h5>
                      <p className="fs-14">
                        Let the system verify PANs and fetch Challans directly
                        from the government portal.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-12 col-lg-6">
                  <div className="d-flex mt-3">
                    <div className="me-2">
                      <Image
                        className="mb-3"
                        src="/images/howitworks/post-filled_data_icon.svg"
                        alt="post-filled_data_icon"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="">
                      <h5 className="text-capitalize">Validate & Fix Errors</h5>
                      <p className="fs-14">
                        Get instant error detection with guided corrections
                        before FVU generation.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-12 col-lg-6">
                  <div className="d-flex mt-3">
                    <div className="me-2">
                      <Image
                        className="mb-3"
                        src="/images/howitworks/file_download_icon.svg"
                        alt="file_download_icon"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="">
                      <h5 className="text-capitalize">
                        File & Download Form 16/Conso
                      </h5>
                      <p className="fs-14">
                        Generate FVU, file return, and download Form 16 or
                        Conso—all in one place.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-5 pb-5 py-md-5">
        <div className="container">
          <div className="row orange-cta-wrap px-3 px-md-5 pt-md-5 pb-md-3 mt-md-5 mt-4 rounded-4 shadow">
            <div className="col-md-6 text-white text-center text-md-start order-2">
              <h1 className="fw-bold">
                Make TDS Compliance Effortless with TaxVahan
              </h1>
              <p className="my-4 fs-6">
                Join thousands of CAs, tax professionals, and enterprises who
                trust our platform for fast, accurate, and stress-free TDS
                filing. Try the demo or sign up today—start filing smarter, not
                harder.
              </p>
            </div>
            <div className="col-md-6 order-md-2">
              <Image
                className="img-fluid rupee-sign"
                src="/images/rupee_sign.svg"
                alt="rupee_sign"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="home-features pt-3">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <h1 className="fw-bold">What We Do</h1>
              <p>
                TaxVahan offers an intelligent, cloud-based solution to simplify
                TDS return filing for CAs, tax professionals, and
                enterprises—available 24/7.
              </p>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row g-3 mb-4 mb-md-5 pb-4">
            <div className="col-12 col-sm-6 col-md-4 col-lg">
              <div className="content-box bg-white text-center px-3 px-md-3 py-md-4 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-3 mt-2"
                  src="/images/services/financial_management_icon.svg"
                  alt="financial_management_icon"
                  width={150}
                  height={181}
                />
                <h5 className="fw-bold text-capitalize">
                  Real-Time TDS <br />
                  Management
                </h5>
                <hr
                  style={{ height: "2px" }}
                  className="border-0 bg-orange w-25 mx-auto opacity-100"
                />
                <p className="fs-14">
                  Track, manage, and reconcile TDS data with full visibility on
                  challans, liabilities, and deductions.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg">
              <div className="content-box bg-white text-center px-3 px-md-3 py-md-4 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-3 mt-2"
                  src="/images/services/easy_tax_filing_icon.svg"
                  alt="easy_tax_filing_icon"
                  width={150}
                  height={181}
                />
                <h5 className="fw-bold text-capitalize">
                  Hassle-Free <br />
                  Return Filing
                </h5>
                <hr
                  style={{ height: "2px" }}
                  className="border-0 bg-orange w-25 mx-auto opacity-100"
                />
                <p className="fs-14">
                  Prepare and file TDS returns with ease—just upload your data
                  and let automation handle the rest.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg">
              <div className="content-box bg-white text-center px-3 px-md-3 py-md-4 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-3 mt-2"
                  src="/images/services/accurate_calculations_icon.svg"
                  alt="accurate_calculations_icon"
                  width={150}
                  height={181}
                />
                <h5 className="fw-bold text-capitalize">
                  Accurate & Instant <br />
                  Calculations
                </h5>
                <hr
                  style={{ height: "2px" }}
                  className="border-0 bg-orange w-25 mx-auto opacity-100"
                />
                <p className="fs-14">
                  Get real-time TDS computations with built-in validations to
                  minimize errors and correction returns.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg">
              <div className="content-box bg-white text-center px-3 px-md-3 py-md-4 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-3 mt-2"
                  src="/images/services/maximize_deductions_icon.svg"
                  alt="maximize_deductions_icon"
                  width={150}
                  height={181}
                />
                <h5 className="fw-bold text-capitalize">
                  Maximize Compliance & <br />
                  Efficiency
                </h5>
                <hr
                  style={{ height: "2px" }}
                  className="border-0 bg-orange w-25 mx-auto opacity-100"
                />
                <p className="fs-14">
                  Identify deductions, auto-verify PANs, and stay
                  compliant—without manual work or technical glitches.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg">
              <div className="content-box bg-white text-center px-3 px-md-3 py-md-4 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-3 mt-2"
                  src="/images/services/expert_support_icon.svg"
                  alt="expert_support_icon"
                  width={150}
                  height={181}
                />
                <h5 className="fw-bold text-capitalize">
                  Dedicated Expert <br />
                  Support
                </h5>
                <hr
                  style={{ height: "2px" }}
                  className="border-0 bg-orange w-25 mx-auto opacity-100"
                />
                <p className="fs-14">
                  Our India-based team of tax experts is here to assist you
                  every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="home-reviews pb-5">
        <div className="container">
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
      </section> */}
      {/* <Subscription></Subscription> */}
      <section className="py-5 home-faqs">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <h1 className="fw-bold">Frequently Asked Questions (FAQs)</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    1. What is a TDS return and who is required to file it?
                  </Accordion.Header>
                  <Accordion.Body>
                    TDS (Tax Deducted at Source) returns are quarterly
                    statements that must be filed by all entities who deduct TDS
                    while making payments such as salary, contractor payments,
                    rent, interest, etc.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    2. Which forms are required for TDS return filing?
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>
                        <strong>Form 24Q</strong> &ndash; For salary payments
                      </li>
                      <li>
                        <strong>Form 26Q</strong> &ndash; For non-salary
                        domestic payments
                      </li>
                      <li>
                        <strong>Form 27Q</strong> &ndash; For non-resident
                        payments
                      </li>
                      <li>
                        <strong>Form 27EQ</strong> &ndash; For TCS (Tax
                        Collected at Source)
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    3. What documents do I need to file a TDS return?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>You’ll need:</p>
                    <ul>
                      <li>TAN and PAN of the deductor/deductees</li>
                      <li>Challan details (CIN)</li>
                      <li>Deduction details (amount, section, date)</li>
                      <li>Form 16/16A if applicable</li>
                      <li>DSC (if filing with digital signature)</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    4. What are the due dates for filing TDS returns?
                  </Accordion.Header>
                  <Accordion.Body>
                    <table>
                      <thead>
                        <tr>
                          <td>
                            <p>
                              <strong>Quarter</strong>
                            </p>
                          </td>
                          <td>
                            <p>
                              <strong>Period</strong>
                            </p>
                          </td>
                          <td>
                            <p>
                              <strong>Due Date</strong>
                            </p>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <p>Q1</p>
                          </td>
                          <td>
                            <p>Apr&ndash;Jun</p>
                          </td>
                          <td>
                            <p>31st July</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Q2</p>
                          </td>
                          <td>
                            <p>Jul&ndash;Sep</p>
                          </td>
                          <td>
                            <p>31st October</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Q3</p>
                          </td>
                          <td>
                            <p>Oct&ndash;Dec</p>
                          </td>
                          <td>
                            <p>31st January</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Q4</p>
                          </td>
                          <td>
                            <p>Jan&ndash;Mar</p>
                          </td>
                          <td>
                            <p>31st May</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    5. Can I revise a TDS return after filing?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, you can file a correction return to rectify errors such
                    as incorrect PANs, challan mismatches, or deduction amounts.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    6. What are the penalties for late TDS filing?
                  </Accordion.Header>
                  <Accordion.Body>
                    A penalty of ₹200 per day under Section 234E is charged for
                    late filing, subject to a maximum of the TDS amount.
                    Additional penalties may apply under Section 271H.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header>
                    7. Can I file TDS returns online without using NSDL
                    software?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes! Our cloud-based software enables you to file returns
                    online, validate FVU files, and submit directly to
                    NSDL—without needing offline utilities.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                  <Accordion.Header>
                    8. Is PAN verification available within the software?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, our solution offers bulk PAN verification integrated
                    with TRACES and NSDL.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                  <Accordion.Header>
                    9. Does your software support multiple TANs or clients?
                  </Accordion.Header>
                  <Accordion.Body>
                    Absolutely. Our platform is ideal for consultants and firms
                    managing multiple clients or TANs.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="9">
                  <Accordion.Header>
                    10. Do I need a Digital Signature Certificate (DSC) to file
                    TDS returns?
                  </Accordion.Header>
                  <Accordion.Body>
                    DSC is mandatory for certain entities (e.g. companies or
                    revised returns). Our software supports DSC-based filing.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-4 pb-5 mb-2">
        <div className="container">
          <div className="row g-3 bg-gray blue-cta-wrap px-3 px-md-5 py-md-4 rounded-3 align-items-center justify-content-between">
            <div className="col-md-7 mt-md-0">
              <div className="text-center text-md-start">
                <h1 className="fw-bold mb-3">Ready to file TDS returns?</h1>
                <p className="fs-6">
                  Consume all TDS challans, never get a tax notice again.
                </p>
                <button className="btn btn-primary btn-lg" onClick={(e) => window.location.href = "/signup"}>
                  Start for Free
                </button>
              </div>
            </div>
            <div className="col-md-3 mt-md-0 text-center">
              <Image
                className="img-fluid mt-3 mt-md-0"
                src="/images/blue_cta_character.svg"
                alt="blue_cta_character"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
