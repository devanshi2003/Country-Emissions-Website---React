import { Link, useParams } from "react-router-dom"

const CountryEmission = ({ }) => {

    const params = useParams();


    return (
        <div>

            <div className="card col-4 mb-2" style={{ width: '18rem' }}>
                <h5 className="card-title">Country Emission Data Page </h5>
            </div>

            <div class="position-relative pt-5">
                <div class="position-absolute top-50 start-0 translate-middle">
                    <Link class="btn btn-primary" to={"/Countries/" + params.regionId}>Back to Countries</Link>
                </div>
            </div>

        </div>
    )
}
export default CountryEmission