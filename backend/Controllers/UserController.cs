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

        // posle ce trebati i za admina da se doda ovaj metod
        return BadRequest("User with given credentials doens't exist");
    }
}