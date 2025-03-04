import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectContactsArray,
  selectLoading,
  selectOneContact,
} from "../../store/slices/ContactsSlice.ts";
import React, { useEffect, useState } from "react";
import {
  contactDelete,
  contactID,
  fetchAllContacts,
} from "../../store/thunks/ContactsThunks.ts";
import ContactItem from "../../components/ContactItem/ContactItem.tsx";
import Loader from "../../components/UI/Loader/Loader.tsx";
import ModalWindow from "../../components/UI/ModalWindow/ModalWindow.tsx";

const Home = () => {
  const contacts = useAppSelector(selectContactsArray);
  const oneContact = useAppSelector(selectOneContact);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleShow = async (id: string) => {
    setShowModal(true);
    await dispatch(contactID(id));
  };

  const handleClose = () => setShowModal(false);
  const contactDeletion = async () => {
    const warning = confirm("Do you really want to delete the contact");
    if (!warning) {
      setShowModal(false);
    } else {
      if (oneContact) {
        await dispatch(contactDelete(oneContact.id));
        await dispatch(fetchAllContacts());
      }
      setShowModal(false);
    }
  };

  let content: React.ReactNode | null = null;

  if (loading) content = <Loader />;
  if (contacts.length < 0) content = <h1>No contacts found.</h1>;
  if (!loading && contacts.length > 0)
    content = contacts.map((contact) => (
      <ContactItem
        key={contact.id}
        onHide={() => handleShow(contact.id)}
        imgUrl={contact.image}
        text={contact.name}
      />
    ));

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-50">{content}</div>
      <ModalWindow
        contact={oneContact}
        show={showModal}
        contactDeletion={contactDeletion}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Home;
