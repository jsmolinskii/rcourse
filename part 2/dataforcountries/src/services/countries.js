import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"
const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const geocodingBaseUrl = "http://api.openweathermap.org/geo/1.0/direct?"
const apiKey = "243447743ded05ef6dd55ea8501f6022"

const getAll = () => {
  return axios.get(`${baseUrl}/api/all`)
}

const getCountry = (country) => {
  return axios.get(`${baseUrl}api/name/${country}`)
}

const getCoordinates = (city) => {
  return axios.get(`${geocodingBaseUrl}q=${city},&appid=${apiKey}`)
}

const getWeather = (lat, lon) => {
  return axios.get(
    `${weatherBaseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
}

export default {
  getAll: getAll,
  getCountry: getCountry,
  getCoordinates: getCoordinates,
  getWeather: getWeather,
}
