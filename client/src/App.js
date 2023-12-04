import React, {useState, useEffect} from "react";
import Axios from "axios";
import UIPage from "./UI";

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const getData = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:8000/serial/check/1UAX7S0UN"
        );
        if (response != undefined) {
          let resArray = response.data[0]['ref']
          console.log(resArray)
          setData(resArray);
        } else {
          setData("serial not found!!!")
        }
        
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    getData();
    // fetch("http://localhost:8000/serial/check/1UAX7S0UN")
    // .then((response) => response.json())
    // .then((data) => {
    //   setData(data);
    //   console.log(data);
    // }).catch((e) => console.log(e));
  }, []);

  return (

    <div className="App">
      <UIPage/>
      {loading && <p>Loading...</p>}
      {!loading && <p>{data}</p>}
    </div>
  );
}

export default App;
