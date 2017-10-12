using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.DataAccess.Interfaces
{
    interface IFoodItemDataAccess
    {
        FoodItem GetFoodItem(Guid Id, Guid VendorId);

        List<FoodItem> GetFoodItem(Guid VendorId, int menuType);

        List<FoodItem> GetMenuFoodItem(Guid vendorId, int menuType);

        List<FoodItem> GetFoodItem(Guid VendorId);

        void SaveFoodItem(FoodItem foodItem, int menuType, Guid vendorId);

        List<FoodItem> GetCurrentFoodItem(Guid VendorId);

        void SaveVendorCurrentMenu(List<VendorMenu> vendorMenu, Guid vendorId);
    }
}
