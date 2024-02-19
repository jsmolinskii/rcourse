import React, { useState, useEffect } from "react"
import countryService from "../services/countries"

const Countries = (props) => {
  const [countryInfo, setCountryInfo] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    if (props.countries.length === 1) {
      const country = props.countries[0]
      showCountry(country.name.common)
    }
  }, [props.countries])
  let countries, country

  let countriesLength = props.countries.length

  if (countriesLength > 10) {
    countriesLength = "Too many matches, specify another filter"
  } else {
    countries = props.countries.slice(0, countriesLength)
  }

  const showCountry = (country) => {
    countryService.getCountry(country).then((response) => {
      let countryInfo = response.data
      setCountryInfo(response.data)

      if (countryInfo.capital) {
        getCityData(countryInfo.capital[0])
      }
    })
  }

  const getCityData = (city) => {
    countryService.getCoordinates(city).then((response) => {
      const cityCoordinates = [
        response.data[0].lat.toFixed(2),
        response.data[0].lon.toFixed(2),
      ]

      countryService
        .getWeather(cityCoordinates[0], cityCoordinates[1])
        .then((response) => {
          const temperature = response.data.main.temp
          const windSpeed = response.data.wind.speed
          setWeatherInfo([temperature, windSpeed])
        })
    })
  }

  return (
    <div>
      {}
      {countries ? (
        <div>
          <h2>Countries</h2>
          <ul>
            {countries.map((country) => (
              <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => showCountry(country.name.common)}>
                  Show
                </button>
              </li>
            ))}
            {countryInfo && (
              <div>
                <h2>{countryInfo.name.common}</h2>
                <p>Capital: {countryInfo.capital}</p>
                <p>Area: {countryInfo.area}</p>
                <h4>Languages:</h4>
                <ul>
                  {Object.keys(countryInfo.languages).map((key) => (
                    <li key={key}>{countryInfo.languages[key]}</li>
                  ))}
                </ul>
                <img
                  src={countryInfo.flags.png}
                  alt={`Flag of ${countryInfo.name.common}`}
                />
              </div>
            )}
            {weatherInfo && (
              <div>
                <h4>Weather in {countryInfo.capital}</h4>

                <p>temperature {weatherInfo[0]}</p>
                <p>wind {weatherInfo[1]} m/s</p>
              </div>
            )}
          </ul>
        </div>
      ) :
      country ? (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h4>Languages:</h4>
          <ul>
            {Object.keys(country.languages).map((key) => (
              <li key={key}>{country.languages[key]}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          {weatherInfo && (
            <div>
              <h4>Weather in {country.capital}</h4>
              <p>temperature {weatherInfo[0]}</p>
              <p>wind {weatherInfo[1]} m/s</p>
            </div>
          )}
        </div>
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  )
}

export default Countries
