import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AirQualityData = ({ }) => {

    const params = useParams();
    const [airQualityData, updateAirQualityData] = useState({});

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
            <div className="card col-4 mb-2" style={{ width: '18rem' }}>
                <h5 className="card-title">Air Quality Data Page {params.cityID} {params.countryId}</h5>
            </div>

            <div className="position-relative pt-5">
                <div className="position-absolute top-50 start-0 translate-middle">
                    <Link className="btn btn-primary" to={"/Cities/" + params.countryId + "/" + params.regionId}>Back to Cities </Link>
                </div>
            </div>


        </div>

    )

}

export default AirQualityData;