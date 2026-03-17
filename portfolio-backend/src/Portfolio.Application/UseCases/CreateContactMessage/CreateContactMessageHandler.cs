using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Microsoft.Extensions.Logging;

namespace Portfolio.Application.UseCases.CreateContactMessage;

public sealed class CreateContactMessageHandler
{
    private readonly IContactMessageRepository _repository;
    private readonly IEmailSender _emailSender;
    private readonly ILogger<CreateContactMessageHandler> _logger;

    private const string NotificationEmail = "darshisaipranay@gmail.com";

    public CreateContactMessageHandler(
        IContactMessageRepository repository,
        IEmailSender emailSender,
        ILogger<CreateContactMessageHandler> logger)
    {
        _repository = repository;
        _emailSender = emailSender;
        _logger = logger;
    }

    public async Task<int> HandleAsync(
        CreateContactMessageCommand command,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(command.Name))
            throw new ArgumentException("Name is required.", nameof(command.Name));

        if (string.IsNullOrWhiteSpace(command.Email))
            throw new ArgumentException("Email is required.", nameof(command.Email));

        if (string.IsNullOrWhiteSpace(command.Message))
            throw new ArgumentException("Message is required.", nameof(command.Message));

        if (command.Message.Trim().Length < 10)
            throw new ArgumentException("Message must be at least 10 characters.", nameof(command.Message));

        var contactMessage = ContactMessage.Create(
            command.Name,
            command.Email,
            command.Company,
            command.Message);

        await _repository.AddAsync(contactMessage, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        _logger.LogInformation(
            "Contact message saved. Id={Id}, From={Email}",
            contactMessage.Id, contactMessage.Email);

        try
        {
            var subject = "New portfolio enquiry from " + contactMessage.Name;
            var body = BuildEmailBody(contactMessage);
            await _emailSender.SendAsync(NotificationEmail, subject, body, cancellationToken);
            _logger.LogInformation("Notification email sent for contact message Id={Id}", contactMessage.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Failed to send notification email for contact message Id={Id}. The message was saved successfully.",
                contactMessage.Id);
        }

        return contactMessage.Id;
    }

    private static string BuildEmailBody(ContactMessage msg)
    {
        var company = string.IsNullOrWhiteSpace(msg.Company)
                             ? "<em>Not provided</em>"
                             : System.Net.WebUtility.HtmlEncode(msg.Company);
        var encodedMessage = System.Net.WebUtility.HtmlEncode(msg.Message);
        var encodedName = System.Net.WebUtility.HtmlEncode(msg.Name);
        var encodedEmail = System.Net.WebUtility.HtmlEncode(msg.Email);
        var receivedAt = msg.CreatedAt.ToString("dd MMM yyyy, HH:mm") + " UTC";

        var css =
            "body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7fb; margin: 0; padding: 24px; } " +
            ".card { background: #ffffff; border-radius: 8px; padding: 32px; max-width: 560px; margin: 0 auto; box-shadow: 0 2px 12px rgba(0,0,0,.08); } " +
            "h2 { color: #0f1628; margin-top: 0; } " +
            ".row { margin: 12px 0; } " +
            ".lbl { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: #7a8ba8; margin-bottom: 2px; } " +
            ".val { color: #1e293b; font-size: 15px; } " +
            ".msg { background: #f8fafc; border-left: 3px solid #00d4ff; padding: 12px 16px; border-radius: 0 4px 4px 0; color: #1e293b; white-space: pre-wrap; font-size: 14px; line-height: 1.6; } " +
            ".foot { font-size: 12px; color: #94a3b8; margin-top: 24px; }";

        return
            "<!DOCTYPE html>" +
            "<html lang=\"en\">" +
            "<head><meta charset=\"UTF-8\" /><style>" + css + "</style></head>" +
            "<body><div class=\"card\">" +
            "<h2>&#128236; New Portfolio Enquiry</h2>" +
            "<div class=\"row\"><div class=\"lbl\">Name</div><div class=\"val\">" + encodedName + "</div></div>" +
            "<div class=\"row\"><div class=\"lbl\">Email</div><div class=\"val\"><a href=\"mailto:" + encodedEmail + "\">" + encodedEmail + "</a></div></div>" +
            "<div class=\"row\"><div class=\"lbl\">Company</div><div class=\"val\">" + company + "</div></div>" +
            "<div class=\"row\"><div class=\"lbl\">Received</div><div class=\"val\">" + receivedAt + "</div></div>" +
            "<div class=\"row\"><div class=\"lbl\">Message</div><div class=\"msg\">" + encodedMessage + "</div></div>" +
            "<p class=\"foot\">This message was saved to your portfolio database (Id: " + msg.Id + "). Reply directly to the sender's email above.</p>" +
            "</div></body></html>";
    }
}