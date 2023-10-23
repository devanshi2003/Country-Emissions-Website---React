import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const CountryEmission = ({ }) => {

    const params = useParams();
    const [summaryCountryEmissions, updateSummaryCountryEmissions] = useState([]);
    const [elementData, updateElementData] = useState([]);
    const [selectedElement, updateSelectedElement] = useState(0);
    const [countryEmission, updateCountryEmission] = useState([]);

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
        if (selectedElement !== 0 && selectedElement != 'Choose an element') {
            fetch(`http://localhost:5256/api/B_Countries/CountryEmissionData/${params.countryId}?elementId=${selectedElement}`)
                .then(response => response.json())
                .then(data => {
                    updateCountryEmission(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }, [selectedElement]);

    function elementChanged() {
        const selectedElement = document.querySelector('[name = "selectedElement"]').value;
        updateSelectedElement(selectedElement)
    }

    return (
        <div>

            <div className="card col-4 mb-2" style={{ width: '18rem' }}>
                <h5 className="card-title">Country Emission Data Page </h5>
            </div>
                          
            <div className="position-relative pt-5">
                <div className="position-absolute top-50 start-0 translate-middle">
                    <Link className="btn btn-primary" to={"/Countries/" + params.regionId}>Back to Countries</Link>
                </div>
            </div>

            <select className="form-select" style={{ width: '300px' }} value={selectedElement} onChange={elementChanged} name="selectedElement">
                <option selected>Choose an element</option>
                {elementData.map((element) => (
                    <option value={element.elementId}>{element.elementName}</option>
                ))}
            </select>

            <p>Selected Value: {selectedElement}</p>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        countryEmission ?countryEmission.map((data) => (
                        <tr>
                            <td>{data.year}</td>
                            <td>{data.itemName}</td>
                            <td>{data.value}</td>
                            </tr>                       
                        ))
                    :<p>Select Element to Load Data</p>
                }

                </tbody>
            </table>

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