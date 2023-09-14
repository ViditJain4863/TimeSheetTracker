using Assignment.Contracts.Data;
using Assignment.Contracts.Data.Repositories;
using Assignment.Core.Data.Repositories;
using Assignment.Migrations;

namespace Assignment.Core.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DatabaseContext _context;

        public UnitOfWork(DatabaseContext context)
        {
            _context = context;
        }
        public IAppRepository App => new AppRepository(_context);

        public IUserRepository User => new UserRepository(_context);

        public IProjectRepository Project => new ProjectRepository(_context);

        public ITrackerRepository Tracker => new TrackerRepository(_context);

        public ITicketRepository Ticket => new TicketRepository(_context);
        
        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}