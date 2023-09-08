import React, { useEffect, useState } from 'react';
import '../../styles/sudul/MSRPGenerator.css'; 
import Navbar from '../../components/navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import runPython from '../../machine_learning_scripts/msrp-gen.cjs'

function MSRPGenerator() {
  const {itemID} = useParams();
  const [addedItem, setAddedItem] = useState({});
  const [msrp, setMsrp] = useState('');

  useEffect(() => {
    // runPython();
    getItem();
  }, []);

  const getItem = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/item/${itemID}`
      );
      setAddedItem(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const generateMSRP = () => {
    // Add your logic here to generate the MSRP based on the given values
    // You can update the 'msrp' state variable with the result
  };

  return (
    <>
    <Navbar/>
    <div className="msrp-gen-container">
      <div className="input-container">
        <label htmlFor="humanlyGivenValue">Humanly Given Value:</label>
        <input
          type="text"
          id="humanlyGivenValue"
          value={addedItem.hsrp}
          disabled={true}
        />
      </div>
      <div className="input-container">
        <label htmlFor="retailPrice">Retail Price:</label>
        <input
          type="text"
          id="retailPrice"
          value={addedItem.retailPrice}
          disabled={true}
        />
      </div>
      <button onClick={generateMSRP}>Generate MSRP</button>
      {msrp && (
        <div className="result-container">
          <p>Generated MSRP:</p>
          <p className="msrp-value">{addedItem.msrp}</p>
        </div>
      )}
    </div>
    </>
  );
}

export default MSRPGenerator;
