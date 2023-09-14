using AutoMapper;
using Assignment.Contracts.Data;
using Assignment.Contracts.Data.Entities;
using Assignment.Contracts.DTO;
using MediatR;
using System.Linq;

namespace Assignment.Providers.Handlers.Queries
{
    public class GetAllProjectQuery : IRequest<IEnumerable<ProjectDTO>>
    {
    }

    public class GetAllProjectQueryHandler : IRequestHandler<GetAllProjectQuery, IEnumerable<ProjectDTO>>
    {
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;

        public GetAllProjectQueryHandler(IUnitOfWork repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProjectDTO>> Handle(GetAllProjectQuery request, CancellationToken cancellationToken)
        {
            var entities = await Task.FromResult(_repository.Project.GetAll());
            return _mapper.Map<IEnumerable<ProjectDTO>>(entities);
        }
    }
}