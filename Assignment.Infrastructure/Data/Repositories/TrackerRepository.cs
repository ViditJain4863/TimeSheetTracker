using Assignment.Contracts.Data.Entities;
using Assignment.Contracts.Data.Repositories;
using Assignment.Migrations;

namespace Assignment.Core.Data.Repositories
{
    public class TrackerRepository : Repository<Tracker>, ITrackerRepository
    {
        public TrackerRepository(DatabaseContext context) : base(context)
        {
        }
    }
}