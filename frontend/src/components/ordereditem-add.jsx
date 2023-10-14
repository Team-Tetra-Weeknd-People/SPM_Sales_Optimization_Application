import axios from "axios";
import Swal from "sweetalert2";

export const OrderedItemAdd = (items, discounts) => {
    const orderedItems = [...items];
  
    orderedItems.forEach((item, index) => {
      const newItem = {
        itemCode: item.itemCode,
        name: item.name,
        barcode: item.barcode,
        description: item.description,
        orderedquantity: 1,
        brand: item.brand,
        retailPrice: item.retailPrice,
        discountPrice: item.retailPrice*(discounts[index]/100) || 0,
        sellingPrice: item.retailPrice - item.retailPrice*(discounts[index]/100) ||  item.retailPrice,
      };
  
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/ordereditem/`, newItem)
        .then(() => {
          console.log('Order made successfully');
        })
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
          console.log(err);
        });
    });
  };
  