using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

[ApiController]
[Route("[controller]")]
public class FreelancerController : ControllerBase
{
    public JobLinkContext? Context { get; set; }
    public Functions<Freelancer> methods;
    public FreelancerController(JobLinkContext context)
    {
        Context = context;
        methods = new Functions<Freelancer>();
    }

    [HttpPost("Add")]
    public async Task<ActionResult> AddFreelancer([FromBody] Freelancer freelancer)
    {
        return await methods.AddUser(Context!, freelancer);
    }

    [HttpPut("UpdateProfilePicture/{userName}")]
    public async Task<ActionResult> UpdateProfilePicture(string userName, [FromBody] string imgSrc)
    {
        return await methods.UpdateProperty(userName, imgSrc, "ImgSrc", Context!.Freelancers!, Context);
    }

    [HttpPut("UpdateSkills/{userName}/{skills}")]
    public async Task<ActionResult> UpdateSkills(string userName, string skills)
    {
        return await methods.UpdateProperty(userName, skills, "Skills", Context!.Freelancers!, Context);
    }

    [HttpPut("UpdateHourlyRate/{userName}/{hourlyRate}")]
    public async Task<ActionResult> UpdateHourlyRate(string userName, int hourlyRate)
    {
        if (hourlyRate <= 0)
            return BadRequest("Hourly rate cant be less or equal than zero");

        if (hourlyRate > 200) hourlyRate = 200;

        return await methods.UpdateProperty<int>(userName, hourlyRate, "HourlyRate", Context!.Freelancers!, Context);
    }

    [HttpPut("UpdatePassword/{userName}/{oldPassword}/{newPassword}")]
    public async Task<ActionResult> UpdatePassword(string userName, string oldPassword, string newPassword)
    {
        return await methods.UpdatePassword(userName, oldPassword, newPassword, Context!.Freelancers!, Context);
    }

    [HttpPut("UpdateBiography/{userName}")]
    public async Task<ActionResult> UpdateBiography(string userName, [FromBody] string biography)
    {
        return await methods.UpdateProperty(userName, biography, "Biography", Context!.Freelancers!, Context);
    }

    [HttpPut("UpdateEducation/{userName}")]
    public async Task<ActionResult> UpdateEducation(string userName, [FromBody] string education)
    {
        return await methods.UpdateProperty(userName, education, "Education", Context!.Freelancers!, Context);
    }

    [HttpPut("UpdateExperience/{userName}")]
    public async Task<ActionResult> UpdateExperience(string userName, [FromBody] string experience)
    {
        return await methods.UpdateProperty(userName, experience, "Experience", Context!.Freelancers!, Context);
    }

    [HttpGet("GetAll")]
    public ActionResult GetFreelancers()
    {
        return Ok(Context?.Freelancers!);
    }

    [HttpDelete("DeleteAll")]
    public async Task<ActionResult> DeleteFreelancers()
    {
        return await methods.DeleteAll(Context!, 'F');
    }

    [HttpPost("FreelancerApplication/{userName}/{advertisementId}")]
    public async Task<ActionResult> FreelancerApplication(string userName, int advertisementId, [FromBody] string application)
    {
        try
        {
            var advertisement = await Context!.Advertisements!.FirstOrDefaultAsync(a => a.Id == advertisementId);

            if (advertisement == null) return BadRequest("Advertisement doesn't exist");

            var freelancer = await Context!.Freelancers!.FirstOrDefaultAsync(f => f.UserName == userName);
            if (freelancer == null) return BadRequest("Freelancer doens't exist");

            FreelancerAdvertisement freelancerAdvertisement = new FreelancerAdvertisement
            {
                UserName = userName,
                Email = freelancer.Email,
                Freelancer = freelancer,
                AdvertisementId = advertisementId,
                Advertisement = advertisement,
                Application = application
            };

            await Context!.FreelancerAdvertisements!.AddAsync(freelancerAdvertisement);
            await Context.SaveChangesAsync();
            return Ok("Freelancer sign up for job successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException!.Message);
        }
    }

    [HttpGet("GetAdvertisements/{userName}")]
    public async Task<ActionResult> GetAllAdvertisements(string userName)
    {
        var freelancer = await Context!.Freelancers!.FirstOrDefaultAsync(f => f.UserName == userName);
        if (freelancer == null) return BadRequest("Freelancer not found");

        var freelancerAdvertisements = await Context!.FreelancerAdvertisements!
            .Include(fa => fa.Advertisement)
            .Where(fa => fa.UserName == userName)
            .Select(fa => new
            {
                Advertisement = fa.Advertisement,
                Application = fa.Application
            })
            .ToListAsync();

        return Ok(freelancerAdvertisements);
    }

    // [HttpPost("UpisiFreelancere")]
    // public async Task<ActionResult> AddFreelancers()
    // {
    //     try
    //     {
    //         // Učitajte JSON objekte iz fajla ili iz nekog drugog izvora
    //         string json = System.IO.File.ReadAllText("./sample data/freelancers.json");
    //         List<Freelancer> freelancers = JsonConvert.DeserializeObject<List<Freelancer>>(json)!;

    //         if (Context == null || Context.Freelancers == null)
    //         {
    //             return StatusCode(500, "Context or Freelancers DbSet is null.");
    //         }

    //         foreach (var f in freelancers)
    //         {
    //             await AddFreelancer(f);
    //         }

    //         await Context.SaveChangesAsync();
    //         return Ok("Freelancers added successfully.");
    //     }
    //     catch (Exception ex)
    //     {
    //         return StatusCode(500, $"An error occurred: {ex.Message}");
    //     }
    // }
}