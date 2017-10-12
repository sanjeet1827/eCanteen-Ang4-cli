using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.BussinessLogic.Interfaces
{
    public interface INotificationProvider
    {
        List<long> GetNewOrders(Guid vendorId);

        long GetCustomerLatestReadyOrder(Guid orderId, Guid customerId);
    }
}
