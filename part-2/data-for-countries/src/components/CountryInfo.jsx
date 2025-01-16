import axios from "axios"
import { useEffect, useState } from "react"

const CountryInfo = ({ country }) => {
    const [countryData, setCountryData] = useState('')

    useEffect(() => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
            .then(response => {
                const filteredData = {
                    name: response.data.name.common,
                    capital: response.data.capital,
                    area: response.data.area,
                    languages: response.data.languages,
                    flag: response.data.flags.png
                }
                setCountryData(filteredData)
            })
    }, [])

    console.log(countryData);

    if (!countryData) return

    return (
        <div>
            <h1>{countryData.name}</h1>
            <img src={countryData.flag}></img>
            <p>Capital: {countryData.capital}</p>
            <p>Area: {countryData.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(countryData.languages).map((language, i) => (
                    <li key={i}>{language}</li>
                ))}
            </ul>
        </div>
    )
}

export default CountryInfo