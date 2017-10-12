using eCanteen.DataAccess;
using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using eCanteen.BussinessLogic.Interfaces;
using eCanteen.DataAccess.Interfaces;

namespace eCanteen.BussinessLogic
{
    public class OrderProvider : IOrderProvider
    {
        private IOrderDataAccess OrderDataAccess
        {
            get
            {
                return new OrderDataAccess();
            }
        }

        public Order SaveOrder(Order order)
        {
            return OrderDataAccess.SaveOrder(order);
        }

        public Payment SavePayment(Payment payment, Guid orderId)
        {
            return OrderDataAccess.SavePayment(payment, orderId);
        }

        public void UpdateOrder(string transId, string transStatus, Guid orderId)
        {
            OrderDataAccess.UpdateOrder(transId, transStatus, orderId);
        }

        public ConfirmedOrderDetailDTO GetConfirmedOrderDetail(Guid orderId)
        {
            return OrderDataAccess.GetConfirmedOrderDetail(orderId);
        }

        public List<OrderStatusDTO> GetVendorOrderStatus(Guid vendorId, int menuType)
        {
            return OrderDataAccess.GetVendorOrderStatus(vendorId, menuType);
        }

        public string GetMenuWiseStatusCount(Guid vendorId, int menuType)
        {
            return OrderDataAccess.GetMenuWiseStatusCount(vendorId,menuType);
        }

        public string UpdateOrderStatus(Guid orderId, Guid vendorId, int menuType)
        {
            return OrderDataAccess.UpdateOrderStatus(orderId, vendorId, menuType);
        }

        public List<ConfirmedOrderDetailDTO> GetCustomerOrderHistory(Guid customerId)
        {
            return OrderDataAccess.GetCustomerOrderHistory(customerId);
        }

        public bool AcceptOrder(Guid orderId,Guid vendorId)
        {
            return OrderDataAccess.AcceptOrder(orderId,vendorId);
        }
    }
}
