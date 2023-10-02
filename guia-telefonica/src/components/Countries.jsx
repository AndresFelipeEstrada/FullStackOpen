import { getCountries } from '../services/getCountries'
import { useState } from 'react'

const Countries = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState(null)
  const [error, setError] = useState(null)

  const getCountry = async (event) => {
    event.preventDefault()
    const findCountry = await getCountries(country)
    console.log(findCountry)
    if (findCountry === 404) {
      return setError('Country Not Found')
    }
    setCountries(findCountry)
  }

  const languages = (country) => {
    const languages = Object.keys(country.languages)

    return languages.map(language => country.languages[language])
  }

  return (
    <>
      <div>

        <form onSubmit={getCountry}>

          <label htmlFor="">Find countries</label>
          <input type="text" placeholder="Ingrese un pais" value={country} onChange={e => setCountry(e.target.value)} />
          <button>BUSCAR</button>

        </form>
{error && <p>{error}</p>}
      </div>

      <div>

        {countries?.length > 10 &&
          (<p>Too many matches, specify another filter</p>)}

        {countries?.length < 10 && countries?.length > 1 && (
          <ul>
            {countries.map(country => {
              const languagesNames = languages(country)
              return (
                <li key={`country-${country.name.common}`}>
                  <h3>{country.name.common}</h3>
                  <button onClick={() => setShowCountry(showCountry === country ? null : country)}>show</button>

                  {showCountry === country && (
        <div key={`country-details-${country.name.common}`}>
          <h3>{country.name.common}</h3>
          Capital: <strong>{country.capital}</strong>
          <p>Poblacion: {country.population}</p>
          <h4>Idioma: {languagesNames}</h4>
          <div>
            <img src={country.flags.png} alt="flag" />
          </div>
        </div>
                  )}

                </li>

              )
            })}
          </ul>
        )}

      </div >

      <div>
        {countries?.length === 1 && (
          <ul>
            {countries.map(country => {
              const languagesNames = languages(country)
              return (

                  <li key={`pais-country-${country.name.official}`}>
                    <div>

                      <h3>{country.name.common}</h3>

                      Capital: <strong>{country.capital}</strong>

                      <p>Poblacion: {country.population}</p>

                      <h4>Idioma: {languagesNames}</h4>

                      <div>
                        <img src={country.flags.png} alt="flag" />
                      </div>

                    </div>

                  </li>

              )
            })}
          </ul>
        )}

      </div>
    </>
  )
}

export default Countries
