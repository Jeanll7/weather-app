import React, { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "7ef853c3ea72e45701f6a3c983aa4301";
  const [waetherData, setWaetherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}&lang=pt_br`
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
        <div className="title">
          <h2>Bem-vindo! </h2>
          <p>
            Digite o nome da cidade <br /> para obter o clima.
          </p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{waetherData.name}</p>
          {/* <img
            className="country"
            src="https://countryflagsapi.com/png/br"
            alt=""
          /> */}
          <p className="temp">{Math.round(waetherData.main.temp)} ºG</p>
          <div className="weather-content">
            <p className="weather">{waetherData.weather[0].main}</p>
            <img
              className="icon-list"
              src="http://openweathermap.org/img/wn/01d@2x.png"
              alt="Condições do tempo"
            />
          </div>
        </div>
      )}

      {waetherData.cod === "404" ? <p>Cidade não encontrada</p> : <></>}
    </div>
  );
}

export default App;
