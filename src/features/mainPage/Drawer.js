import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function DrawerComp() {

    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();


    const navButtons = [
        {
            text: 'HOME',
            linkTo: () => {navigate("/"); setOpenDrawer(false)},
            icon: <HomeIcon style={{ color: "#066163" }} />
        }, {
            text: 'PRODUCTS',
            linkTo: () => {navigate("/products"); setOpenDrawer(false)},
            icon: <BusinessCenterIcon style={{ color: "#066163" }} />
        }, {
            text: 'CUSTOMERS',
            linkTo: () => {navigate("/customers"); setOpenDrawer(false)}, 
            icon: <PeopleIcon style={{ color: "#066163" }} />
        }, {
            text: 'PURCHASES',
            linkTo: () => {navigate("/purchases"); setOpenDrawer(false)},
            icon: <ShoppingCartIcon style={{ color: "#066163" }} />
        }
    ];

    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} >
                <List>

                    {
                        navButtons.map((item, index) => {
                            const { text, linkTo, icon } = item;
                            
                            return <ListItemButton key={index} onClick={linkTo}>
                                <ListItemIcon>
                                    {icon}
                                    <ListItemText sx={{ paddingLeft: "20px" }}>{text}</ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                            
                        })
                    }
                </List>
            </Drawer>
            <IconButton sx={{ color: "white", marginLeft: "auto"}} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    );
}

export default DrawerComp;