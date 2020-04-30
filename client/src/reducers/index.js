import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import setting from "../setting/redux/reducer";
import social from "../social/reducer";
import communityboard from "../community-board/reducer";
import document from "./document";
import job from "./job";
export default combineReducers({
  alert,
  auth,
  profile,
  setting,
  social,
  communityboard,
  job,
  document,
});
