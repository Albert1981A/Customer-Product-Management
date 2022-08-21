import React from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Box } from "@mui/material";
// import { addOnePurchase, updateOnePurchase, deleteOnePurchase } from './purchasesSlice';
// import utils1 from '../../utils/UtilsOptions';

function Purchases() {

    const purchasesList = useSelector((state) => state.purchasesList.purchases);

    // const dispatch = useDispatch();

    // const addPurchases = () => {
    //     const dateFormatted = utils1.getSystemDateFormatted();
    //     let obj = { id: 1, customerId: 1, productId: 1, date: dateFormatted }
    //     dispatch(addOnePurchase(obj));
    // }

    // const updatePurchases = () => {
    //     const dateFormatted = utils1.getSystemDateFormatted();
    //     let obj = { id: 1, customerId: 2, productId: 2, date: dateFormatted }
    //     dispatch(updateOnePurchase(obj));
    // }

    // const deletePurchases = () => {
    //     let id = 1
    //     dispatch(deleteOnePurchase(id));
    // }

    return (
        <Container>

            <Typography variant="h4" gutterBottom component="div" sx={{ color: '#383838' }} >
                Purchases
            </Typography>

            {purchasesList.length > 0 ?
                <Container sx={{ maxWidth: '620px' }}>
                    <ul>
                        {purchasesList.map((item) => {
                            return <li key={item.id}>
                                ID: {item.id} - CustomerID: {item.customerId} - ProductID: {item.productId} - Date: {item.date}
                            </li>
                        })}
                    </ul>
                </Container>
                :
                <Typography component="div">
                    <Box sx={{ fontWeight: 'bold', m: 1, color: '#383838' }}> NO PURCHASES </Box>
                </Typography>
            }

            {/* <input type="button" value="Add Purchases" onClick={addPurchases} />

            <input type="button" value="Update Purchases" onClick={updatePurchases} /> <br /> <br />

            <input type="button" value="delete Purchases" onClick={deletePurchases} /> */}

        </Container>
    );
}
export default Purchases;