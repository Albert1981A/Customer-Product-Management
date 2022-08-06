import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOneCustomer, updateOneCustomer, deleteOneCustomer } from './customersSlice';

function Customers() {

    const customersList = useSelector((state) => state.customersList.customers);
    console.log(customersList);

    const dispatch = useDispatch();

    const addCustomer = () => {
        let obj = { id: 1, firstName: "Avi", lastName: "Nimni", city: "Tel-Aviv" }
        dispatch(addOneCustomer(obj));
    }

    const updateCustomer = () => {
        let obj = { id: 1, firstName: "Dana", lastName: "Banana", city: "Ramatgan" }
        dispatch(updateOneCustomer(obj));
    }

    const deleteCustomer = () => {
        let id = 1
        dispatch(deleteOneCustomer(id));
    }

    return (
        <div>
            <h1>Customers Header</h1>

            <input type="button" value="Add Customer" onClick={addCustomer} />

            {customersList &&
                <div>
                    <ul>
                        {customersList.map((item) => {
                            return <li key={item.id}>
                                ID: {item.id} - First Name: {item.firstName} - Last Name: {item.lastName} - City: {item.city}
                            </li>
                        })}
                    </ul>
                </div>
            }

            <input type="button" value="Update Customer" onClick={updateCustomer} /> <br /> <br />

            <input type="button" value="Delete Customer" onClick={deleteCustomer} />

            <h1>Customers Footer</h1>
        </div>
    );
}
export default Customers;