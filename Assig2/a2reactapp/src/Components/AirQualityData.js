import { useParams } from "react-router-dom";

const AirQualityData = ({ }) => {

    const params = useParams();

    return (
        <div>
            <div className="card col-4 mb-2" style={{ width: '18rem' }}>
                <h5 className="card-title">Air Quality Data Page {params.cityId} {params.countryId}</h5>
            </div>
        </div>

    )

}

export default AirQualityData;