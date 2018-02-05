
using eCanteen.BussinessLogic.Interfaces;
using eCanteen.ModelEntities;
using eCanteenBussinessLogic;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web;
using System.Collections.Specialized;
using System.Net.Http.Formatting;
using eCanteen.BussinessLogic;

namespace eCanteen.Controllers
{
    [RoutePrefix("Orders")]
    public class OrderController : ApiController
    {
        private IOrderProvider OrderProvider
        {
            get
            {
                return new OrderProvider();
            }
        }

        public string action1 = string.Empty;
        public string hash1 = string.Empty;
        public string txnid1 = string.Empty;

        public ConfirmedOrderDetailDTO Get(Guid orderId)
        {
            return OrderProvider.GetConfirmedOrderDetail(orderId);
        }

        [Route("VendorOredrs")]
        public List<OrderStatusDTO> Get(Guid vendorId, int menuType)
        {
            return OrderProvider.GetVendorOrderStatus(vendorId, menuType);
        }

        [Route("MenuWiseOredrs")]
        public string Get(Guid vendorId, int menuType, bool tp)
        {
            return OrderProvider.GetMenuWiseStatusCount(vendorId, menuType);
        }

        public string Get(Guid orderId, Guid vendorId, int menuType)
        {
            return OrderProvider.UpdateOrderStatus(orderId, vendorId, menuType);
        }

        [HttpGet]
        public List<ConfirmedOrderDetailDTO> Get(Guid customerId, bool customerDetail)
        {
            return OrderProvider.GetCustomerOrderHistory(customerId);
        }

        [HttpPost]
        public Order Post(Order order)
        {
            return OrderProvider.SaveOrder(order);
        }

        [HttpGet]
        public bool Get(Guid orderId, Guid vendorId)
        {
            return OrderProvider.AcceptOrder(orderId, vendorId);
        }

        public string Generatehash512(string text)
        {

            byte[] message = Encoding.UTF8.GetBytes(text);

            UnicodeEncoding UE = new UnicodeEncoding();
            byte[] hashValue;
            SHA512Managed hashString = new SHA512Managed();
            string hex = "";
            hashValue = hashString.ComputeHash(message);
            foreach (byte x in hashValue)
            {
                hex += String.Format("{0:x2}", x);
            }
            return hex;

        }

        private string PreparePOSTForm(string url, System.Collections.Hashtable data)      // post form
        {
            //Set a name for the form
            string formID = "PostForm";
            //Build the form using the specified data to be posted.
            StringBuilder strForm = new StringBuilder();
            strForm.Append("<form id=\"" + formID + "\" name=\"" +
                           formID + "\" action=\"" + url +
                           "\" method=\"POST\">");

            foreach (System.Collections.DictionaryEntry key in data)
            {

                strForm.Append("<input type=\"hidden\" name=\"" + key.Key +
                               "\" value=\"" + key.Value + "\">");
            }


            strForm.Append("</form>");
            //Build the JavaScript which will do the Posting operation.
            StringBuilder strScript = new StringBuilder();
            strScript.Append("<script language='javascript'>");
            strScript.Append("var v" + formID + " = document." +
                             formID + ";");
            strScript.Append("v" + formID + ".submit();");
            strScript.Append("</script>");
            //Return the form and the script concatenated.
            //(The order is important, Form then JavaScript)
            return strForm.ToString();
        }
    }
}

