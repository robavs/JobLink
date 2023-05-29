export const REG_EXP = {
    firstName: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    lastName: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    email: /^[a-zA-Z0-9]+$/,
    userName: /^[a-zA-Z0-9]+$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    confirmPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    phoneNumber: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    idNumber: /^[0-9]*$/,
    city: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
    address: /[A-Za-z0-9'\.\-\s\,]/,
    // email: /[a - z0 - 9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
}

// objekti koji sadrze vrednosti inputa i njihovog statusa

export const initialInputValues = {
    firstName: "", lastName: "", userName: "", email: "", password: "", confirmPassword: "", gender: "M",
    birthDate: "", country: "AF", city: "", address: "", idNumber: "", phoneNumber: "", category: "Marketing", profileImage: "", imgSrc: "",
    biography: "", skills: new Set(), experience: "", hourlyRate: ""
}

export const initalInputStatus = {}

for (const key of Object.keys(initialInputValues)) {
    if (key === "gender" || key === "country" || key === "category")
        initalInputStatus[key] = "valid"
    else
        initalInputStatus[key] = "empty"
}