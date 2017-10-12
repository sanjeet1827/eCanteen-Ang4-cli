using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.BussinessLogic.Interfaces
{
    interface IFoodItemProvider
    {
        FoodItem GetFoodItem(Guid Id, Guid VendorId);

        List<FoodItem> GetFoodItem(Guid VendorId, int menuType);

        List<FoodItem> GetMenuFoodItem(Guid vendorId, int menuType);

        List<FoodItem> GetFoodItem(Guid VendorId);

        void SaveFoodItem(FoodItem foodItem, int menuType, Guid vendorId);

        void SaveVendorCurrentMenu(List<VendorMenu> vendorMenu, Guid vendorId);
    }
}
