using System.Text.Json.Serialization;

public class Freelancer : User
{
    // ovo se pamti kao string formata
    // webdizajn,programiranje,mob.apl
    // jer se sve to preuzima sa klijentske
    // strane pa posto je neprakticnije 
    // da se sacuva lista ovo je dobar nacin
    public Freelancer()
    {
        Type = "Freelancer";
    }
    public string? Skills { get; set; }

    public int HourlyRate { get; set; }

    [JsonIgnore]
    public List<Advertisment>? Oglasi { get; set; }

}
