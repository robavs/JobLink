using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]

public class AdvertisementController : ControllerBase
{
    public JobLinkContext Context { get; set; }

    public AdvertisementController(JobLinkContext context)
    {
        Context = context;
    }
    [HttpPost("Add")]
    public async Task<ActionResult> Add([FromBody] Advertisement advertisement)
    {
        try
        {
            var employer = await Context.Employers!.FirstOrDefaultAsync(e => e.UserName == advertisement.EmployerUserName);

            if (employer == null)
            {
                return BadRequest("Employer with given username doesn't exist");
            }
            if (employer.Email != advertisement.EmployerEmail)
            {
                return BadRequest("Employer email is incorrect");
            }

            await Context.Advertisements!.AddAsync(advertisement);
            await Context.SaveChangesAsync();
            return Ok("Successfully posted job advertisement");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message);
        }
    }

    [HttpGet("Get/{advertisementId}")]
    public ActionResult Get(int advertisementId)
    {
        try
        {
            var advertisement = Context!.Advertisements!.
            FirstOrDefault(a => a.Id == advertisementId);

            if (advertisement == null) return BadRequest("Doesn't exist");
            return Ok(advertisement);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetAll")]
    public ActionResult GetAll()
    {
        return Ok(Context.Advertisements);
    }

    [HttpGet("GetAllWithApplications")]
    public ActionResult GetAllWithApplications()
    {
        var advertisements = Context!.Advertisements!
        .Include(a => a.Freelancers!)
        .ThenInclude(f => f.Freelancer)
        .Select(a => new
        {
            Advertisement = a,
            Freelancers = a.Freelancers!.Select(f => new
            {
                FirstName = f.Freelancer!.FirstName,
                LastName = f.Freelancer!.LastName,
                UserName = f.Freelancer!.UserName,
                HourlyRate = f.Freelancer!.HourlyRate,
                Skills = f.Freelancer!.Skills,
                ImgSrc = f.Freelancer!.ImgSrc,
                Application = f.Application
            })
        });

        return Ok(advertisements);
    }

    [HttpDelete("DeleteAll")]
    public async Task<ActionResult> DeleteAll()
    {
        Context!.Advertisements!.RemoveRange(Context.Advertisements);
        await Context.SaveChangesAsync();
        return Ok("Successfully deleted all advertisements");
    }
}