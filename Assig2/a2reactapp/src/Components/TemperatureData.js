import { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

const TemperatureData = ({ }) => {
    const params = useParams()
    const [temperatureData, updateTemperatureData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { regionData, countryData } = location.state;
    console.log(location.state);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5256/api/B_Countries/CountryTemperatureDetail/${params.countryId}`)
            .then(response => response.json())
            .then(data => {
                updateTemperatureData(data)
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false);
            });
    }, [])

    return (
        <div>

            <div className="position-relative pt-5">
                <div className="position-absolute top-50 start-0 translate-middle">
                    <Link className=" btn btn-dark btn-back" to={"/Countries/" + params.regionId} state={ regionData }>Back to Countries</Link>
                </div>
            </div>

            <div className="row">
                <div class="full-width-section full-width-section-countries">
                    <div className="overlay-content">
                        <h2>
                            Temperature Data for {countryData.countryName}
                        </h2>
                        {regionData.regionId !== 0 && <h5>Region: {regionData.regionName}</h5>}
                        <img src={countryData.imageUrl} class="rounded-circle mx-auto d-block" width="140" height="140" alt={"Image of " + countryData.countryName} />
                    </div>
                </div>
            </div>
            <p> Earliest Year: {temperatureData.minYear}</p>
            <p> Latest Year: {temperatureData.maxYear}</p>

            <table className="table">
                <thead className ="table-info">
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Value</th>
                        {temperatureData.rawTemperatureData  && temperatureData.rawTemperatureData[0].regionalMin && (
                            <>
                                <th scope="col">Min</th>
                                <th scope="col">Max</th>
                                <th scope="col">Avg</th>
                            </>
                        )}

                        <th scope="col">Unit</th>

                    </tr>
                </thead>
                <tbody>
                    
                    {temperatureData.rawTemperatureData
                        ? (
                            temperatureData.rawTemperatureData.map((data) => (
                                <tr>
                                    <td>{data.theCountryTempData.year}</td>
                                    <td>{data.theCountryTempData.value}</td>
                                    {data.regionalMin &&
                                        <>
                                        <td>{data.regionalMin.toFixed(2)}</td>
                                        <td>{data.regionalMax.toFixed(2)}</td>
                                        <td>{data.regionalAvg.toFixed(2)}</td>
                                        </>
                                    }
                                             
                                    <td>{data.theCountryTempData.unit}</td>


                                </tr>
                            ))
                        )
                        :< p > { isLoading === true ? "Loading data" : "No Data to Show!."}</p>
                    }                 
                </tbody>
            </table>
        </div>
    )
}

export default TemperatureData
