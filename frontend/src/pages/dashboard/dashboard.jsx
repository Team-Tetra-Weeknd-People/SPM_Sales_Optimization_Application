import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Navbar from '../../components/navbar'

import '../../styles/randula/dashboard.css'

export default function dashboard() {

    return (
        <>
            <Navbar />
            <div className="dashboardContainer">
                <Row>
                    <Col className="cluster leftUp" onClick={() => {
                        window.location.href = "/cashier"
                    }}>
                        <div className="overlay">
                            <h1 className="overlayHead">Cashier</h1>
                            <h2 className="overlayHead">Lorem ipsum dolor sit amet consectetur</h2>
                        </div>
                    </Col>
                    <Col className="cluster rightUp" onClick={() => {
                        window.location.href = "/items-main"
                    }}>
                        <div className="overlay">
                            <h1 className="overlayHead">Items</h1>
                            <h2 className="overlayHead">Lorem ipsum dolor sit amet consectetur</h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="cluster leftDown" onClick={() => {
                        window.location.href = "/reviews"
                    }}>
                        <div className="overlay">
                            <h1 className="overlayHead">Reviews</h1>
                            <h2 className="overlayHead">Lorem ipsum dolor sit amet consectetur</h2>
                        </div>
                    </Col>
                    <Col className="cluster rightDown" onClick={() => {
                        window.location.href = "/profile"
                    }}>
                        <div className="overlay">
                            <h1 className="overlayHead">Profile</h1>
                            <h2 className="overlayHead">Lorem ipsum dolor sit amet consectetur</h2>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
