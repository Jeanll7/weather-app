import React, { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "7ef853c3ea72e45701f6a3c983aa4301";
  const [waetherData, setWaetherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}&units=imperial`
      )
        .then((response) => response.json())
        .then((data) => {
          setWaetherData(data);
          setCity("");
        });
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        type="text"
        placeholder="Encontrar Cidade..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        // onKeyDown={getWeather}
        onKeyPress={getWeather}
      />
      {typeof waetherData.main === "undefined" ? (
        <div>
          <p>Bem-vindo! Digite o nome da cidade para obter o clima.</p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{waetherData.name}</p>
          <p className="temp">{Math.round(waetherData.main.temp)} ºG</p>
          <p className="weather">{waetherData.weather[0].main}</p>
        </div>
      )}

      {waetherData.cod === "404" ? <p>Cidade não encontrada</p> : <></>}
    </div>
  );
}

export default App;
