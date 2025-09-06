"use client";
import React, { useState, useEffect, use } from "react";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import UserDetails from "../components/modals/user-details";
import { UsersService } from "../services/users.services";
import { useSearchParams } from "next/navigation";
import ProcessPopup from "../components/modals/processing";
import DataTable from "react-data-table-component";
import HeaderList from "../components/header/header-list";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AddUser from "../components/users/add-user";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../components/modals/delete-confirmation";

export default function Users() {
  const [show, setShow] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [userId, setUserId] = useState(0);
  const searchParams = useSearchParams(null);
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [deductorCount, setDeductorCount] = useState(0);
  const [deducteeCount, setDeducteeCount] = useState(0);
  const [challanCount, setChallanCount] = useState(0);
  const [deducteeEntryCount, setDeducteeEntryCount] = useState(0);
  const [salaryCount, setSalaryCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
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
      name: "Name",
      selector: (row) => (row.userName ? row.userName : "-"),
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Email",
      selector: (row) => (row.email ? row.email : "-"),
    },
    {
      name: "Phone No.",
      selector: (row) => row.phoneNumber || "-",
    },
    {
      name: "Plan",
      selector: (row) => row.SubscriptionId || "-",
    },
    {
      name: "Actions",
      button: true,
      selector: (row) => (
        <>
          {" "}
          <div className="d-flex justify-content-center">
            {/* <span>
              {" "}
              <a
                onClick={(e) => {
                  openUpdateUser(e, row.id);
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
            </span> */}
            <span className="mx-2 opacity-50">|</span>
            {/* <span>
              {" "}
              <a
                onClick={(e) => {
                  setUserId(row.id);
                  setConfirmTitle("User");
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
            </span> */}
          </div>
        </>
      ),
      style: {
        position: "sticky",
        right: 0,
        backgroundColor: "white",
        zIndex: 1, // Ensure it stays on top of other columns
      },
      width: "135px",
    },
  ];

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUsers("");
  }, [currentPage, pageSize]);


  function openUpdateUser(e, id) {
    e.preventDefault();
    UsersService.getUser(id).then(res => {
      if (res) {
        setUser(res);
        setOpenAddUser(true);
      }
    }).catch((e) => {
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      }
      else {
        toast.error(e?.message);
      }
    });
  }

  function fetchUsers(searchValue) {
    if (!searchValue) setShowLoader(true);
    const model = {
      pageSize: pageSize,
      pageNumber: currentPage,
      search: searchValue,
    };
    if (
      searchParams.get("token") ==
      "u85eddfes4edesw98548wswfe584478445545w5ss4d51sd55w"
    ) {
      UsersService.getUsers(model)
        .then((res) => {
          if (res && res.userList) {
            setUsers(res.userList);
            setTotalItems(res.totalRows);
            setUserCount(res.userCount);
            setDeductorCount(res.deductorCount);
            setDeducteeCount(res.deducteeCount);
            setChallanCount(res.challanCount);
            setDeducteeEntryCount(res.deducteeEntry);
            setSalaryCount(res.salaryCount);
          }
        }).catch(e => {
          if (e?.response?.data) {
            toast.error(e?.response?.data);
          }
          else {
            toast.error(e?.message);
          }
        })
        .finally((f) => {
          setShowLoader(false);
        });
    }
  }

  function deleteUser(params) {

  }

  return (
    <>
      <HeaderList></HeaderList>
      {searchParams.get("token") ==
        "u85eddfes4edesw98548wswfe584478445545w5ss4d51sd55w" && (
          <>
            <section className="py-5 py-md-4">
              <div className="container">
                <div className="row g-3">
                  <div className="col">
                    <div className="rounded-3 d-flex flex-row  align-items-center rounded-0 h-100 text-center px-2 py-2 border border-1">
                      <Image
                        className="me-2"
                        src="/images/dashboards/users_icon.svg"
                        alt="users_icon"
                        width={64}
                        height={64}
                      />
                      <div className="d-flex align-items-start text-start flex-column">
                        <h1 className="mb-0 fw-bold">{userCount}</h1>
                        <p className="mb-0 fs-12">Users</p>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className=" rounded-3 d-flex flex-row  align-items-center rounded-0 h-100 text-center px-2 py-2 border border-1">
                      <Image
                        className="me-2"
                        src="/images/dashboards/deductors_icon.svg"
                        alt="deductors_icons"
                        width={64}
                        height={64}
                      />
                      <div className="d-flex align-items-start text-start flex-column">
                        <h1 className="mb-0 fw-bold">{deductorCount}</h1>
                        <p className="mb-0 fs-12">Deductors</p>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className=" rounded-3 d-flex flex-row  align-items-center rounded-0 h-100 text-center px-2 py-2 border border-1">
                      <Image
                        className="me-2"
                        src="/images/dashboards/deductee_master_icon.svg"
                        alt="deductee_master_icon"
                        width={64}
                        height={64}
                      />
                      <div className="d-flex align-items-start text-start flex-column">
                        <h1 className="mb-0 fw-bold">{deducteeCount}</h1>
                        <p className="mb-0 fs-12">Deductee Master</p>

                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className=" rounded-3 d-flex flex-row  align-items-center rounded-0 h-100 text-center px-2 py-2 border border-1">
                      <Image
                        className="me-2"
                        src="/images/dashboards/challans_icon.svg"
                        alt="challans_icon"
                        width={64}
                        height={64}
                      />
                      <div className="d-flex align-items-start text-start flex-column">
                        <h1 className="mb-0 fw-bold">{challanCount}</h1>
                        <p className="mb-0 fs-12">Challans</p>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className=" rounded-3 d-flex flex-row  align-items-center rounded-0 h-100 text-center px-2 py-2 border border-1">
                      <Image
                        className="me-2"
                        src="/images/dashboards/deductee_entries_icon.svg"
                        alt="deductee_entries_icon"
                        width={64}
                        height={64}
                      />
                      <div className="d-flex align-items-start text-start flex-column">
                        <h1 className="mb-0 fw-bold">{deducteeEntryCount}</h1>
                        <p className="mb-0 fs-12">Deductee Entries</p>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className=" rounded-3 d-flex flex-row  align-items-center rounded-0 h-100 text-center px-2 py-2 border border-1">
                      <Image
                        className="me-2"
                        src="/images/dashboards/salary_details_icon.svg"
                        alt="salary_details_icon"
                        width={64}
                        height={64}
                      />
                      <div className="d-flex align-items-start text-start flex-column">
                        <h1 className="mb-0 fw-bold">{salaryCount}</h1>
                        <p className="mb-0 fs-12">Salary Details</p>
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
                    <div className="col-sm-4 col-md-6">
                      <h4 className="fw-bold mb-0">Users</h4>
                    </div>
                    <div className="col-sm-4 col-md-6 d-flex justify-content-end">
                      {/* <button
                        type="button"
                        onClick={(e) => setOpenAddUser(true)}
                        className="btn btn-primary me-2"
                      >
                        Add User
                      </button> */}
                      <div className="d-flex">
                        <div className="input-group searchbox">
                          <input
                            type="search"
                            placeholder="Search here"
                            className="form-control bg-light-gray border-end-0"
                            id="SearchDeductors"
                            onChange={(e) => {
                              setTimeout(() => {
                                fetchUsers(e.target.value);
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
                          {users && users.length > 0 && (
                            <DataTable
                              fixedHeader
                              fixedHeaderScrollHeight="340px"
                              columns={columns}
                              data={users}
                              highlightOnHover
                              pagination={true}
                              paginationServer
                              customStyles={customStyles}
                              paginationTotalRows={totalItems}
                              paginationPerPage={pageSize}
                              selectableRowsNoSelectAll={true}
                              paginationDefaultPage={currentPage}
                              paginationComponentOptions={{
                                noRowsPerPage: true,
                              }}
                              onChangePage={(page) => {
                                setCurrentPage(page);
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
          </>
        )}
      <ProcessPopup showLoader={showLoader}></ProcessPopup>
      <DeleteConfirmation
        show={deleteConfirm}
        name={confirmTitle}
        setDeleteConfirm={(e) => setDeleteConfirm(e)}
        delete={(e) => deleteUser(e)}
      ></DeleteConfirmation>
      <UserDetails show={show} setShow={(e) => setShow(e)}></UserDetails>
      <Modal
        className=""
        size="lg"
        centered
        keyboard={false}
        backdrop="static"
        show={openAddUser}
        onHide={() => setOpenAddUser(false)}
      >
        <Modal.Header className="border-0" closeButton>
          <h3 className="mb-0">Add User</h3>
        </Modal.Header>
        <Modal.Body>
          <AddUser setOpenAddUser={setOpenAddUser} fetchUsers={fetchUsers} user={user}></AddUser>
        </Modal.Body>
      </Modal>
    </>
  );
}
