using Assignment.Contracts.DTO;
using FluentValidation;

namespace Assignment.Core.Validators
{
    public class CreateTicketDTOValidator : AbstractValidator<CreateTicketDTO>
    {
        public CreateTicketDTOValidator()
        {
            RuleFor(x => x.TicketTitle).NotEmpty().WithMessage("Ticket title is required");
            RuleFor(x => x.TicketStartDate).NotEmpty().WithMessage("Ticket start date is required");
            RuleFor(x => x.TicketEndDate).NotEmpty().WithMessage("Ticket end date is required");
        }
    }
}
