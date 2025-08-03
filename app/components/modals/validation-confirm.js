"use client";
import { React, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";

export default function ValidationConfirmation(props) {
  return (
    <>
      <Modal
        className=""
        size="md"
        centered
        keyboard={false}
        backdrop="static"
        show={props.isFormValidationConfirmation}
        onHide={() => props.setIsFormValidationConfirmation(false)}
      >
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12 text-center">
                <p className="fs-14">
                  Do you want to Add Challans Detail with Validation?
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn btn-default w-100"
                  onClick={(e) => {
                    props.setIsFormValidationConfirmation(false);
                    props.submitForm(e, false);
                  }}
                >
                  No
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  onClick={(e) => {
                    props.setIsFormValidationConfirmation(false);
                    props.submitForm(e, true);
                  }}
                  className="btn btn btn-secondary w-100"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
