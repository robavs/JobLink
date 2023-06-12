const URL = "http://localhost:5269"

const freelancerURL = `${URL}/Freelancer`
const employerURL = `${URL}/Employer`
const administratorURL = `${URL}/Administrator`
const userURL = `${URL}/User`
const advertisementURL = `${URL}/Advertisement`

const FreelancerMethods = {
    GetAll: `${freelancerURL}/GetAll`,
    Add: `${freelancerURL}/Add`,
    UpdateBiography: `${freelancerURL}/UpdateBiography`,
    UpdateProfilePicture: `${freelancerURL}/UpdateProfilePicture`,
    UpdateSkills: `${freelancerURL}/UpdateSkills`,
    UpdateHourlyRate: `${freelancerURL}/UpdateHourlyRate`,
    UpdateEducation: `${freelancerURL}/UpdateEducation`,
    UpdateExperience: `${freelancerURL}/UpdateExperience`,
    UpdatePassword: `${freelancerURL}/UpdatePassword`,
    JobApplication: `${freelancerURL}/FreelancerApplication`,
    SingedUpJobs: `${freelancerURL}/GetAdvertisements`
}

const EmployerMethods = {
    GetAll: `${employerURL}/GetAll`,
    Add: `${employerURL}/Add`,
    UpdateBiography: `${employerURL}/UpdateBiography`,
    UpdateProfilePicture: `${employerURL}/UpdateProfilePicture`,
    UpdateSkills: `${employerURL}/UpdateSkills`,
    UpdateEducation: `${employerURL}/UpdateEducation`,
    UpdateExperience: `${employerURL}/UpdateExperience`,
    UpdatePassword: `${employerURL}/UpdatePassword`,
    PostedJobs: `${employerURL}/GetAdvertisements`
}

const AdministratorMethods = {
    DeleteApplication: `${administratorURL}/DeleteApplication`,
    DeleteUser: `${administratorURL}/DeleteUser`,
    DeleteAdvertisement: `${administratorURL}/DeleteAdvertisement`
}

const UserMethods = {
    UserLogin: `${userURL}/Login`,
    GetUniqueProperties: `${userURL}/GetUniqueProperties`
}

const AdvertisementMethods = {
    Add: `${advertisementURL}/Add`,
    GetAll: `${advertisementURL}/GetAll`,
    GetAllWithApplications: `${advertisementURL}/GetAllWithApplications`
}

export const METHODS = {
    User: { ...UserMethods },
    Freelancer: { ...FreelancerMethods },
    Employer: { ...EmployerMethods },
    Advertisement: { ...AdvertisementMethods },
    Administrator: { ...AdministratorMethods }
}



