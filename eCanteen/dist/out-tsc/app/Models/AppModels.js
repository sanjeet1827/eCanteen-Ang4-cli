/* Defines the SignUp entity */
var SignUp = (function () {
    function SignUp() {
    }
    return SignUp;
}());
export { SignUp };
/* Defines the Vendor entity */
var Vendor = (function () {
    function Vendor() {
    }
    return Vendor;
}());
export { Vendor };
/* Defines the SignUp entity */
var SignIn = (function () {
    function SignIn() {
    }
    return SignIn;
}());
export { SignIn };
/* Defines the Customer entity */
var Customer = (function () {
    function Customer() {
    }
    return Customer;
}());
export { Customer };
/* Defines the Food entity */
var Food = (function () {
    function Food() {
    }
    return Food;
}());
export { Food };
/* Defines the Order entity */
var Order = (function () {
    function Order() {
    }
    return Order;
}());
export { Order };
/* Defines the OrderDetail entity */
var OrderDetail = (function () {
    function OrderDetail() {
    }
    return OrderDetail;
}());
export { OrderDetail };
/* Defines the OrderStatus entity */
var OrderStatus = (function () {
    function OrderStatus() {
        this.Order = new Order();
        this.Customer = new Customer();
        this.OrderedItems = new Array();
    }
    return OrderStatus;
}());
export { OrderStatus };
/* Defines the Payment entity */
var OrderStatusData = (function () {
    function OrderStatusData() {
    }
    return OrderStatusData;
}());
export { OrderStatusData };
/* Defines the Payment entity */
var Payment = (function () {
    function Payment() {
    }
    return Payment;
}());
export { Payment };
/* Defines the PayOrder entity */
var PayOrder = (function () {
    function PayOrder() {
    }
    return PayOrder;
}());
export { PayOrder };
/* Defines the Site entity */
var Site = (function () {
    function Site() {
    }
    return Site;
}());
export { Site };
/* Defines the VendorMenu entity */
var VendorMenu = (function () {
    function VendorMenu() {
    }
    return VendorMenu;
}());
export { VendorMenu };
//# sourceMappingURL=AppModels.js.map