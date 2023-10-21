import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import CitiesCard from './CitiesCard'

const Cities = ({ }) => {

    const [cities, updateCities] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5256/api/C_Cities/53`)
            .then(response => response.json())
            .then(data => updateCities(data))
            .catch(err => {
                console.log(err)
            });
    }, [])

    return (
        <div>
            <div class="position-relative pt-5">
                <div class="position-absolute top-50 start-0 translate-middle">
                    <Link class="btn btn-primary" to={"/Countries/0"}>Back to Countries</Link>
                </div>
            </div>

            <div className="card col-4 mb-2" style={{ width: 18 + 'rem' }}>
                <h5 className="card-title">Cities Page</h5>
            </div>
            <div className="row">
                {cities.map((city) => (
                    <CitiesCard
                        key={city.cityID}
                        cityName={city.cityName}
                    />
                ))
                }
            </div>
            

        </div>

    )
}
export default Cities