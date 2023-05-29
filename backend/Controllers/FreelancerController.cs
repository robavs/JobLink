using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        {
            return BadRequest("Hourly rate cant be less or equal than zero");
        }

        if (hourlyRate > 200) hourlyRate = 200;

        return await methods.UpdateProperty<int>(userName, hourlyRate, "HourlyRate", Context!.Freelancers!, Context);
    }

    [HttpPut("UpdatePassword/{userNameOrEmail}/{newPassword}")]
    public async Task<ActionResult> UpdatePassword(string userNameOrEmail, string newPassword)
    {
        return await methods.UpdateProperty(userNameOrEmail, newPassword, "Password", Context!.Freelancers!, Context);
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
        return Ok(Context?.Freelancers);
    }

    [HttpDelete("DeleteAll")]
    public async Task<ActionResult> DeleteFreelancers()
    {
        return await methods.DeleteAll(Context!, 'F');
    }
}