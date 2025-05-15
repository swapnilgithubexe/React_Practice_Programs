import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const api_key = "cc0e28144a083156c3aa7dfc0e5517c1";

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${api_key}&units=metric`
      );
      setWeather(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "brown" }}>Weather Details</h1>
      <input
        style={{ fontSize: "25px", borderRadius: "5px", outline: "none" }}
        type="text"
        value={city}
        placeholder="Enter your city"
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        style={{
          padding: "5px",
          background: "wheat",
          fontSize: "20px",
          marginLeft: "10px",
          borderRadius: "5px",
          color: "brown",
        }}
        onClick={getWeather}
      >
        Get weather
      </button>

      {weather && (
        <div style={{ textAlign: "center", color: "brown" }}>
          <h2 style={{ fontSize: "25px", color: "brown" }}>{weather.name}</h2>
          <p style={{ fontSize: "25px", color: "brown" }}>
            Desc: {weather.weather[0].description}
          </p>
          <p style={{ fontSize: "25px", color: "brown" }}>
            Temp: {weather.main.temp} *C
          </p>
          <p style={{ fontSize: "25px", color: "brown" }}>
            Feels Like: {weather.main.feels_like} *C
          </p>
          <p style={{ fontSize: "25px", color: "brown" }}>
            Humidity: {weather.main.humidity}%
          </p>
          <p style={{ fontSize: "25px", color: "brown" }}>
            Wind: {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
