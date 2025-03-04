import ContactForm from "../../components/ContactForm/ContactForm.tsx";

const ContactEditing = () => {
  return (
    <div>
      <h1 className="text-center">Edit contact</h1>
      <div className="mx-auto w-75 mb-5">
        <ContactForm isEdit />
      </div>
    </div>
  );
};

export default ContactEditing;
