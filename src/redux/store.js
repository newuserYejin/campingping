import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "./reducers/authenticateReduce";

const store = configureStore({
  reducer: {
    auth: authenticateReducer,
  },
});

export default store;
