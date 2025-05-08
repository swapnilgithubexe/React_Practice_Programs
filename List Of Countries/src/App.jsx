import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [visibility, setVisibilty] = useState(false);
  const [countries, setCountries] = useState([]);

  const handleClick = async () => {
    const res = await Axios.get("https://restcountries.com/v3.1/all");
    const sortedData = res.data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    setCountries(sortedData);
    setVisibilty(true);
  };

  return (
    <>
      <div className="container">
        <h1>List of countries</h1>
        <hr />
        <button className="common-btn" onClick={handleClick}>
          Populate the dropdown
        </button>
      </div>
      <hr />
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {visibility && (
          <div>
            <select name="countries" id="cou">
              {countries.map((item, index) => {
                return (
                  <option key={index} label={item.name.common}>
                    {item.name.common}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
