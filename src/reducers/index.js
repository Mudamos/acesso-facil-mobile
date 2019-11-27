import accounts from "./accounts";
import { combineReducers } from "redux";
import configs from "./configs";
import notifications from "./notifications";

export default combineReducers({ accounts, configs, notifications });
