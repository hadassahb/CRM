export class CustomerModel{
  constructor(
    firstname = "",
    lastname = "",
    email = "",
    mobile= "",
    rewards = 0,
    membership = false,
    avatar
      ) {
    this.id = 0;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.mobile = mobile;
    this.membership = membership;
    this.rewards = rewards;
    this.orderAmount = 0;
    this.avatar = avatar;
  }
  id;
  firstname;
  lastname;
  email;
  avatar;
  mobile;

  membership;
  rewards;
  orders;
  orderAmount;
}

export class OrderModel{
  constructor(
    reference= "",
    customerId= 0,
    customer = {},
    customerName = "",
    products= [],
    amount = 0,
    quantity = 0,
    orderDate,
    shippedDate,
    shipAddress
  ) {
    this.id = 0;
    this.reference = reference;
    this.customerId = customerId;
    this.customer = customer;
    this.customerName = customerName;
    this.amount = amount;
    this.quantity = quantity;
    this.orderDate = orderDate;
    this.shippedDate = shippedDate;
    this.shipAddress = shipAddress;
  }
  id;
  reference;
  customerId;
  customer;
  customerName;
  products;
  amount;
  quantity;
  orderDate;
  shippedDate;
  shipAddress;
}

export class ProductModel{
  constructor(
    name = "",
    categoryId =  "",
    numInStock = 0,
    unitPrice = 0,
    category = {},
  ) {
    this.id = 0;
    this.name = name;
    this.categoryId = categoryId;
    this.numInStock = numInStock;
    this.unitPrice = unitPrice;
    this.category = category;
  
  }
  id;
  name;
  categoryId;
  numInStock;
  unitPrice;
  category;

}