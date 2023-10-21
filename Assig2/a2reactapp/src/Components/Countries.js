import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import CountriesCard from './CountriesCard'

const Countries = ({ }) => {

    let params = useParams()
    const [countriesData, updateCountriesData] = useState({})
    const [searchText, updateQuery] = useState('')


    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${params.regionId}?searchText=${searchText}`)
            .then(response => response.json())
            .then(data => updateCountriesData(data))
            .catch(err => {
                console.log(err)
            });

    }, [searchText])

    function searchCountry(evt) {
        const searchText = document.querySelector('[name = "searchText"]').value;
        updateQuery(searchText);
        console.log(searchText)
    }

    function onSubmit(e) {

        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        updateQuery(formData.get("searchText"))
    }

    return (
        <div className="row">
            <div class="position-relative pt-5">
                <div class="position-absolute top-50 start-0 translate-middle">
                    <Link class="btn btn-primary"  to={"/Region"}>Back to Regions</Link>
                </div>
            </div>

            <form class="row g-3" method='post' onSubmit={onSubmit}>
                <div class="col-auto">
                    <input type="text" class="form-control" name="searchText" placeholder="Search for Country.."/>
                </div>
                <div class="col-auto">
                    <button type="submit" value={searchCountry} class="btn btn-primary mb-3">Search</button>
                </div>
            </form>


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
                        countryId={country.countryId}
                    />
                ))
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}
export default Countries