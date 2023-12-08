import React, {useState, useEffect} from "react";
import Axios from "axios";
// import getData from './App.js'

function UIPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('checkExistence');

    const [ref, setRef] = useState("");
    const [seriaL, setSeriaL] = useState("");

    // use useState to manipulate the toggle effect of two textareas
    const [refT, setRefT] = useState(false)
    const [seriaLT, setseriaLT] = useState(true)

    
    async function getData(getWebsite) {
        try {
        const response = await Axios.get(
            getWebsite
        );
        if (response != undefined) {
            let resArray = response.data
            console.log(resArray)
            setData(resArray.join("\n"));
        } else {
            setData("serial not found!!!")
        }
        
        } catch (err) {
        console.log(err)
        } finally {
        setLoading(false);
        }
    };

      useEffect(() => {
        // switch (selectedOption) {
        //     case "add":
        //         setRefT(true);
        //         setseriaLT(true);
        //         console.log("at add")
        //     case "checkExistence":
        //         setRefT(false);
        //         setseriaLT(true);
        //         console.log("check E")
        //     case "checkSerials":
        //         setRefT(true);
        //         setseriaLT(false);
        //         console.log("checkSerial")
        //     case "export":
        //         setRefT(false);
        //         setseriaLT(false);
        //         console.log("at export")
        // };
      }, []);
    

    const submitData = (e) => {
        e.preventDefault();
        var inputRef = ref
        var inputSerial = seriaL.split("\n").join(",")


        console.log(inputSerial);

        switch (selectedOption) {
            case "add":
                console.log("getting data...")
                getData(`http://localhost:8000/serial/add/${inputRef}/${inputSerial}`)
                break;
            case "checkExistence":
                console.log("getting data...")
                getData(`http://localhost:8000/serial/check/${inputSerial}`)
                break;
            case "checkSerials":
                console.log("getting data...")
                getData(`http://localhost:8000/serial/checkAllSerial/${inputRef}`)
                break;
            case "export":
                break;
        };
    };

    function changeValueW(e) {
        // var ref = document.getElementById("ref");
        // var seriaL = document.getElementById("seriaL");
        setSelectedOption(e.target.value);
        console.log('at changing phase', e.target.value)
        
        switch (e.target.value) {
            case "add":
                setRefT(true);
                setseriaLT(true);
                console.log("at add")
                break;
            case "checkExistence":
                setRefT(false);
                setseriaLT(true);
                console.log("check E")
                break;
            case "checkSerials":
                setRefT(true);
                setseriaLT(false);
                console.log("checkSerial")
                break;
            case "export":
                setRefT(false);
                setseriaLT(false);
                console.log("at export")
                break;
        };
    }

    return (
        <>
            <select value={selectedOption} onChange={changeValueW}>
                <option value="add">add</option>
                <option value="checkExistence">checkExistence</option>
                <option value="checkSerials">checkSerials</option>
                <option value="export">export</option>
            </select>
            <form method="get" onSubmit={submitData}>
                <label>
                    {refT && <textarea id="ref" value={ref} onChange={e => setRef(e.target.value)} className="textarea" placeholder="please input a ref"></textarea>}
                </label>
                <label>
                    {seriaLT && <textarea id="seriaL" value={seriaL} onChange={e => setSeriaL(e.target.value)} className="textarea" placeholder="can input a list of values with line spaced"></textarea>}
                </label>
                <button type="submit">Submit</button>
            </form>
            {/* <p>{selectedOption}</p> */}
            <h1>Results</h1>
            {loading && <p>Loading...</p>}
            {!loading && <p>{data}</p>}
        </>
    );
};

export default UIPage;