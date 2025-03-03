import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosAPI.ts";
import { RootState } from "../../app/store.ts";

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

export const contactID = createAsyncThunk<contactForm, string>(
  "contacts/fetchContactID",
  async (id) => {
    const response = await axiosApi<contactForm>(`contacts/${id}json`);
    return response.data;
  },
);

export const editContact = createAsyncThunk<void, string, { state: RootState }>(
  "contacts/editContact",
  async (id, thunkAPI) => {
    const updatedContact = thunkAPI.getState().contacts.contact;
    await axiosApi.put<contactForm>(`contacts/${id}json`, updatedContact);
  },
);

export const contactDelete = createAsyncThunk<void, string>(
  "contacts/deleteContact",
  async (id) => {
    await axiosApi.delete<contactForm>(`contacts/${id}json`);
  },
);

export const submitNewContact = createAsyncThunk<void, contact>(
  "contacts/submitNewContact",
  async (contact) => {
    await axiosApi.post(`contacts/`, contact);
  },
);
