import { Link, useParams, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import CountriesCard from './CountriesCard'

const Countries = ({ }) => {

    let params = useParams()
    const [countriesData, updateCountriesData] = useState({})
    const [searchText, updateQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const regionId = parseInt(params.regionId, 10)


    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${params.regionId}?searchText=${searchText}`)
            .then(response => response.json())
            .then((data) => {
                updateCountriesData(data); 
                setIsLoading(false); 
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false);
            });

    }, [searchText])

    function searchCountry() {
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

        <div>
        {countriesData.countryList ?
                <>
                    <div className="row">
                        <div class="full-width-section full-width-section-countries">
                            <div className="overlay-content">
                                {countriesData.countryList &&
                                    <>
                                    {console.log('params.regionId:', params.regionId)}
                                    {regionId !== 0
                                            ?
                                                <>
                                                    <h2> Countries in {countriesData.theRegion.regionName}  </h2>
                                                    <img src={countriesData.theRegion.imageUrl} class="rounded-circle mx-auto d-block" width="140" height="140" alt={"Image of " + countriesData.theRegion.regionName} />
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

                        <div class="position-relative pt-5">
                            <div class="position-absolute top-50 start-0 translate-middle">
                                <Link class="btn btn-primary" to={"/Region"}>Back to Regions</Link>
                            </div>
                        </div>

                        {countriesData.theRegion.countryCount > 1 || countriesData.countryList.length > 1 &&
                            <form class="row g-3" method='post' onSubmit={onSubmit}>
                                <div class="col-auto">
                                    <input type="text" class="form-control" name="searchText" placeholder="Search for Country.." />
                                </div>
                                <div class="col-auto">
                                    <button type="submit" value={searchCountry} class="btn btn-primary mb-3">Search</button>
                                </div>
                            </form>
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
                                )
                            </>)
                        }

                            )

                    </div>
                </>

                : <p> {isLoading === true ? "Loading data" : "No countries found for this region."}</p>
            }
        </div>

    );
}
export default Countries