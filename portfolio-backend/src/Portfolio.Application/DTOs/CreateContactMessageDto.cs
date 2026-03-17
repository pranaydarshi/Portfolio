using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTOs;

/// <summary>
/// Data Transfer Object received from the React contact form via the API.
/// Validation attributes are checked in the API layer before the handler is called.
/// </summary>
public sealed class CreateContactMessageDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MaxLength(150, ErrorMessage = "Name must be 150 characters or fewer.")]
    public string Name { get; init; } = string.Empty;

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "A valid email address is required.")]
    [MaxLength(254, ErrorMessage = "Email must be 254 characters or fewer.")]
    public string Email { get; init; } = string.Empty;

    [MaxLength(200, ErrorMessage = "Company must be 200 characters or fewer.")]
    public string? Company { get; init; }

    [Required(ErrorMessage = "Message is required.")]
    [MinLength(10, ErrorMessage = "Message must be at least 10 characters.")]
    [MaxLength(4000, ErrorMessage = "Message must be 4000 characters or fewer.")]
    public string Message { get; init; } = string.Empty;
}
