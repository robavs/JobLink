import { useState, useEffect } from 'react'
import '../../../../assets/css/freelancer.css'
import defaultPorfilePicture from "../../../../assets/default-profile-image.jpg"
import { Button } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { METHODS } from '../../data/METHODS'
import Loading from '../../../Custom/Loading'

export default function Profile() {
  const { usersData } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(false)

  const [editProfileMode, setEditProfileMode] = useState(false)
  const [editExperienceMode, setEditExperienceMode] = useState(false)
  const [editEducationMode, setEditEducationMode] = useState(false)
  // i ovde treba da dodam sve ostale metode koje cu da korsitim za editovanje

  // vrednosti koje mogu da se edituju
  const [biography, setBiography] = useState("")
  const [imgSrc, setImgSrc] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [experience, setExperience] = useState("")
  const [education, setEducation] = useState("")
  const [skills, setSkills] = useState("")
  const [isNewImageSelected, setIsNewImageSelected] = useState(false)

  // postavljamo komponentu updejtovanja ako se nesto updejtuje
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (usersData.length > 0) {
      const currentUser = usersData[0]
      setUser(currentUser)
      setBiography(currentUser.biography)
      setImgSrc(currentUser.imgSrc)
      setExperience(currentUser.experience)
      setEducation(currentUser.education)
      setHourlyRate(currentUser.hourlyRate)
      setIsLoading(false)
    }
  }, [usersData, user])

  const imageChange = e => {
    const fileReader = new FileReader()

    if (e.target.files.length > 0) {
      const file = e.target.files[0]

      fileReader.readAsDataURL(file)
      fileReader.addEventListener("loadend", () => {
        // samo trenutno ga prikazujem
        setImgSrc(fileReader.result)
        setIsNewImageSelected(true)
      })
    }
  }

  // treba da se ushendluje ucitanje fajla
  // i da se napisu funkcije za ove dugmice

  const editProfile = () => {
    setEditProfileMode(mode => !mode)
  }

  const editEducation = () => {
    setEditEducationMode(mode => !mode)
  }

  const editExperience = () => {
    setEditExperienceMode(mode => !mode)
  }

  const updateRequest = async (URL, updatedValue, propertyName, setProperty) => {
    try {
      await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedValue)
      }
      )
      // i ovde onda genericki treba da se izvrsi set odnosno reset ovih setValue
      setUser(values => ({ ...values, [propertyName]: updatedValue }))
      setProperty(updatedValue)
      usersData[0][propertyName] = updatedValue
      setIsUpdating(false)

    }
    catch (err) {
      console.log(err)
    }
  }

  // const updateSkills = () => {
  //   const URL = METHODS[user.type].UpdateSkills + `/${user.userName}/${skills}`
  //   updateRequest(URL, skills, "skills", setSkills)
  // }

  const updateBiography = () => {
    const URL = METHODS[user.type].UpdateBiography + `/${user.userName}`
    updateRequest(URL, biography, "biography", setBiography)
  }

  const updateProfilePicture = () => {
    const URL = METHODS[user.type].UpdateProfilePicture + `/${user.userName}`
    updateRequest(URL, imgSrc, "imgSrc", setImgSrc)
  }

  const updateHourlyRate = () => {
    const URL = METHODS.Freelancer.UpdateHourlyRate + `/${user.userName}/${hourlyRate}`
    updateRequest(URL, hourlyRate, "hourlyRate", setHourlyRate)
  }

  const updateEducation = () => {
    const URL = METHODS[user.type].UpdateEducation + `/${user.userName}`
    updateRequest(URL, education, "education", setEducation)
  }

  const updateExperience = () => {
    const URL = METHODS[user.type].UpdateExperience + `/${user.userName}`
    updateRequest(URL, experience, "experience", setExperience)
  }

  const logout = () => {
    // treba da setujes da je user prazan objekat
    // da uradis navigate("/")
    // i da onemogucis vracanje nazad
    // sa history replace ture ili kako vec
  }

  if (isUpdating) {
    return <Loading />
  }

  if (isLoading) {
    return <h2>Ucitavanje...</h2>
  }
  if (!user) {
    return <h2>Ucitavanje</h2>
  }

  return (
    <div className="profile">

      <div className="sidebar">
        <div className="item">Promeni lozinku</div>
        <div className="item">Prethodni poslovi</div>
        <div className="item">Odjavi se</div>
      </div>

      {/*Opis profila*/}
      <div className="description">

        {/*Profilna slika*/}
        <div className="image" >
          <img src={imgSrc} />
          {editProfileMode &&
            <>
              <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fa fa-cloud-upload"></i>
              </label>
              <input id="file-upload" type="file" onChange={imageChange} />
            </>
          }
        </div>

        {/*Biografija i trebace da mi bude onaj checker za koliko karaktera se mora
        upise zajedno sa invalid feedbackom*/}

        {editProfileMode ?
          <textarea value={biography} onChange={e => setBiography(e.target.value)}
            className="biography"></textarea>
          :
          <div className="biography">
            {user.biography}
          </div>
        }

        {/*osnovne informacije*/}
        <div className="info">
          <div className="firstName">{user.firstName} {user.lastName}</div>
          <div className="userName">@{user.userName} {user.country}</div>

          {editProfileMode ?
            <input type="number" value={hourlyRate}
              onChange={e => {
                if (e.target.value > 200) {
                  setHourlyRate(200)
                }
                else setHourlyRate(Math.abs(e.target.value))
              }}
              className="hourlyRate" placeholder="Upiši satnicu" />
            :
            <div className="hourlyRate">{user.hourlyRate}$</div>
          }

          <div className="starRating">Zvezdice</div>
        </div>

        {/*Dugmici za editovanje */}
        <div className="dugmici">
          {editProfileMode ?
            <>
              <Button variant="success" className="confirm-btn" onClick={() => {
                editProfile()
                // treba da se cekira da li se izvrsila promena da bih tek onda slao put zhatev
                if (biography !== usersData[0].biography) {
                  console.log("Updejtujemo biografiju")
                  updateBiography()
                  setIsUpdating(true)
                }
                if (usersData[0].hourlyRate !== hourlyRate) {
                  console.log("Updejtujemo satnicu")
                  updateHourlyRate()
                  setIsUpdating(true)
                }
                if (isNewImageSelected) {
                  console.log("Updejtujemo sliku")
                  updateProfilePicture()
                  setIsUpdating(true)
                }

              }}>Potvrdi</Button>
              <Button variant="danger" className="cancel-btn" onClick={() => {
                // u principu ovo su posle sve da stavim da bude jedna funkcija
                editProfile()
                setBiography(usersData[0].biography)
                setImgSrc(usersData[0].imgSrc)
                setHourlyRate(usersData[0].hourlyRate)
                setIsNewImageSelected(false)
              }} >Odbaci</Button>
            </> :
            <Button className="edit-btn" onClick={() => {
              editProfile()
              setIsNewImageSelected(false)
            }}>
              Izmeni
            </Button>
          }

        </div>

      </div>


      <div className="skills">
        Vestine
      </div>


      {editExperienceMode ?
        <>
          <textarea onChange={e => setExperience(e.target.value)}
            value={experience} className="experience">
          </textarea>
        </>
        :
        <>
          <div className="experience">
            {user.experience}
          </div>

        </>
      }

      <div className="editExperienceButtons">
        {editExperienceMode ?
          <>
            <Button variant="success" className="confirm-btn" onClick={() => {
              editExperience()
              if (experience != user.experience) {
                updateExperience()
                setIsUpdating(true)
              }
            }}>Potvrdi</Button>
            <Button variant="danger" className="cancel-btn" onClick={() => {
              editExperience()
              setExperience(usersData[0].experience)
            }} >Odbaci</Button>
          </> :
          <Button className="edit-btn" onClick={editExperience}>
            Izmeni
          </Button>
        }
      </div>


      {
        editEducationMode ?
          <textarea onChange={e => setEducation(e.target.value)}
            value={education} className="work"></textarea>
          : <div className="work">{user.education}</div>
      }


      <div className="editEducationButtons">
        {editEducationMode ?
          <>
            <Button variant="success" className="confirm-btn" onClick={() => {
              editEducation()
              if (education != user.education) {
                updateEducation()
                setIsUpdating(true)
              }
            }}>Potvrdi</Button>
            <Button variant="danger" className="cancel-btn" onClick={() => {
              editEducation()
              setEducation(usersData[0].education)
            }} >Odbaci</Button>
          </> :
          <Button className="edit-btn" onClick={editEducation}>
            Izmeni
          </Button>
        }
      </div>

      <div className="recenzije">
        Recenzije
      </div>

    </div >
  )
}