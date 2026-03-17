using Portfolio.Application;
using Portfolio.Infrastructure;
using Portfolio.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ── Heroku DATABASE_URL → Npgsql connection string ───────────────────────────
// Heroku sets DATABASE_URL automatically when Postgres addon is attached.
// This converts it to the format Npgsql understands.
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
if (!string.IsNullOrEmpty(databaseUrl))
{
    var uri = new Uri(databaseUrl);
    var userInfo = uri.UserInfo.Split(':');
    var npgsqlConnection =
        $"Host={uri.Host};Port={uri.Port};" +
        $"Database={uri.AbsolutePath.TrimStart('/')};" +
        $"Username={userInfo[0]};Password={userInfo[1]};" +
        $"SSL Mode=Require;Trust Server Certificate=true;";
    builder.Configuration["ConnectionStrings:DefaultConnection"] = npgsqlConnection;
}

// ── Services ──────────────────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title = "Portfolio Contact API",
        Version = "v1",
        Description = "Backend for Darshi Sai Pranay's portfolio contact form.",
    });
});

// ── Application + Infrastructure layers ──────────────────────────────────────
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// ── CORS ──────────────────────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "https://dsp-portfolio-frontend-805b73a25f1d.herokuapp.com"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ── Logging ───────────────────────────────────────────────────────────────────
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// ── Build ─────────────────────────────────────────────────────────────────────
var app = builder.Build();

// ── Auto-migrate on startup ───────────────────────────────────────────────────
// Only runs when DATABASE_URL is present (Heroku). Skipped locally to avoid
// needing a local PostgreSQL instance.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("DATABASE_URL")))
        db.Database.Migrate();      // Heroku: run Npgsql migrations
    else
        db.Database.EnsureCreated(); // Local: create SQLite schema from model
}

// ── Middleware pipeline ───────────────────────────────────────────────────────
// Show Swagger in all environments so you can test on Heroku too
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio API v1"));

app.UseCors("ReactFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();