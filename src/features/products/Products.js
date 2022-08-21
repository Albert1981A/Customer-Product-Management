import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductComp from "../product/Product";
import { Container, Typography, Box } from "@mui/material";
import utils1 from "../../utils/UtilsOptions";
// import { Outlet, useNavigate } from "react-router-dom";

// import { addOneProduct, updateOneProduct, deleteOneProduct } from './productsSlice';
// import { addOnePurchase, updateOnePurchase, deleteOnePurchase } from '../purchases/purchasesSlice';


function Products() {

    const [customersWithProducts, setCustomersWithProducts] = useState();


    const productsList = useSelector((state) => state.productsList.products);
    const purchasesList = useSelector((state) => state.purchasesList.purchases);
    const customersList = useSelector((state) => state.customersList.customers);

    useEffect(() => {
        function initData() {
            let customers = utils1.getCustomersWithProducts(customersList, productsList, purchasesList);
            setCustomersWithProducts(customers)
        }
        initData();
    }, [customersList, productsList, purchasesList])

    // console.log(productsList);
    // console.log(purchasesList);

    // const dispatch = useDispatch();

    // const addProduct = () => {
    //     let obj = { id: 4, name: "Bamba", price: 7, quantity: 3 }
    //     dispatch(addOneProduct(obj));
    // }

    // const updateProduct = () => {
    //     let obj = { id: 4, name: "new Bamba", price: 30, quantity: 12 }
    //     dispatch(updateOneProduct(obj));
    // }

    // const deleteProduct = () => {
    //     let id = 4
    //     dispatch(deleteOneProduct(id));
    // }

    return (
        <Container>
            <Typography variant="h4" gutterBottom component="div" sx={{ color: '#1976d2' }} >
                Products
            </Typography>
            <Typography component="div">
                <Box sx={{ fontWeight: 'bold', m: 1, color: '#1976d2' }}>Total Purchased Products: {purchasesList.length}</Box>
            </Typography>


            <Container>
                <Box sx={{ my: 2 }}>
                    {
                        productsList.length > 0 ?
                            productsList.map((item) => {
                                let productCustomers1 = []
                                if (customersWithProducts !== undefined) {
                                    for (let i = 0; i < customersWithProducts.length; i++) {
                                        const element1 = customersWithProducts[i];
                                        if (element1.customerProducts !== undefined) {
                                            let obj = element1.customerProducts.filter(x => x.id === item.id)
                                            if (obj.length > 0) {
                                                productCustomers1.push(element1)
                                            }
                                        }

                                    }
                                }
                                return <ProductComp key={item.id} productData={item} productCustomers={productCustomers1} />
                            })
                            :
                            <Typography component="div">
                                <Box sx={{ fontWeight: 'bold', m: 1, color: '#1976d2' }}> NO PRODUCTS </Box>
                            </Typography>
                    }
                </Box>
            </Container>

            {/* <input type="button" value="Add Product" onClick={addProduct} />

            <input type="button" value="Update Product" onClick={updateProduct} /> <br /> <br />

            <input type="button" value="Delete Product" onClick={deleteProduct} /> */}

        </Container>
    );
}
export default Products;