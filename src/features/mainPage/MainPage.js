import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Toolbar, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom'
import DrawerComp from './Drawer';
import Customers from '../customers/Customers';
import Products from '../products/Products';
import Purchases from '../purchases/Purchases';
import HomePage from '../homePage/HomePage';
import NoPage404 from '../noPage404/NoPage404';
import { Box } from '@mui/system';
import utils1 from '../../utils/UtilsOptions';
import { initCustomerData } from '../customers/customersSlice';
import { initProductData } from '../products/productsSlice';
import { useDispatch } from "react-redux";
import EditProduct from '../editProduct/EditProduct';
import EditCustomer from '../editCustomer/EditCustomer';





function MainPage() {

    // const [customers, setCustomers] = useState([]);
    // const [products, setProducts] = useState([]);

    const [valueOfPage, setValueOfPage] = useState(0);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        function initData() {
            try {
                const customers = utils1.initDataCustomers();
                // setCustomers(customers)
                const products = utils1.initDataProducts();
                // setProducts(products)
                dispatch(initCustomerData(customers));
                dispatch(initProductData(products));
            } catch (error) {
                console.log('Error Dispatching the Data');
                console.log(error.massage);
            }
        }
        initData()
    }, [dispatch])

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const navButtons = [
        {
            text: 'HOME',
            linkTo: () => navigate("/")
        }, {
            text: 'PRODUCTS',
            linkTo: () => navigate("/products")
        }, {
            text: 'CUSTOMERS',
            linkTo: () => navigate("/customers")
        }, {
            text: 'PURCHASES',
            linkTo: () => navigate("/purchases")
        }
    ];

    return (
        <Box>
            <Box sx={{ backgroundColor: "#1976d2", height: isMatch ? "90px" : "72px" }} >
            </Box>

            <React.Fragment  >
                <AppBar sx={{ background: "#383838" }}>
                    <Toolbar>
                        <Typography sx={{ color: "#F2F2F2" }}>Customer Product Management APP</Typography>
                        {
                            isMatch ? (
                                <>
                                    <Typography sx={{ padding: "20px", marginLeft: "auto" }}>MENU</Typography>
                                    <DrawerComp />
                                </>
                            ) : (
                                <>
                                    <Tabs value={valueOfPage} onChange={(e, value) => setValueOfPage(value)} sx={{ margin: "auto" }} textColor="inherit" indicatorColor="primary" >
                                        {
                                            navButtons.map((item, index) => {
                                                return <Tab key={index} label={item.text} onClick={item.linkTo} />
                                            })
                                        }
                                    </Tabs>
                                </>
                            )
                        }
                    </Toolbar>
                </AppBar>

            </React.Fragment>

            <Box sx={{ my: 2 }}>
                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route exact path="/products" element={<Products />} />
                    <Route exact path="/products/product/:productId" element={<EditProduct />} />
                    <Route exact path="/customers" element={<Customers />} />
                    <Route exact path="/customers/customer/:customerId" element={<EditCustomer />} />
                    <Route exact path="/purchases" element={<Purchases />} />
                    <Route exact path="*" element={<NoPage404 />} />
                </Routes>
            </Box>
        </Box>
    );
}
export default MainPage;
