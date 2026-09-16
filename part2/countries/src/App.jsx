import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const showCountry = (country) => {
    setQuery(country.name.common)
  }

  const matches = query
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div>
      find countries <input value={query} onChange={handleQueryChange} />
      <Countries matches={matches} onShow={showCountry} />
    </div>
  )
}

export default App
