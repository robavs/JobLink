import React, { useState } from 'react'

const faq = [
    {
        question: "Da li je korišćenje sajta besplatno?",
        answer: "Da, korišćenje sajta je potpuno besplatno sa bilo kojim od izabranih planova, čak i besplatan plan vam to omogućava"
    },
    {
        question: "Da li je moguće podizanje novca na PayPal?",
        answer: "Da, za isplatu novca možete povezati ili bankovni račun ili PayPal, naša stranica podržava oba."
    },
    {
        question: "Koliko procenata novca od ugovora ide sajtu?",
        answer: "Za razliku od drugih freelancerskih sajtova mi smo poprilično jeftini povodom poreza. Freelancer dobija 95% vrednosti ugovora dok sajt uzima svega 5%."
    },
    {
        question: "Za koje vreme mi novac stiže na karticu/PayPal?",
        answer: "Prenos novca se vrši onog trenutka kada podnesete zahtev za isti. Transakcija se obavlja veoma brzo, ne preko nekoliko minuta."
    },
    {
        question: "Da li je dozvoljeno deljenje bilo kakvih kontakata sa mušterijom?",
        answer: "Ne, to se protivi pravilima našeg sajta. Potrebno je da sve poruke oko posla, kao i sam posao ovavite isključivo preko stranice."
    }
]

const FAQ = () => {
    const [answerBtns, setAnswerBtns] = useState(Array(faq.length).fill(false))

    const showAnswer = (lastIndex) => {
        const newAnswerBtns = answerBtns.slice().map(() => false)
        newAnswerBtns[lastIndex] = !answerBtns[lastIndex]
        setAnswerBtns(() => newAnswerBtns)
    }

    return (
        <section id="faq" className="faq">
            <div className="container" data-aos="fade-up">

                <div className="row gy-4">

                    <div className="col-lg-4">
                        <div className="content px-xl-5">
                            <h3>Često postavljana <strong>Pitanja</strong></h3>
                            <p>
                                Pokušaćemo da odgovorimo na neka od najčešće postavljanih pitanja
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="accordion accordion-flush" id="faqlist" data-aos="fade-up" data-aos-delay="100">
                            {faq.map((item, index) => {
                                const { question, answer } = item
                                const id = `faq-content-${index + 1}`
                                return (
                                    <div className="accordion-item" key={id}>
                                        <h3 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" onClick={() => showAnswer(index)}>
                                                <span className="num">{index + 1}.</span>
                                                {question}
                                            </button>
                                        </h3>
                                        {answerBtns[index] &&
                                            <div id={id} className="accordion-collapse" >
                                                <div className="accordion-body">
                                                    {answer}
                                                </div>
                                            </div>
                                        }

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQ
