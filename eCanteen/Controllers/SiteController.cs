﻿using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using eCanteen.BussinessLogic.Interfaces;
using eCanteen.BussinessLogic;

namespace eCanteen.Controllers
{
    public class SiteController : ApiController
    {
        private ISiteProvider SiteProvider
        {
            get
            {
                return new SiteProvider();
            }
        }

        [HttpGet]
        public IList<Site> Get()
        {
            return SiteProvider.GetSites();
        }
    }

}
