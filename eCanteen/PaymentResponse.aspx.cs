using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace eCanteen
{
    public partial class PaymentResponse : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var orderId = Request.QueryString["orderId"].ToString();
            var transStatus = Request.Form["status"];
            var txnId = Request.Form["txnid"];
            var customerId = Request.QueryString["customerId"].ToString();
            var domain = System.Configuration.ConfigurationManager.AppSettings["domain"].ToString();
            Response.Redirect("http://" + domain + "/#/confirmOrder?customerId=" + customerId + "&orderId=" + orderId + "&transId=" + txnId + "&transStatus=" + transStatus);
        }
    }
}