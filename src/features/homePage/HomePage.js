import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function HomePage() {
    
    return (
        <Container>
            <br /> <br /> <br /> 
            <Typography variant="h4" gutterBottom component="div" >
            Welcome to the site for managing store data of:<br/>Customers, Products and Purchases
            </Typography>
        </Container>
        
    );
}
export default HomePage;