using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.DataAccess.Interfaces
{
    public interface ICustomerDataAccess
    {
        bool Register(Customer vendor);

        Customer Authenticated(string email, string password);

        void ConfirmRegistration(Guid Id);

        Customer GetCustomer(Guid customerId);

    }
}
