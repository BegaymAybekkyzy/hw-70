import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import { useParams } from 'react-router-dom';

const ContactEditing = () => {
  const {id} = useParams();

  return (
    <div>
     <h1></h1>
      <ContactForm id={id}/>
    </div>
  );
};

export default ContactEditing;