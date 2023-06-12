using Microsoft.EntityFrameworkCore;

public class JobLinkContext : DbContext
{
    public JobLinkContext(DbContextOptions options) : base(options)
    { }

    public DbSet<Freelancer>? Freelancers { get; set; }

    public DbSet<Employer>? Employers { get; set; }

    public DbSet<Administrator>? Administrators { get; set; }

    public DbSet<Advertisement>? Advertisements { get; set; }

    public DbSet<FreelancerAdvertisement>? FreelancerAdvertisements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // definisanje kompozitnih kljuceva
        modelBuilder.Entity<Freelancer>()
                    .HasKey(f => new { f.UserName, f.Email });

        modelBuilder.Entity<Employer>()
                            .HasKey(e => new { e.UserName, e.Email });

        modelBuilder.Entity<Administrator>()
                            .HasKey(a => new { a.UserName, a.Email });

        modelBuilder.Entity<Advertisement>()
                    .HasKey(a => a.Id);

        modelBuilder.Entity<Advertisement>()
                    .HasOne(a => a.Employer)
                    .WithMany(e => e.Advertisements)
                    .HasForeignKey(a => new { a.EmployerUserName, a.EmployerEmail });

        // konfiguracija veze vise na vise
        modelBuilder.Entity<FreelancerAdvertisement>()
            .HasKey(fa => new { fa.UserName, fa.Email, fa.AdvertisementId });

        modelBuilder.Entity<FreelancerAdvertisement>()
                    .HasOne<Advertisement>(fa => fa.Advertisement)
                    .WithMany(a => a.Freelancers)
                    .HasForeignKey(fa => fa.AdvertisementId);

        modelBuilder.Entity<FreelancerAdvertisement>()
                    .HasOne<Freelancer>(fa => fa.Freelancer)
                    .WithMany(f => f.Advertisements)
                    .HasForeignKey(fa => new { fa.UserName, fa.Email });
    }
}