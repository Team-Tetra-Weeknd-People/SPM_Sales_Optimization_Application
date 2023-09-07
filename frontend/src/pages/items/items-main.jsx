import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import "../../styles/sudul/ItemsMain.css";

function ItemsMain() {
  const navigate = useNavigate();

  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    getAllItems();
  }, []);

  const toAddNewItem = () => {
    navigate("./add-new-item");
  };

  const getAllItems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/item/`
      );
      setAllItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="items-container">
        <Button onClick={toAddNewItem}>Add New Item</Button>
        <div className="item-list">
          <h2>All Items</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Item Code</th>
                <th>View & Manage Item</th>
                <th>Edit Item</th>
                <th>Delete Item</th>
              </tr>
            </thead>
            <tbody>
              {allItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.itemCode}</td>
                  <td><Button variant="primary">View</Button>{' '}</td>
                  <td><Button variant="warning">Edit</Button>{' '}</td>
                  <td><Button variant="danger">Delete</Button>{' '}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default ItemsMain;
