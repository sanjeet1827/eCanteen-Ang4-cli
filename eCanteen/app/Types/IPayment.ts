export interface IPayment
{
    id: string;
    orderId: string;
    amount: number;
    paymentStatus: string
    transactionId: string;
    paymentVia: string;
}