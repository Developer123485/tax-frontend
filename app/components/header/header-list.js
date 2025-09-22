"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CommonService } from "@/app/services/common.service";
import { useRouter } from "next/navigation";
import { UserAuthContext } from "../AuthContext";

export default function HeaderList() {
  const router = useRouter(null);
  const pathname = usePathname();
  function logout() {
    sessionStorage.clear();
    sessionStorage.clear();
    router.push("/");
  }
  return (
    <>
      <UserAuthContext>
        <nav
          id="navbar_top"
          className="navbar header navbar-expand-lg navbar-light py-2 bg-white shadow fixed-top"
        >
          <div className="container">
            <div className="col-lg-3 col-md-4 col-sm-10 col-4 text-start d-flex">
              <a className="d-flex" href="/deductors">
                <Image
                  src="/images/header_logo.svg"
                  alt="header_logo"
                  width={190}
                  height={54}
                  className="img-fluid"
                />
              </a>
            </div>
            <div
              className={`${CommonService.isUserLogin()
                ? "col-lg-8 col-md-1 col-sm-1 col-1 text-end order-2 order-md-2 order-lg-1"
                : "col-lg-6 col-md-1 col-sm-1 col-1 text-end order-2 order-md-2 order-lg-1"
                }`}
            >
              <button
                className="navbar-toggler nav-togg ms-2 ms-md-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#main_nav"
                aria-controls="main_nav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="navbar-collapse justify-content-end collapse pe-md-3"
                id="main_nav"
              >
                {CommonService.isUserLogin() &&
                  CommonService.userDetail().role == "SuperAdmin" && (
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a
                          className={
                            pathname == "/deductors"
                              ? "active nav-link px-3"
                              : "nav-link px-3"
                          }
                          onClick={(e) => router.push("/deductors")}
                        >
                          Deductors
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            pathname.includes("users")
                              ? "active nav-link px-3"
                              : "nav-link px-3"
                          }
                          onClick={(e) =>
                            router.push(
                              "/users?token=u85eddfes4edesw98548wswfe584478445545w5ss4d51sd55w"
                            )
                          }
                        >
                          Users
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            pathname.includes("tds-rates")
                              ? "active nav-link px-3"
                              : "nav-link px-3"
                          }
                          onClick={(e) =>
                            router.push(
                              "/tds-rates?token=u85eddfes4edesw98548wswfe584478445545w5ss4d51sd55w"
                            )
                          }
                        >
                          TDS Rates
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            pathname.includes("tax-deposit")
                              ? "active nav-link px-3"
                              : "nav-link px-3"
                          }
                          onClick={(e) =>
                            router.push(
                              "/tax-deposit?token=u85eddfes4edesw98548wswfe584478445545w5ss4d51sd55w"
                            )
                          }
                        >
                          Tax Deposit
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            pathname.includes("return-filling")
                              ? "active nav-link px-3"
                              : "nav-link px-3"
                          }
                          onClick={(e) =>
                            router.push(
                              "/return-filling?token=u85eddfes4edesw98548wswfe584478445545w5ss4d51sd55w"
                            )
                          }
                        >
                          Return Filling
                        </a>
                      </li>
                    </ul>
                  )}
                {CommonService.isUserLogin() &&
                  CommonService.userDetail().role == "Admin" && pathname == "/profile" && (
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a
                          className={
                            pathname == "/deductors"
                              ? "active nav-link px-3"
                              : "nav-link px-3"
                          }
                          onClick={(e) => router.push("/deductors")}
                        >
                          Deductors
                        </a>
                      </li>
                    </ul>
                  )}
              </div>
            </div>
            <div
              className={`${CommonService.isUserLogin()
                ? "col-lg-1 col-md-7 col-sm-1 col-7 d-flex justify-content-end order-1 order-md-1 order-lg-2"
                : "col-lg-3 col-md-7 col-sm-1 col-7 d-flex justify-content-end order-1 order-md-1 order-lg-2"
                }`}
            >
              {CommonService.isUserLogin() && (
                <div className="dropdown login-dropdown bg-light-gray px-2 py-1 border border-1 rounded-pill">
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center text-black text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Image
                      className="me-2"
                      src="/images/dashboards/user_toggle.svg"
                      alt="user_toggle"
                      width={24}
                      height={24}
                    />
                    <Image
                      className="bg-dark-gray rounded-pill"
                      src="/images/dashboards/user_male_icon.svg"
                      alt="user_male_icon"
                      width={30}
                      height={30}
                    />
                  </a>
                  <ul
                    className="dropdown-menu position-absolute end-0"
                    aria-labelledby="userDropdown"
                  >
                    <li className="curser-pointer">
                      <a
                        className="dropdown-item"
                        onClick={(e) => router.push("/profile")}
                      >
                        Profile
                      </a>
                    </li>
                    <hr className="dropdown-divider" />
                    <li className="curser-pointer">
                      <a className="dropdown-item" onClick={(e) => logout()}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </UserAuthContext>
    </>
  );
}
