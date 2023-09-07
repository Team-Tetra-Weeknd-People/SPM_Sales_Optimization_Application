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
    <Navbar/>
      <div className="items-container">
        <Button onClick={toAddNewItem}>Add New Item</Button>
        <div className="item-list">
          <h2>All Items</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Item Code</th>
                {/* Add headers for other item properties as needed */}
              </tr>
            </thead>
            {/* <tbody>
              {allItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.itemCode}</td>
                </tr>
              ))}
            </tbody> */}
          </Table>
        </div>
      </div>
    </>
  );
}

export default ItemsMain;
