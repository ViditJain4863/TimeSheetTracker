using Assignment.Contracts.Data.Repositories;

namespace Assignment.Contracts.Data
{
    public interface IUnitOfWork
    {
        IAppRepository App { get; }
        IUserRepository User { get; }
        IProjectRepository Project {get;}
        ITrackerRepository Tracker {get;}
        ITicketRepository Ticket {get;}
        Task CommitAsync();

    }
}