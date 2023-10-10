import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';

import { ClockLoader } from 'react-spinners';

import '../../styles/randula/review.css'
import reviewImage from '../../assets/images/review.jpg'

import Navbar from "../../components/navbar";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function reviews() {

    const [newReviews, setNewReviews] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [showAll, setShowALl] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAll = () => setShowALl(false);
    const handleShowAll = () => setShowALl(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/getNew`)
            .then((res) => {
                setNewReviews(res.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/getAll`)
            .then((res) => {
                setReviews(res.data);
            })
    }, [])


    return (
        <>
            <Navbar />
            <div className="reviewContainer">
                <Row>
                    <Col sm={6}>
                        <h2>New Reviews</h2>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={20}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                        >
                            {!newReviews.length ? (
                                <>
                                    <ClockLoader color="#ffffff" />
                                </>
                            ) : (
                                <>
                                    {newReviews.map((review) => (
                                        <>
                                            <SwiperSlide className="centered-card" key={review.id}>
                                                <img src={review.item.image} alt="" className="reviewImg" />
                                                <h2>{review.item.name}</h2>
                                                <h2>{review.item.brand} - {review.item.type}</h2>
                                                <h2>Rating - {review.rating}/5</h2>
                                                <br />
                                            </SwiperSlide>
                                        </>
                                    ))}
                                </>
                            )}
                        </Swiper>
                    </Col>
                    <Col sm={5}>
                        <Row>
                            <Image src={reviewImage} rounded />
                        </Row>
                        <br /> <br />
                        <Row>
                            <Col sm={1}></Col>
                            <Col sm={6}>
                                <Button variant="primary" onClick={handleShowAll}>View All Reviews</Button>{' '}
                            </Col>
                            <Col sm={4}>
                                <Button variant="primary" onClick={handleShowAdd}>Add New Review</Button>{' '}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <Modal
                show={showAll}
                onHide={handleCloseAll}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>All Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don not even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAll}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showAdd}
                onHide={handleCloseAdd}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don not even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
