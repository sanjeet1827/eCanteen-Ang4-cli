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
    public class VendorProvider : IVendorProvider
    {
        private IVendorDataAccess VendorDataAccess
        {
            get
            {
                return new VendorDataAccess();
            }
        }

        public bool Register(Vendor vendor)
        {
            return VendorDataAccess.Register(vendor);
        }

        public Vendor Authenticated(string email, string password)
        {
            return VendorDataAccess.Authenticated(email, password);
        }

        public List<Vendor> GetVendors()
        {
            return VendorDataAccess.GetVendors();
        }
    }
}
