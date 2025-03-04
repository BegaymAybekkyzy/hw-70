import ContactForm from "../../components/ContactForm/ContactForm.tsx";

const AddNewContact = () => {
  return (
    <>
      <h1 className="text-center">Add a new contact</h1>
      <div className="mx-auto w-75 mb-5">
        <ContactForm isEdit={false} />
      </div>
    </>
  );
};

export default AddNewContact;
