using System.ComponentModel.DataAnnotations;

public class User
{
    // Generalno ce trebati da se ubaci neka validacija za email i tako neke stvari
    [Key]
    [MaxLength(20)]
    public string? UserName { get; set; }  // User ce moci da se loguje i sa email i sa Username
    [Key]
    //REG exprs
    public string? Email { get; set; }
    public string? Password { get; set; } // Lozinka koju cuvamo predstavlja hesiranu vrednost

    [MaxLength(20)]
    public string? FirstName { get; set; }

    [MaxLength(20)]
    public string? LastName { get; set; }

    public char Gender { get; set; }
    public DateTime BirthDate { get; set; }

    // misli se na source slike
    public string? ImgSrc { get; set; }

    [MaxLength(30)]
    public string? Country { get; set; }

    [MaxLength(30)]
    public string? City { get; set; }

    [MaxLength(30)]
    public string? Address { get; set; }

    [MaxLength(15)]
    public string? PhoneNumber { get; set; }

    [Key]
    public string? IdNumber { get; set; }

    public string? Biography { get; set; }
    // ovo se pamti kao string formata
    // IT,Science,Electrical Engineering i tako
    // jer se sve to preuzima sa klijentske
    // strane pa posto je neprakticnije 
    // da se sacuva lista ovo je dobar nacin
    public string? Category { get; set; }

    public string? Type { get; protected set; }

    public string? Education { get; set; }

    public string? Experience { get; set; }
}
