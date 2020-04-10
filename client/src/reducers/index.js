import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import setting from '../setting/redux/reducer';
import social from '../social/reducer';
export default combineReducers({
  alert,
  auth,
  profile,
  setting,
  social
});
