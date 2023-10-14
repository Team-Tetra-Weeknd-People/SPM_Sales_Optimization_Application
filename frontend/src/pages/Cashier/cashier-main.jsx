import React, { useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";

import "../../styles/madusha/cashier-main.css";
import Navbar from "../../components/navbar";
import { OrderedItemAdd } from "../../components/ordereditem-add";

const CashierMain = () => {
  const [selectedItem, setSelectedItem] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [ options, setOptions ] = useState(null);
  const [item, setItem] = useState([]);

  const [discounts, setDiscounts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [discountIndex, setDiscountIndex] = useState(null);

  const handleOpenDialog = (index) => {
    setDiscountIndex(index); // Set the index for the discount to be updated
    setShowDialog(true);
  };

const handleCloseDialog = () => {
  setShowDialog(false);
};

const handleUpdateDiscount = () => {
    if (discounts[discountIndex] !== '') {
      setDiscounts((prevDiscounts) => {
        const updatedDiscounts = [...prevDiscounts];
        updatedDiscounts[discountIndex] = parseFloat(discounts[discountIndex]);
        return updatedDiscounts;
      });
    }
    setShowDialog(false);
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/item/`
      );
    //   console.log(response.data);
      setAllItems(response.data);

      const option = response.data.map((item) => ({
        value: item.id,
        label: item.name,
        }));
        setOptions(option);
        console.log("Options " + options);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
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

  async function updateItems(orderedItems) {
    //upload image to firebase
    const values = [...orderedItems];

    values.forEach(async (item) => {
        const data = {
            quantity: item.quantity - 1,
        };
        await axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/item/${item.id}`, data)
            .then((res) => {
            console.log(res.data);
            sessionStorage.setItem("itemJustAdded", data);
            })
            .catch((err) => {
            console.log(err);
            });
        });
  }

  const handleSelectItem = (selectedOption) => {
    setSelectedItem(selectedOption.value);
  };

  const handleOrderItem = (item) => {
        setOrderedItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (itemId) => {
    const updatedItems = orderedItems.filter((item) => item.id !== itemId);
    setOrderedItems(updatedItems);
  };

  function PurchaseOrder() {
    Swal.fire({
        title: 'Do you want to made the purchase?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            OrderedItemAdd(orderedItems, discounts);
            setSelectedItem(null);
            window.location.reload();
            updateItems(orderedItems);
          Swal.fire('Purchased!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Purchase Denied', '', 'info')
        }
      })

  }

  return (
    <>
    <div>
      <Navbar />
      <h1 className="cashier-main-title">Cashier</h1>
      <div className="dropdown-container">
      <Select
        options={options} 
        onChange={handleSelectItem}
        value={selectedItem}
      />
      </div>
      <div className="box-container">
      {selectedItem && (
        <div className="items-container-mad">
        <div className="item-list">
        <h2 className="sub-heading">{item.name} Item</h2>
        <div className="rentcont">
        <div className="rent">
          <p>Name:                {item.name}</p>
          <p>Item Code :          {item.itemCode}</p>
          <p>Item Brand :         {item.brand}</p>
          <p>Available Quantity : {item.quantity}</p>
          <p>Retail Price :       {item.retailPrice}</p>
          <button onClick={() => handleOrderItem(item)}>Order</button>
        </div>
        </div>
        </div>
        </div>
      )}
      </div>
      <div className="table">
        <h2>Ordered Items</h2>
        {orderedItems && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Item Brand</th>
              <th>Quantity</th>
              <th>Retail Price</th>
              <th>Discount</th>
              <th>Selling Price</th>
              <th>Set Discount</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map((sitem, index) => (
              <tr key={index}>
                  <td>{sitem.name}</td>
                  <td>{sitem.itemCode}</td>
                  <td>{sitem.name}</td>
                  <td>{sitem.brand}</td>
                  <td>1</td>
                  <td>${sitem.retailPrice}</td>
                  <td>{discounts[index] || 0}%</td>
                  <td>${(sitem.retailPrice - sitem.retailPrice*(discounts[index]/100)) ||  sitem.retailPrice}</td>
                  <td><Button variant="warning" onClick={() => handleOpenDialog(index)}>Set Discount</Button>{' '}</td>
                  <td><Button variant="warning" onClick={() => removeItem(sitem.id)}>Remove Item</Button>{' '}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        )}
        {showDialog && (
            <div className="showdialog-container">
            <h3>Update Discount Price</h3>
            <input
                type="number"
                placeholder="New Discount Price"
                value={discounts[discountIndex] || ''}
                onChange={(e) => setDiscounts((prevDiscounts) => {
                    const updatedDiscounts = [...prevDiscounts];
                    updatedDiscounts[discountIndex] = e.target.value;
                    return updatedDiscounts;
                  })}
            />
            <button className="dialog-btn" onClick={handleUpdateDiscount}>Save</button>
            <button className="dialog-btn" onClick={handleCloseDialog}>Cancel</button>
            </div>
            )}
            {orderedItems.length !== 0 && (
              <button onClick={() => PurchaseOrder()} >Purchase Order</button>
            )}
      </div>
    </div>
    </>
  );
};

export default CashierMain;
