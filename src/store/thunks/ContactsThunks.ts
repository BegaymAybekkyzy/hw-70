import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosAPI.ts";

export const fetchAllContacts = createAsyncThunk<contact[], void>(
  "contacts/fetchAllContacts",
  async () => {
    const response = await axiosApi<contactAPI>("contacts.json");
    const keysArray: string[] = Object.keys(response.data);
    const contacts: contact[] = keysArray.map((key: string) => {
      return {
        ...response.data[key],
        id: key,
      };
    });

    return contacts;
  },
);

export const contactID = createAsyncThunk<contact, string>(
  "contacts/fetchContactID",
  async (id) => {
    const response = await axiosApi<contactForm>(`contacts/${id}.json`);
    return {
      ...response.data,
      id: id,
    };
  },
);

export const editContact = createAsyncThunk<void, contact>(
  "contacts/editContact",
  async (contact) => {
    const updatedContact: contactForm = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      image: contact.image,
    };
    await axiosApi.put<contactForm>(
      `contacts/${contact.id}.json`,
      updatedContact,
    );
  },
);

export const contactDelete = createAsyncThunk<void, string>(
  "contacts/deleteContact",
  async (id) => {
    await axiosApi.delete<contactForm>(`contacts/${id}.json`);
  },
);

export const submitNewContact = createAsyncThunk<void, contactForm>(
  "contacts/submitNewContact",
  async (contact) => {
    await axiosApi.post(`contacts.json`, contact);
  },
);
