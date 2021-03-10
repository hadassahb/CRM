import {
    Customer,
    User,
    Order,
    Product,
    Category,
  } from "../types";
  
 export var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
})(HttpMethod || (HttpMethod = {}));

  
  
  export const SIGN_IN = "SIGN_IN";
  export const SIGN_OUT = "SIGN_OUT";
  
  
  export const LIST_CUSTOMER = "LIST_CUSTOMER";
  export const GET_CUSTOMER = "GET_CUSTOMER";
  export const NEW_CUSTOMER = "NEW_CUSTOMER";
  export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
  export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
  export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
  
 
  export const LIST_ORDER = "LIST_ORDER";
  export const GET_ORDER = "GET_ORDER";
  export const NEW_ORDER = "NEW_ORDER";
  export const UPDATE_ORDER = "UPDATE_ORDER";
  export const CREATE_ORDER = "CREATE_ORDER";
  export const DELETE_ORDER = "DELETE_ORDER";
  export const EDIT_ORDER = "EDIT_ORDER";
 
 
  export const LIST_PRODUCT = "LIST_PRODUCT";
  export const GET_PRODUCT = "GET_PRODUCT";
  export const NEW_PRODUCT = "NEW_PRODUCT";
  export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
  export const CREATE_PRODUCT = "CREATE_PRODUCT";
  export const DELETE_PRODUCT = "DELETE_PRODUCT";
  export const LIST_CATEGORY = "LIST_CATEGORY";
  export const EDIT_PRODUCT = "EDIT_PRODUCT";
  export const FETCHING_PRODUCT = "FETCHING_PRODUCT"
 

    