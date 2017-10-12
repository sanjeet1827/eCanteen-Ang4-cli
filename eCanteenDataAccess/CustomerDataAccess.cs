using eCanteen.DataAccess.Interfaces;
using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;


namespace eCanteen.DataAccess
{
    public class CustomerDataAccess : ICustomerDataAccess
    {
        private eCanteenEntities eCanteenEntities;

        public CustomerDataAccess()
        {
            eCanteenEntities = new eCanteenEntities();
        }


        public bool Register(Customer customer)
        {
            if (eCanteenEntities.Customer.Any(cust => cust.Email.Equals(customer.Email.ToLower().Trim())))
            {
                return false;
            }

            if (customer.Id != null && customer.Id != Guid.Empty)
            {
                eCanteenEntities.Entry(customer).State = EntityState.Modified;
            }
            else
            {
                customer.Id = Guid.NewGuid();
                eCanteenEntities.Customer.Add(customer);
            }

            eCanteenEntities.SaveChanges();

            SendRegistrationConfirmationMail(customer);

            return true;
        }

        public Customer Authenticated(string email, string password)
        {
            return eCanteenEntities.Customer.Where(cust => cust.Email.Equals(email.ToLower().Trim()) && cust.Password.Equals(password) && cust.Active.Equals(true)).FirstOrDefault();
        }

        private static void SendRegistrationConfirmationMail(Customer customer)
        {
            try
            {
                StringBuilder mailBody = new StringBuilder();

                mailBody.Append("Youe Registraion is successful, please click below link to activate your account <br/>");
                mailBody.Append("http://www.ejanmat.com/#/confirmRegistration?Id=" + customer.Id);

                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient(ConfigurationManager.AppSettings["SMTP_SERVER"].ToString());

                mail.From = new MailAddress(ConfigurationManager.AppSettings["SMTP_SENDER"].ToString());
                mail.To.Add(customer.Email);
                mail.Subject = "Registration successfully !";
                mail.Body = mailBody.ToString();
                mail.IsBodyHtml = true;
                SmtpServer.Port = 25;
                SmtpServer.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["SMTP_USERID"].ToString(), ConfigurationManager.AppSettings["SMTP_PASSWORD"].ToString());

                SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {
                log4net.ILog logger = log4net.LogManager.GetLogger(typeof(OrderDataAccess));

                logger.Error(ex.Message);
            }
        }

        public void ConfirmRegistration(Guid Id)
        {
            var customer = eCanteenEntities.Customer.Where(c => c.Id.Equals(Id)).FirstOrDefault();
            customer.Active = true;
            eCanteenEntities.Entry(customer).State = EntityState.Modified;

            eCanteenEntities.SaveChanges();
        }

        public Customer GetCustomer(Guid customerId)
        {
            return eCanteenEntities.Customer.Where(c => c.Id.Equals(customerId) && c.Active).FirstOrDefault();
        }
        
    }
}
