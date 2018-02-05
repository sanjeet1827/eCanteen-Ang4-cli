/* Defines the SignUp entity */
export class SignUp {
    name: string;
    contactNo: string;
    email: string;
    shopNo: string;
    password: string;
    logo: string;
    registerationPosted: boolean;
    alreadyRegistered: boolean;
    showLoginView: boolean;
    selectedSite: string;
}

/* Defines the Vendor entity */
export class Vendor {
    Id: string;
    name: string;
    email: string;
    contact: string;
    password: string;
    shopNo: string;
    active: boolean;
    logo: string;
    siteId: string;
}

/* Defines the SignUp entity */
export class SignIn {
    email: string;
    password: string;
    authenticated: boolean;
}

/* Defines the Customer entity */
export class Customer {
    id: string;
    name: string;
    email: string;
    contact: string;
    employer: string;
    password: string;
    active: boolean;
}

/* Defines the Food entity */
export class Food {
    id: string;
    name: string;
    price: number;
    description: string;
    type: number;
    lastUpdate: Date;
    quantity: number;
}

/* Defines the Order entity */
export class Order {
    id: string;
    customerId: string;
    vendorId: string;
    subTotal: number;
    vat: number;
    discount: number;
    total: number;
    timeSlot: number;
    status: number;
    paymentStatus: number;
    orderDateTime: Date;
    tokenNo: number;
    accepted: boolean;
}

/* Defines the OrderDetail entity */
export class OrderDetail {
    order: Order;
    orderdItems: Food;
    customer: Customer;
    vendor: Vendor;
    paymentVia: string;
}

/* Defines the OrderStatus entity */
export class OrderStatus {
    order: Order;
    customer: Customer;
    orderedItems: Array<Food>;
    orderedItemStatusCount: string;
    ConfirmedReady: boolean;

    constructor() {
        this.order = new Order();
        this.customer = new Customer();
        this.orderedItems = new Array<Food>();
    }
}

/* Defines the Payment entity */
export class OrderStatusData {
    orderStatus: Array<OrderStatus>;
    displayVendorSlider: boolean;
    popUpNotification: boolean;
    acceptedOrder: OrderStatus;
    orderAccepetd: boolean;
    orderDetail: OrderStatus;
    breakfastOrderCount: string;
    lunchOrderCount: string;
    snacksOrderCount: string;
    dinnerOrderCount: string;
}

/* Defines the Payment entity */
export class Payment {
    id: string;
    orderId: string;
    amount: number;
    paymentStatus: string
    transactionId: string;
    paymentVia: string;
}

/* Defines the PayOrder entity */
export class PayOrder {
    lastname: string;
    address2: string;
    udf5: string;
    service_provider: string;
    curl: string;
    udf4: string;
    txnid: string;
    furl: string;
    state: string;
    udf2: string;
    udf1: string;
    zipcode: string;
    amount: string;
    email: string;
    city: string;
    country: string;
    udf3: string;
    address1: string;
    hash: string;
    key: string;
    pg: string;
    surl: string;
    firstname: string;
    productinfo: string;
    phone: string;
}

/* Defines the Site entity */
export class Site {
    Id: string;
    Name: string;
    address: string;
    contact: string;
    owner: number;
}

/* Defines the VendorMenu entity */
export class VendorMenu {
    FoodItemId: string;
    menuType: number;
}
