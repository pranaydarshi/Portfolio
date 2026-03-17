namespace Portfolio.Application.Interfaces;

/// <summary>
/// Email sending contract — Application defines it, Infrastructure implements it.
/// Keeps the use case handler independent of any mail library.
/// </summary>
public interface IEmailSender
{
    /// <param name="to">Recipient email address.</param>
    /// <param name="subject">Email subject line.</param>
    /// <param name="htmlBody">HTML-formatted email body.</param>
    Task SendAsync(
        string to,
        string subject,
        string htmlBody,
        CancellationToken cancellationToken = default);
}
