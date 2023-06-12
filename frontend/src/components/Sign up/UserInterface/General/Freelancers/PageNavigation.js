import Pagination from 'react-bootstrap/Pagination'

export default function PageNavigation({ props }) {
    const { page, setPage, lastPage } = props

    const prevPage = () => {
        if (page === 1)
            return
        setPage(page => page - 1)
    }
    const nextPage = () => {
        if (page === lastPage)
            return
        setPage(page => page + 1)
    }

    return (
        <Pagination className="pagination">
            {page !== 1 &&
                <>
                    <Pagination.First onClick={() => setPage(1)} />
                    <Pagination.Prev onClick={prevPage} />
                </>
            }

            {page > 2 &&
                <Pagination.Ellipsis />
            }


            {page > 1 &&
                <Pagination.Item onClick={prevPage}>
                    {page - 1}
                </Pagination.Item >
            }

            <Pagination.Item active >{page}</Pagination.Item >

            {page < lastPage &&
                <Pagination.Item onClick={nextPage}>
                    {page + 1}
                </Pagination.Item >
            }

            {
                page + 1 < lastPage &&
                <Pagination.Ellipsis />
            }

            {
                page < lastPage &&
                <>
                    <Pagination.Next onClick={nextPage} />
                    <Pagination.Last onClick={() => setPage(lastPage)} />
                </>
            }
        </Pagination>
    )
}
