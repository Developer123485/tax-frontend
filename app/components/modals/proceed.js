"use client";
import { React, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";

export default function Proceed() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={()=> setShow(true)}>
        Launch demo modal
      </Button>
      <Modal
        className=""
        size=""
        centered
        keyboard={false}
        backdrop="static"
        show={show}
        onHide={()=> setShow(false)}
      >
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12 text-center">
                <Image
                  className="mb-4 mb-md-4"
                  src="/images/icons/success_icon.png"
                  alt="success_icon"
                  width={90}
                  height={90}
                />
                <h3>Proceed</h3>
                <p className="fs-12">No errors in your Deductor, Good job!</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn btn-primary"
                  onClick={()=> setShow(false)}
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
