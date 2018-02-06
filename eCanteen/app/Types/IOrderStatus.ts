import { ICustomer } from './ICustomer';
import { IOrder } from './IOrder';
import { IFood } from './IFood';

export interface IOrderStatus {
     Order: IOrder;
     Customer: ICustomer;
     OrderedItems: Array<IFood> ;
     OrderedItemStatusCount: string;
     ConfirmedReady: boolean;
}