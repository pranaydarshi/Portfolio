using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Portfolio.Application.Interfaces;

namespace Portfolio.Infrastructure.Email;

/// <summary>
/// SMTP implementation of IEmailSender using System.Net.Mail (built into .NET — no extra NuGet needed).
/// Reads configuration from the "EmailSettings" section in appsettings.json.
///
/// For local dev with Gmail:
///   1. Enable 2-Step Verification on your Google account.
///   2. Generate an App Password at https://myaccount.google.com/apppasswords
///   3. Use smtp.gmail.com : 587, Username = your Gmail address, Password = the app password.
///
/// For production on Azure: swap credentials for Azure Key Vault references.
/// </summary>
public sealed class SmtpEmailSender : IEmailSender
{
    private readonly EmailSettings _settings;
    private readonly ILogger<SmtpEmailSender> _logger;

    public SmtpEmailSender(
        IOptions<EmailSettings> options,
        ILogger<SmtpEmailSender> logger)
    {
        _settings = options.Value;
        _logger   = logger;
    }

    public async Task SendAsync(
        string to,
        string subject,
        string htmlBody,
        CancellationToken cancellationToken = default)
    {
        // TODO: Replace the EmailSettings values in appsettings.json with your real SMTP credentials.
        using var client = new SmtpClient(_settings.Host, _settings.Port)
        {
            Credentials  = new NetworkCredential(_settings.Username, _settings.Password),
            EnableSsl    = _settings.UseSsl,
            DeliveryMethod = SmtpDeliveryMethod.Network,
        };

        using var mail = new MailMessage
        {
            From       = new MailAddress(_settings.FromAddress, _settings.FromName),
            Subject    = subject,
            Body       = htmlBody,
            IsBodyHtml = true,
        };

        mail.To.Add(to);

        _logger.LogInformation(
            "Sending email via SMTP. To={To}, Subject={Subject}, Host={Host}:{Port}",
            to, subject, _settings.Host, _settings.Port);

        // SmtpClient.SendMailAsync does not observe CancellationToken natively in .NET 8;
        // wrap with Task.Run if you need cancellation support.
        await client.SendMailAsync(mail);

        _logger.LogInformation("Email sent successfully to {To}.", to);
    }
}
