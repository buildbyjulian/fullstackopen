import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const capital = country.capital ? country.capital[0] : null

  useEffect(() => {
    if (!capital) return

    axios
      .get(`https://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`)
      .then(response => {
        if (response.data.length === 0) return null
        const { lat, lon } = response.data[0]
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
        )
      })
      .then(response => {
        if (response) {
          setWeather(response.data)
        }
      })
  }, [capital])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="150"
      />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <div>temperature {weather.main.temp} Celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}

export default Country
