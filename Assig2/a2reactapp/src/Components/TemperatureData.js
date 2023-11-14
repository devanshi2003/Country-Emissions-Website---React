import { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

const TemperatureData = ({ }) => {

    const params = useParams()
    const [temperatureData, updateTemperatureData] = useState({})
    const location = useLocation();
    const { regionData, countryData } = location.state;

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryTemperatureDetail/${params.countryId}`)
            .then(response => response.json())
            .then(data => {
                updateTemperatureData(data)
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    return (
        <div>

            <div className="position-relative pt-5">
                <div className="position-absolute top-50 start-0 translate-middle">
                    <Link className=" btn btn-success btn-back" to={"/Countries/" + params.regionId} state={ regionData }>Back to Countries</Link>
                </div>
            </div>

            <div className="row">
                <div className="full-width-section full-width-section-countries">
                    <div className="overlay-content">
                        <h2>
                            Temperature Data for {countryData.countryName}
                        </h2>
                        {regionData.regionId !== 0 && <h5>Region: {regionData.regionName}</h5>}
                        <img src={countryData.imageUrl} className="rounded-circle mx-auto d-block" width="140" height="140" alt={"Image of " + countryData.countryName} />
                    </div>
                </div>
            </div>

            <h5 className="text-start mt-4">Earliest Data Available: {temperatureData.minYear} </h5>
            <h5 className="text-start mb-4">Latest Data Available: {temperatureData.maxYear} </h5>

            <table className="table table-striped">
                <thead className ="bg-info">
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
                                <tr key={data.theCountryTempData.year}>
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
                        :<p> Loading data...</p>
                    }                 
                </tbody>
            </table>
        </div>
    )
}

export default TemperatureData