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
    
    public partial class Customer
    {
        public Customer()
        {
            this.Order = new HashSet<Order>();
        }
    
        public System.Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Employer { get; set; }
        public string Password { get; set; }
        public bool Active { get; set; }
    
        public virtual ICollection<Order> Order { get; set; }
    }
}
