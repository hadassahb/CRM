/* eslint-disable */
import { DB } from "./demo-db";
import url from 'url';
import querystring from 'querystring';
import { HttpMethod } from "../store/types";
import { getSeachFilters } from "../utils/app-utils";
import axios from 'axios';

const ds = Object.assign({}, DB)
const EXPAND = "_expand"

function getModel(action) {
  if (action.includes("/")) {
    return action.substring(0, action.indexOf("/"))
  }
  else {
    return action;
  }
}

function getId(action){
  if (action.includes("/")) {
    return parseInt(action.substring(action.indexOf("/") + 1))
  }
  else {
    return 0
  }
}

function getExpand(qs) {
  if (EXPAND in qs) {
    return qs[EXPAND];
  }
  else return ''
}

function parseRequest(req) {
  const parsedUrl = url.parse(req);
  const parsedQs = querystring.parse(parsedUrl.query);
  const model = getModel(parsedUrl.pathname);
  const id = getId(parsedUrl.pathname);
  const exp = getExpand(parsedQs)
  const filters = getSeachFilters(parsedQs)
  return { model, id, exp, filters }
}


export function getCustomerList(action){
  const { model, id, exp , filters} = parseRequest(action)
return new Promise(function(resolve, _reject){
  axios.get('https://my-json-server.typicode.com/hadassahb/CRM/customers')
  .then(res=>{
    var result = res.data.map((m)=>{return m});
    if (filters !== null && filters !== undefined
      && Object.keys(filters).length > 0) {
      result = result.filter(
        row => Object.keys(filters).every(
          prop => filters[prop](prop,row)
        )
      )
      console.log(result);
    }
    setTimeout(resolve, 300, { data: result });
  }
  ).catch =(e) =>{
      _reject({
        code: 403,
        error: "error in fetching customer list",
      });
    }
  } );
}
export function getProductsList(action, product_id){
  const { model, id, exp , filters} = parseRequest(action)
return new Promise(function(resolve, _reject){
  axios.get('https://my-json-server.typicode.com/hadassahb/CRM/products')
  .then(res=>{
    var result = res.data.map((m) => {
     axios.get('https://my-json-server.typicode.com/hadassahb/CRM/categories').then(categories =>{
          const expandId = m["categoryId"];
         m["category"] =  categories.data[categories.data.findIndex((d)=>d.id === expandId)] ;
        });
      return m;
    });
    if (filters !== null && filters !== undefined
      && Object.keys(filters).length > 0) {
      result = result.filter(
        row => Object.keys(filters).every(
          prop => filters[prop](prop,row)
        )
      )
      console.log(result);
      console.log("nowatyyyy");
    }if(product_id){
      result = result.filter(function(product){
        if(product_id === product["id"]){
          return false;
        }
        return true;
      });
      console.log(result);
    }
    setTimeout(resolve, 300, { data: result });
  }
  ).catch =(e) =>{
      _reject({
        code: 403,
        error: "error in fetching products list",
      });
    }
  } );
}


export function getOrdersList(action){
  const {model, id, exp, filters} = parseRequest(action);
  return new Promise(function(resolve, _reject){
   // const orderd = 
    axios.get('https://my-json-server.typicode.com/hadassahb/CRM/orders')
    .then(res=>{
      var result = res.data.map((m)=>{
        axios.get('https://my-json-server.typicode.com/hadassahb/CRM/customers')
        .then(cusomers =>{
          const expandId = m["customerId"];
          m["customer"] = cusomers.data[cusomers.data.findIndex((d)=>d.id===expandId)];
        });
        return m;
      });
      if (filters !== null && filters !== undefined
        && Object.keys(filters).length > 0) {
        result = result.filter(
          row => Object.keys(filters).every(
            prop => filters[prop](prop,row)
          )
        )
      }
      
      console.log(result);
      setTimeout(resolve, 300, { data: result });
    }).catch =(e) =>{
      _reject({
        code: 403,
        error: "error in fetching products list",
      });
  }})
}

export function getData(action){
  const { model, id, exp , filters} = parseRequest(action);
   if(model === 'products'){
     console.log("going to my function");
     console.log(model);
     return getProductsList(action);
   }

   if(model === 'orders'){
     
    console.log("going to my function");
    console.log(model);
    return getOrdersList(action);
   }
  
  if(model === 'customers'){
    
    console.log("going to my function");
    console.log(model);
    return getCustomerList(action);
  }
  return new Promise(function (resolve, _reject) {
    const expandModel = exp
      ? exp === "category"
        ? "categories"
        : exp + "s"
      : exp;    
      let result;
    let expand, expandId;    
    if (model in ds) {
      if (id && id > 0) {
        result =
          ds[model][ds[model].findIndex((d) => d.id === id)];
        if (expandModel) {
          expand =
            expandModel === "categories"
              ? "category"
              : expandModel.substr(0, expandModel.length - 1);
          expandId = result[expand + "Id"];
          result[expand] =
            ds[expandModel][
            ds[expandModel].findIndex((d) => d.id === expandId)
            ];
        }
      } else {
        console.log("hererere")
        result = ds[model].map((m) => {
          if (expandModel) {
            expand =
              expandModel === "categories"
                ? "category"
                : expandModel.substr(0, expandModel.length - 1);
            expandId = m[expand + "Id"];
            m[expand] =
              ds[expandModel][
              ds[expandModel].findIndex((d) => d.id === expandId)
              ];
          }
          
          console.log("m");
          console.log(m);
          return m;
        });
      }

      if (filters !== null && filters !== undefined
        && Object.keys(filters).length > 0) {
        result = result.filter(
          row => Object.keys(filters).every(
            prop => filters[prop](prop,row)
          )
        )
      }
    }
    setTimeout(resolve, 300, { data: result });
  });
}

export function postData(action, data) {
  const { model } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    ds[model].push(data);
    setTimeout(resolve, 300, { data: data });
  });
}

export function putData(action, data){
  const { model, id } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    const idx = ds[model].findIndex((d)=> d.id === id);
    ds[model][idx] = Object.assign({}, data);
    setTimeout(resolve, 300, { data: data });
  });
}

export function deleteData(action){
  const { model, id } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    if (id > 0) {
      console.log(model);
      switch(model){
        case 'products':
          console.log("lala");
          axios.delete(`https://my-json-server.typicode.com/hadassahb/CRM/products/${id}`)
          .then(res=>{
            console.log(action);
            return getProductsList(action, id);
          });      
      }
          ds[model].splice(ds[model].findIndex((d) => d.id === id), 1);
    }
    setTimeout(resolve, 300, { data: id });
  });
}

export function login(data){
  return new Promise(function(resolve, _reject){
    axios.get('https://my-json-server.typicode.com/hadassahb/CRM/token')
    .then(res=>{
      if((res.data.user.email== data.username)&&(res.data.user.password == data.password)){
       const token = res.data;
       const user =token.user;
        setTimeout(resolve, 300, {token, user});
      }else{
        _reject({
          code: 403,
          error: "your name or password is wrong",
        });
      }
    } );
  });
    
  };

export function callApi(endpoint, method, data, filters) {
  switch (method) {
    case HttpMethod.GET:
      return getData(endpoint);
    case HttpMethod.PUT:
      return putData(endpoint, data);
    case HttpMethod.POST:
      return postData(endpoint, data)
    case HttpMethod.DELETE:
      return deleteData(endpoint)
    default:
      return null;

  }

}

export const CALL_API = Symbol("Call API")