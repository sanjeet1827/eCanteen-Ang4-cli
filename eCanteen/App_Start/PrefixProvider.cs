using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Routing;

namespace eCanteen.App_Start 
{
    public class PrefixProvider : DefaultDirectRouteProvider
    {
        private readonly string _commonPrefix;

        public PrefixProvider(string prefix)
        {
            _commonPrefix = prefix;
        }
        protected override string GetRoutePrefix(HttpControllerDescriptor controllerDescriptor)
        {

            string prefix = _commonPrefix;
            var existingPrefix = base.GetRoutePrefix(controllerDescriptor);
            if(existingPrefix!=null)
            {
                prefix = String.Format("{0}/{1}",_commonPrefix,existingPrefix);
            }
            return prefix;
        }
    }
}