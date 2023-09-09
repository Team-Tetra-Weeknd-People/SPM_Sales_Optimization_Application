import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrderedItems } from "./ordereditems";

export const OrderedItemAdd = (Item, discount) => {

    const newItem = {
        itemCode: Item.itemCode,
        name: Item.name,
        barcode: Item.barcode,
        description: Item.description,
        orderedquantity: 1,
        brand: Item.brand,
        retailPrice : Item.retailPrice,
        discountPrice: discount,
        sellingPrice: Item.retailPrice - discount,
    };
    console.log(newItem);

    axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/ordereditem/`, newItem)
        .then(() => {
        alert("Item Ordered successfully");
        })
        .catch((err) => {
        alert("Error making the order");
        console.log(err);
        });
    }