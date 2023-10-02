const Country = (country, languagesNames) => {
  return (
        <>
            <li key={`pais-country-${country.name.common}`}>
                <h3>{country.name.common}</h3>

                Capital: <strong>{country.capital}</strong>

                <p>Poblacion: {country.population}</p>

                <h4>Idioma: {languagesNames}</h4>

                <div>
                    <img src={country.flags.png} alt="flag" />
                </div>

            </li>

        </>
  )
}

export default Country
