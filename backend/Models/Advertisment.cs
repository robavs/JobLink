using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Advertisment
{
    [Key]
    public int Id { get; set; }

    public string? EmployerUserName { get; set; }

    public string? EmployerEmail { get; set; }

    public string? EmployerIdNumber { get; set; }

    // ovo je trenutno samo opciono razmislicu da li treba da se ubacuje uopste
    // i koji je najbolji nacin da se ishendluje lista aktivnih i ovih drugih
    public string? Status { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Category { get; set; }

    public string? Skills { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public Employer? Employer { get; set; }

    // Lista radnika koji su se prijavili za dati oglas
    public List<Freelancer>? Freelancers { get; set; }
}