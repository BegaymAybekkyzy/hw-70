import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectLoading } from "../../../store/slices/ContactsSlice.ts";
import Loader from "../Loader/Loader.tsx";
import { NavLink } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";

interface Props {
  show: boolean;
  handleClose: () => void;
  contact: contact;
  contactDeletion: () => void;
}

const ModalWindow: React.FC<Props> = ({
  show,
  handleClose,
  contact,
  contactDeletion,
}) => {
  const loading = useAppSelector(selectLoading);

  let content: React.ReactNode | null = null;

  if (loading) content = <Loader />;
  if (!contact)
    content = (
      <>
        <Modal.Header closeButton />
        <Modal.Body>
          <h1>Not found</h1>
        </Modal.Body>
      </>
    );

  if (!loading && contact)
    content = (
      <div>
        <Modal.Header closeButton />
        <Modal.Body>
          <Row>
            <Col xs={6} md={6}>
              <img
                src={contact.image}
                className="w-100 d-block"
                alt={contact.name}
              />
            </Col>
            <Col xs={6} md={6}>
              <h3 className="mb-4">{contact.name}</h3>
              <span className="d-block mb-2">
                <FaPhoneAlt className="me-2 fs-5" /> {contact.phone}
              </span>
              <span className="d-block">
                <HiOutlineMailOpen className="me-2 fs-5" /> {contact.email}
              </span>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <NavLink
            to={`/contacts/edit-contact/${contact.id}`}
            className="btn btn-primary"
          >
            Edit
          </NavLink>

          <Button disabled={loading} variant="danger" onClick={contactDeletion}>
            Delete
          </Button>
        </Modal.Footer>
      </div>
    );

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        {content}
      </Modal>
    </>
  );
};
export default ModalWindow;
