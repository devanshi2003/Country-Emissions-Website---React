import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import CountriesCard from './CountriesCard'

const Countries = ({ }) => {

    let params = useParams()
    const [countriesData, updateCountriesData] = useState({})
    const [searchText, updateQuery] = useState('')
    const regionId = parseInt(params.regionId, 10);

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${params.regionId}?searchText=${searchText}`)
            .then(response => response.json())
            .then((data) => {
                updateCountriesData(data); 
            })
            .catch(err => {
                console.log(err)
            });
        console.log(countriesData.length)

    }, [params.regionId, searchText])



    function searchCountry() {
        updateQuery(document.querySelector('[name = "searchText"]').value);
    }

    function onSubmit(e) {

        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        updateQuery(formData.get("searchText"))
    }

    return (

        <div>
            <div className="position-relative pt-5">
                <div className="position-absolute top-50 start-0 translate-middle">
                    <Link className="btn btn-success btn-back" to={"/Region"}>Back to Regions</Link>
                </div>
            </div>
           

        {countriesData.countryList ?
                <>
                    <div className="row">
                        <div className="full-width-section full-width-section-countries">
                            <div className="overlay-content">
                                {countriesData.countryList &&
                                    <>
                                    {regionId !== 0
                                            ?
                                                <>
                                                    <h2> Countries in {countriesData.theRegion.regionName}  </h2>
                                                    <img src={countriesData.theRegion.imageUrl} className="rounded-circle mx-auto d-block" width="140" height="140" alt={"Image of " + countriesData.theRegion.regionName} />
                                                    <p>Number of Countries: {countriesData.theRegion.countryCount} </p>
                                                </>
                                            :
                                                <>
                                                    <h2> All Countries</h2>
                                                    <p>Number of Countries: {countriesData.countryList.length} </p>
                                                </>
                                        }

                                    </>
                                }
                            </div>
                        </div>

                        {(countriesData.theRegion.countryCount > 1 || countriesData.countryList.length > 1)  && (
                            <form className="row g-3" method='post' onSubmit={onSubmit}>
                                <div className="col-auto">
                                    <input type="text" className="form-control" name="searchText" placeholder="Search for Country.." />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" value={searchCountry} className="btn-search btn-primary btn mb-3">Search</button>
                                </div>
                            </form>
                        )}

                        {countriesData.countryList.length === 0 &&
                            <h6 class="bg-warning">No countries found!</h6>

                        }

                        {countriesData.countryList && (
                            <>                 
                                {countriesData.countryList.map((country) => (
                                    <CountriesCard
                                        key={country.countryId}
                                        countryName={country.countryName}
                                        cityCount={country.cityCount}
                                        imageUrl={country.imageUrl}
                                        iso3={country.iso3}
                                        emissionDataYearRange={country.emissionDataYearRange}
                                        temperatureDataYearRange={country.temperatureDataYearRange}
                                        countryId={country.countryId}
                                        regionId={params.regionId}
                                        regionName={countriesData.theRegion.regionName}
                                        countryCount={countriesData.theRegion.countryCount}
                                        regionImageUrl={countriesData.theRegion.imageUrl}
                                    />
                                ))}                 
                            </>
                        )}
                         
                    </div>
                </>

                : <p>Loading data...</p>
            }
        </div>

    );
}
export default Countries