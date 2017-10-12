using eCanteen.BussinessLogic.Interfaces;
using eCanteen.DataAccess;
using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.BussinessLogic
{
    public class FoodItemProvider : IFoodItemProvider
    {
        private FoodItemDataAccess FoodItemDataAccess
        {
            get
            {
                return new FoodItemDataAccess();
            }
        }

        public FoodItem GetFoodItem(Guid Id, Guid vendorId)
        {
            return FoodItemDataAccess.GetFoodItem(Id, vendorId);
        }

        public List<FoodItem> GetFoodItem(Guid vendorId, int menuType)
        {
            return FoodItemDataAccess.GetFoodItem(vendorId, menuType);
        }

        public List<FoodItem> GetMenuFoodItem(Guid vendorId, int menuType)
        {
            return FoodItemDataAccess.GetMenuFoodItem(vendorId, menuType);
        }

        public List<FoodItem> GetFoodItem(Guid vendorId)
        {
            return FoodItemDataAccess.GetFoodItem(vendorId);
        }

        public void SaveFoodItem(FoodItem foodItem, int menuType, Guid vendorId)
        {
            FoodItemDataAccess.SaveFoodItem(foodItem, menuType, vendorId);
        }

        public List<FoodItem> GetCurrentFoodItem(Guid vendorId)
        {
            return null;
            //return FoodItemDataAccess.GetCurrentFoodItem(vendorId);
        }

        public void SaveVendorCurrentMenu(List<VendorMenu> vendorMenu, Guid vendorId)
        {
            FoodItemDataAccess.SaveVendorCurrentMenu(vendorMenu, vendorId);
        }

    }
}
