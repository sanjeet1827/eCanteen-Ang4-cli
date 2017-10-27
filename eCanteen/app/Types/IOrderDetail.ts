import { IOrder } from '../Types/IOrder';
import { IFood } from '../Types/IFood';
import { ICustomer } from '../Types/ICustomer';
import { IVendor } from '../Types/IVendor';

export interface IOrderDetail
{
    order: IOrder;
    orderdItems: IFood;
    customer: ICustomer;
    vendor: IVendor;
    paymentVia: string;
}