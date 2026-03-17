namespace Portfolio.Application.DTOs;

/// <summary>
/// Read-only DTO returned by the GET /api/contact admin endpoint.
/// Never expose the domain entity directly over the wire.
/// </summary>
public sealed class ContactMessageDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string? Company { get; init; }
    public string Message { get; init; } = string.Empty;
    public DateTime CreatedAt { get; init; }
    public bool IsHandled { get; init; }
}
