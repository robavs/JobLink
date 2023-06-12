using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

[ApiController]
[Route("[controller]")]
public class EmployerController : ControllerBase
{
    public JobLinkContext? Context { get; set; }
    public Functions<Employer> methods;
    public EmployerController(JobLinkContext context)
    {
        Context = context;
        methods = new Functions<Employer>();
    }

    [HttpPost("Add")]
    public async Task<ActionResult> AddEmployer([FromBody] Employer employer)
    {
        return await methods.AddUser(Context!, employer);
    }

    [HttpPut("UpdateProfilePicture/{userName}")]
    public async Task<ActionResult> UpdateProfilePicture(string userName, [FromBody] string imgSrc)
    {
        return await methods.UpdateProperty(userName, imgSrc, "ImgSrc", Context!.Employers!, Context);
    }

    [HttpPut("UpdatePassword/{userName}/{oldPassword}/{newPassword}")]
    public async Task<ActionResult> UpdatePassword(string userName, string oldPassword, string newPassword)
    {
        return await methods.UpdatePassword(userName, oldPassword, newPassword, Context!.Employers!, Context);
    }

    [HttpPut("UpdateBiography/{userName}")]
    public async Task<ActionResult> UpdateBiography(string userName, [FromBody] string biography)
    {
        return await methods.UpdateProperty(userName, biography, "Biography", Context!.Employers!, Context);
    }

    [HttpPut("UpdateExperience/{userName}")]
    public async Task<ActionResult> UpdateExperience(string userName, [FromBody] string experience)
    {
        return await methods.UpdateProperty(userName, experience, "Experience", Context!.Employers!, Context);
    }

    [HttpPut("UpdateEducation/{userName}")]
    public async Task<ActionResult> UpdateEducation(string userName, [FromBody] string education)
    {
        return await methods.UpdateProperty(userName, education, "Education", Context!.Employers!, Context);
    }

    [HttpGet("GetAll")]
    public ActionResult GetEmployers()
    {
        return Ok(Context?.Employers!);
    }

    [HttpDelete("DeleteAll")]
    public async Task<ActionResult> DeleteEmployers()
    {
        return await methods.DeleteAll(Context!, 'E');
    }

    // metoda vraca sve oglase employera, zajedno sa svima prijavama
    // freelancera
    [HttpGet("GetAdvertisements/{userName}")]
    public async Task<ActionResult> GetAdvertisements(string userName)
    {
        try
        {
            var employer = await Context!.Employers!
                            .Include(e => e.Advertisements!)
                            .ThenInclude(a => a.Freelancers!)
                            .ThenInclude(f => f.Freelancer)
                            .FirstOrDefaultAsync(e => e.UserName == userName);

            if (employer == null) return BadRequest("Employer with given userName doesn't exist");

            var advertisementsWithFreelancers = employer.Advertisements!
                .Select(a => new
                {
                    Advertisement = a,
                    Freelancers = a.Freelancers!.Select(f => new
                    {
                        // trebace verovatno rejting da se pokupi al to posle kad se napravi recenzija
                        FirstName = f.Freelancer!.FirstName,
                        LastName = f.Freelancer!.LastName,
                        UserName = f.Freelancer!.UserName,
                        HourlyRate = f.Freelancer!.HourlyRate,
                        Skills = f.Freelancer!.Skills,
                        ImgSrc = f.Freelancer!.ImgSrc,
                        Application = f.Application
                    })
                });

            return Ok(advertisementsWithFreelancers);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    // [HttpPost("UpisiEmployerse")]
    // public async Task<ActionResult> AddFreelancers()
    // {
    //     try
    //     {
    //         // Učitajte JSON objekte iz fajla ili iz nekog drugog izvora
    //         string json = System.IO.File.ReadAllText("./sample data/employers.json");
    //         List<Employer> employers = JsonConvert.DeserializeObject<List<Employer>>(json)!;

    //         if (Context == null || Context.Employers == null)
    //         {
    //             return StatusCode(500, "Context or Employers DbSet is null.");
    //         }

    //         foreach (var e in employers)
    //         {
    //             await AddEmployer(e);
    //         }

    //         await Context.SaveChangesAsync();
    //         return Ok("Employers added successfully.");
    //     }
    //     catch (Exception ex)
    //     {
    //         return StatusCode(500, $"An error occurred: {ex.Message}");
    //     }
    // }
}
