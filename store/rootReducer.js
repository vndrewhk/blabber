import { combineReducers } from "redux";

import modalSlice from "./modalSlice";
import postSlice from "./postSlice";
const rootReducer = combineReducers({
  modal: modalSlice,
  postId: postSlice,
});

export default rootReducer;
