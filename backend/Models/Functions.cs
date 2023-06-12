using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class Functions<T> : ControllerBase where T : User
{
    public bool InvalidValue(string? str)
    {
        return string.IsNullOrEmpty(str) || string.IsNullOrWhiteSpace(str);
    }

    public async Task<ActionResult> AddUser(JobLinkContext Context, T user)
    {
        try
        {
            if (Context == null)
            {
                return BadRequest("Problem with database");
            }

            string userType = user is Freelancer ? "Freelancer" : user is Employer ? "Employer" : "Admin";

            if (user == null)
            {
                return BadRequest(userType + " je null!");
            }

            if (user.Password == null)
            {
                return BadRequest("Password cant be null");
            }

            if (InvalidValue(user.ImgSrc))
            {
                // spore su performanse kad se radi sa base64 formatom tako da ce da se cuva link
                // a za one koje user updejtuje cuvace se u base64 formatu, mada vrv treba da se napravi
                // da se i od njih uzima link

                // string defaultImgPath = "C:/Users/ALEKSA/OneDrive/Desktop/Aplikacija/backend/data/Profile Picture.png";
                // if (System.IO.File.Exists(defaultImgPath))
                // {
                //     // mozda ce trebati neka ispravka da se napravi
                //     // jer mi se cini da kad posaljem sa frontenda dobijem i base64/img png dodatno
                //     byte[] imageArray = await System.IO.File.ReadAllBytesAsync(defaultImgPath);
                //     user.ImgSrc = "data:image/jpeg;base64," + Convert.ToBase64String(imageArray);
                // }
                user.ImgSrc = "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg";
            }

            DateTime CurrentDate = DateTime.Now;

            if (user.BirthDate.AddYears(18) < CurrentDate && CurrentDate.AddYears(-70) > user.BirthDate)
            {
                return BadRequest("Date of birth isn't valid");
            }

            if (user.Education == null || InvalidValue(user.Education))
            {
                user.Education = "";
            }
            // ovo vrv mogu lepse da napisem

            DbSet<T>? contextType = user is Freelancer ? Context.Freelancers as DbSet<T> : user is Employer ? Context.Employers as DbSet<T> :
            Context.Administrators as DbSet<T>;

            if (contextType == null || Context.Freelancers == null || Context.Employers == null || Context.Administrators == null)
            {
                return BadRequest("Context is null!");
            }

            var freelancers = Context.Freelancers.Select(r => new { r.UserName, r.Email, r.IdNumber, r.PhoneNumber });
            var employers = Context.Employers.Select(p => new { p.UserName, p.Email, p.IdNumber, p.PhoneNumber });
            var administrators = Context.Administrators.Select(a => new { a.UserName, a.Email, a.IdNumber, a.PhoneNumber });
            var users = freelancers.Concat(employers).Concat(administrators);

            foreach (var u in users)
            {
                if (u.UserName == user.UserName)
                {
                    return BadRequest("User with given username already exists!");
                }

                if (u.Email == user.Email)
                {
                    return BadRequest("User with given email already exists!");
                }

                if (u.IdNumber == user.IdNumber)
                {
                    return BadRequest("User with given id Number already exists!");
                }

                if (u.PhoneNumber == user.PhoneNumber)
                {
                    return BadRequest("User with given phone number already exists!");
                }
            }

            // Jednosmerno hesiranje lozinke
            user.Password = new PasswordHasher<User>()
                            .HashPassword(user, user.Password);

            await contextType.AddAsync(user);
            await Context.SaveChangesAsync();
            return Ok("Successfully added " + userType.ToLower() + $" with username {user.UserName}");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // metoda koja pretazuje da li korisnik(freelancer, employer i admin) postoji u bazi
    public async Task<T?> FindUser(string userNameOrEmail, string password, DbSet<T> users)
    {
        var user = await users.Where(u => u.UserName == userNameOrEmail || u.Email == userNameOrEmail)
                              .FirstOrDefaultAsync();

        if (user != null)
        {
            var passwordVerification = new PasswordHasher<T>().VerifyHashedPassword(user, user.Password!, password);
            if (passwordVerification == PasswordVerificationResult.Success)
            {
                return user;
            }
        }
        return null;
    }

    public async Task<ActionResult> UpdatePassword(string userName, string oldPassword, string newPassword, DbSet<T> users, JobLinkContext context)
    {
        try
        {
            if (InvalidValue(userName) || InvalidValue(oldPassword) || InvalidValue(newPassword))
                return BadRequest("Incorrect values provided!");

            var user = await users.Where(u => u.UserName == userName).FirstOrDefaultAsync();

            if (user == null) return BadRequest("User doesn't exist");

            var verifyNewPassword = new PasswordHasher<T>().VerifyHashedPassword(user, user.Password!, newPassword);
            var verifyOldPassword = new PasswordHasher<T>().VerifyHashedPassword(user, user.Password!, oldPassword);

            // stara lozinka se poklapa
            if (verifyOldPassword == PasswordVerificationResult.Success)
            {
                // sprecavamo da stara i nova lozinka budu iste
                if (verifyNewPassword == PasswordVerificationResult.Success)
                {
                    return BadRequest("New password can't be same as previous password!");
                }
                user.Password = new PasswordHasher<T>().HashPassword(user, newPassword);
                await context.SaveChangesAsync();
                return Ok("Password succesfully changed!");
            }
            return BadRequest("You provided worng password");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // genericka update metoda
    public async Task<ActionResult> UpdateProperty<TValue>(string userName, TValue newValue, string propertyName, DbSet<T> users, JobLinkContext context)
    {
        try
        {
            if (newValue == null || (typeof(TValue) == typeof(string) && InvalidValue(newValue as string)))
            {
                return BadRequest("Provided value is not valid");
            }

            var user = await users.Where(u => u.UserName == userName).FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest("User with given name doesn't exist");
            }

            // GetProperty vraca propertyInfo objekat i onda tom objektu mogu da setujem vrednost
            var PropertyName = typeof(T).GetProperty(propertyName);

            if (PropertyName == null)
            {
                return BadRequest("Given property doesn't exist");
            }

            PropertyName.SetValue(user, newValue);
            await context.SaveChangesAsync();
            return Ok("Value is updated successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // ova metoda je bitna samo zbog testiranja
    public async Task<ActionResult> DeleteAll(JobLinkContext Context, char type)
    {
        try
        {
            if (Context == null || Context.Freelancers == null || Context.Employers == null)
            {
                return BadRequest("Problem with context!");
            }

            if (type != 'F' && type != 'E')
            {
                return BadRequest("Wrong type. Type can be F or E");
            }

            DbSet<T>? contextType = type == 'F' ? Context.Freelancers as DbSet<T> : Context.Employers as DbSet<T>;

            if (contextType == null)
            {
                return BadRequest("Problem with database");
            }

            contextType.RemoveRange(contextType);
            await Context.SaveChangesAsync();
            return Ok($"All {(type == 'E' ? "employers" : "freelacners")} are successfully deleted!");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}