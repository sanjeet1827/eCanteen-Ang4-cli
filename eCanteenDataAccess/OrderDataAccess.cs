using eCanteen.DataAccess.Interfaces;
using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace eCanteen.DataAccess
{
    public class OrderDataAccess : IOrderDataAccess
    {
        private eCanteenEntities eCanteenEntities;

        public OrderDataAccess()
        {
            eCanteenEntities = new eCanteenEntities();
        }

        private bool IsFoodItemAvailableInVendorMenu(Guid vendorId, Guid foodItemId)
        {
            return eCanteenEntities.MenuFoodItem.Any(mfi => mfi.VendorId.Equals(vendorId) && mfi.FoodItemId.Equals(foodItemId));
        }

        public Order SaveOrder(Order order)
        {
            bool orderSuccess = true;
            var orderId = Guid.NewGuid();
            order.Id = orderId;

            order.OrderItem.ToList().ForEach(delegate(OrderItem orderItem)
            {
                orderItem.OrderId = orderId;
                if (!IsFoodItemAvailableInVendorMenu(order.VenderId, orderItem.FoodItemId))
                {
                    orderSuccess = false;
                    return;
                }
            });

            if (!orderSuccess)
            {
                throw new Exception("Item not available in menu");
            }
            else
            {

                order.OrderDateTime = DateTime.Now;
                eCanteenEntities.Order.Add(order);
                eCanteenEntities.SaveChanges();
                return order;
            }


        }

        public Payment SavePayment(Payment payment, Guid orderId)
        {
            //Payment newPayment = new Payment();
            payment.OrderId = orderId;
            payment.Id = Guid.NewGuid();
            var temp_transId = new Random(1897).Next().ToString();
            payment.TransactionId = temp_transId;
            payment.PaymentStatus = "Pending";

            payment.PaymentVia = "PayUMoney";

            eCanteenEntities.Payment.Add(payment);

            eCanteenEntities.SaveChanges();

            return payment;
        }

        public void UpdateOrder(string transId, string transStatus, Guid orderId)
        {
            var existingOrder = eCanteenEntities.Payment.Where(p => p.OrderId.Equals(orderId)).FirstOrDefault();

            existingOrder.TransactionId = transId;
            existingOrder.PaymentStatus = transStatus;

            var order = eCanteenEntities.Order.Where(o => o.Id.Equals(orderId)).FirstOrDefault();

            if (transStatus.ToLower() == "success")
            {
                order.PaymentStatus = 1;
            }
            else
            {
                order.PaymentStatus = 0;
            }



            eCanteenEntities.Entry(existingOrder).State = EntityState.Modified;
            eCanteenEntities.Entry(order).State = EntityState.Modified;
            eCanteenEntities.SaveChanges();

        }

        public ConfirmedOrderDetailDTO GetConfirmedOrderDetail(Guid orderId)
        {
            var ConfirmedOrderDetailDTO = new ConfirmedOrderDetailDTO();

            var order = eCanteenEntities.Order.Where(o => o.Id.Equals(orderId)).FirstOrDefault();

            ConfirmedOrderDetailDTO.Order = order;
            ConfirmedOrderDetailDTO.OrderedItems = new List<FoodItem>();

            order.OrderItem = eCanteenEntities.OrderItem.Where(oi => oi.OrderId.Equals(orderId)).ToList();

            ConfirmedOrderDetailDTO.Customer = eCanteenEntities.Customer.Where(c => c.Id.Equals(order.CustomerId)).FirstOrDefault();

            order.OrderItem.ToList().ForEach(delegate(OrderItem orderItem)
            {
                var foodItem = eCanteenEntities.FoodItem.Where(fi => fi.Id.Equals(orderItem.FoodItemId)).FirstOrDefault();

                var quantity = eCanteenEntities.OrderItem.Where(oi => oi.FoodItemId.Equals(foodItem.Id) && oi.OrderId.Equals(orderId)).FirstOrDefault().Quantity;

                ConfirmedOrderDetailDTO.OrderedItems.Add(new FoodItem { Id = orderItem.FoodItemId, Name = foodItem.Name + "(" + quantity + ")", Price = foodItem.Price * quantity });
            });

            ConfirmedOrderDetailDTO.Vendor = eCanteenEntities.Vendor.Where(v => v.Id.Equals(order.VenderId)).FirstOrDefault();
            ConfirmedOrderDetailDTO.PaymentVia = eCanteenEntities.Payment.Where(p => p.OrderId.Equals(orderId)).FirstOrDefault().PaymentVia;

            SendOrderConfirmationSMS(ConfirmedOrderDetailDTO);

            SendOrderConfirmationMail(ConfirmedOrderDetailDTO);

            return ConfirmedOrderDetailDTO;
        }

        private static void SendOrderConfirmationMail(ConfirmedOrderDetailDTO confirmedOrderDetailDTO)
        {
            try
            {
                StringBuilder mailBody = new StringBuilder();

                mailBody.Append("<style>.invoice-box {max-width: 800px;margin: auto;padding: 30px;border: 1px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, .15);font-size: 16px;");
                mailBody.Append("line-height: 24px;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;color: #555;background-color: white; }");
                mailBody.Append(".invoice-box table {width: 100%;line-height: inherit;text-align: left;}.invoice-box table td {padding: 5px;vertical-align: top;}");
                mailBody.Append(".invoice-box table tr td:nth-child(2) {text-align: right;}.invoice-box table tr.top table td { padding-bottom: 20px;}");
                mailBody.Append(".invoice-box table tr.top table td.title {font-size: 45px;line-height: 45px;color: #333; }.invoice-box table tr.information table td {padding-bottom: 40px;}");
                mailBody.Append(".invoice-box table tr.heading td {background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;} .invoice-box table tr.details td {padding-bottom: 20px; }");
                mailBody.Append(".invoice-box table tr.item td {border-bottom: 1px solid #eee;}.invoice-box table tr.item.last td {border-bottom: none;}");
                mailBody.Append(".invoice-box table tr.total td:nth-child(2) {border-top: 2px solid #eee;font-weight: bold;}@media only screen and (max-width: 600px) {.invoice-box table tr.top table td {");
                mailBody.Append("width: 100%;display: block;text-align: center;}.invoice-box table tr.information table td {width: 100%;display: block;text-align: center;}}</style>");


                mailBody.Append("<div class='invoice-box'><table cellpadding='0' cellspacing='0'><tr class='top'><td colspan='2'><table><tr> <td class='title'>");
                mailBody.Append("<img ng-src=;'" + confirmedOrderDetailDTO.Vendor.Logo + "' style='width:100%; max-width:300px;'></td> <td></td></tr></table></td></tr>");
                mailBody.Append("<tr class='information'><td colspan='2'><table><tr><td>" + confirmedOrderDetailDTO.Vendor.Name + "<br>" + confirmedOrderDetailDTO.Vendor.ShopNo + "<br></td>");
                mailBody.Append("<td>" + confirmedOrderDetailDTO.Vendor.Contact + "<br>" + confirmedOrderDetailDTO.Vendor.Email + "</td></tr></table></td></tr>");
                mailBody.Append("<tr class='heading'><td>Payment Via</td><td></td></tr><tr class='details'><td>" + confirmedOrderDetailDTO.PaymentVia + "</td><td></td></tr><tr class='heading'>");
                mailBody.Append("<td>Item</td><td>Price</td></tr>");

                foreach (var fi in confirmedOrderDetailDTO.OrderedItems)
                {
                    mailBody.Append("<tr class='item'><td>" + fi.Name + "</td><td>" + fi.Price.ToString() + " Rs.</td></tr>");
                }

                mailBody.Append("<tr class='total'><td></td><td>Total (Incl all tax): " + confirmedOrderDetailDTO.Order.Total.ToString() + " Rs.</td></tr></table></div>");


                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient(ConfigurationManager.AppSettings["SMTP_SERVER"].ToString());

                mail.From = new MailAddress(ConfigurationManager.AppSettings["SMTP_SENDER"].ToString());
                mail.To.Add(confirmedOrderDetailDTO.Order.Customer.Email);
                mail.To.Add(confirmedOrderDetailDTO.Vendor.Email);
                //mail.To.Add("sanjeet1827@gmail.com");
                mail.Subject = "Order No" + confirmedOrderDetailDTO.Order.Id.ToString() + "|" + confirmedOrderDetailDTO.Vendor.Name + "(no reply)";
                mail.Body = mailBody.ToString();
                mail.IsBodyHtml = true;
                SmtpServer.Port = 25;
                SmtpServer.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["SMTP_USERID"].ToString(), ConfigurationManager.AppSettings["SMTP_PASSWORD"].ToString());
                //SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {
                log4net.ILog logger = log4net.LogManager.GetLogger(typeof(OrderDataAccess));

                logger.Error(ex.Message);
            }
        }

        private void SendOrderConfirmationSMS(ConfirmedOrderDetailDTO confirmedOrderDetailDTO)
        {
            try
            {
                string smsText = "Your order has been succesfully placed, thanks for ordering!";
                string userName = "lprathour";
                string passwordField = "22207";
                string companyNameField = confirmedOrderDetailDTO.Vendor.Name;

                string templateString = "Dear " + userName + ",Your Password is " + passwordField + ".Thanks and regards " + companyNameField + ".";

                WebRequest request = WebRequest.Create("http://www.smslane.com/vendorsms/pushsms.aspx?user=lprathour&password=22207&msisdn=" + confirmedOrderDetailDTO.Customer.Contact +
                    "&sid=WEBSMS&msg=" + smsText + "&fl=0");
                request.Method = "GET";
                WebResponse response = request.GetResponse();
                StreamReader reader = new StreamReader(response.GetResponseStream());
                string str = reader.ReadLine();
               
            }
            catch (Exception ex)
            {

            }

        }

        private void SendOrderReadyConfirmationSMS(string contactNumber)
        {
            try
            {
                string smsText = "Your order is ready, please pick it and enjoy it!";


                WebRequest request = WebRequest.Create("http://www.smslane.com/vendorsms/pushsms.aspx?user=lprathour&password=22207&msisdn=" + contactNumber +
                    "&sid=WEBSMS&msg=" + smsText + "&fl=0");
                request.Method = "GET";
                WebResponse response = request.GetResponse();
                StreamReader reader = new StreamReader(response.GetResponseStream());
                string str = reader.ReadLine();
            }
            catch (Exception ex)
            {

            }

        }

        public List<OrderStatusDTO> GetVendorOrderStatus(Guid vendorId, int menuType)
        {
            var orderedItemsQ = eCanteenEntities.OrderItem.Join(eCanteenEntities.MenuFoodItem, oi => oi.FoodItemId, mfi => mfi.FoodItemId, (oi, mfi) => new
            {
                OrderId = oi.OrderId,
                FoodItemId = oi.FoodItemId,
                Quantity = oi.Quantity,
                MenuType=mfi.Type
            }).
            Join(eCanteenEntities.FoodItem, omfi => omfi.FoodItemId, fi => fi.Id, (omfi, fi) => new
            {

                OrderId = omfi.OrderId,
                FoodItemId = omfi.FoodItemId,
                Quantity = omfi.Quantity,
                MenuType = omfi.MenuType,
                FoodItemName = fi.Name

            }).Join(eCanteenEntities.Order, X => X.OrderId, o => o.Id, (X, o) => new
            {

                OrderId = X.OrderId,
                OrderTokenNo = o.TokenNo,
                FoodItemId = X.FoodItemId,
                Quantity = X.Quantity,
                VendorId = o.VenderId,
                CustomerId = o.CustomerId,
                MenuType = X.MenuType,
                OrderStatus = o.Status,
                Accepted = o.Accepted,
                OrderAmount = o.Total,
                FoodItemName = X.FoodItemName,
                PaymentStatus=o.PaymentStatus

            }).Join(eCanteenEntities.Customer, od => od.CustomerId, c => c.Id, (od, c) => new {

                OrderId = od.OrderId,
                OrderTokenNo = od.OrderTokenNo,
                FoodItemId = od.FoodItemId,
                Quantity = od.Quantity,
                VendorId = od.VendorId,
                CustomerId = od.CustomerId,
                MenuType = od.MenuType,
                OrderStatus = od.OrderStatus,
                Accepted = od.Accepted,
                OrderAmount = od.OrderAmount,
                FoodItemName = od.FoodItemName,
                CustomerName = c.Name,
                CustomerEmail = c.Email,
                CustomerContact = c.Contact,
                PaymentStatus = od.PaymentStatus
            })
            .Where(b => b.VendorId.Equals(vendorId) && b.MenuType.Equals(menuType) && b.PaymentStatus.Equals(1)).GroupBy(g => g.OrderId);

            var orderedItems = orderedItemsQ.ToList();

            

            var orderStatusList = new List<OrderStatusDTO>();

            foreach (var vo in orderedItems)
            {
                var orderStatusItem = new OrderStatusDTO();
                var firstRow = vo.ToList().FirstOrDefault();
                orderStatusItem.Customer = new Customer { Id = firstRow.CustomerId, Name = firstRow.CustomerName, Email = firstRow.CustomerEmail, Contact = firstRow.CustomerContact };
                orderStatusItem.Order = new Order { Id = firstRow.OrderId, TokenNo = firstRow.OrderTokenNo, Status = firstRow.OrderStatus,Accepted=firstRow.Accepted, Total = firstRow.OrderAmount, VenderId = firstRow.VendorId };

                orderStatusItem.OrderedItems = new List<FoodItem>();
                foreach (var foodItem in vo.ToList())
                {
                    orderStatusItem.OrderedItems.Add(new FoodItem { Id = foodItem.FoodItemId, Name = foodItem.FoodItemName, Type = foodItem.MenuType, Quantity = foodItem.Quantity });
                }

                orderStatusList.Add(orderStatusItem);

            }

            return orderStatusList;
        }

        public string GetMenuWiseStatusCount(Guid vendorId, int menuType)
        {
            var menuWiseStatusCount = string.Empty;
            var orderedItemsQ = eCanteenEntities.OrderItem.Join(eCanteenEntities.Order, oi => oi.OrderId, o => o.Id, (oi, o) => new
            {
                FoodItemId = oi.FoodItemId,
                VendorId = o.VenderId,
                OrderStatus = o.Status
            }).Join(eCanteenEntities.FoodItem, a => a.FoodItemId, fi => fi.Id, (a, fi) => new
            {
                VendorId = a.VendorId,
                MenuType = fi.Type,
                OrderStatus = a.OrderStatus,
            })
            .Where(b => b.VendorId.Equals(vendorId) && b.MenuType.Equals(menuType)).GroupBy(x => new { x.MenuType });

            var orderedItems = orderedItemsQ.ToList();

            foreach (var item in orderedItems)
            {
                if (item.FirstOrDefault().OrderStatus == 0)
                {
                    menuWiseStatusCount = "P (" + item.Count().ToString() + ") ";
                }
                else
                {
                    menuWiseStatusCount += "R (" + item.Count().ToString() + ")";
                }
            }

            return menuWiseStatusCount;
        }

        public string UpdateOrderStatus(Guid orderId, Guid vendorId, int menuType)
        {
            var order = eCanteenEntities.Order.Where(o => o.Id.Equals(orderId) && o.VenderId.Equals(vendorId)).FirstOrDefault();
            order.Status = 1;
            eCanteenEntities.Entry(order).State = EntityState.Modified;
            eCanteenEntities.SaveChanges();
            var menuWiseStatusCount = GetMenuWiseStatusCount(vendorId, menuType);

            var customerContactNumber = eCanteenEntities.Customer.Where(c => c.Id.Equals(order.CustomerId)).FirstOrDefault().Contact;

            // Send sms to customer about his/her order is ready

            SendOrderReadyConfirmationSMS(customerContactNumber);

            ////////////////////////////////////////////////

            return menuWiseStatusCount;
        }

        public List<ConfirmedOrderDetailDTO> GetCustomerOrderHistory(Guid customerId)
        {
            var lstConfirmedOrderDetailDTO = new List<ConfirmedOrderDetailDTO>();

            var customerOrders = eCanteenEntities.Order.Where(o => o.CustomerId.Equals(customerId)).ToList();

            customerOrders.ForEach(delegate(Order currentOrder)
            {
                var order = eCanteenEntities.Order.Where(o => o.Id.Equals(currentOrder.Id)).FirstOrDefault();
                var ConfirmedOrderDetailDTO = new ConfirmedOrderDetailDTO();
                ConfirmedOrderDetailDTO.Order = order;
                ConfirmedOrderDetailDTO.OrderedItems = new List<FoodItem>();

                order.OrderItem = eCanteenEntities.OrderItem.Where(oi => oi.OrderId.Equals(order.Id)).ToList();

                ConfirmedOrderDetailDTO.Customer = eCanteenEntities.Customer.Where(c => c.Id.Equals(order.CustomerId)).FirstOrDefault();

                order.OrderItem.ToList().ForEach(delegate(OrderItem orderItem)
                {
                    var foodItem = eCanteenEntities.FoodItem.Where(fi => fi.Id.Equals(orderItem.FoodItemId)).FirstOrDefault();

                    var quantity = eCanteenEntities.OrderItem.Where(oi => oi.FoodItemId.Equals(foodItem.Id) && oi.OrderId.Equals(order.Id)).FirstOrDefault().Quantity;

                    ConfirmedOrderDetailDTO.OrderedItems.Add(new FoodItem { Id = orderItem.FoodItemId, Name = foodItem.Name + "(" + quantity + ")", Price = foodItem.Price * quantity });
                });

                ConfirmedOrderDetailDTO.Vendor = eCanteenEntities.Vendor.Where(v => v.Id.Equals(order.VenderId)).FirstOrDefault();

                ConfirmedOrderDetailDTO.PaymentVia = eCanteenEntities.Payment.Where(p => p.OrderId.Equals(order.Id)).FirstOrDefault().PaymentVia;

                lstConfirmedOrderDetailDTO.Add(ConfirmedOrderDetailDTO);
            });

            return lstConfirmedOrderDetailDTO;
        }

        public bool AcceptOrder(Guid orderId,Guid vendorId)
        {
            var order = eCanteenEntities.Order.Where(o => o.Id.Equals(orderId) && o.VenderId.Equals(vendorId)).FirstOrDefault();
            order.Accepted = true;
            eCanteenEntities.Entry(order).State = EntityState.Modified;
            eCanteenEntities.SaveChanges();

            return true;
        }
    }
}
