
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
            //byte[] imageBytes = Convert.FromBase64String(vendor.Logo.Replace("data:image/png;base64,",""));
            //MemoryStream ms = new MemoryStream(imageBytes, 0,
            //  imageBytes.Length);

            //// Convert byte[] to Image
            //ms.Write(imageBytes, 0, imageBytes.Length);
            //Image image = Image.FromStream(ms, true);
            
            //image.Save("~/Content/vendorlogo.png", System.Drawing.Imaging.ImageFormat.Png);
            //return false;
            return VendorProvider.Register(vendor);
        }
    }
}
