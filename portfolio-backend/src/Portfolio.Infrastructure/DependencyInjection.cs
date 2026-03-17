using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Application.Interfaces;
using Portfolio.Infrastructure.Email;
using Portfolio.Infrastructure.Persistence;

namespace Portfolio.Infrastructure;

/// <summary>
/// Extension method to register all Infrastructure-layer services.
/// Called from the API project's Program.cs.
/// API references Infrastructure ONLY here — not in controllers or use case handlers.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // ── Database ─────────────────────────────────────────────────────────
        // Use Npgsql on Heroku (DATABASE_URL present), SQLite locally.
        var isHeroku = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("DATABASE_URL"));
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            if (isHeroku)
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
            else
                options.UseSqlite("Data Source=portfolio_local.db");
        });

        // ── Repository ───────────────────────────────────────────────────────
        services.AddScoped<IContactMessageRepository, ContactMessageRepository>();

        // ── Email ─────────────────────────────────────────────────────────────
        // Bind EmailSettings from appsettings.json
        // NEW — paste these 2 lines
        services.Configure<EmailSettings>(options =>
            configuration.GetSection(EmailSettings.SectionName).Bind(options));

        // TODO: Replace SmtpEmailSender with a different implementation if you
        //       switch to SendGrid, Mailgun, or Azure Communication Services.
        services.AddTransient<IEmailSender, SmtpEmailSender>();

        return services;
    }
}
