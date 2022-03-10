
using chooseSomethingToDo.DBModels;
using Microsoft.EntityFrameworkCore;

namespace chooseSomethingToDo.Database
{
    public class AppDbContext : DbContext
    {
        public DbSet<Lobby> Lobbys { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<YelpListing> YelpListings { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
    }
}
