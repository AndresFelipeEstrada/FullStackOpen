import axios from 'axios'

export const getCountries = async (name) => {
  try {
    const country = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
    console.log(country.data)
    return country.data
  } catch (error) {
    // console.log('error en countries:', error.message)
    return error.response.data.status
  }
}
