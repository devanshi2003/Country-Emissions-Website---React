import { Link, useParams } from 'react-router-dom'


const TemperatureData = ({ }) => {

    const params = useParams()

    return (
        <div>
            <div className="card col-4 mb-2" style={{ width: 18 + 'rem' }}>
                <h5 className="card-title">Temperature Data Page {params.countryId}</h5>
            </div>

            <div class="position-relative pt-5">
                <div class="position-absolute top-50 start-0 translate-middle">
                    <Link class="btn btn-primary" to={"/Countries/" + params.regionId}>Back to Regions</Link>
                </div>
            </div>
        </div>





    )
}

export default TemperatureData