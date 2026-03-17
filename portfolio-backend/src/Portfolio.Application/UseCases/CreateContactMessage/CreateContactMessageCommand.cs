namespace Portfolio.Application.UseCases.CreateContactMessage;

/// <summary>
/// Immutable command record carrying the validated data into the use case.
/// Created by the controller from the validated DTO.
/// </summary>
public sealed record CreateContactMessageCommand(
    string Name,
    string Email,
    string? Company,
    string Message
);
