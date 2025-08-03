"use client";
import { React } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";

export default function FormConfirmation(props) {
  return (
    <>
      <Modal
        className=""
        size="md"
        centered
        keyboard={false}
        backdrop="static"
        show={props.isFormConfirmation}
        onHide={() => props.setIsFormConfirmation(false)}
      >
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body className="px-md-3 pb-md-5">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12 text-center">
                <Image
                  className="w-50 img-fluid mb-4"
                  src="/images/dashboards/generate_form_data.svg"
                  alt="generate_form_data"
                  width={500}
                  height={500}
                />
                <h3 className="fw-bold">Are you sure?</h3>
                <p className="fs-16 my-3">Do you want to {props.name}.</p>
              </div>
            </div>
            <div className="row">
              {/*               <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={() => props.setIsFormConfirmation(false)}
                >
                  Cancel
                </button>
              </div> */}
              <div className="col-md-12 d-flex justify-content-center">
                <button
                  type="button"
                  onClick={(e) => props.submitForm(e)}
                  className="btn btn btn-primary px-md-5 w-auto"
                  disabled={props.isLoading}
                >
                  {props.isLoading && (
                    <div className="spinner-border me-2" role="status"></div>
                  )}
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
