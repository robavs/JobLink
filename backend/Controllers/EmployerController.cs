using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [HttpPut("UpdatePassword/{userNameOrEmail}/{newPassword}")]
    public async Task<ActionResult> UpdatePassword(string userNameOrEmail, string newPassword)
    {
        return await methods.UpdateProperty(userNameOrEmail, newPassword, "Password", Context!.Employers!, Context);
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
        return Ok(Context?.Employers);
    }

    [HttpDelete("DeleteAll")]
    public async Task<ActionResult> DeleteEmployers()
    {
        return await methods.DeleteAll(Context!, 'E');
    }
}
