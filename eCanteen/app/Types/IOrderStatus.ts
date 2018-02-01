import { ICustomer } from './ICustomer';
import { IOrder } from './IOrder';
import { IFood } from './IFood';

export interface IOrderStatus {
     order: IOrder;
     customer: ICustomer;
     orderedItems: Array<IFood> ;
     orderedItemStatusCount: string;
     ConfirmedReady: boolean;
}