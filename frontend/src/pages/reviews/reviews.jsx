import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import axios from 'axios';

import '../../styles/randula/review.css'
import reviewImage from '../../assets/images/review.jpg'

import Navbar from "../../components/navbar";

export default function reviews() {

    const [newReviews, setNewReviews] = useState([]);
    const [topReviews, setTopReviews] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/getNew`)
            .then((res) => {
                setNewReviews(res.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/getTop`)
            .then((res) => {
                setTopReviews(res.data);
            })
    }, [])

    return (
        <>
            <Navbar />
            <div className="reviewContainer">
                <Row>
                    <Col sm={6}>
                        <h2>New Reviews</h2>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Rating</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newReviews.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.createdAt}</td>
                                        <td>{item.rating}</td>
                                        <td>{item.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col sm={5}>
                        <Row>
                            <Image src={reviewImage} rounded />
                        </Row>
                        <br /> <br />
                        <Row>
                            <Col sm={1}></Col>
                            <Col sm={6}>
                                <Button variant="primary">View All Reviews</Button>{' '}
                            </Col>
                            <Col sm={4}>
                                <Button variant="primary">Add New Review</Button>{' '}
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>
        </>
    )
}
