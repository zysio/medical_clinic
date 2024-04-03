using Microsoft.EntityFrameworkCore;
using testApp.Models;

namespace testApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Address> Address { get; set; }

        
    }
}
