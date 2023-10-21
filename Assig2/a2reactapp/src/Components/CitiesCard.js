import {Link} from "react-router-dom"

const citiesCard = ({ cityName, recordCount, airQualityYearRange }) => {

    return (
        <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                <h5 className="card-title">{cityName}</h5>

                {recordCount === 0
                    ? <p className="card-text">No Air Quality Data {recordCount}</p>
                    : <div>
                        <p className="card-text">Total Air Quality Records: {recordCount}</p>
                        <Link class="btn btn-primary mb-2" to={"/Cities"}>View Air Quality Data</Link>
                       </div>
                }
                
                </div>
        </div>
    )

}
export default citiesCard