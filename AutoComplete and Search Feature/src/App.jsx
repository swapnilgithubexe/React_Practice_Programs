import { useEffect, useState } from "react";
import Axios from "axios";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    const res = await Axios.get("https://restcountries.com/v3.1/all");
    const commonNames = res.data.map((item) => item.name.common);
    setCountries(commonNames);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <>
      <div className="container">
        <div className="searchBox">
          <h1>Auto Complete and Search Functionality</h1>
          <label htmlFor="input">Enter your country </label>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Start typing..."
          />
        </div>
        <div className="suggestionBox">
          {searchQuery && (
            <ul className="suggestions">
              {filteredCountries.slice(0, 10).map((country, index) => (
                <li key={index}>{country}</li>
              ))}
              {filteredCountries.length === 0 && <li>No Matches</li>}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
