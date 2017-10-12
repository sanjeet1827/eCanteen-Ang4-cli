using eCanteen.DataAccess.Interfaces;
using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.DataAccess
{
    public class SiteDataAccess : ISiteDataAccess
    {
        private eCanteenEntities eCanteenEntities;

        public SiteDataAccess()
        {
            eCanteenEntities = new eCanteenEntities();
        }

        public List<Site> GetSites()
        {

            return eCanteenEntities.Site.ToList();
        }
    }
}
