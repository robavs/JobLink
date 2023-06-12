using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]

public class UserController : ControllerBase
{
    public JobLinkContext? Context { get; set; }

    public UserController(JobLinkContext context)
    {
        Context = context;
    }

    [HttpGet("Login/{userNameOrEmail}/{password}")]
    public async Task<ActionResult> Login(string userNameOrEmail, string password)
    {
        var freelancer = await new Functions<Freelancer>().FindUser(userNameOrEmail, password, Context!.Freelancers!);

        if (freelancer != null)
        {
            return Ok(freelancer);
        }

        var employer = await new Functions<Employer>().FindUser(userNameOrEmail, password, Context!.Employers!);

        if (employer != null)
        {
            return Ok(employer);
        }

        var administrator = await new Functions<Administrator>().FindUser(userNameOrEmail, password, Context!.Administrators!);

        if (administrator != null)
        {
            return Ok(administrator);
        }
        // posle ce trebati i za admina da se doda ovaj metod
        return BadRequest("User with given credentials doens't exist");
    }

    [HttpGet("GetUniqueProperties")]
    public async Task<ActionResult> GetUniqueProperties()
    {
        var users = await Context!.Administrators!.Select(a => new { a.UserName, a.Email, a.IdNumber, a.PhoneNumber })
                    .Concat(Context!.Freelancers!.Select(f => new { f.UserName, f.Email, f.IdNumber, f.PhoneNumber }))
                    .Concat(Context!.Employers!.Select(e => new { e.UserName, e.Email, e.IdNumber, e.PhoneNumber }))
                    .ToListAsync();
        return Ok(users);
    }
}