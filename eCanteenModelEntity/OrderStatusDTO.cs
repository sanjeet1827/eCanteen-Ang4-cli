using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCanteen.ModelEntities
{
    public class OrderStatusDTO
    {
        public Order Order { get; set; }

        public Customer Customer { get; set; }

        public ICollection<FoodItem> OrderedItems { get; set; }

        public string OrderedItemStatusCount { get; set; }

        public bool ConfirmedReady { get; set; }
    }
}
