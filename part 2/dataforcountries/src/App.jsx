import { useState, useEffect } from "react"
import Filter from "./components/filter"
import Countries from "./components/countries"
import countryService from "./services/countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleFilter = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()) 
  )


  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter}></Filter>
      <Countries countries={filteredCountries}></Countries>
    </div>
  )
}

export default App