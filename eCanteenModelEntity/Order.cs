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
    
    public partial class Order
    {
        public Order()
        {
            this.OrderItem = new HashSet<OrderItem>();
            this.Payment = new HashSet<Payment>();
        }
    
        public System.Guid Id { get; set; }
        public System.Guid CustomerId { get; set; }
        public System.Guid VenderId { get; set; }
        public decimal SubTotal { get; set; }
        public decimal ServiceTax { get; set; }
        public decimal Vat { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public int TimeSlot { get; set; }
        public int Status { get; set; }
        public int PaymentStatus { get; set; }
        public Nullable<System.DateTime> OrderDateTime { get; set; }
        public int TokenNo { get; set; }
        public bool Accepted { get; set; }
    
        public virtual Customer Customer { get; set; }
        public virtual ICollection<OrderItem> OrderItem { get; set; }
        public virtual ICollection<Payment> Payment { get; set; }
    }
}
