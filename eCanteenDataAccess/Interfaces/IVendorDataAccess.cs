using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.DataAccess.Interfaces
{
    public interface IVendorDataAccess
    {
        bool Register(Vendor vendor);

        Vendor Authenticated(string email, string password);

        List<Vendor> GetVendors();
    }
}
