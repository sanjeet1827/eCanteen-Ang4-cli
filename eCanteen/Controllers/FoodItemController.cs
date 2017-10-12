using eCanteen.ModelEntities;
using eCanteen.BussinessLogic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace eCanteen.Controllers
{
    public class FoodItemController : ApiController
    {
        private FoodItemProvider FoodItemProvider
        {
            get
            {
                return new FoodItemProvider();
            }
        }

        [HttpGet]
        public FoodItem Get(Guid Id, Guid vendorId)
        {
            return FoodItemProvider.GetFoodItem(Id, vendorId);
        }

        [HttpGet]
        public List<FoodItem> Get(Guid vendorId, int menuType)
        {
            return FoodItemProvider.GetFoodItem(vendorId, menuType);
        }

        [HttpGet]
        public List<FoodItem> Get(Guid vendorId, int menuType, bool customer)
        {
            return FoodItemProvider.GetMenuFoodItem(vendorId, menuType);
        }

        [HttpGet]
        public List<FoodItem> Get(Guid vendorId)
        {
            return FoodItemProvider.GetFoodItem(vendorId);
        }

        [HttpPost]
        public void Post(FoodItem foodItem, int menuType,Guid vendorId)
        {
            FoodItemProvider.SaveFoodItem(foodItem, menuType, vendorId);
        }

        /*
        [HttpGet]
        public List<FoodItem> Get(Guid vendorId)
        {
            return FoodItemProvider.GetCurrentFoodItem(vendorId);
        }
         */

        [HttpPost]
        public void Post(List<VendorMenu> vendorMenu, Guid vendorId)
        {
            FoodItemProvider.SaveVendorCurrentMenu(vendorMenu, vendorId);
        }
    }
}
