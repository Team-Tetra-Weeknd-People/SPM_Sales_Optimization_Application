import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/authentication/login";
import Register from "../pages/authentication/register";
import ItemsMain from "../pages/items/items-main";
import ItemAdd from "../pages/items/item-add";
import BarcodeGenerator from "../pages/items/barcode-generator";
import DataFeeder from "../pages/machine-learning/data-feeder";
import MSRPGenerator from "../pages/machine-learning/msrp-generator";
import Cashier from "../pages/Cashier/cashier-main";
import Reviews from "../pages/reviews/reviews";
import Profile from "../pages/profile/profile";
import Dashboard from "../pages/dashboard/dashboard"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/items-main" element={<ItemsMain />} />
          <Route path="/item-add" element={<ItemAdd />} />
          <Route
            path="/barcode-generator/:itemID"
            element={<BarcodeGenerator />}
          />
          <Route path="/msrp-generator/:itemID" element={<MSRPGenerator />} />
          <Route path="/d" element={<DataFeeder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}
