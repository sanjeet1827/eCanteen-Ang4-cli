using eCanteen.ModelEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;

namespace eCanteen.DataAccess
{
    public partial class eCanteenEntities : DbContext
    {
        public int SaveChanges()
        {
            try
            {
                PrepareSaveChanges();
                return base.SaveChanges();
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException ex)
            {
                
                
            }
            return 0;
        }

        private void PrepareSaveChanges()
        {
            IEnumerable<DbEntityEntry> changedEntityEntries = ChangeTracker.Entries().Where(e =>
                e.State == EntityState.Added ||
                e.State == EntityState.Modified ||
                e.State == EntityState.Deleted ||
                e.State == EntityState.Unchanged);

            foreach (var entity in changedEntityEntries)
            {
                if (entity.State == EntityState.Added)
                {
                    var Id = entity.Property("Id");
                    if (Id.CurrentValue == null || (Guid)Id.CurrentValue == Guid.Empty)
                    {
                        Id.CurrentValue = Guid.NewGuid();
                    }
                }
            }

        }
    }
}
