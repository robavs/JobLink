using System.Text.Json.Serialization;

public class Employer : User
{
    public Employer()
    {
        Type = "Employer";
    }

    [JsonIgnore]
    public List<Advertisement>? Advertisements { get; set; }
}