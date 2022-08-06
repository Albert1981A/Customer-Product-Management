import React, { useState } from "react";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function DrawerComp() {

    const [openDrawer, setOpenDrawer] = useState(false);

    const homeButton = () => {
        setOpenDrawer(false);
        console.log("home Drawer");
    }

    const customersButton = () => {
        setOpenDrawer(false);
        console.log("Customers Drawer");
    }

    const productsButton = () => {
        setOpenDrawer(false);
        console.log("Products Drawer");
    }

    const purchasesButton = () => {
        setOpenDrawer(false);
        console.log("Purchases Drawer");
    }

    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} >
                <List>
                    <ListItemButton onClick={homeButton} >
                        <ListItemIcon>
                            <ListItemText>HOME</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>

                    <ListItemButton onClick={customersButton} >
                        <ListItemIcon>
                            <ListItemText>CUSTOMERS</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>

                    <ListItemButton onClick={productsButton} >
                        <ListItemIcon>
                            <ListItemText>PRODUCTS</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>

                    <ListItemButton onClick={purchasesButton} >
                        <ListItemIcon>
                            <ListItemText>PURCHASES</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton sx={{ color: "white", marginLeft: "auto"}} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    );
}

export default DrawerComp;