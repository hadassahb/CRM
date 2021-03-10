
import { SIGN_IN, SIGN_OUT } from "../store/types";

function isSignIned() {
  const token = localStorage.getItem("react-crm-token")
  return token ? true : false
}

function getUser(){
  const user = localStorage.getItem("react-crm-user")
  return user ? JSON.parse(user) : {} 
}
function getToken(){
  const token = localStorage.getItem("react-crm-token")
  return token ? token : undefined
}
function setTokenUser(token, user) {
  localStorage.setItem("react-crm-token", token);
  localStorage.setItem("react-crm-user", JSON.stringify(user));
}

function removeTokenUser(){
      localStorage.removeItem("react-crm-token");
    localStorage.removeItem("react-crm-user");
}

export function authReducer(
  state = {
    isFetching: false,
    isAuthenticated: isSignIned(),
    user: getUser(),
    token: getToken()
  },
  action
) {
  const payload = action.payload;
  switch (action.type) {
    case SIGN_IN:
      if (payload.token && payload.user ) {
        setTokenUser(payload.token, payload.user)
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          errorMessage: "",
          user: action.payload.user,
          token: action.payload.token
        });
      }
      else {
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          errorMessage: action.error,
          user: undefined,
          token: undefined
        });
      }
    case SIGN_OUT:
      removeTokenUser()
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: undefined,
        token: undefined
      });
    default:
      return state;
  }
}