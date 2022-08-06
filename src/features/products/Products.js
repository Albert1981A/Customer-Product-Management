import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Customers from "../customers/Customers";
import Purchases from "../purchases/Purchases";
import { addOneProduct, updateOneProduct, deleteOneProduct } from './productsSlice';

function Products() {

    const productsList = useSelector((state) => state.productsList.products);
    console.log(productsList);

    const dispatch = useDispatch();

    const addProduct = () => {
        let obj = { id: 1, name: "Bamba", price: 7, quantity: 3 }
        dispatch(addOneProduct(obj));
    }

    const updateProduct = () => {
        let obj = { id: 1, name: "new Bamba", price: 30, quantity: 12 }
        dispatch(updateOneProduct(obj));
    }

    const deleteProduct = () => {
        let id = 1
        dispatch(deleteOneProduct(id));
    }

    return (
        <div>
            <h1>Products Header</h1>

            <input type="button" value="Add Product" onClick={addProduct} />

            {productsList &&
                <div>
                    <ul>
                        {productsList.map((item) => {
                            return <li key={item.id}>
                                ID: {item.id} - Name: {item.name} - Price: {item.price} - Quantity: {item.quantity}
                            </li>
                        })}
                    </ul>
                </div>
            }

            <input type="button" value="Update Product" onClick={updateProduct} /> <br /> <br />

            <input type="button" value="Update Product" onClick={deleteProduct} />



            <h1>Products Footer</h1>


            <Customers />

            <Purchases />

        </div>
    );
}
export default Products;