import Country from './Country'

const Countries = ({ matches, onShow }) => {
  if (matches.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (matches.length === 1) {
    return <Country country={matches[0]} />
  }

  return (
    <div>
      {matches.map(country =>
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => onShow(country)}>show</button>
        </div>
      )}
    </div>
  )
}

export default Countries
