using eCanteen.DataAccess.Interfaces;
using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace eCanteen.DataAccess
{
    public class VendorDataAccess : IVendorDataAccess
    {
        private eCanteenEntities eCanteenEntities;

        public VendorDataAccess()
        {
            eCanteenEntities = new eCanteenEntities();
        }


        public bool Register(Vendor vendor)
        {
            if (eCanteenEntities.Vendor.Any(vd => vd.Email.Equals(vendor.Email.ToLower().Trim())))
            {
                return false;
            }

            if (vendor.Id != null && vendor.Id != Guid.Empty)
            {
                eCanteenEntities.Entry(vendor).State = EntityState.Modified;
            }
            else
            {
                vendor.Id = Guid.NewGuid();
                vendor.Active = true;
                eCanteenEntities.Vendor.Add(vendor);
            }

            if (!string.IsNullOrEmpty(vendor.Logo))
            {
                byte[] imageBytes = Convert.FromBase64String(vendor.Logo.Replace("data:image/png;base64,", ""));
                MemoryStream ms = new MemoryStream(imageBytes, 0,
                  imageBytes.Length);

                // Convert byte[] to Image
                ms.Write(imageBytes, 0, imageBytes.Length);

                Image image = Image.FromStream(ms, true);
                string logoPath = "../../Content/VendorLogo/" + vendor.Id + "_logo" + ".png";
                vendor.Logo = logoPath;
                image.Save(HttpContext.Current.Server.MapPath("~/Content/VendorLogo/" + vendor.Id + "_logo" + ".png"), System.Drawing.Imaging.ImageFormat.Png);
            }

            eCanteenEntities.SaveChanges();

            return true;
        }

        public Vendor Authenticated(string email, string password)
        {
            return eCanteenEntities.Vendor.Where(vd => vd.Email.Equals(email.ToLower().Trim()) && vd.Password.Equals(password) && vd.Active.Equals(true)).FirstOrDefault();
        }

        public List<Vendor> GetVendors()
        {

            return eCanteenEntities.Vendor.ToList();
        }
    }
}
