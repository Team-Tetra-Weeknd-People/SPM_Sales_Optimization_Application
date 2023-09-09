import React, { useEffect, useState } from "react";
import "../../styles/sudul/MSRPGenerator.css";
import Navbar from "../../components/navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Graph from "../../components/graph";
import Swal from "sweetalert2";

function MSRPGenerator() {
  const { itemID } = useParams();
  const [addedItem, setAddedItem] = useState({
    hsrp: 0,
    retailPrice: 0,
    cost: 0,
    msrp:0,
  });
  const [retailPrice, setRetailPrice] = useState(0);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/item/${itemID}`
      );
      setAddedItem(response.data);
      setRetailPrice(response.data.retailPrice);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const changeRetailPrice = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page

    const data = {
      retailPrice: retailPrice,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/item/${itemID}`,
        data
      );
      console.log("Item details updated");
      Swal.fire({
        icon: "success",
        title: "Retail price updated!",
        text: "Retail price updated successfully!",
      }).then((res)=>{
        if(res.isConfirmed){
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error occurred!",
      });
      console.error("Error updating item details:", error);
    }
  };

  const storeMSRP = async (msrp) =>{
    const data = {
      msrp: msrp,
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/item/${itemID}`,
        data
      );
      console.log("Item details updated " + res.data.msrp);
        Swal.fire({
          icon: "success",
          title: "MSRP Generated",
          text: "Most suitable retail price generated successfully!",
        }).then((res)=>{
          if(res.isConfirmed){
            window.location.reload();
          }
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error occurred!",
      });
      console.error("Error updating item details:", error);
    }
  }
  
  const generateMSRP = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_ML_FUNCTION_APP_URL}`,
        addedItem
      );
      console.log(res);
        storeMSRP(res.data.msrp);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <center className="heading-msrp">
          <h1>Most Suggested Retail Price</h1>
        </center>
        <div className="msrp-container">
          <div className="msrp-gen-container">
            <div className="input-container">
              <label htmlFor="humanlyGivenValue">
                Humanly Suggested Price:
              </label>
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
            <div className="input-container">
              <label htmlFor="cost">Cost of a piece:</label>
              <input
                type="text"
                id="cost"
                value={addedItem.cost}
                disabled={true}
              />
            </div>
            {!addedItem.msrp && <button onClick={generateMSRP}>Generate MSRP</button>}
            {addedItem.msrp != 0 && (
              <>
                <button onClick={generateMSRP}>Re-Generate MSRP</button>
                <div className="result-container">
                  <p>Generated MSRP:</p>
                  <p className="msrp-value">Rs.{addedItem.msrp.toFixed(2)}</p>
                  <p className="red-msrp-desc">
                    Most Suitable retail price was generated earlier!
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="graph-msrp">
            <Graph />
          </div>
        </div>
        <div className="change-retail-price">
          <h3>Do you wish to change the retail price of the item?</h3>
          <form onSubmit={changeRetailPrice}>
            <div className="form-group-msrp">
              <label className="label-retail">New retail price:</label>
              <input
                type="float"
                id="newRetailPrice"
                value={retailPrice.toFixed(2)}
                onChange={(e) => {
                  setRetailPrice(e.target.value);
                }}
              />
            </div>
            <div className="button-container-msrp">
              <input type="submit" value="Change Price" />
            </div>
          </form>
        </div>
        <div className="msrp-item-details-container">
          <h2>Item Details</h2>
          <div className="msrp-item-details">
            <div className="msrp-item-details-left">
              <h3>{addedItem.name}</h3>
              <img src={addedItem.image} />
              <br />
              <img src={addedItem.barcode} />
            </div>
            <div className="msrp-item-details-right">
              <p className="details-items">
                <b>Item Code: </b>
                {addedItem.itemCode}
              </p>
              <p className="details-items">
                <b>Brand: </b>
                {addedItem.brand}
              </p>
              <p className="details-items">
                <b>Color: </b>
                {addedItem.color}
              </p>
              <p className="details-items">
                <b>Type: </b>
                {addedItem.type}
              </p>
              <p className="details-items">
                <b>Cost: </b>
                {addedItem.cost}
              </p>
              <p className="details-items">
                <b>MSRP: </b>
                {addedItem.msrp}
              </p>
              <p className="details-items">
                <b>HSRP: </b>
                {addedItem.hsrp}
              </p>
              <p className="details-items">
                <b>Available quantity: </b>
                {addedItem.quantity}
              </p>
              <img
                src={addedItem.image} />
              <br />
              <img
                src={addedItem.barcode} />
            </div>
            <div className="msrp-item-details-right">
              <p className="details-items"><b>Item Code: </b>{addedItem.itemCode}</p>
              <p className="details-items"><b>Brand: </b>{addedItem.brand}</p>
              <p className="details-items"><b>Color: </b>{addedItem.color}</p>
              <p className="details-items"><b>Type: </b>{addedItem.type}</p>
              <p className="details-items"><b>Cost: </b>{addedItem.cost}</p>
              <p className="details-items"><b>MSRP: </b>{addedItem.msrp}</p>
              <p className="details-items"><b>HSRP: </b>{addedItem.hsrp}</p>
              <p className="details-items"><b>Available quantity: </b>{addedItem.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MSRPGenerator;
