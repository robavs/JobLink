using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class AdministratorController : ControllerBase
{
    public JobLinkContext? Context { get; set; }
    public Functions<Administrator> methods;

    public AdministratorController(JobLinkContext context)
    {
        Context = context;
        methods = new Functions<Administrator>();
    }

    [HttpPost("Add")]
    public async Task<ActionResult> Add([FromBody] Administrator adminsitrator)
    {
        return await methods.AddUser(Context!, adminsitrator);
    }

    [HttpPut("UpdateProfilePicture/{userName}")]
    public async Task<ActionResult> UpdateProfilePicture(string userName, [FromBody] string imgSrc)
    {
        return await methods.UpdateProperty(userName, imgSrc, "ImgSrc", Context!.Administrators!, Context);
    }

    [HttpPut("UpdatePassword/{userName}/{oldPassword}/{newPassword}")]
    public async Task<ActionResult> UpdatePassword(string userName, string oldPassword, string newPassword)
    {
        return await methods.UpdatePassword(userName, oldPassword, newPassword, Context!.Administrators!, Context);
    }

    [HttpDelete("DeleteUser/{userName}")]
    public async Task<ActionResult> DeleteFreelancer(string userName)
    {
        var freelancer = await Context!.Freelancers!.FirstOrDefaultAsync(f => f.UserName == userName);
        if (freelancer != null)
        {
            Context!.Freelancers!.Remove(freelancer);
            await Context.SaveChangesAsync();
            return Ok($"Freelancer {userName} successfully deleted!");
        }
        var employer = await Context!.Employers!.FirstOrDefaultAsync(e => e.UserName == userName);
        if (employer != null)
        {
            Context!.Employers!.Remove(employer);
            await Context.SaveChangesAsync();
            return Ok($"Employer {userName} successfully deleted!");
        }
        return BadRequest("User with given userName doesn't exist");
    }

    [HttpDelete("DeleteApplication/{advertisementId}/{userName}")]
    public async Task<ActionResult> DeleteApplication(int advertisementId, string userName)
    {
        try
        {
            var freelancerAdvertisement = await Context!.FreelancerAdvertisements!
            .FirstOrDefaultAsync(fa => fa.UserName == userName && fa.AdvertisementId == advertisementId);

            if (freelancerAdvertisement == null) return BadRequest("Freelancer didn't sign up for job!");
            Context!.FreelancerAdvertisements!.Remove(freelancerAdvertisement);
            await Context!.SaveChangesAsync();
            return Ok("Successfully deleted");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("DeleteAdvertisement/{advertisementId}")]
    public async Task<ActionResult> DeleteAdvertisement(int advertisementId)
    {
        var advertisement = await Context!.Advertisements!.FirstOrDefaultAsync(a => a.Id == advertisementId);
        if (advertisement == null) return BadRequest("Advertisement doesn't exist");
        Context!.Advertisements!.Remove(advertisement);
        await Context.SaveChangesAsync();
        return Ok("Advertisement removed successfully");
    }

    [HttpGet("GetAll")]
    public ActionResult GetAll()
    {
        return Ok(Context!.Administrators);
    }
}