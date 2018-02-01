
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
    [RoutePrefix("Vendors")]
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

        [HttpPost]
        [Route("login")]
        public Vendor Login(Vendor vendor)
        {
            return VendorProvider.Authenticated(vendor.Email, vendor.Password);
        }

        [HttpPost]
        [Route("register")]
        public bool Post(Vendor vendor)
        {
            return VendorProvider.Register(vendor);
        }
    }
}
