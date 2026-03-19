using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public sealed class ChatController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration     _configuration;
    private readonly ILogger<ChatController> _logger;

    private const string SYSTEM_PROMPT = """
        You are an AI assistant for Darshi Sai Pranay's developer portfolio.
        Your job is to answer questions about Darshi professionally and concisely.
        Keep responses short (2-4 sentences max). Be friendly and enthusiastic.
        Never make up information — only use what is provided below.

        === ABOUT DARSHI ===
        Name: Darshi Sai Pranay
        Role: .NET Full Stack Developer
        Experience: 2+ years building enterprise-grade applications
        Location: India
        Email: pranaydarshi16102@gmail.com
        LinkedIn: https://www.linkedin.com/in/darshi-sai-pranay-410b51225/
        GitHub: https://github.com/pranaydarshi
        Certification: Microsoft Azure Fundamentals (AZ-900)

        === TECH STACK ===
        Backend: ASP.NET Core 8, C#, .NET 6/8, Web API, EF Core, Dapper
        Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap
        Cloud: Azure Service Bus, Blob Storage, AD, Key Vault, Application Insights, CI/CD
        Architecture: Clean Architecture, N-Tier, Microservices, SOLID, CQS, Repository Pattern
        Security: JWT, RBAC, TOTP MFA, bcrypt, Azure AD
        Databases: SQL Server, Stored Procedures, Query Optimization, EF Core Migrations
        Testing: xUnit, Unit/Integration Testing, TDD

        === PROJECTS ===
        1. Youthworks Employee Onboarding Platform
           - HR automation portal with DocuSign e-signatures, SharePoint folder provisioning
           - Clean Architecture Web API, 6-stage IHostedService background pipeline
           - JWT + TOTP MFA security, 17 xUnit test files
           - Stack: ASP.NET Core 8, React, Azure Key Vault, DocuSign SDK, EF Core

        2. MillerKaplan QSF WorkPaper Automation
           - Financial document pipeline with 5-stage IHostedService
           - Dead-letter retry, 100% message recovery, Azure Service Bus
           - Stack: ASP.NET Core, Azure Service Bus, EF Core, SQL Server

        3. HarshBerger Agricultural Service Billing
           - 7-project N-Tier architecture, dual ORM (EF Core + Dapper)
           - 6 stored procedures, PeriodicTimer service, ClosedXML Excel export
           - Stack: ASP.NET Core, SQL Server, EF Core, Dapper, ClosedXML

        === SERVICES ===
        - HR Onboarding & Employee Portals (DocuSign, SharePoint, Azure Blob)
        - Billing, Invoicing & Financial Workflows (Service Bus, ClosedXML)
        - Custom Admin Panels & Internal Tools (JWT/RBAC, TOTP MFA)
        - API Integrations & Background Automations (Service Bus, Key Vault)

        === AVAILABILITY ===
        Darshi is currently available for new projects and open to opportunities.
        To hire or contact him, visitors should use the Contact page or email directly.

        If asked something outside this scope, politely say you only have information about Darshi's portfolio.

        === SPECIAL RULES ===
        If anyone asks about "Krishi" or "Manikanta", respond with exactly: "I don't know about Lekhi Lamps 💡"
        """;

    public ChatController(
        IHttpClientFactory      httpClientFactory,
        IConfiguration          configuration,
        ILogger<ChatController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _configuration     = configuration;
        _logger            = logger;
    }

    /// <summary>
    /// POST /api/chat
    /// Accepts a user message and returns an AI response via Groq API.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ChatResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Post([FromBody] ChatRequestDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.Message))
            return BadRequest(new { error = "Message cannot be empty." });

        if (dto.Message.Length > 500)
            return BadRequest(new { error = "Message too long." });

        var apiKey = _configuration["GroqApiKey"]
                     ?? Environment.GetEnvironmentVariable("GroqApiKey");

        if (string.IsNullOrEmpty(apiKey))
        {
            _logger.LogError("GroqApiKey is not configured.");
            return StatusCode(500, new { error = "Chat service is not configured." });
        }

        try
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", apiKey);

            var payload = new
            {
                model    = "llama-3.3-70b-versatile",
                messages = new[]
                {
                    new { role = "system",    content = SYSTEM_PROMPT },
                    new { role = "user",      content = dto.Message   }
                },
                max_tokens  = 300,
                temperature = 0.7
            };

            var json    = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(
                "https://api.groq.com/openai/v1/chat/completions",
                content,
                cancellationToken);

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Groq API error {Status}: {Body}", response.StatusCode, responseBody);
                return StatusCode(500, new { error = "AI service error. Please try again." });
            }

            using var doc   = JsonDocument.Parse(responseBody);
            var reply       = doc.RootElement
                                 .GetProperty("choices")[0]
                                 .GetProperty("message")
                                 .GetProperty("content")
                                 .GetString() ?? "Sorry, I couldn't generate a response.";

            return Ok(new ChatResponseDto { Reply = reply.Trim() });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling Groq API.");
            return StatusCode(500, new { error = "Unexpected error. Please try again." });
        }
    }
}

public sealed record ChatRequestDto
{
    public string Message { get; init; } = string.Empty;
}

public sealed record ChatResponseDto
{
    public string Reply { get; init; } = string.Empty;
}
