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
    public class NotificationProvider : INotificationProvider
    {
        private INotificationDataAccess NotificationDataAccess
        {
            get
            {
                return new NotificationDataAccess();
            }
        }

        public List<long> GetNewOrders(Guid vendorId)
        {
            return NotificationDataAccess.GetNewOrders(vendorId);
        }
        public long GetCustomerLatestReadyOrder(Guid orderId, Guid customerId)
        {
            return NotificationDataAccess.GetCustomerLatestReadyOrder(orderId, customerId);
        }

    }
}
