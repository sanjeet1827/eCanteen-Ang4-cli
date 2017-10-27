export interface IOrder
{
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