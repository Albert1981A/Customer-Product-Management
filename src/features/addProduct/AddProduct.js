import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, ButtonGroup, MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addOnePurchase } from '../purchases/purchasesSlice';
import utils1 from '../../utils/UtilsOptions';
import { updateOneProduct } from '../products/productsSlice';


function AddProduct(props) {

    const purchasesList = useSelector((state) => state.purchasesList.purchases);
    const productsList = useSelector((state) => state.productsList.products);
    const [product, setProduct] = useState("");
    const [customerData, setCustomerData] = useState({});
    const [fromComp, setFromComp] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setCustomerData(props.customerData)
        setFromComp(props.compName)
    }, [props.compName, props.customerData]);

    const addToCustomer = () => {
        // console.log('The Customer that is Buying : ', customerData);
        // console.log('Buying product: ', parseInt(product)); 
        let pro = productsList.find(x => x.id === product)
        let list = purchasesList.filter(x => x.customerId === customerData.id)
        let purchase1 = list.filter(x => x.productId === product);

        if (pro.quantity <= 0) {
            alert('No more ' + pro.name)
        }
        else if (purchase1.length > 0) {
            alert('You have already bought this product, id: ' + pro.name)
        }
        else {
            pro = { ...pro, quantity: pro.quantity - 1 }
            // console.log(pro.quantity);
            dispatch(updateOneProduct(pro))
            const dateFormatted = utils1.getSystemDateFormatted();
            let purchase = { id: purchasesList.length + 1, customerId: customerData.id, productId: parseInt(product), date: dateFormatted }
            // console.log('purchase', purchase);
            dispatch(addOnePurchase(purchase));
        }
    }

    return (
        <Box>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <TextField label={fromComp === "Customers" ? "Select Product to buy" : "Select Product to add"}
                    select value={product}
                    onChange={e => setProduct(e.target.value)}
                    sx={{ minWidth: '400px' }}
                >
                    {productsList !== undefined &&
                        productsList.map((item) => {
                            return <MenuItem key={item.id} value={item.id}> {item.id}. {item.name} - Price: {item.price} - Quantity: {item.quantity} </MenuItem>
                        })
                    }
                </TextField>
                <Button onClick={addToCustomer}>{fromComp === "Customers" ? "BUY" : "ADD"}</Button>
            </ButtonGroup>
        </Box>
    );
}
export default AddProduct;