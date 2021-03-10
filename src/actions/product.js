import {
    LIST_PRODUCT,
    GET_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    NEW_PRODUCT,
    HttpMethod,
    CREATE_PRODUCT,
    LIST_CATEGORY,
    EDIT_PRODUCT,
    FETCHING_PRODUCT,
  } from "../store/types";
  
  export function listCategory(result) {
    return {
      type: LIST_CATEGORY,
      payload: result,
    };
  }
  
  export function listProduct(result) {
    return {
      type: LIST_PRODUCT,
      payload: result,
    };
  }
  
  export function getProduct(result) {
    return {
      type: GET_PRODUCT,
      payload: result,
    };
  }
  
  export function createProduct(result) {
    return {
      type: CREATE_PRODUCT,
      payload: result,
    };
  }
  
  export function updateProduct(result) {
    return {
      type: UPDATE_PRODUCT,
      payload: result,
    };
  }
  
  export function deleteProduct(id) {
    return {
      type: DELETE_PRODUCT,
      payload: id,
    };
  }
  
  export function newProduct(result) {
    return {
      type: NEW_PRODUCT,
      payload: result,
    };
  }
  
  export function editProduct(result) {
    return {
      type: EDIT_PRODUCT,
      payload: result,
  
    };
  }
  
  export function fetchingProduct(){
    return {
      type: FETCHING_PRODUCT,
      payload: null,
    };
  }
  
  export function getAction(
    action,
    id = 0,
    data,
    query
  ) 
  
  {
    switch (action) {
  
      case GET_PRODUCT:
        return {
          type: GET_PRODUCT,
          endpoint: "products/" + id + "?_expand=category",
          method: HttpMethod.GET,
        };
  
        case NEW_PRODUCT:
          const actions = {
            product: {
              type: NEW_PRODUCT,
              endpoint: "products/",
              method: HttpMethod.GET,
            },  categoryList: {
              type: LIST_CATEGORY,
              endpoint: "categories/",
              method: HttpMethod.GET,
            },
          };
          return {
            type: NEW_PRODUCT,
            actions:actions,
          };
      case EDIT_PRODUCT:
        const editActions = {
          product: {
            type: GET_PRODUCT,
            endpoint: "products/" + id + "?_expand=category",
            method: HttpMethod.GET,
          },
          categoryList: {
            type: LIST_CATEGORY,
            endpoint: "categories/",
            method: HttpMethod.GET,
          },
        };
        return {
          type: EDIT_PRODUCT,
          actions:editActions,
        };
  
      case LIST_PRODUCT:
        return {
          type: LIST_PRODUCT,
          endpoint: `products?_expand=category&${query}`,
          method: HttpMethod.GET,
        };
      case UPDATE_PRODUCT:
        return {
          type: UPDATE_PRODUCT,
          endpoint: "products/",
          method: HttpMethod.PUT,
          data,
        };
      case CREATE_PRODUCT:
        return {
          type: CREATE_PRODUCT,
          endpoint: "products/",
          method: HttpMethod.POST,
          data,
        };
      case DELETE_PRODUCT:
        return {
          type: DELETE_PRODUCT,
          endpoint: "products/" + id,
          method: HttpMethod.DELETE,
        };
      case LIST_CATEGORY:
        return {
          type: LIST_CATEGORY,
          endpoint: "categories/",
          method: HttpMethod.GET,
        };
    }
  }