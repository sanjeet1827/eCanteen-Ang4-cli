using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.ModelEntities
{
    public class ConfirmedOrderDetailDTO
    {
        public Order Order { get; set; }

        public Vendor Vendor { get; set; }

        public ICollection<FoodItem> OrderedItems { get; set; }

        public Customer Customer { get; set; }

        public string PaymentVia { get; set; }
    }
}
