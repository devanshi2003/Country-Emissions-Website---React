import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import CountriesCard from './CountriesCard'

const Countries = ({ }) => {

    let params = useParams()
    const [countriesData, updateCountriesData] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${params.regionId}`)
            .then(response => response.json())
            .then(data => updateCountriesData(data))
            .catch(err => {
                console.log(err)
            });

    }, [])


    return (
        <div className="row">
            <div class="position-relative pt-5">
                <div class="position-absolute top-50 start-0 translate-middle">
                    <Link class="btn btn-primary"  to={"/Region"}>Back to Regions</Link>

                </div>
            </div>
            {countriesData.countryList ? (
                countriesData.countryList.map((country) => (
                    <CountriesCard
                        key={country.countryId}
                        countryName={country.countryName}
                        cityCount={country.cityCount}
                        imageUrl={country.imageUrl}
                        //    regionName={countriesData.theRegion.regionName}
                        iso3={country.iso3}
                        emissionDataYearRange={country.emissionDataYearRange}
                        temperatureDataYearRange={country.temperatureDataYearRange}
                    />
                ))
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}
export default Countries