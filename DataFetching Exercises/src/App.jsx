import { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [users, setUser] = useState([]);
  const [tableVisible, setTableVisibility] = useState(false);

  const handleClick = async () => {
    const res = await Axios.get("https://jsonplaceholder.typicode.com/users");
    const data = res.data;
    setUser(data);
    setTableVisibility(true);
  };
  return (
    <>
      <h1>Data Fetching</h1>
      <hr />
      <h3>Fetch user data from an API and display it in a table.</h3>
      <button className="common-btn" onClick={handleClick}>
        Generate Table
      </button>
      <button onClick={() => setTableVisibility(false)} className="common-btn">
        Hide Table
      </button>
      <hr />
      {tableVisible && (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>
                      {item.address.city}, {item.address.street}
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.website}</td>
                    <td>{item.company.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default App;
