using eCanteen.DataAccess.Interfaces;
using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.DataAccess
{
    public class NotificationDataAccess : INotificationDataAccess
    {
        private eCanteenEntities eCanteenEntities;

        public NotificationDataAccess()
        {
            eCanteenEntities = new eCanteenEntities();
        }

        public List<long> GetNewOrders(Guid vendorId)
        {
            var newOrders = new List<long>();
            try
            {
                var latestOrder = eCanteenEntities.Order.Join(eCanteenEntities.Payment, o => o.Id, p => p.OrderId, (o, p) => new
                {

                    OrderTokenNo = o.TokenNo,
                    OrderId = o.Id,
                    VendorId = o.VenderId,
                    Status = o.Status,
                    OrderDateTime = o.OrderDateTime,
                    PaymentStatus = p.PaymentStatus
                }).Where(c => c.VendorId.Equals(vendorId) && c.Status.Equals(0) && c.PaymentStatus.Equals("success")).OrderByDescending(od => od.OrderDateTime).FirstOrDefault();


                //Where(o => o.VenderId.Equals(vendorId) && o.Status.Equals(0)).OrderByDescending(ob => ob.OrderDateTime).FirstOrDefault();

                //    var orderedItemsQ = eCanteenEntities.OrderItem.Join(eCanteenEntities.Order, oi => oi.OrderId, o => o.Id, (oi, o) => new
                //    {
                //        FoodItemId = oi.FoodItemId,
                //        VendorId = o.VenderId,
                //        OrderStatus = o.Status
                //    }).Join(eCanteenEntities.FoodItem, a => a.FoodItemId, fi => fi.Id, (a, fi) => new
                //    {
                //        VendorId = a.VendorId,
                //        MenuType = fi.Type,
                //        OrderStatus = a.OrderStatus,
                //    })
                //.Where(b => b.VendorId.Equals(vendorId) && b.MenuType.Equals(menuType)).GroupBy(x => new { x.MenuType });

                //    var orderedItems = orderedItemsQ.ToList();

                newOrders.Add(latestOrder.OrderTokenNo);
            }
            catch (Exception ex)
            {
            }

            return newOrders;
        }

        public long GetCustomerLatestReadyOrder(Guid orderId, Guid customerId)
        {
            long token = 0;
            var latestOrder = eCanteenEntities.Order.Where(o => o.Id.Equals(orderId) && o.CustomerId.Equals(customerId) && o.Status.Equals(1)).OrderByDescending(ob => ob.OrderDateTime).FirstOrDefault();
            if (latestOrder!=null)
            {
                token = latestOrder.TokenNo;
            }
            return token;
        }
    }
}
