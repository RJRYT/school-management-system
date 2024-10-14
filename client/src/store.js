import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; 
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducer";
import { studentReducer } from "./reducers/studentReducer";
import { libraryReducer } from "./reducers/libraryReducer";
import { feesReducer } from "./reducers/feesReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  library: libraryReducer,
  fees: feesReducer,
  user: userReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
