import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; 
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducer";
import { studentReducer } from "./reducers/studentReducer";
import { libraryReducer } from "./reducers/libraryReducer";
import { feesReducer } from "./reducers/feesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  library: libraryReducer,
  fees: feesReducer,
});

const initialState = {};

// No change needed here
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
