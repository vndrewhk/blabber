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
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
