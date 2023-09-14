using AutoMapper;
using Assignment.Contracts.Data;
using Assignment.Contracts.Data.Entities;
using Assignment.Contracts.DTO;
using MediatR;
using System.Linq;
using Assignment.Core.Exceptions;

namespace Assignment.Providers.Handlers.Queries
{
    public class DeleteProjectByIdQuery : IRequest<IEnumerable<ProjectDTO>>
    {
        public int ProjectId { get; }
        public DeleteProjectByIdQuery(int projectId)
        {
            ProjectId = projectId;
        }
    }

    public class DeleteProjectByIdQueryHandler : IRequestHandler<DeleteProjectByIdQuery, IEnumerable<ProjectDTO>>
    {
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;

        public DeleteProjectByIdQueryHandler(IUnitOfWork repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProjectDTO>> Handle(DeleteProjectByIdQuery request, CancellationToken cancellationToken)
        {
            var entities = await Task.FromResult(_repository.Project.Get(request.ProjectId));
            if(entities==null){
                throw new EntityNotFoundException($"No Project found for Id {request.ProjectId}");
            }
            _repository.Project.Delete(request.ProjectId);
            await _repository.CommitAsync();
            return _mapper.Map<IEnumerable<ProjectDTO>>(entities);
        }
    }
}