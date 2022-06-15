import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalStatus: false,
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
  },
});

export const { toggleModal, modalTrue, modalFalse } = modalSlice.actions;

export default modalSlice.reducer;
