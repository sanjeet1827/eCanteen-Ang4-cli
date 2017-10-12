
using eCanteen.BussinessLogic.Interfaces;
using eCanteen.ModelEntities;
using eCanteenBussinessLogic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eCanteen.Controllers
{
    public class CustomerController : ApiController
    {
        private ICustomerProvider CustomerProvider
        {
            get
            {
                return new CustomerProvider();
            }
        }


        [HttpGet]
        public Customer Get(string email, string password)
        {
            return CustomerProvider.Authenticated(email, password);
        }

        [HttpPost]
        public bool Post(Customer customer)
        {
            return CustomerProvider.Register(customer);
        }

        [HttpGet]
        public bool Get(Guid customerId)
        {
            CustomerProvider.ConfirmRegistration(customerId);
            return true;
        }

        public Customer Get(Guid customerId,bool customerDetail)
        {
            return CustomerProvider.GetCustomer(customerId);
        }
    }
}
