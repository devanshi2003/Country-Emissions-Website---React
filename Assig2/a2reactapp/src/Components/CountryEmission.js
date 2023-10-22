import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const CountryEmission = ({ }) => {

    const params = useParams();
    const [summaryCountryEmissions, updateSummaryCountryEmissions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/SummaryCountryEmissionData/${params.countryId}`)
            .then(response => response.json())
            .then(data => updateSummaryCountryEmissions(data))
            .catch(err => {
                console.log(err)
            });

        }, [])


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

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Element</th>
                        <th scope="col">Year</th>
                        <th scope="col">Total Emission</th>
                    </tr>
                </thead>
                <tbody>

                    {summaryCountryEmissions.map((data) => (
                        <tr>
                            <td>{data.element}</td>
                            <td>{data.year}</td>
                            <td>{data.totalValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
export default CountryEmission