const SearchFilterOps = {
  equal: "_eq",
  greaterThan: "_gt",
  lessThan: "_lt",
  greaterThanOrEqual: "_gte",
  lessThanOrEqual: "_lte",
  contain: "_like",
  startsWith: "_startsWith",
  endsWith: "_endsWith"
};


const SESSION_TOKEN_KEY = "vue-crm-token";
const SESSION_USER_KEY = "vue-crm-user";

export function setToken(token){
  if (sessionStorage) {
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  }
}

export function setUser(userData) {
  if (sessionStorage) {
    sessionStorage.setItem(SESSION_USER_KEY, userData);
  }
}

export function getToken() {
  let token = "";
  if (sessionStorage) {
    const _token = sessionStorage.getItem(SESSION_TOKEN_KEY);
    token = _token ? _token : token;
  }
  return token;
}

export function getUser(){
  let user = {};
  if (sessionStorage) {
    const userData = sessionStorage.getItem(SESSION_USER_KEY);
    user = userData ? (JSON.parse(userData)) : ({} );
  }
  return user;
}

export function cleanSession() {
  if (sessionStorage) {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    sessionStorage.removeItem(SESSION_USER_KEY);
  }
}

export function capFirstLetter(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

export function clearSearchFilters(searchFilter) {
  if (searchFilter) {
    if (searchFilter.filters) delete searchFilter.filters;

    Object.keys(searchFilter).forEach(filter => {
      if (searchFilter[filter]) {
        Object.keys(searchFilter[filter]).forEach(prop => {
          searchFilter[filter][prop] = null;
        });
      }
    });
  }
}


export function buildSearchFilters(searchFilter) {
    const filters = [];
  if (searchFilter) {
    // searchFilter.
    Object.keys(searchFilter).forEach(filter => {
      if (filter !== "filters") {
        Object.keys(searchFilter[filter]).forEach(propName => {
          console.log(`propName ${propName} `)
          if (propName && searchFilter[filter]
            && searchFilter[filter][propName]) {
            filters.push({
              property: propName,
              op: SearchFilterOps[filter],
              val: searchFilter[filter][propName],
            });
          }
        });
      }
    });
  }
  return filters
}

export function buildJsonServerQuery (filters){
  let filterQuery = "";
  if (filters && filters.length > 0) {
    filterQuery = filters.reduce((prev, f) => {
      if (f.val && f.val !== "", f.val !== null && f.val !== undefined) {
        let qString = ''
        qString += f.property;
        qString += f.op;
        qString += "=";
        qString += f.val;
        prev += prev !== '' ? `&${qString}` : `${qString}`
      }
      return prev
    }, '');
  }
  return filterQuery;
}


const filterFn = (op, value) => (prop,  data) => {
  let propName =  ""
  switch (op) {
    case SearchFilterOps.equal:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.equal))
      return data[propName] === value
    case SearchFilterOps.contain:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.contain))
      return data[propName].toLowerCase().includes(value.toLowerCase())
    case SearchFilterOps.startsWith:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.startsWith))
      return data[propName].toLowerCase().startsWith(value.toLowerCase())
    case SearchFilterOps.endsWith:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.endsWith))
      return data[propName].toLowerCase().endsWith(value.toLowerCase())
    case SearchFilterOps.greaterThan:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.greaterThan))
      return  parseFloat(data[propName]) > parseFloat( value)
    case SearchFilterOps.lessThan:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.lessThan))
      return parseFloat(data[propName] ) < parseFloat(value)
    case SearchFilterOps.greaterThanOrEqual:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.greaterThanOrEqual))
      return  parseFloat(data[propName]) >=parseFloat( value)
    case SearchFilterOps.lessThanOrEqual:
      propName = prop.slice(0, prop.indexOf(SearchFilterOps.lessThanOrEqual))
      return parseFloat(data[propName] )<= parseFloat(value)
  }
}


export function getSeachFilters(parsedQs) {
  const filters = Object.keys(parsedQs).reduce(
    (prev, k) => {
      const prop = k.slice(0, k.indexOf('_'))
      const op = k.slice(k.indexOf('_'))
      const compVal = parsedQs[k]
      if (prop !== '') {
        prev[k] = filterFn(op, compVal)
      }
      return prev
    }, {})
  return filters;
}
