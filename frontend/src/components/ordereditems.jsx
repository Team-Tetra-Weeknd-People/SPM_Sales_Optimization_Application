import React from "react";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import { OrderedItemAdd } from "./ordereditem-add";

import "../styles/madusha/OrderedItems.css";

export const OrderedItems = ({ item }) => {

  const [discount, setDiscount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleUpdateDiscount = () => {
    if (discount !== '') {
      setDiscount(parseFloat(discount));
    }
    setShowDialog(false);
  };

  return (
    <>
      <h2>{item.name} Item</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Brand</th>
            <th>Available Quantity</th>
            <th>Retail Price</th>
            <th>Discount</th>
            <th>Selling Price</th>
            <th>Set Discount</th>
            <th>Purchase</th>
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
              <td>${item.retailPrice}</td>
              <td>${discount}</td>
              <td>${item.retailPrice - discount}</td>
              <td><Button variant="warning" onClick={handleOpenDialog}>Set Discount</Button>{' '}</td>
              <td><Button variant="warning" onClick={() => OrderedItemAdd(item, discount)} >Purchase</Button>{' '}</td>
            </tr>

          )
          }
        </tbody>
      </Table>
      {showDialog && (
        <div className="showdialog-container">
          <h3>Update Discount Price</h3>
          <input
            type="number"
            placeholder="New Discount Price"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <button className="dialog-btn" onClick={handleUpdateDiscount}>Save</button>
          <button className="dialog-btn" onClick={handleCloseDialog}>Cancel</button>
        </div>
      )}

    </>
  )
};