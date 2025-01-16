import { useEffect, useState } from 'react'
import CountryInfo from './components/CountryInfo'
import axios from 'axios'

function App() {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])

  const filteredCountries = (input !== '') ? countries.filter(country => country.toLowerCase().includes(input.toLocaleLowerCase())) : []

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data.map(country => country.name.common))
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])


  return (
    <>
      Find countries:
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <ul>
        {(filteredCountries.length == 1)
          ? <CountryInfo country={filteredCountries[0]} />
          : (filteredCountries.length <= 10)
            ? filteredCountries.map((country, id) => <li key={id}>{country}</li>)
            : "Too many matches, specify another filter"}
      </ul>
    </>
  )
}

export default App
