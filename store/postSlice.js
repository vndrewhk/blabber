import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postId: "",
};

const postSlice = createSlice({
  name: "postId",
  initialState,
  reducers: {
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
  },
});

export const { setPostId } = postSlice.actions;

export default postSlice.reducer;
