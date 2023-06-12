import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../../../../Custom/Loading';
import './freelancers.css'
import { useAuth } from '../../../context/AuthContext';
import ProfileViewMode from '../../ProfileTemplate/ProfileViewMode';
import Error from '../../../Error';
import SearchSettings from './SearchSettings';
import { Button } from 'react-bootstrap';
import { METHODS } from '../../../data/METHODS';

export default function Freelancers({ setFreelancers }) {
    const { freelancers, user } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [sortedFreelancers, setSortedFreelancers] = useState([])
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        setIsLoading(false)
    }, [])

    const deleteUser = async userName => {
        try {
            setIsLoading(true)
            await fetch(`${METHODS.Administrator.DeleteUser}/${userName}`, {
                method: "DELETE"
            })
            setIsLoading(false)
            const sortedCopy = [...sortedFreelancers].filter(f => f.userName !== userName)
            setFreelancers(sortedCopy)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (user.type === "Freelancer") {
        return <Error redirect="/user" />
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <SearchSettings
                props={{
                    "listItems": freelancers,
                    "original": freelancers,
                    page,
                    setPage,
                    perPage,
                    setPerPage,
                    setIsLoading,
                    "sortedListItems": sortedFreelancers,
                    "setSortedListItems": setSortedFreelancers,
                    "type": "freelancers"
                }} />

            <Container >
                <div className="candidate-list">
                    {sortedFreelancers.length === 0 && <h2>Nema odogvarajućih freelancera</h2>}

                    {sortedFreelancers.slice((page - 1) * perPage, page * perPage).map((item, index) => {
                        let { imgSrc, firstName, userName, category, address, hourlyRate, skills } = item;
                        skills = skills.split(",")

                        return (
                            <div className="candidate-list-box card mt-4" key={index}>
                                <div className="p-4 card-body">
                                    <Row className="align-items-center">
                                        <Col xs="auto">
                                            <Link to={`${userName}`} element={<ProfileViewMode />}>
                                                <Image src={imgSrc} alt="" roundedCircle className="avatar-md img-thumbnail" />
                                            </Link>
                                        </Col>
                                        <Col lg={5}>
                                            <div className="candidate-list-content mt-3 mt-lg-0">
                                                <h5 className="fs-19 mb-0">
                                                    <Link to={`${userName}`}
                                                        className="primary-link" style={{ color: "black" }}>
                                                        {firstName}
                                                    </Link>
                                                    {/* <span className="badge bg-success ms-1">
                                                        <i className="mdi mdi-star align-middle"></i>4.8
                                                    </span> */}
                                                </h5>
                                                <p className="text-muted mb-2">{category}</p>
                                                <ul className="list-inline mb-0 text-muted">
                                                    <li className="list-inline-item"> {address}</li>
                                                    <li className="list-inline-item"> ${hourlyRate}</li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                                                {skills.map((pos, i) => (
                                                    <span className="badge bg-soft-secondary fs-14 mt-1" key={i}>{pos}</span>
                                                ))}
                                            </div>
                                        </Col>
                                        {user.type === "Administrator" &&
                                            <Col>
                                                <Button variant="danger" onClick={() => deleteUser(userName)}>Izbriši korisnika</Button>
                                            </Col>
                                        }
                                    </Row>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>

        </>
    );
};

