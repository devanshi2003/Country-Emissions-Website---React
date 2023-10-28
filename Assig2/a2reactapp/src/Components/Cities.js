import { Link, useParams, useLocation} from "react-router-dom"
import { useState, useEffect } from 'react'
import CitiesCard from './CitiesCard'
import Region from "./Region"

const Cities = ({ }) => {

    const [cities, updateCities] = useState([])
    const [searchText, updateQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    const location = useLocation();
    const { regionData, countryData } = location.state;
    console.log(location.state);
    
    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:5256/api/C_Cities/${params.countryId}?searchText=${searchText}`)
            .then(response => response.json())
            .then((data) => {
                updateCities(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false);
            });
    }, [searchText])

    function searchCity() {
        const searchText = document.querySelector('[name = "searchText"]').value;
        updateQuery(searchText);
    }

    function onSubmit(e) {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        updateQuery(formData.get("searchText"))
    }

    return (
        <div>
            <div class="position-relative pt-5">
                <div class="position-absolute top-50 start-0 translate-middle">
                    <Link class="btn btn-dark btn-back" to={"/Countries/" + params.regionId} state={regionData}>Back to Countries</Link>
                </div>
            </div>

            <div className="row">
                <div class="full-width-section full-width-section-cities">
                    <div className="overlay-content">
                        <h3> Cities in {countryData.countryName} </h3>
                        {regionData.regionId !== 0 && <h5> Region Name: {regionData.regionName}</h5>}
                        <h6>Number of Cities: {countryData.cityCount}</h6>
                        <img src={countryData.imageUrl} class="rounded-circle mx-auto d-block" width="140" height="140" alt={"Image of " + countryData.countryName} />
                    </div>
                </div>
            </div>

            {countryData.cityCount > 1 &&
                <div class="container mt-5">
                    <form class="row g-3" method='post' onSubmit={onSubmit}>
                        <div class="col-auto">
                            <input type="text" class="form-control" name="searchText" placeholder="Search for City.." />
                        </div>
                        <div class="col-auto">
                            <button type="submit" value={searchCity} class="btn btn-primary mb-3">Search</button>
                        </div>
                        </form>
                </div>
            }

            {cities.length > 0
                ? (
                <div className="row mt-5">
                        {cities.map((city) => (
                            <CitiesCard
                                key={city.cityID}
                                cityName={city.cityName}
                                recordCount={city.recordCount}
                                airQualityYearRange={city.airQualityYearRange}
                                cityId={city.cityID}
                                regionData={regionData}
                                countryData={countryData}

                        />
                    ))
                    }
                </div>
                )

                : <p>{isLoading === true ? "Loading data" : "No cities found!"}</p>

        }

        </div>

    )
}
export default Cities