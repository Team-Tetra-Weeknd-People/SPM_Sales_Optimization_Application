import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

import { ClickedResult } from "../../components/ClickedResult";

import "../../styles/madusha/cashier-main.css";
import Navbar from "../../components/navbar";


function CashierMain() {
    const [allItems, setAllItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [ options, setOptions ] = useState(null);
    const [item, setItem] = useState({});
    // let selectedItem = "";

    useEffect(() => {
        getAllItems();
      }, []);
    
      const getAllItems = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/item/`
          );
        //   console.log(response.data);
          setAllItems(response.data);

          const option = response.data.map((item) => ({
            value: item.id,
            label: item.name,
            }));
            setOptions(option);
            console.log("Options " + options);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };  


    const HandleChange = (selectedOption) => {
        console.log(selectedOption);
        // console.log(selectedOption.value);
        // selectedItem = selectedOption.value;
        setSelectedItem(selectedOption.value);
        console.log(selectedItem);
        // console.log(FilteredItems);
    };
 
    return(
        <>
        <Navbar />
        <h1 className="cashier-main-title">Cashier</h1>
        <div className="dropdown-container">
            <Select options={options} 
            onChange = {HandleChange} />
        </div>

        <div className="box-container">
            <ClickedResult selectedItem={selectedItem}/>
        </div>
        </>
    );
}
export default CashierMain;