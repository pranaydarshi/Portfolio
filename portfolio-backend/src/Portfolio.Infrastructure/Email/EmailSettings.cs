namespace Portfolio.Infrastructure.Email;

/// <summary>
/// Strongly-typed POCO bound to the "EmailSettings" section in appsettings.json.
/// Injected into SmtpEmailSender via IOptions&lt;EmailSettings&gt;.
/// </summary>
public class EmailSettings
{
    public const string SectionName = "EmailSettings";

    /// <summary>SMTP server hostname. E.g. smtp.gmail.com</summary>
    public string Host { get; init; } = string.Empty;

    /// <summary>SMTP port. 587 for TLS (recommended), 465 for SSL, 25 for plain.</summary>
    public int Port { get; init; } = 587;

    /// <summary>SMTP login username (usually your full email address).</summary>
    public string Username { get; init; } = string.Empty;

    /// <summary>
    /// SMTP password or app-specific password.
    /// TODO: In production, store this in Azure Key Vault or environment variables —
    ///       never commit real credentials to source control.
    /// </summary>
    public string Password { get; init; } = string.Empty;

    /// <summary>The "From" address that appears in the email client.</summary>
    public string FromAddress { get; init; } = string.Empty;

    /// <summary>Display name shown alongside the From address.</summary>
    public string FromName { get; init; } = "Portfolio Contact Form";

    /// <summary>Whether to use SSL/TLS. Set true for port 465, false for 587 (STARTTLS).</summary>
    public bool UseSsl { get; init; } = false;
}
