using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Persistence;

/// <summary>
/// EF Core DbContext for the portfolio application.
/// Only Infrastructure knows about EF Core — Application and Domain do not.
/// </summary>
public sealed class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ContactMessage>(entity =>
        {
            entity.ToTable("ContactMessages");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                  .ValueGeneratedOnAdd();

            entity.Property(e => e.Name)
                  .IsRequired()
                  .HasMaxLength(150);

            entity.Property(e => e.Email)
                  .IsRequired()
                  .HasMaxLength(254);

            entity.Property(e => e.Company)
                  .HasMaxLength(200);   // nullable — no .IsRequired()

            entity.Property(e => e.Message)
                  .IsRequired()
                  .HasMaxLength(4000);

            entity.Property(e => e.CreatedAt)
                  .IsRequired();

            entity.Property(e => e.IsHandled)
                  .IsRequired()
                  .HasDefaultValue(false);

            // Index for common admin queries
            entity.HasIndex(e => e.CreatedAt).IsDescending();
            entity.HasIndex(e => e.IsHandled);
        });
    }
}
