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
            <div className="position-relative pt-5">
                <div className="position-absolute top-50 start-0 translate-middle">
                    <Link className="btn btn-dark btn-back" to={"/Cities/" + params.regionId + "/" + params.countryId} state={{ regionData, countryData }}>Back to Cities </Link>
                </div>
            </div>

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



            <table className="table mt-5">
                <thead className="table-info">
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">PM10 Avg</th>
                        <th scope="col">PM10 Min</th>
                        <th scope="col">PM10 Max</th>
                        <th scope="col">PM10 Annual Mean</th>
                        <th scope="col">PM2.5 Avg</th>
                        <th scope="col">PM2.5 Min</th>
                        <th scope="col">PM2.5 Max</th>
                        <th scope="col">PM2.5 Annual Mean</th>
                        <th scope="col">Temporal Coverage</th>
                        <th scope="col">Reference</th>
                        <th scope="col">Stations</th>


                    </tr>
                </thead>
                <tbody>

                    {airQualityData.theCityAirQualityData
                        ? (
                            airQualityData.theCityAirQualityData.map((data) => (
                                <tr key={data.theAirQualityData.aqdId}>
                                    <td>{data.year}</td>
                                    <td>{data.countryPM10Avg.toFixed(2)} </td>
                                    <td>{data.countryPM10Min.toFixed(2)} </td>
                                    <td>{data.countryPM10Max.toFixed(2)} </td>
                                    <td>{data.theAirQualityData.annualMean.toFixed(2)}</td>
                                    <td>{data.countryPM25Avg.toFixed(2)}</td>
                                    <td>{data.countryPM25Min.toFixed(2)}</td>
                                    <td>{data.countryPM25Max.toFixed(2)}</td>
                                    <td>{data.theAirQualityData.annualMeanPm25}</td>
                                    <td>{data.theAirQualityData.temporalCoverage2}</td>
                                    <td>{data.theAirQualityData.reference}</td>
                                    <td>
                                        {data.dataStationDetail.map((station) => (
                                            <p>{station.stationType}</p>
                                        ))}
                                    </td>

                                                            
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