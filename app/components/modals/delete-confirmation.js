"use client";
import { React, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";

export default function DeleteConfirmation(props) {
  return (
    <>
      <Modal
        className=""
        size="md"
        centered
        keyboard={false}
        backdrop="static"
        show={props.show}
        onHide={() => props.setDeleteConfirm(false)}
      >
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12 text-center">
                <Image
                  className="mb-md-4"
                  src="/images/sure_to_delete.svg"
                  alt="sure_to_delete"
                  width={276}
                  height={160}
                />
                <h4>Are you sure?</h4>
                <p className="fs-14">Do you want to delete {props.name}?</p>
              </div>
            </div>
            <div className="row mb-3">
{/*               <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn btn-primary w-100"
                  onClick={() => props.setDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div> */}
              <div className="col-md-12 text-center">
                <button
                  type="button"
                  onClick={(e) => props.delete(e)}
                  className="btn btn btn-primary px-5"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
