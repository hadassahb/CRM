import {
  SIGN_IN,
  SIGN_OUT,
  HttpMethod,
} from "../store/types";


export function signIn(result) {
  return {
    type: SIGN_IN,
    payload: result,
  };
}

export function signOut(result) {
  return {
    type: SIGN_OUT,
    payload: result,
  };
}

export function getAction(
  action,
  id = 0,
) {
  switch (action) {
    case SIGN_IN:
      return {
        type: SIGN_IN,
        endpoint: "login/",
        method: HttpMethod.POST,
      };
    case SIGN_OUT:
      return {
        type: SIGN_OUT,
        endpoint: "logout/" + id,
        method: HttpMethod.GET,
      };
  }
}
