import React from "react";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { OrderedItems } from "./ordereditems";

import "../styles/madusha/ClickedResult.css";

export const ClickedResult = ({ selectedItem }) => {

    const [item, setItem] = useState({});
    const [orderedItem, setOrderedItem] = useState([]);

    useEffect(() => {
        getItem();
    }, [selectedItem]);

    const getItem = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/item/${selectedItem}`
          );
          console.log("specific item: " + response.data);
          setItem(response.data);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };
    function handleClick(item) {
        const updatedItems = [...orderedItem, item];
        setOrderedItem(updatedItems);
    }

    return (
        <>
        <div className="items-container-mad">
        <div className="item-list">
          <h2 className="sub-heading">{item.name} Item</h2>
          <div className="rentcont">
          <div className="rent">
            <p >
              Name : {item.name}
            </p>
            <p>Item Code :          {item.itemCode}</p>
            <p>Item Brand :         {item.brand}</p>
            <p>Available Quantity : {item.quantity}</p>
            <p>Retail Price :       {item.retailPrice}</p>
            <Button variant="warning" onClick={() => handleClick(item)}>Order</Button>
            <br />
          </div>
        </div>
          {/* <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Item Brand</th>
                <th>Available Quantity</th>
                <th>Retail Price</th>
                <th>Order</th>
              </tr>
            </thead>
            <tbody>
              {(
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.itemCode}</td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.quantity}</td>
                    <td>Rs. {item.retailPrice}</td>
                    <td><Button variant="warning" onClick={() => handleClick(item)}>Order</Button>{' '}</td>
                  </tr>
                )
              }
            </tbody>
          </Table> */}
        </div>
      </div>
      <div className="selected-container">
      {orderedItem.map((item, id) => {
                return <OrderedItems item={item} key={id}/>;
            })}
      </div>
        </>
    )
};