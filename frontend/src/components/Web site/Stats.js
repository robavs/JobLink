import React, { useState, useEffect, useRef } from 'react'
import statsImage from '../../assets/img/stats-img.svg'

const Stats = () => {
    const [freelancers, setFreelancers] = useState(0)
    const [finishedJobs, setFinishedJobs] = useState(0)
    const [openJobs, setOpenJobs] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    // ako nismo u vidljivom polju da ipak nastavi sa racunnjem ali tek nakon sto prvi put bude vidjiv
    const [isCalulationStarted, setIsCalclulationStarted] = useState(false)
    const statsRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, {
            threshold: 1
        })
        observer.observe(statsRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (isVisible || isCalulationStarted) {
            setIsCalclulationStarted(true)

            const counter = (setValue, value, boundary) => {
                const step = boundary / 100
                if (value < boundary) {
                    const timeoutId = setTimeout(() => {
                        setValue(value => value + step)
                    }, 35)
                    return () => clearTimeout(timeoutId)
                }
            }
            counter(setFreelancers, freelancers, 1519)
            counter(setFinishedJobs, finishedJobs, 4210)
            counter(setOpenJobs, openJobs, 711)
        }
    }, [freelancers, finishedJobs, openJobs, isVisible])

    return (
        <section id="stats-counter" className="stats-counter">
            <div className="container" data-aos="fade-up">
                <div className="row gy-4 align-items-center">
                    <div className="col-lg-6">
                        <img src={statsImage} alt="" className="img-fluid" />
                    </div>
                    <div className="col-lg-6">
                        <div ref={statsRef} className="stats-item d-flex align-items-center">
                            <span className="purecounter">
                                {freelancers.toFixed()}
                            </span>
                            <p><strong>Zadovoljnih freelancera</strong> koji su svoju karijeru započeli baš ovde</p>
                        </div>
                        <div className="stats-item d-flex align-items-center">
                            <span className="purecounter">
                                {finishedJobs.toFixed()}
                            </span>
                            <p><strong>Poslova</strong> koji su uspešno završeni</p>
                        </div>
                        <div className="stats-item d-flex align-items-center">
                            <span className="purecounter">
                                {openJobs.toFixed()}
                            </span>
                            <p><strong>Otvorenih poslova</strong> koji čekaju samo na vas</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stats
