using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Persistence;

/// <summary>
/// EF Core implementation of IContactMessageRepository.
/// Infrastructure depends on Domain + Application; Application never references this directly.
/// </summary>
public sealed class ContactMessageRepository : IContactMessageRepository
{
    private readonly ApplicationDbContext _context;

    public ContactMessageRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        ContactMessage message,
        CancellationToken cancellationToken = default)
    {
        await _context.ContactMessages.AddAsync(message, cancellationToken);
    }

    public async Task<IReadOnlyList<ContactMessage>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return await _context.ContactMessages
            .OrderByDescending(m => m.CreatedAt)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<ContactMessage?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        return await _context.ContactMessages
            .FirstOrDefaultAsync(m => m.Id == id, cancellationToken);
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await _context.SaveChangesAsync(cancellationToken);
    }
}
