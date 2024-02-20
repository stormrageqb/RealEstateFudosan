import { combineReducers } from "redux";
import { reducer as auth } from "./auth";
import { reducer as navbarToggle } from "./navbarToggle";
import { reducer as profile } from "./profile";

const rootReducer = combineReducers({ auth, navbarToggle, profile });

export default rootReducer;
