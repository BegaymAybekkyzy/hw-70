import { Button, Form, Image } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { contactID, submitNewContact } from '../../store/thunks/ContactsThunks.ts';
import { NavLink, useNavigate } from 'react-router-dom';

interface Props {
  id?: string;
}

const initialValues = {
  name: '',
  email: '',
  phone: '',
  image: "",
};
const ContactForm: React.FC<Props> = ({id}) => {
  const [form, setForm] = useState<contactForm>(initialValues);
  const loading = useAppSelector(state => state.contacts.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchOneContact = useCallback(
    async (id: string) => {
      const response =  await dispatch(contactID(id));
      console.log(response);
    }, [dispatch]);

  useEffect(() => {
    if(!id) return;
    void fetchOneContact(id);
  }, [id, fetchOneContact]);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(submitNewContact({...form}));
    setForm(initialValues);
    navigate('/contacts');
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // if (name === "phone") {
    //   const numericValue = value.replace(/[^0-9\.]/g, '');;
    //   setForm({ ...form, [name]: numericValue });
    //   return;
    // }

    setForm({ ...form, [name]: value });
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          value={form.name}
          required
          disabled={loading}
          onChange={onChangeInput}
          type="text"/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          name="phone"
          pattern="[0-9]*"
          required
          disabled={loading}
          value={form.phone}
          onChange={onChangeInput}
          type="text"/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          disabled={loading}
          required
          value={form.email}
          onChange={onChangeInput}
          type="text"/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Photo</Form.Label>
        <Form.Control
          name="image"
          disabled={loading}
          required
          value={form.image}
          onChange={onChangeInput}
          type="text"/>
      </Form.Group>

      <div className="w-25 mb-3">
        Photo preview
        <Image className="d-block w-100" src={form.image} alt={form.name} rounded />
      </div>
      <Button disabled={loading} variant="primary" type="submit" className="me-2">Save</Button>
      <NavLink to="/" className="btn btn-secondary">Back to contacts</NavLink>
    </Form>
  );
};

export default ContactForm;