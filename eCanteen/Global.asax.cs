using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace eCanteen
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            
            GlobalConfiguration.Configure(WebApiConfig.Register);
            log4net.Config.XmlConfigurator.Configure();

            log4net.ILog logger = log4net.LogManager.GetLogger(this.GetType());

            logger.Info("Application starting..");
            
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            log4net.ILog logger = log4net.LogManager.GetLogger(this.GetType());

            logger.Error(Server.GetLastError().Message);
        }
    }
}