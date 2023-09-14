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
    public class CreateTicketCommand : IRequest<int>
    {
        public CreateTicketDTO Model { get; }
        public CreateTicketCommand(CreateTicketDTO model)
        {
            this.Model = model;
        }
    }

    public class CreateTicketCommandHandler : IRequestHandler<CreateTicketCommand, int>
    {
        private readonly IUnitOfWork _repository;
        private readonly IValidator<CreateTicketDTO> _validator;

        public CreateTicketCommandHandler(IUnitOfWork repository, IValidator<CreateTicketDTO> validator)
        {
            _repository = repository;
            _validator = validator;
        }

        public async Task<int> Handle(CreateTicketCommand request, CancellationToken cancellationToken)
        {
            CreateTicketDTO model = request.Model;
            
            var result = _validator.Validate(model);

            if (!result.IsValid)
            {
                var errors = result.Errors.Select(x => x.ErrorMessage).ToArray();
                throw new InvalidRequestBodyException
                {
                    Errors = errors
                };
            }


            var entity = new Ticket
            {
                TicketTitle = model.TicketTitle,
                TicketCreationDate = model.TicketCreationDate,
                TicketStartDate = model.TicketStartDate,
                TicketEndDate = model.TicketEndDate,
                UserName = model.UserName,
                ProjectId = model.ProjectId
            };
            _repository.Ticket.Add(entity);
            await _repository.CommitAsync();

            return entity.Id;
        }
    }
}