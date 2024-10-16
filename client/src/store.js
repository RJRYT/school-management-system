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

const composeEnhancers = process.env.NODE_ENV === 'development' 
  ? composeWithDevTools(applyMiddleware(...middleware)) 
  : applyMiddleware(...middleware);

const store = createStore(rootReducer, initialState, composeEnhancers);

export default store;
