import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import axios from 'axios';

import { Tooltip } from "react-tooltip";

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
    const [items, setItems] = useState([]);

    const [showAll, setShowALl] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAll = () => setShowALl(false);
    const handleShowAll = () => setShowALl(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/getNew`)
            .then((res) => {
                setNewReviews(res.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/`)
            .then((res) => {
                setReviews(res.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/item/`)
            .then((res) => {
                const sortedProducts = [...res.data];
                sortedProducts.sort((a, b) => {
                    return a.brand.localeCompare(b.brand);
                });
                setItems(sortedProducts);
            })
    }, [])

    const reviewSchema = Yup.object().shape({
        itemID: Yup.string().required("Item is required"),
        description: Yup.string().required("Description is required"),
        rating: Yup.number().required("Rating is required"),
    });

    async function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_BACKEND_URL}/review/${id}`)
                Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: "Deleted Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    setReviews([])
                    setNewReviews([])
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/`)
                        .then((res) => {
                            setReviews(res.data);
                        })

                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/getNew`)
                        .then((res) => {
                            setNewReviews(res.data);
                        })
                });
            }
        })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something is wrong !!",
                });
            });
    }

    async function handleAdd(values) {
        setIsSubmitted(true);
        console.log(values)
        const review = {
            itemID: values.itemID,
            description: values.description,
            rating: values.rating,
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/review/`, review)
            .then((res) => {
                console.log(res.data)
                Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: "Added Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    setIsSubmitted(false);
                    setShowAdd(false);
                    setReviews([])
                    setNewReviews([])
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/`)
                        .then((res) => {
                            setReviews(res.data);
                        })

                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/getNew`)
                        .then((res) => {
                            setNewReviews(res.data);
                        })
                });
            })
            .catch((err) => {
                console.log(err);
                setIsSubmitted(false);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something is wrong !!",
                });
            });
    }


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
                            navigation
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
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>All Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="reviewAll">
                        {!reviews.length ? (
                            <>
                                <ClockLoader color="#000000" />
                            </>
                        ) : (
                            <>
                                {reviews.map((review) => (
                                    <>
                                        <Card style={{ width: '13rem', marginTop: '1rem' }} key={review.id} data-tooltip-id={review.id} >
                                            <Card.Img variant="top" src={review.item.image} style={{ height: '80%' }} />
                                            <Card.Body>
                                                <Card.Title>{review.item.name}</Card.Title>
                                                <Card.Text>
                                                    {review.item.brand} - {review.item.type}
                                                </Card.Text>
                                                <Card.Text>
                                                    Rating - {review.rating}/5
                                                </Card.Text>
                                                <Button variant="danger" onClick={() => handleDelete(review.id)}>Delete</Button>
                                            </Card.Body>
                                        </Card>

                                        <Tooltip
                                            id={review.id}
                                            place="top"
                                            content={review.description}
                                        />
                                    </>
                                ))}
                            </>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Close</Button>
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
                    {/* review add form */}
                    <Formik
                        initialValues={{
                            itemID: "",
                            description: "",
                            rating: "",
                        }}
                        validationSchema={reviewSchema}
                        onSubmit={(values) => {
                            handleAdd(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group col-md-6" style={{ width: "450px" }}>
                                    <label htmlFor="rating">Item</label>
                                    <Field
                                        name="itemID"
                                        as="select"
                                        style={{ width: "450px" }}
                                        className={
                                            "form-control" +
                                            (errors.itemID && touched.itemID ? " is-invalid" : "")
                                        }
                                    >
                                        <option value="" label="Select an Item" />
                                        {items.map((item) => (
                                            <option value={item.id} label={item.brand + " - " + item.name + " - " + item.color} key={item.id} />
                                        ))}

                                    </Field>
                                    <div className="invalid-feedback">
                                        {touched.itemID && errors.itemID
                                            ? errors.itemID
                                            : null}
                                    </div>
                                </div>
                                <div className="form-group col-md-6" style={{ width: "300px" }}>

                                    <label htmlFor="description">Description</label>
                                    <Field
                                        name="description"
                                        id="description"
                                        className={`form-control ${touched.description && errors.description ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {touched.description && errors.description
                                            ? errors.description
                                            : null}
                                    </div>
                                </div>

                                <div className="form-group col-md-6" style={{ width: "450px" }}>
                                    <label htmlFor="rating">Rating</label>
                                    <Field
                                        name="rating"
                                        as="select"
                                        style={{ width: "450px" }}
                                        className={
                                            "form-control" +
                                            (errors.rating && touched.rating ? " is-invalid" : "")
                                        }
                                    >
                                        <option value="" label="Select a Rating" />
                                        <option value="1" label="1" />
                                        <option value="2" label="2" />
                                        <option value="3" label="3" />
                                        <option value="4" label="4" />
                                        <option value="5" label="5" />
                                    </Field>
                                    <div className="invalid-feedback">
                                        {touched.rating && errors.rating
                                            ? errors.rating
                                            : null}
                                    </div>
                                </div>
                                <br />
                                {isSubmitted ? (
                                    <Button variant="primary" disabled>
                                        <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        &nbsp; Submitting...
                                    </Button>
                                ) : (
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                )}
                            </Form>
                        )}

                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
