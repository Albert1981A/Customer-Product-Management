import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { addOneCustomer, updateOneCustomer, deleteOneCustomer } from '../customers/customersSlice';
import { Box, Container } from "@mui/system";
import { Button, ButtonGroup, Typography } from "@mui/material";


function EditCustomer() {

    const customersList = useSelector((state) => state.customersList.customers);
    const [customer, setCustomer] = useState({})
    const param = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        function initC() {
            const obj = customersList.find(x => parseInt(x.id) === parseInt(param.customerId))
            setCustomer(obj)
        }
        initC()
    }, [customersList, param.customerId])

    return (
        <Container>
            <Typography variant="h4" gutterBottom component="div" sx={{ color: '#1976d2' }} >
                {customer.firstName} {customer.lastName}
            </Typography>

            <Box>
                ID: {customer.id} - First Name: {customer.firstName} - Last Name: {customer.lastName} - City: {customer.city}
            </Box>
            <br />

            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>Update</Button>
                <Button>Delete</Button>
                <Button onClick={() => navigate(-1)}>Back</Button>
            </ButtonGroup>

        </Container>
    );
}
export default EditCustomer;