"use client";
import { React, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";

export default function UserDetails(props) {
  return (
    <>
      <Modal
        className=""
        size=""
        centered
        keyboard={false}
        backdrop="static"
        show={props.show}
        onHide={() => props.setShow(false)}
      >
        <Modal.Header className="border-0" closeButton>
          {" "}
          <h3 className="mb-0">User Details</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <row className="row g-3 mb-3 mb-md-3">
              <div className="col-md-12">
                <label for="inputDeductors" className="form-label">
                  Deductors
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDeductors"
                />
              </div>
              <div className="col-md-12">
                <label for="inputDeductee" className="form-label">
                  Deductee
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDeductee"
                />
              </div>
              <div className="col-md-12">
                <label for="inputChallan" className="form-label">
                  Challan
                </label>
                <input type="text" className="form-control" id="inputChallan" />
              </div>
              <div className="col-md-12">
                <label for="inputDeducteeDetail" className="form-label">
                  Deductee Detail
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDeducteeDetail"
                />
              </div>
              <div className="col-md-12">
                <label for="inputDeducteeDetail" className="form-label">
                  Salary Detail
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDeducteeDetail"
                />
              </div>
            </row>
            <div className="row g-3">
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn btn-secondary w-100"
                  onClick={() => props.setShow(false)}
                >
                  Cancel
                </button>
              </div>
              {/* <div className="col-md-6">
                <button type="button" className="btn btn btn-primary w-100">
                  Save
                </button>
              </div> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
