using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTOs;
using Portfolio.Application.Interfaces;
using Portfolio.Application.UseCases.CreateContactMessage;

namespace Portfolio.API.Controllers;

/// <summary>
/// Handles all /api/contact endpoints.
///
/// Dependency rule: this controller depends only on Application layer types.
/// It never references Infrastructure, EF Core, or SmtpClient directly.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public sealed class ContactController : ControllerBase
{
    private readonly CreateContactMessageHandler   _createHandler;
    private readonly IContactMessageRepository     _repository;
    private readonly ILogger<ContactController>    _logger;

    public ContactController(
        CreateContactMessageHandler   createHandler,
        IContactMessageRepository     repository,
        ILogger<ContactController>    logger)
    {
        _createHandler = createHandler;
        _repository    = repository;
        _logger        = logger;
    }

    /// <summary>
    /// POST /api/contact
    /// Accepts a contact form submission from the React frontend.
    /// Saves to DB and sends an email notification.
    /// </summary>
    /// <response code="201">Message saved successfully. Returns the new Id.</response>
    /// <response code="400">Validation failed — see errors in response body.</response>
    /// <response code="500">Unexpected server error.</response>
    [HttpPost]
    [ProducesResponseType(typeof(object), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Post(
        [FromBody] CreateContactMessageDto dto,
        CancellationToken cancellationToken)
    {
        // Model binding + data annotation validation runs automatically.
        // If the DTO fails validation, ASP.NET Core returns 400 before we get here.

        _logger.LogInformation(
            "POST /api/contact received from {Email}", dto.Email);

        var command = new CreateContactMessageCommand(
            dto.Name,
            dto.Email,
            dto.Company,
            dto.Message);

        try
        {
            var id = await _createHandler.HandleAsync(command, cancellationToken);

            return CreatedAtAction(
                nameof(GetById),
                new { id },
                new { id, message = "Your message has been received. I'll be in touch shortly." });
        }
        catch (ArgumentException ex)
        {
            // Domain-level guard violations (belt-and-suspenders)
            _logger.LogWarning("Validation error in CreateContactMessage: {Error}", ex.Message);
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error processing contact message.");
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new { error = "An unexpected error occurred. Please try again or email me directly." });
        }
    }

    /// <summary>
    /// GET /api/contact
    /// Returns all stored contact messages (simple admin view — protect with auth in production).
    /// </summary>
    /// <response code="200">List of all contact messages, newest first.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<ContactMessageDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        // TODO: Add [Authorize] attribute and an admin role check before deploying to production.
        //       Without auth, anyone who knows this URL can read all messages.
        var messages = await _repository.GetAllAsync(cancellationToken);

        var dtos = messages.Select(m => new ContactMessageDto
        {
            Id        = m.Id,
            Name      = m.Name,
            Email     = m.Email,
            Company   = m.Company,
            Message   = m.Message,
            CreatedAt = m.CreatedAt,
            IsHandled = m.IsHandled,
        }).ToList();

        return Ok(dtos);
    }

    /// <summary>
    /// GET /api/contact/{id}
    /// Used by CreatedAtAction — returns a single message by Id.
    /// </summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ContactMessageDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var message = await _repository.GetByIdAsync(id, cancellationToken);
        if (message is null)
            return NotFound();

        return Ok(new ContactMessageDto
        {
            Id        = message.Id,
            Name      = message.Name,
            Email     = message.Email,
            Company   = message.Company,
            Message   = message.Message,
            CreatedAt = message.CreatedAt,
            IsHandled = message.IsHandled,
        });
    }
}
