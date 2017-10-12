using eCanteen.DataAccess;
using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using eCanteen.BussinessLogic.Interfaces;
using eCanteen.DataAccess.Interfaces;

namespace eCanteen.BussinessLogic
{
    public class SiteProvider : ISiteProvider
    {
        private ISiteDataAccess SiteDataAccess
        {
            get
            {
                return new SiteDataAccess();
            }
        }

        public List<Site> GetSites()
        {
            return SiteDataAccess.GetSites();
        }
    }
}
