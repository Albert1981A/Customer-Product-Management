import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOnePurchase, updateOnePurchase, deleteOnePurchase } from './purchasesSlice';
import utils from '../../utils/UtilsOptions';

function Purchases() {

    const purchasesList = useSelector((state) => state.purchasesList.purchases);
    console.log(purchasesList);

    const dispatch = useDispatch();

    const addPurchases = () => {
        const dateFormatted = utils.getSystemDateFormatted();
        let obj = { id: 1, customerId: 1, productId: 1, date:  dateFormatted  }
        dispatch(addOnePurchase(obj));
    }

    const updatePurchases = () => {
        const dateFormatted = utils.getSystemDateFormatted();
        let obj = { id: 1, customerId: 2, productId: 2, date: dateFormatted }
        dispatch(updateOnePurchase(obj));
    }

    const deletePurchases = () => {
        let id = 1
        dispatch(deleteOnePurchase(id));
    }

    return (
        <div>
            <h1>Purchases Header</h1>

            <input type="button" value="Add Purchases" onClick={addPurchases} />

            {purchasesList &&
                <div>
                    <ul>
                        {purchasesList.map((item) => {
                            return <li key={item.id}>
                                ID: {item.id} - CustomerID: {item.customerId} - ProductID: {item.productId} - Date: {item.date}
                            </li>
                        })}
                    </ul>
                </div>
            }

            <input type="button" value="Update Purchases" onClick={updatePurchases} /> <br /> <br />

            <input type="button" value="delete Purchases" onClick={deletePurchases} />

            <h1>Purchases Footer</h1>
        </div>
    );
}
export default Purchases;