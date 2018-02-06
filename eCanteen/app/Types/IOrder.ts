export interface IOrder
{
    Id: string;
    CustomerId: string;
    VendorId: string;
    SubTotal: number;
    Vat: number;
    Discount: number;
    Total: number;
    TimeSlot: number;
    Status: number;
    PaymentStatus: number;
    OrderDateTime: Date;
    TokenNo: number;
    Accepted: boolean;
}