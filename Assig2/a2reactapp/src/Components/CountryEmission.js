import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const CountryEmission = ({ }) => {

    const params = useParams();
    const [summaryCountryEmissions, updateSummaryCountryEmissions] = useState([]);
    const [elementData, updateElementData] = useState([]);
    const [selectedElement, updateSelectedElement] = useState('');
    const [countryEmission, updateCountryEmission] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/SummaryCountryEmissionData/${params.countryId}`)
            .then(response => response.json())
            .then(data => updateSummaryCountryEmissions(data))
            .catch(err => {
                console.log(err)
            });

    }, []);

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/GetElementList`)
            .then(response => response.json())
            .then(data => updateElementData(data))
            .catch(err => {
                console.log(err)
            });

    }, []);

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryEmissionData/${params.countryId}?elementId=${selectedElement}`)
            .then(response => response.json())
            .then(data => updateCountryEmission(data))
            .catch(err => {
                console.log(err)
            });

    }, [selectedElement]);

    function elementChanged(event) {
        updateSelectedElement(event.target.value)
    }

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

            <select class="form-select" style={{ width: '300px' }} value={selectedElement} onChange={elementChanged} name="selectedVal">
                <option selected>Choose an element</option>
                {elementData.map((element) => (
                    <option value={element.elementId}>{element.elementName}</option>
                ))}
            </select>

            <p>Selected Value: {selectedElement}</p>

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