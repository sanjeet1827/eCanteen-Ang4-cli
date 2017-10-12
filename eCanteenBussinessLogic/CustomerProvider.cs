using eCanteen.BussinessLogic.Interfaces;
using eCanteen.DataAccess;
using eCanteen.DataAccess.Interfaces;
using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteenBussinessLogic
{
    public class CustomerProvider : ICustomerProvider
    {
        private ICustomerDataAccess CustomerDataAccess
        {
            get
            {
                return new CustomerDataAccess();
            }
        }

        public bool Register(Customer customer)
        {
            return CustomerDataAccess.Register(customer);
        }

        public Customer Authenticated(string email, string password)
        {
            return CustomerDataAccess.Authenticated(email, password);
        }

        public void ConfirmRegistration(Guid Id)
        {
            CustomerDataAccess.ConfirmRegistration(Id);
        }

        public Customer GetCustomer(Guid customerId)
        {
            return CustomerDataAccess.GetCustomer(customerId);
        }
    }
}
