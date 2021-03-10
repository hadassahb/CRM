import { createStore, combineReducers, applyMiddleware,  } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { customerReducer } from "../reducers/customer";
import { authReducer } from "../reducers/auth";
import { orderReducer } from "../reducers/order";
import { productReducer } from "../reducers/product";

const rootReducer = combineReducers({
  customer: customerReducer,
  auth: authReducer,
  order: orderReducer,
  product: productReducer
});

export default function configureStore() {
  const middlewares = [ thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}