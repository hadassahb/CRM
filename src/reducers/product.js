import {
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT,
    LIST_PRODUCT,
    NEW_PRODUCT,
    EDIT_PRODUCT,
    FETCHING_PRODUCT
  } from '../store/types';
  import { ProductModel } from '../types';
  
  export function productReducer(
    state = {
      isFetching: true,
      product: new ProductModel(),
      categoryList: [],
      productList:[],
      deleted: false,
      updated: false,
    },
    action
  ) {
    switch (action.type) {
      case FETCHING_PRODUCT:
        return Object.assign({}, state, {
          isFetching: true,
          errorMessage: "",
          deleted: false,
          updated:false,
        })
      case LIST_PRODUCT:
        return Object.assign({}, state, {
          isFetching: false,
          productList: action.payload,
          errorMessage: "",
          deleted: false,
          updated:false
        })
        
      case GET_PRODUCT:
        return Object.assign({}, state, {
          isFetching: false,
          product:action.payload,
          errorMessage: action.error,
          deleted: false,
          updated: false
        });
      case NEW_PRODUCT:
      case EDIT_PRODUCT:
        const {product, categoryList} = action.payload
        return Object.assign({}, state, {
          isFetching: false,
          product,
          categoryList,
          errorMessage: action.error,
          deleted: false,
          updated: false
        });
      case CREATE_PRODUCT:
      case UPDATE_PRODUCT:
        return Object.assign({}, state, {
          isFetching: false,
          product: action.payload,
          errorMessage: action.error,
          deleted: false,
          updated: true
        });
      case DELETE_PRODUCT:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.error,
          deleted: (!action.error && action.payload )? true : false,
          updated: false
        });
  
      default:
        return state;
    }
  }