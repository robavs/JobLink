using Microsoft.EntityFrameworkCore;

public class JobLinkContext : DbContext
{
    public JobLinkContext(DbContextOptions options) : base(options)
    { }

    public DbSet<Freelancer>? Freelancers { get; set; }

    public DbSet<Employer>? Employers { get; set; }

    public DbSet<Administrator>? Administrators { get; set; }

    public DbSet<Advertisment>? Advertisments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // definisanje kompozitnih kljuceva
        modelBuilder.Entity<Freelancer>()
                    .HasKey(f => new { f.UserName, f.Email, f.IdNumber });

        modelBuilder.Entity<Employer>()
                            .HasKey(e => new { e.UserName, e.Email, e.IdNumber });

        modelBuilder.Entity<Administrator>()
                            .HasKey(a => new { a.UserName, a.Email, a.IdNumber });

        // uparivanje stranog kompozitnog kljuca sa primarnim kompozitnim kljucem
        modelBuilder.Entity<Advertisment>()
                    .HasOne(o => o.Employer)
                    .WithMany(p => p.Advertisments)
                    .HasForeignKey(o => new { o.EmployerUserName, o.EmployerEmail, o.EmployerIdNumber })
                    .HasPrincipalKey(p => new { p.UserName, p.Email, p.IdNumber });
    }
}