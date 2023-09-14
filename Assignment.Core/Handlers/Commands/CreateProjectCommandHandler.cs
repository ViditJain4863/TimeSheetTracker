using MediatR;
using Assignment.Contracts.Data;
using Assignment.Contracts.DTO;
using Assignment.Contracts.Data.Entities;
using FluentValidation;
using System.Text.Json;
using Assignment.Core.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace Assignment.Providers.Handlers.Commands
{
    public class CreateProjectCommand : IRequest<int>
    {
        public CreateProjectDTO Model { get; }
        public CreateProjectCommand(CreateProjectDTO model)
        {
            this.Model = model;
        }
    }

    public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, int>
    {
        private readonly IUnitOfWork _repository;
        private readonly IValidator<CreateProjectDTO> _validator;

        public CreateProjectCommandHandler(IUnitOfWork repository, IValidator<CreateProjectDTO> validator)
        {
            _repository = repository;
            _validator = validator;
        }

        public async Task<int> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
        {
            CreateProjectDTO model = request.Model;

            var result = _validator.Validate(model);

            if (!result.IsValid)
            {
                var errors = result.Errors.Select(x => x.ErrorMessage).ToArray();
                throw new InvalidRequestBodyException
                {
                    Errors = errors
                };
            }


            var entity = new Project
            {
                ProjectCode = model.ProjectCode,
                ProjectName = model.ProjectName,
                ProjectDescription = model.ProjectDescription,
                ProjectStart = model.ProjectStart,
                ProjectEnd = model.ProjectEnd,
                UserName = model.UserName

            };
            _repository.Project.Add(entity);
            await _repository.CommitAsync();

            return entity.Id;
        }
    }
}