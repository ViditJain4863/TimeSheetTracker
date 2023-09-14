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
    public class CreateTrackerCommand : IRequest<int>
    {
        public CreateTrackerDTO Model { get; }
        public CreateTrackerCommand(CreateTrackerDTO model)
        {
            this.Model = model;
        }
    }

    public class CreateTrackerCommandHandler : IRequestHandler<CreateTrackerCommand, int>
    {
        private readonly IUnitOfWork _repository;
        private readonly IValidator<CreateTrackerDTO> _validator;

        public CreateTrackerCommandHandler(IUnitOfWork repository, IValidator<CreateTrackerDTO> validator)
        {
            _repository = repository;
            _validator = validator;
        }

        public async Task<int> Handle(CreateTrackerCommand request, CancellationToken cancellationToken)
        {
            CreateTrackerDTO model = request.Model;

            var result = _validator.Validate(model);

            if (!result.IsValid)
            {
                var errors = result.Errors.Select(x => x.ErrorMessage).ToArray();
                throw new InvalidRequestBodyException
                {
                    Errors = errors
                };
            }


            var entity = new Tracker
            {
                TrackerDate = model.TrackerDate,
                TracketTask = model.TracketTask,
                TrackerPlace = model.TrackerPlace,
                TrackerDescription = model.TrackerDescription,
                TrackerStatus = model.TrackerStatus,
                UserName = model.UserName,
                ProjectId = model.ProjectId
            };
            _repository.Tracker.Add(entity);
            await _repository.CommitAsync();

            return entity.Id;
        }
    }
}