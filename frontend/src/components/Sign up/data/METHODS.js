const URL = "http://localhost:5269"

const freelancerURL = `${URL}/Freelancer`
const employerURL = `${URL}/Employer`
const administratorURL = `${URL}/Administrator`

const FreelancerMethods = {
    GetAll: `${freelancerURL}/GetAll`,
    Add: `${freelancerURL}/Add`,
    UpdateBiography: `${freelancerURL}/UpdateBiography`,
    UpdateProfilePicture: `${freelancerURL}/UpdateProfilePicture`,
    UpdateSkills: `${freelancerURL}/UpdateSkills`,
    UpdateHourlyRate: `${freelancerURL}/UpdateHourlyRate`,
    UpdateEducation: `${freelancerURL}/UpdateEducation`,
    UpdateExperience: `${freelancerURL}/UpdateExperience`
}

const EmployerMethods = {
    GetAll: `${employerURL}/GetAll`,
    Add: `${employerURL}/Add`,
    UpdateBiography: `${employerURL}/UpdateBiography`,
    UpdateProfilePicture: `${employerURL}/UpdateProfilePicture`,
    UpdateSkills: `${employerURL}/UpdateSkills`,
    UpdateEducation: `${employerURL}/UpdateEducation`,
    UpdateExperience: `${employerURL}/UpdateExperience`
}

// ovde cu da pisem metode za administratora
const AdministratorMethods = {

}

// URL-ovi backend metoda
export const METHODS = {
    UserLogin: `${URL}/User/Login`,
    Freelancer: { ...FreelancerMethods },
    Employer: { ...EmployerMethods }
}



