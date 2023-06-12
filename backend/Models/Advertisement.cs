using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class Advertisement
{
    [Key]
    public int Id { get; set; }

    public string? EmployerUserName { get; set; }

    public string? EmployerEmail { get; set; }

    public string? Status { get; set; }

    [Required]
    public string? Title { get; set; }

    [Required]
    public string? Description { get; set; }

    [Required]
    public string? Category { get; set; }

    [Required]
    public string? Skills { get; set; }

    [Required]
    public int Salary { get; set; }

    [JsonIgnore]
    public Employer? Employer { get; set; }

    // Lista radnika koji su se prijavili za dati oglas
    [JsonIgnore]
    public List<FreelancerAdvertisement>? Freelancers { get; set; }

    public Advertisement()
    {
        Status = "Active";
        Freelancers = new List<FreelancerAdvertisement>();
    }
}