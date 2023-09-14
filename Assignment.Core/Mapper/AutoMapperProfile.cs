using AutoMapper;
using Assignment.Contracts.Data.Entities;
using Assignment.Contracts.DTO;

namespace Assignment.Core.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<App, AppDTO>();
            CreateMap<User, UserDTO>();
            CreateMap<Project, ProjectDTO>();
            CreateMap<Tracker, TrackerDTO>();
            CreateMap<Ticket, TicketDTO>();
        }
    }
}
