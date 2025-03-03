import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectContactsArray, selectLoading } from '../../store/slices/ContactsSlice.ts';
import React, { useEffect, useState } from 'react';
import { fetchAllContacts } from '../../store/thunks/ContactsThunks.ts';
import ContactItem from '../../components/ContactItem/ContactItem.tsx';
import Loader from '../../components/UI/Loader/Loader.tsx';
import ModalWindow from '../../components/UI/ModalWindow/ModalWindow.tsx';

const Home = () => {
  const contacts = useAppSelector(selectContactsArray);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  let content: React.ReactNode | null = null;

  if(loading) content = <Loader/>;
  if(contacts.length < 0) content = <h1>No contacts found.</h1>;
  if(!loading && contacts.length > 0) content = (
    contacts.map(contact => (
      <ContactItem key={contact.id} onHide={handleShow} imgUrl={contact.image} text={contact.name} />
    ))
  );

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-50">
        {content}
      </div>
    <ModalWindow show={showModal} handleClose={handleClose}/>
    </div>
  );
};

export default Home;