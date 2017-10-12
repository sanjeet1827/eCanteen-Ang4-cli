using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCanteen.ModelEntities
{
    public partial class FoodItem
    {
        [NotMapped]
        public int Quantity { get; set; }
        
    }
}