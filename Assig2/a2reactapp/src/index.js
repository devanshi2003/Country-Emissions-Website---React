import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Region from './Components/Region';
import Countries from './Components/Countries';
import Cities from './Components/Cities';
import TemperatureData from './Components/TemperatureData'
import CountryEmission from './Components/CountryEmission'
import AirQualityData from './Components/AirQualityData'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="Region" element={<Region />} />
                <Route path="Countries/:regionId" element={<Countries />} />
                <Route path="Cities/:countryId/:regionId" element={<Cities />} />
                <Route path="TemperatureData/:countryId/:regionId" element={<TemperatureData/>} />
                <Route path="CountryEmission/:countryId/:regionId" element={<CountryEmission />} />
                 <Route path="AirQualityData/:cityID/:countryId" element={<AirQualityData />} />

            </Route>
        </Routes>
    </BrowserRouter> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
