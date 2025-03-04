import { Button, Form, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  editContact,
  submitNewContact,
} from "../../store/thunks/ContactsThunks.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { selectOneContact } from "../../store/slices/ContactsSlice.ts";

interface Props {
  isEdit?: boolean;
}

const initialValues = {
  name: "",
  email: "",
  phone: "",
  image: "",
};
const ContactForm: React.FC<Props> = ({ isEdit = false }) => {
  const [form, setForm] = useState<contactForm>(initialValues);
  const contact = useAppSelector(selectOneContact);
  const loading = useAppSelector((state) => state.contacts.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && contact) {
      setForm({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        image: contact.image,
      });
    } else setForm(initialValues);
  }, [contact, isEdit]);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEdit) {
      await dispatch(submitNewContact({ ...form }));
    }

    if (isEdit) {
      if (contact) await dispatch(editContact({ ...form, id: contact.id }));
    }
    setForm(initialValues);
    navigate("/contacts");
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          value={form.name}
          maxLength={60}
          required
          placeholder="Maximum number of characters 60"
          disabled={loading}
          onChange={onChangeInput}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          name="phone"
          pattern="[0-9]*"
          maxLength={10}
          required
          placeholder="0506789321"
          disabled={loading}
          value={form.phone}
          onChange={onChangeInput}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          placeholder="name@example.com"
          disabled={loading}
          maxLength={120}
          required
          value={form.email}
          onChange={onChangeInput}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Photo</Form.Label>
        <Form.Control
          name="image"
          disabled={loading}
          required
          maxLength={2083}
          value={form.image}
          onChange={onChangeInput}
          type="text"
        />
      </Form.Group>

      <div className="w-25 mb-3">
        Photo preview
        <Image
          className="d-block w-100"
          src={form.image}
          alt={form.name}
          rounded
        />
      </div>
      <Button
        disabled={loading}
        variant="primary"
        type="submit"
        className="me-2"
      >
        Save
      </Button>
      <NavLink to="/" className="btn btn-secondary">
        Back to contacts
      </NavLink>
    </Form>
  );
};

export default ContactForm;
