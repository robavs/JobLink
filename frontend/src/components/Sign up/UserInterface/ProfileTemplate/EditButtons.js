import { Button } from "react-bootstrap"

// template dugmici za updejtovanje vrednosti

export default function EditButtons({ editMode, update, abort, edit }) {
    return (
        <>
            {
                editMode ?
                    <>
                        <Button style={{ marginTop: "5px" }}
                            variant="success"
                            className="confirm-btn"
                            onClick={update}
                        >
                            Potvrdi
                        </Button >

                        <Button style={{ marginTop: "5px" }}
                            variant="danger"
                            className="cancel-btn"
                            onClick={abort}
                        >
                            Odbaci
                        </Button>

                    </>
                    :
                    <Button
                        className="edit-btn"
                        onClick={edit}
                    >
                        Izmeni
                    </Button>
            }
        </>
    )
}

