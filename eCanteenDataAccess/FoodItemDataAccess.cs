using eCanteen.DataAccess.Interfaces;
using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.DataAccess
{
    public class FoodItemDataAccess : IFoodItemDataAccess
    {
        private eCanteenEntities eCanteenEntities;

        public FoodItemDataAccess()
        {
            eCanteenEntities = new eCanteenEntities();
        }

        public FoodItem GetFoodItem(Guid Id, Guid vendorId)
        {
            var foodItem = eCanteenEntities.FoodItem.Where(fi => fi.Id.Equals(Id) && fi.VendorId.Equals(vendorId)).FirstOrDefault();

            return foodItem;
        }

        public List<FoodItem> GetFoodItem(Guid vendorId, int menuType)
        {
            var foodItems = eCanteenEntities.FoodItem.Where(fi => fi.VendorId.Equals(vendorId) && fi.Type.Equals(menuType)).OrderByDescending(ob => ob.LastUpdate).ToList();

            return foodItems;
        }

        public List<FoodItem> GetMenuFoodItem(Guid vendorId, int menuType)
        {
            var foodItems = eCanteenEntities.FoodItem.Where(fi => fi.VendorId.Equals(vendorId));

            var menuFoodItems = eCanteenEntities.MenuFoodItem.Where(mfi => mfi.FoodItemId != null);

            var currentMenuFoodItems = foodItems.Where(fi => menuFoodItems.Any(mfi => mfi.FoodItemId.Equals(fi.Id) && mfi.Type.Equals(menuType) && mfi.Availability)).ToList<FoodItem>();

            //var menuFoodItems = eCanteenEntities.MenuFoodItem.Where(mfi => mfi.FoodItemId.Equals(menu.Id)).ToList();

            //var results = (from mfi in menuFoodItems from fi in foodItems where mfi.FoodItemId.ToString() == fi.Id.ToString() select fi).ToList<FoodItem>();

            return currentMenuFoodItems;
        }

        public List<FoodItem> GetFoodItem(Guid vendorId)
        {
            var foodItems = eCanteenEntities.FoodItem.Where(fi => fi.VendorId.Equals(vendorId)).OrderBy(ob => ob.Name).ToList();
            return foodItems;
        }

        public void SaveFoodItem(FoodItem foodItem, int menuType, Guid vendorId)
        {
            if (foodItem.Id != null && foodItem.Id != Guid.Empty)
            {
                foodItem.LastUpdate = DateTime.Now;
                eCanteenEntities.Entry(foodItem).State = EntityState.Modified;
            }
            else
            {
                foodItem.Id = Guid.NewGuid();
                foodItem.LastUpdate = DateTime.Now;
                eCanteenEntities.FoodItem.Add(foodItem);

                eCanteenEntities.MenuFoodItem.Add(new MenuFoodItem { FoodItemId = foodItem.Id, Type = menuType, Availability = true, VendorId = vendorId });
            }

            eCanteenEntities.SaveChanges();
        }

        public List<FoodItem> GetCurrentFoodItem(Guid vendorId)
        {
            vendorId = Guid.Parse("B4A839B9-E283-46C2-830F-938FE50083F1");
            var foodItems = eCanteenEntities.FoodItem.Where(fi => fi.VendorId.Equals(vendorId)).ToList();
            return foodItems;
            //return null;
        }

        public void SaveVendorCurrentMenu(List<VendorMenu> vendorMenu, Guid vendorId)
        {
            var existingMenuItems = eCanteenEntities.MenuFoodItem.Where(mfi => mfi.VendorId.Equals(vendorId)).ToList();

            if (existingMenuItems.Count > 0)
            {
                existingMenuItems.ForEach(em => eCanteenEntities.Entry(em).State = System.Data.Entity.EntityState.Deleted);

                eCanteenEntities.SaveChanges();
            }

            vendorMenu.ForEach(delegate(VendorMenu vm)
            {
                var menuFoodItem = new MenuFoodItem { FoodItemId = vm.FoodItemId, Type = vm.menuType, Availability = true, VendorId = vendorId };

                eCanteenEntities.Set<MenuFoodItem>().Add(menuFoodItem);
            });

            eCanteenEntities.SaveChanges();
        }
    }
}
