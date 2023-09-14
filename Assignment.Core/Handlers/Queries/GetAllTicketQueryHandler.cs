using AutoMapper;
using Assignment.Contracts.Data;
using Assignment.Contracts.Data.Entities;
using Assignment.Contracts.DTO;
using MediatR;
using System.Linq;

namespace Assignment.Providers.Handlers.Queries
{
    public class GetAllTicketQuery : IRequest<IEnumerable<TicketDTO>>
    {
    }

    public class GetAllTicketQueryHandler : IRequestHandler<GetAllTicketQuery, IEnumerable<TicketDTO>>
    {
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;

        public GetAllTicketQueryHandler(IUnitOfWork repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TicketDTO>> Handle(GetAllTicketQuery request, CancellationToken cancellationToken)
        {
            var entities = await Task.FromResult(_repository.Ticket.GetAll());
            return _mapper.Map<IEnumerable<TicketDTO>>(entities);
        }
    }
}