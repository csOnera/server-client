import React, {useState, useEffect} from "react";
import Axios from "axios";

function UIPage() {
    const [selectedOption, setSelectedOption] = useState('checkExistence');
    const [ref, setRef] = useState("");
    const [seriaL, setSeriaL] = useState("");

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

    function submitData(e) {
        e.preventDafault();
        setSeriaL(seriaL.split("\n"));

        console.log(seriaL);

        switch (selectedOption) {
            case "add":
                
            case "checkExistence":
                "http://localhost:8000/serial/check/"
            case "checkSerials":

            case "export":
        }

    }

    return (
        <>
            <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                <option value="add">add</option>
                <option value="checkExistence">checkExistence</option>
                <option value="checkSerials">checkSerials</option>
                <option value="export">export</option>
            </select>
            <form method="get" onSubmit={submitData}>
                <textarea value={ref} onChange={e => setRef(e.target.value)} className="textarea" placeholder="please input a ref"></textarea>
                <textarea value={seriaL} onChange={e => setSeriaL(e.target.value)} className="textarea" placeholder="can input a list of values with line spaced"></textarea>
                <button type="submit">Submit</button>
            </form>
            {/* <p>{selectedOption}</p> */}
        </>
    );
};

export default UIPage;