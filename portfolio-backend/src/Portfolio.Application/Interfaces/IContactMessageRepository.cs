using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces;

/// <summary>
/// Persistence contract — Application layer defines it, Infrastructure implements it.
/// Application never touches EF Core directly.
/// </summary>
public interface IContactMessageRepository
{
    Task AddAsync(ContactMessage message, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<ContactMessage>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<ContactMessage?> GetByIdAsync(int id, CancellationToken cancellationToken = default);

    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
