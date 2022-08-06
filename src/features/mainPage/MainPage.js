import React, { useState } from 'react';
import { AppBar, Typography, Toolbar, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import DrawerComp from './Drawer';

function MainPage() {

    const [valueOfPage, setValueOfPage] = useState(0);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const homeButton = () => {
        console.log("Home Main");
    }

    const customersButton = () => {
        console.log("Customers Main");
    }

    const productsButton = () => {
        console.log("Products Main");
    }

    const purchasesButton = () => {
        console.log("Purchases Main");
    }

    return (
        <div>
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
                                        <Tab label="HOME" onClick={homeButton} />
                                        <Tab label="CUSTOMERS" onClick={customersButton} />
                                        <Tab label="PRODUCTS" onClick={productsButton} />
                                        <Tab label="PURCHASES" onClick={purchasesButton} />
                                    </Tabs>
                                </>
                            )
                        }
                    </Toolbar>
                </AppBar>

            </React.Fragment>
            <div style={{ backgroundColor: "red" }} >
                <br />
                <Typography sx={{ padding: "60px" }}>Hello</Typography>
            </div>


        </div>
    );
}
export default MainPage;