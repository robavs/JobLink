using System.Text.Json.Serialization;

public class Employer : User
{
    // Nek cuva za pocetak samo listu oglasa
    // pa cu ja da vidim kako da ih iskontrolisem
    // mozda pomocu statusa nekog jer ne znam koja je poenta
    // da cuva dve liste (listu arhiviranih i listu aktivnih kad to moze da se izvuce)

    public Employer()
    {
        Type = "Employer";
    }

    [JsonIgnore]
    public List<Advertisment>? Advertisments { get; set; }

}