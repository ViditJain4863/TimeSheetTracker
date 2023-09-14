using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Assignment.Contracts.DTO;
using Assignment.Core.Exceptions;
using Assignment.Providers.Handlers.Commands;
using Assignment.Providers.Handlers.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TicketController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<TicketDTO>), (int)HttpStatusCode.OK)]
        [ProducesErrorResponseType(typeof(BaseResponseDTO))]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var query = new GetAllTicketQuery();
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpPost]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.Created)]
        [ProducesErrorResponseType(typeof(BaseResponseDTO))]
        public async Task<IActionResult> Post([FromBody] CreateTicketDTO model)
        {
            try
            {
                var command = new CreateTicketCommand(model);
                var response = await _mediator.Send(command);
                return StatusCode((int)HttpStatusCode.Created, response);
            }
            catch (InvalidRequestBodyException ex)
            {
                return BadRequest(new BaseResponseDTO
                {
                    IsSuccess = false,
                    Errors = ex.Errors
                });
            }
        }

        // [HttpGet]
        // [Route("{id}")]
        // [ProducesResponseType(typeof(TicketDTO), (int)HttpStatusCode.OK)]
        // [ProducesErrorResponseType(typeof(BaseResponseDTO))]
        // public async Task<IActionResult> GetById(int id)
        // {
        //     try
        //     {
        //         var query = new GetAppByIdQuery(id);
        //         var response = await _mediator.Send(query);
        //         return Ok(response);
        //     }
        //     catch (EntityNotFoundException ex)
        //     {
        //         return NotFound(new BaseResponseDTO
        //         {
        //             IsSuccess = false,
        //             Errors = new string[] { ex.Message }
        //         });
        //     }
        // }

        // [HttpDelete]
        // [Route("{id}")]
        // [ProducesResponseType(typeof(TicketDTO), (int)HttpStatusCode.OK)]
        // [ProducesErrorResponseType(typeof(BaseResponseDTO))]
        // public async Task<IActionResult> Delete(int id)
        // {
        //     try{
        //         var query = new DeleteTicketByIdQuery(id);
        //         var response = await _mediator.Send(query);
        //         return Ok(response);
        //     }
        //     catch (EntityNotFoundException ex)
        //     {
        //         return NotFound(new BaseResponseDTO
        //         {
        //             IsSuccess = false,
        //             Errors = new string[] { ex.Message }
        //         });
        //     }
        // }

        // [HttpPut("{id}")]
        // [ProducesResponseType(typeof(TicketDTO), (int)HttpStatusCode.OK)]
        // [ProducesErrorResponseType(typeof(BaseResponseDTO))]
        // public IActionResult Update(int id, UpdateRequest model)
        // {
        //  try{
        //         var query = new DeleteTicketByIdQuery(id);
        //         var response = await _mediator.Send(query);
        //         return Ok(response);
        //     }
        //     catch (EntityNotFoundException ex)
        //     {
        //         return NotFound(new BaseResponseDTO
        //         {
        //             IsSuccess = false,
        //             Errors = new string[] { ex.Message }
        //         });
        //     }
        // }
    }
}