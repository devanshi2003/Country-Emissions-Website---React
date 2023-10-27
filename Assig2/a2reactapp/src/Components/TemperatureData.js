import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const TemperatureData = ({ }) => {
    const params = useParams()
    const [temperatureData, updateTemperatureData] = useState({})
    const [isLoading, setIsLoading] = useState(true);

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
            <div className="card col-4 mb-2" style={{ width: '18rem' }}>
                <h5 className="card-title">Temperature Data Page {params.countryId}</h5>
            </div>

            <div className="position-relative pt-5">
                <div className="position-absolute top-50 start-0 translate-middle">
                    <Link className="btn btn-primary" to={"/Countries/" + params.regionId}>Back to Countries</Link>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Value</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Min Max Avg</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {temperatureData.rawTemperatureData
                        ? (
                            temperatureData.rawTemperatureData.map((data) => (
                                <tr>
                                    <td>{data.theCountryTempData.year}</td>
                                    <td>{data.theCountryTempData.value}</td>
                                    <td>{data.theCountryTempData.unit}</td>
                                    <td>Avg:{data.regionalAvg} Min:{data.regionalMin} Max:{data.regionalMax}</td>

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
