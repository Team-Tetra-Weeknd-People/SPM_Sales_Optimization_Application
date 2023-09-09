import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from "react-bootstrap/Table";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

import Navbar from "../../components/navbar";
import "../../styles/sudul/ItemsMain.css";

function ItemsMain() {
  const navigate = useNavigate();

  const [allItems, setAllItems] = useState([]);
  const [item, setItem] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllItems();
  }, []);

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

  const handleView = (item) => {
    setItem(item);
    handleShow();
  }

  return (
    <>

      {/* item view modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>View Item - {item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Table striped>
                <tbody>
                  <tr>
                    <td>Item Code</td> <td>{item.itemCode}</td>
                  </tr>
                  <tr>
                    <td>Item Name</td> <td>{item.name}</td>
                  </tr>
                  <tr>
                    <td>Item Brand</td> <td>{item.brand}</td>
                  </tr>
                  <tr>
                    <td>Item Color</td> <td>{item.color}</td>
                  </tr>
                  <tr>
                    <td>Item Type</td> <td>{item.type}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td> <td>{item.quantity}</td>
                  </tr>
                </tbody>
              </Table>
              <Card style={{ width: '18rem', minHeight: '10rem' }}>
                <Card.Body>
                  <Card.Title>Description</Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br /><br />
              <Table striped>
                <tbody>
                  <tr>
                    <td>HSRP </td> <td>Rs.{item.hsrp}</td>
                  </tr>
                  <tr>
                    <td>Retail Price</td> <td>Rs.{item.retailPrice}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>

            <Col>
              <img src={item.image} alt="item image" style={{ maxHeight: '15rem' }} />

              <br /><br />
              <h5>Bar Code</h5>
              <img src={item.barcode} alt="item image" style={{ maxWidth: '25rem' }} />
              <br /><br />
              <Button variant="primary" target="_blank" href={item.barcode}>View Barcode</Button>
              <br /><br /><br />
              <Table striped>
                <tbody>
                  <tr>
                    <td>MSRP</td>
                    <td>{item.msrp === 0 ? (
                      <span>Not Calculated Yet ...</span>
                    ) : (
                      <span>Rs.{item.msrp}</span>
                    )
                    }</td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="primary" onClick={(()=>{
                window.location.href = `/msrp-generator/${item.id}`;
              })}>Calculate MSRP</Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal >

      <Navbar />
      <div className="items-container">
        <Button onClick={() => { navigate("/item-add") }}>Add New Item</Button>
        <div className="item-list">
          <h2>All Items</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Item Brand</th>
                <th>Available Quantity</th>
                <th>Retail Price</th>
                <th>View Item</th>
                <th>Edit Item</th>
                <th>Delete Item</th>
              </tr>
            </thead>
            <tbody>
              {allItems.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    <BarLoader color="#36d7b7" />
                  </td>
                </tr>
              ) : (
                allItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.itemCode}</td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.quantity}</td>
                    <td>Rs. {item.retailPrice.toFixed(2)}</td>
                    <td><Button variant="primary" onClick={() => {
                      handleView(item);
                    }}>View</Button>{' '}</td>
                    <td><Button variant="warning">Edit</Button>{' '}</td>
                    <td><Button variant="danger">Delete</Button>{' '}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default ItemsMain;
