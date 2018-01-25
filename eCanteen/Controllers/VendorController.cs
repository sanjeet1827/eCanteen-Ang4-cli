
using eCanteen.BussinessLogic.Interfaces;
using eCanteen.ModelEntities;
using eCanteenBussinessLogic;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace eCanteen.Controllers
{
    public class VendorController : ApiController
    {
        private IVendorProvider VendorProvider
        {
            get
            {
                return new VendorProvider();
            }
        }

        [HttpGet]
        public List<Vendor> Get()
        {
            return VendorProvider.GetVendors();
        }

        [HttpGet]
        public Vendor Get(string email, string password)
        {
            return VendorProvider.Authenticated(email, password);
        }

        [HttpPost]
        public bool Post(Vendor vendor)
        {
            return VendorProvider.Register(vendor);
        }
    }
}
