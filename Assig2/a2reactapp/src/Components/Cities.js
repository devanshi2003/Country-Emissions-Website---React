import {Link} from "react-router-dom"

const Cities = ({ }) => {
    return (
        <div>
            <div class="position-relative pt-5">
                <div class="position-absolute top-50 start-0 translate-middle">
                    <Link class="btn btn-primary" to={"/Countries/0"}>Back to Countries</Link>
                </div>
            </div>

            <div className="card col-4 mb-2" style={{ width: 18 + 'rem' }}>
                <h5 className="card-title">Cities Page</h5>
            </div>
        </div>

    )
}
export default Cities