//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace eCanteen.ModelEntities
{
    using System;
    using System.Collections.Generic;
    
    public partial class MenuFoodItem
    {
        public System.Guid Id { get; set; }
        public System.Guid FoodItemId { get; set; }
        public int Type { get; set; }
        public bool Availability { get; set; }
        public System.Guid VendorId { get; set; }
    
        public virtual FoodItem FoodItem { get; set; }
    }
}
