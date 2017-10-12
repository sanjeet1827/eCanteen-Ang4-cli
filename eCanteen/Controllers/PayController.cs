
using eCanteen.BussinessLogic;
using eCanteen.BussinessLogic.Interfaces;
using eCanteen.ModelEntities;
using eCanteenBussinessLogic;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;

namespace eCanteen.Controllers
{
    public class PayController : ApiController
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


        [HttpPost]
        public string Post(PayOrder payOrder,Guid orderId)
        {

            string[] hashVarsSeq;
            string hash_string = string.Empty;

            Random rnd = new Random();
            string strHash = Generatehash512(rnd.ToString() + DateTime.Now);
            txnid1 = strHash.ToString().Substring(0, 20);

            hashVarsSeq = ConfigurationManager.AppSettings["hashSequence"].Split('|'); // spliting hash sequence from config
            hash_string = "";

            var propArray = payOrder.GetType().GetProperties();


            foreach (string hash_var in hashVarsSeq)
            {
                if (hash_var == "key")
                {
                    hash_string = hash_string + ConfigurationManager.AppSettings["MERCHANT_KEY"];
                    hash_string = hash_string + '|';
                }
                else if (hash_var == "txnid")
                {
                    hash_string = hash_string + txnid1;
                    hash_string = hash_string + '|';
                }
                else if (hash_var == "amount")
                {
                    hash_string = hash_string + Convert.ToDecimal(payOrder.amount).ToString("g29");
                    hash_string = hash_string + '|';
                }
                else
                {
                    string val = null;
                    var prop = propArray.Where(p => p.Name == hash_var).FirstOrDefault();
                    if (prop != null)
                    {
                        val = prop.GetValue(payOrder).ToString();
                    }


                    hash_string = hash_string + (val != null ? val : "");// isset if else
                    hash_string = hash_string + '|';
                }
            }

            hash_string += ConfigurationManager.AppSettings["SALT"];// appending SALT

            hash1 = Generatehash512(hash_string).ToLower();         //generating hash
            action1 = ConfigurationManager.AppSettings["PAYU_BASE_URL"] + "/_payment";// setting URL

            if (!string.IsNullOrEmpty(hash1))
            {
                System.Collections.Hashtable data = new System.Collections.Hashtable(); // adding values in gash table for data post

                data.Add("hash", hash1);
                data.Add("txnid", txnid1);
                data.Add("key", ConfigurationManager.AppSettings["MERCHANT_KEY"]);
                string amount = Convert.ToDecimal(payOrder.amount).ToString("g29");// eliminating trailing zeros
                data.Add("amount", amount);
                data.Add("firstname", payOrder.firstname);
                data.Add("email", payOrder.email);
                data.Add("phone", payOrder.phone);
                data.Add("productinfo", payOrder.productinfo);
                data.Add("surl", payOrder.surl);
                data.Add("furl", "");
                data.Add("lastname", "");
                data.Add("curl", "");
                data.Add("address1", "");
                data.Add("address2", "");
                data.Add("city", "");
                data.Add("state", "");
                data.Add("country", "");
                data.Add("zipcode", "");
                data.Add("udf1", "");
                data.Add("udf2", "");
                data.Add("udf3", "");
                data.Add("udf4", "");
                data.Add("udf5", "");
                data.Add("pg", "");
                data.Add("service_provider", payOrder.service_provider);

                string strForm = PreparePOSTForm(action1, data);

                Payment payment = new Payment();
                payment.Amount = decimal.Parse(amount);

                OrderProvider.SavePayment(payment, orderId);

                return strForm;
            }

            else
            {
                //no hash
            }
            return string.Empty;
        }

        public void Post(Payment payment)
        {
            OrderProvider.UpdateOrder(payment.TransactionId,payment.PaymentStatus, payment.OrderId);
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
