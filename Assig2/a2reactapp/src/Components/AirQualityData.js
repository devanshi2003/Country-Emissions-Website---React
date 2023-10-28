import { useEffect, useState } from "react";
import { Link, useParams, useLocation} from "react-router-dom";

const AirQualityData = ({ }) => {

    const params = useParams();
    const [airQualityData, updateAirQualityData] = useState({});
    const location = useLocation();
    const { regionData, countryData } = location.state;
    console.log(location.state);

    useEffect(() => {
        fetch(`http://localhost:5256/api/C_Cities/GetAirQualityData/${params.cityID}`)
            .then(response => response.json())
            .then(data => updateAirQualityData(data))
            .catch(err => {
                console.log(err)
            });
    }, [])

    return (
        <div>
            <div className="row">
                <div class="full-width-section full-width-section-countries">
                    <div className="overlay-content">
                        {airQualityData.theCityDetail && 
                            <h2>
                                Air Quality Data for {airQualityData.theCityDetail.cityName}
                            </h2>
                            }
                        <h4>Country: {countryData.countryName}</h4>
                        {regionData.regionId !== 0 && <h5>Region: {regionData.regionName}</h5>}
                    </div>
                </div>
            </div>

            <div className="position-relative pt-5">
                <div className="position-absolute top-50 start-0 translate-middle">
                    <Link className="btn btn-primary" to={"/Cities/" + params.countryId + "/" + params.regionId}>Back to Cities </Link>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">PM10 Avg</th>
                        <th scope="col">PM10 Min</th>
                        <th scope="col">PM10 Max</th>
                        <th scope="col">PM25 Avg</th>
                        <th scope="col">PM25 Min</th>
                        <th scope="col">PM25 Max</th>
                    </tr>
                </thead>
                <tbody>

                    {airQualityData.theCityAirQualityData
                        ? (
                            airQualityData.theCityAirQualityData.map((data) => (
                                <tr>
                                    <td>{data.year}</td>
                                    <td>{data.countryPM10Avg} </td>
                                    <td>{data.countryPM10Min} </td>
                                    <td>{data.countryPM10Max} </td>
                                    <td>{data.countryPM25Avg}</td>
                                    <td>{data.countryPM25Min}</td>
                                    <td>{data.countryPM25Max}</td>
                                </tr>
                            ))
                        )
                        : <p>Loading data...</p>
                    }         
                </tbody>
            </table>
        </div>

    )

}

export default AirQualityData;