import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalStatus: false,
  input: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalStatus = !state.modalStatus;
    },
    modalTrue: (state) => {
      state.modalStatus = true;
    },
    modalFalse: (state) => {
      state.modalStatus = false;
    },
    inputTrue: (state) => {
      state.input = true;
    },
    inputFalse: (state) => {
      state.input = false;
    },
  },
});

export const { toggleModal, modalTrue, modalFalse, inputTrue, inputFalse } =
  modalSlice.actions;

export default modalSlice.reducer;
