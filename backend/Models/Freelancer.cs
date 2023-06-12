using System.Text.Json.Serialization;

public class Freelancer : User
{
    public string? Skills { get; set; }

    public int HourlyRate { get; set; }

    [JsonIgnore]
    public List<FreelancerAdvertisement>? Advertisements { get; set; }

    public Freelancer()
    {
        Type = "Freelancer";
        Advertisements = new List<FreelancerAdvertisement>();
    }
}
