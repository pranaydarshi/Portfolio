using Microsoft.Extensions.DependencyInjection;
using Portfolio.Application.UseCases.CreateContactMessage;

namespace Portfolio.Application;

/// <summary>
/// Extension method to register all Application-layer services with the DI container.
/// Called from the API project's Program.cs — keeps registration close to the layer it belongs to.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Register use case handlers as transient (stateless, short-lived)
        services.AddTransient<CreateContactMessageHandler>();

        return services;
    }
}
