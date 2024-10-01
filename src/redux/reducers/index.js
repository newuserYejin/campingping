import { combineReducers } from "redux";
import authenticateReducer from "./authenticateReduce";

export default combineReducers({
  auth: authenticateReducer,
});
