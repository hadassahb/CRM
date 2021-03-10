import {
    LIST_CUSTOMER,
    GET_CUSTOMER,
    DELETE_CUSTOMER,
    UPDATE_CUSTOMER,
    NEW_CUSTOMER,
    HttpMethod,
    CREATE_CUSTOMER
  } from "../store/types";
  
  export function listCustomers(result) {
    return {
      type: LIST_CUSTOMER,
      payload: result
    }
  }
  
  export function getCustomer(result) {
    return {
      type: GET_CUSTOMER,
      payload: result
    }
  }
  
  export function createCustomer(result) {
    return {
      type: CREATE_CUSTOMER,
      payload: result
    }
  }
  
  export function updateCustomer(result) {
    return {
      type: UPDATE_CUSTOMER,
      payload: result
    }
  }
  
  export function deleteCustomer(id) {
  
    return {
      type: DELETE_CUSTOMER,
      payload: id
    }
  }
  
  export function newCustomer(result) {
    return {
      type: NEW_CUSTOMER,
      payload: result,
    };
  }
  
  export function getAction(action,
    id, data, query){
  
    switch (action) {
      case NEW_CUSTOMER:
        return {
          type: NEW_CUSTOMER,
          endpoint: 'customers/',
          method: HttpMethod.GET,
        }
      case GET_CUSTOMER:
        return {
          type: GET_CUSTOMER,
          endpoint: 'customers/' + id,
          method: HttpMethod.GET,
        }
      case LIST_CUSTOMER:
        return {
          type: LIST_CUSTOMER,
          endpoint: `customers?_embed=orders&${query}`,
          method: HttpMethod.GET,
        }
      case UPDATE_CUSTOMER:
        return {
          type: UPDATE_CUSTOMER,
          endpoint: 'customers/',
          method: HttpMethod.PUT,
          data
        }
      case CREATE_CUSTOMER:
        return {
          type: CREATE_CUSTOMER,
          endpoint: 'customers/',
          method: HttpMethod.POST,
          data
        }
      case DELETE_CUSTOMER:
        return {
          type: DELETE_CUSTOMER,
          endpoint: 'customers/' + id,
          method: HttpMethod.DELETE,
  
        }
    }
  
  }