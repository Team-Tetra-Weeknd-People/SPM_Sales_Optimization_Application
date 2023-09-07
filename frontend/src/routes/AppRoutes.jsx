import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from '../pages/home';
import Login from '../pages/authentication/login';
import Register from '../pages/authentication/register';
import ItemsMain from '../pages/items/items-main';

export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/items-main" element={<ItemsMain />} />
                </Routes>
            </Router>
        </>
    )
}

