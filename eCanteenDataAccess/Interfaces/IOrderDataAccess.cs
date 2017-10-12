using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.DataAccess.Interfaces
{
    public interface IOrderDataAccess
    {
        Order SaveOrder(Order order);

        Payment SavePayment(Payment payment, Guid orderId);

        void UpdateOrder(string transId, string transStatus, Guid orderId);

        ConfirmedOrderDetailDTO GetConfirmedOrderDetail(Guid orderId);

        List<OrderStatusDTO> GetVendorOrderStatus(Guid vendorId, int menuType);

        string GetMenuWiseStatusCount(Guid vendorId, int menuType);

        string UpdateOrderStatus(Guid orderId, Guid vendorId, int menuType);

        List<ConfirmedOrderDetailDTO> GetCustomerOrderHistory(Guid customerId);

        bool AcceptOrder(Guid orderId, Guid vendorId);

        
    }
}
