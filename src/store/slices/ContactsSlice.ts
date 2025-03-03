import { createSlice } from "@reduxjs/toolkit";
import {
  contactDelete,
  contactID,
  editContact,
  fetchAllContacts,
  submitNewContact,
} from "../thunks/ContactsThunks.ts";

interface contactState {
  contacts: contact[];
  loading: boolean;
  contact: contactForm | null;
}

const initialState: contactState = {
  contacts: [],
  loading: false,
  contact: null,
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.contacts = payload;
      })
      .addCase(fetchAllContacts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(contactID.pending, (state) => {
        state.loading = true;
      })
      .addCase(contactID.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.contact = payload;
      })
      .addCase(contactID.rejected, (state) => {
        state.loading = false;
      })

      .addCase(editContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(editContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editContact.rejected, (state) => {
        state.loading = false;
      })

      .addCase(contactDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(contactDelete.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(contactDelete.rejected, (state) => {
        state.loading = false;
      })

      .addCase(submitNewContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitNewContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitNewContact.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
