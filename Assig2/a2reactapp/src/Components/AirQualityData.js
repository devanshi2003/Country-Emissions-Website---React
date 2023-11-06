import { useEffect, useState } from "react";
import { Link, useParams, useLocation} from "react-router-dom";

const AirQualityData = ({ }) => {

    const params = useParams();
    const [airQualityData, updateAirQualityData] = useState({});
    const location = useLocation();
    const { regionData, countryData } = location.state;

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
                        {airQualityData.theCityDetail && <h5>Iso3:{airQualityData.theCityDetail.iso3}</h5>}
                    </div>
                </div>
            </div>



            <table className="table mt-5">
                <thead className="table-info">
                    <tr>
                        <th className="table-secondary" scope="col">Year</th>
                        <th className="bg-info" colSpan="5">PM10 Data</th>
                        <th colSpan="4">PM2.5 Data</th>
                        <th className="table-secondary" scope="col">Reference</th>
                        <th className="table-secondary" scope="col">Stations</th>
                    </tr>
                    <tr>
                        <th className="table-secondary" scope="col"></th>
                        <th className="bg-info" scope="col">Avg</th>
                        <th className="bg-info" scope="col">Min</th>
                        <th className="bg-info" scope="col">Max</th>
                        <th className="bg-info" scope="col">Annual Mean</th>
                        <th className="bg-info" scope="col">Note</th>
                        <th scope="col">Avg</th>
                        <th scope="col">Min</th>
                        <th scope="col">Max</th>
                        <th scope="col">Annual Mean</th>
                        <th className="table-secondary" scope="col"></th>
                        <th className="table-secondary" scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {airQualityData.theCityAirQualityData
                        ? (
                            airQualityData.theCityAirQualityData.map((data) => (
                                <tr key={data.theAirQualityData.aqdId}>
                                    <td className="table-warning">{data.year}</td>
                                    <td>{data.countryPM10Avg.toFixed(2)}</td>
                                    <td>{data.countryPM10Min.toFixed(2)}</td>
                                    <td>{data.countryPM10Max.toFixed(2)}</td>
                                    <td>{data.theAirQualityData.annualMean.toFixed(2)}</td>
                                    <td>{data.theAirQualityData.annualMeanPm10}</td>
                                    <td>{data.countryPM25Avg.toFixed(2)}</td>
                                    <td>{data.countryPM25Min.toFixed(2)}</td>
                                    <td>{data.countryPM25Max.toFixed(2)}</td>
                                    <td>{data.theAirQualityData.annualMeanUgm3} {data.theAirQualityData.annualMeanPm25 && <p>({data.theAirQualityData.annualMeanPm25})</p>}</td>
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