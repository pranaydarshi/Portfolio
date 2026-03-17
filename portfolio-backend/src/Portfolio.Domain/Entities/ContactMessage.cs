namespace Portfolio.Domain.Entities;

/// <summary>
/// Core domain entity representing a contact form submission.
/// No dependencies on any other project — pure domain model.
/// </summary>
public class ContactMessage
{
    public int Id { get; private set; }

    public string Name { get; private set; } = string.Empty;

    public string Email { get; private set; } = string.Empty;

    /// <summary>Optional — may be null if the sender is an individual.</summary>
    public string? Company { get; private set; }

    public string Message { get; private set; } = string.Empty;

    public DateTime CreatedAt { get; private set; }

    /// <summary>Marks whether this enquiry has been followed up on.</summary>
    public bool IsHandled { get; private set; }

    // EF Core requires a parameterless constructor (can be private/protected).
    private ContactMessage() { }

    /// <summary>
    /// Factory method — the only way to create a valid ContactMessage.
    /// Keeps construction logic in the domain.
    /// </summary>
    public static ContactMessage Create(
        string name,
        string email,
        string? company,
        string message)
    {
        return new ContactMessage
        {
            Name      = name.Trim(),
            Email     = email.Trim().ToLowerInvariant(),
            Company   = string.IsNullOrWhiteSpace(company) ? null : company.Trim(),
            Message   = message.Trim(),
            CreatedAt = DateTime.UtcNow,
            IsHandled = false
        };
    }

    public void MarkHandled() => IsHandled = true;
}
