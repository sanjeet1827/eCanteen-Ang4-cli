using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eCanteen.BussinessLogic.Interfaces;
using eCanteen.BussinessLogic;

namespace eCanteen.Controllers
{
    public class NotificationController : ApiController
    {
        private INotificationProvider NotificationProvider
        {
            get
            {
                return new NotificationProvider();
            }
        }

        [HttpGet]
        public List<long> Get(Guid vendorId)
        {
            return NotificationProvider.GetNewOrders(vendorId);
        }

         [HttpGet]
        public long Get(Guid orderId, Guid customerId)
        {
            return NotificationProvider.GetCustomerLatestReadyOrder(orderId, customerId);
        }
    }
}
