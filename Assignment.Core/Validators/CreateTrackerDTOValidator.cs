using Assignment.Contracts.DTO;
using FluentValidation;

namespace Assignment.Core.Validators
{
    public class CreateTrackerDTOValidator : AbstractValidator<CreateTrackerDTO>
    {
        public CreateTrackerDTOValidator()
        {
            RuleFor(x => x.TrackerDate).NotEmpty().WithMessage("Tracker date is required");
            RuleFor(x => x.TrackerStatus).NotEmpty().WithMessage("Tracker status is required");
            RuleFor(x => x.TracketTask).NotEmpty().WithMessage("Tracker task is required");
            RuleFor(x => x.TrackerPlace).NotEmpty().WithMessage("Tracker place is required");
        }
    }
}
