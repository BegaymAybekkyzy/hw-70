import { Route, Routes } from "react-router-dom";
import Home from "./Containers/Home/Home.tsx";
import AddNewContact from "./Containers/AddNewContact/AddNewContact.tsx";
import ContactEditing from "./Containers/ContactEditing/ContactEditing.tsx";
import Layout from "./components/Layout/Layout.tsx";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Home />} />
          <Route path="/contacts/new-contact" element={<AddNewContact />} />
          <Route
            path="/contacts/edit-contact/:id"
            element={<ContactEditing />}
          />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
