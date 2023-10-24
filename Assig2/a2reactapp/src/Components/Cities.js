import { Link, useParams} from "react-router-dom"
import { useState, useEffect } from 'react'
import CitiesCard from './CitiesCard'

const Cities = ({ }) => {

    const [cities, updateCities] = useState([])
    const [searchText, updateQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    
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
                    <Link class="btn btn-primary" to={"/Countries/" + params.regionId}>Back to Countries</Link>
                </div>
            </div>

            <div className="card col-4 mb-2" style={{ width: 18 + 'rem' }}>
                <h5 className="card-title">Cities Page</h5>
            </div>

            <form class="row g-3" method='post' onSubmit={onSubmit}>
                <div class="col-auto">
                    <input type="text" class="form-control" name="searchText" placeholder="Search for City.." />
                </div>
                <div class="col-auto">
                    <button type="submit" value={searchCity} class="btn btn-primary mb-3">Search</button>
                </div>
            </form>

            {cities.length > 0
                ? (
                <div className="row">
                    {cities.map((city) => (
                        <CitiesCard
                            key={city.cityID}
                            cityName={city.cityName}
                            recordCount={city.recordCount}
                            airQualityYearRange={city.airQualityYearRange}
                            cityId={city.cityID}
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