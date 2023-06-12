import { useState, useEffect } from 'react'
import PageNavigation from './PageNavigation';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const skills = ["Prikaži sve", "Javascript", "React", "C++", "C#", "Logo dizajn", "Mobilne aplikacije", "Phyton", "AI",
    "Video editovanje", "Web dizajn", "Photoshop"]

export default function SearchSettings({ props }) {
    // listItems je genericki zato sto se u jednom trentku odnosi na freelancere a u drugom na poslove
    const { listItems, original, page, setPage, perPage, setPerPage, setIsLoading, sortedListItems, setSortedListItems, type } = props
    const [lastPage, setLastPage] = useState(0)
    const [sortOption, setSortOption] = useState("name")
    const [filterOption, setFilterOption] = useState("")

    // trebalo bi da se doda filter za akitvne oglase
    useEffect(() => {
        console.log(listItems)
        if (listItems.length !== 0) {
            setLastPage(Math.ceil(listItems.length / perPage))
            setSortedListItems(listItems)
            setIsLoading(false)
        }
    }, [listItems])

    useEffect(() => {
        setPage(1)
        setLastPage(Math.ceil(sortedListItems.length / perPage))
    }, [perPage, sortedListItems])

    const sortBy = e => {
        const sortedCopy = [...sortedListItems]
        setSortOption(e.target.value)
        if (e.target.value === "name") {
            sortedCopy.sort((a, b) => a.firstName.localeCompare(b.firstName))
        }
        else if (e.target.value === "hourlyRate") {
            sortedCopy.sort((a, b) => a.hourlyRate - b.hourlyRate)
        }
        // else if (e.target.value === "rating") {
        //     sortedCopy.sort((a, b) => b.rating - a.rating)
        // }
        setSortedListItems(sortedCopy)
    }

    const filterBy = skill => {
        if (skill === "Prikaži sve") {
            setSortedListItems([...original])
        }
        else {
            let filteredCopy = [...listItems]
            filteredCopy = filteredCopy.filter(item => new Set(item.skills.split(",")).has(skill))
            setSortedListItems(filteredCopy)
        }
        setFilterOption(skill)
    }

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            gridColumnGap: "0px",
            gridRowGap: "0px"
        }}>
            {/*Navigacija stranica */}
            <PageNavigation props={{ page, setPage, lastPage }} />

            {/*Filtriranje */}
            <Box sx={{ gridArea: "3 / 1 / 4 / 3" }}>
                <FormControl fullWidth>
                    <InputLabel id="filter-by">Izaberi veštinu</InputLabel>
                    <Select
                        value={filterOption}
                        id="filter-by"
                        label="Filtriraj"
                        onChange={e => filterBy(e.target.value)}
                    >
                        {skills.map((skill, index) => {
                            return (
                                <MenuItem value={skill} key={index}>
                                    {skill}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>

            {/*Sortiranje */}
            {type === "freelancers" &&
                <>
                    <Box sx={{ gridArea: "3 / 6 / 4 / 9", maxWidth: "250px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="sort-by">Sortiraj po</InputLabel>
                            <Select
                                value={sortOption}
                                id="sort-by"
                                label="Sortiraj"
                                onChange={e => sortBy(e)}
                            >
                                <MenuItem value="name">Imenu</MenuItem>
                                <MenuItem value="hourlyRate">Satnici</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </>
            }

            {/*Prikaz elemenata po stranici*/}
            <Box sx={{ gridArea: "3 / 12 / 4 / 15" }}>
                <FormControl fullWidth>
                    <InputLabel id="freelancers-per-page">PRikazi po stranici</InputLabel>
                    <Select
                        id="freelancers-per-page"
                        value={perPage}
                        label="Po stranici"
                        onChange={e => setPerPage(e.target.value)}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

