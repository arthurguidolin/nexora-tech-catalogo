using Microsoft.EntityFrameworkCore;
using Nexora.Api.Models;

namespace Nexora.Api.Data
{
    public class NexoraDbContext : DbContext
    {
        public NexoraDbContext(DbContextOptions<NexoraDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; } = null!;
    }
}
