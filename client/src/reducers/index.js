import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import document from './document';
export default combineReducers({
  alert,
  auth,
  profile,
  document
});
