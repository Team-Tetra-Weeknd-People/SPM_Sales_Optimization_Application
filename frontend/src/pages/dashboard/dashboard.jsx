import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Tooltip } from "react-tooltip";

import Navbar from '../../components/navbar'

import '../../styles/randula/dashboard.css'

import cashier from '../../assets/icons/cashier.png'
import item from '../../assets/icons/item.png'
import profile from '../../assets/icons/profile.png'
import review from '../../assets/icons/review.png'

export default function dashboard() {

    return (
        <>
            <Navbar />
            <div className="dashboardContainer">
                <Row>
                    <Col className="dashcol odd" data-tooltip-id="cashier" onClick={() => {
                        window.location.href = "/cashier"
                    }}>
                        <h1 className="dashh1">Cashier</h1>
                        <img className="dashimg" src={cashier} alt="" />
                    </Col>
                    <Col className="dashcol even" data-tooltip-id="items" onClick={() => {
                        window.location.href = "/items-main"
                    }}>
                        <h1 className="dashh1">Items</h1>
                        <img className="dashimg" src={item} alt="" />
                    </Col>
                </Row>
                <Row>
                    <Col className="dashcol even" data-tooltip-id="ratings" onClick={() => {
                        window.location.href = "/reviews"
                    }}>
                        <h1 className="dashh1">Ratings</h1>
                        <img className="dashimg" src={review} alt="" />
                    </Col>
                    <Col className="dashcol odd" data-tooltip-id="profile" onClick={() => {
                        window.location.href = "/profile"
                    }}>
                        <h1 className="dashh1"> Profile</h1>
                        <img className="dashimg" src={profile} alt="" />
                    </Col>
                </Row>
            </div>

            <Tooltip
                id="cashier"
                place="top"
                content="Handle your orders within the system"
            />

            <Tooltip
                id="items"
                place="top"
                content="Manage the item details in the system"
            />

            <Tooltip
                id="ratings"
                place="top"
                content="Manage items reviews managed through the system"
            />

            <Tooltip
                id="profile"
                place="top"
                content="Manage your user profile details"
            />
        </>
    )
}
