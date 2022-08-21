import { Button, ButtonGroup, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    p: 2,
    border: 2,
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    borderColor: '#1976d2',
    overflowY: 'scroll'
};

function ProductComp(props) {

    const [product, setProduct] = useState({});
    const [productCustomers1, setProductCustomers] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        setProduct(props.productData)
        setProductCustomers(props.productCustomers)
    }, [props])

    const toEditProduct = () => {
        navigate("/products/product/" + product.id)
    }

    const toEditCustomer = (id) => {
        navigate("/products/product/" + id)
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ ...commonStyles }} >
                {product &&
                    <Container>

                        <Box >
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button onClick={toEditProduct} >
                                    {product.name}
                                </Button>
                                <Typography component="div">
                                    <Box sx={{ fontWeight: 'medium', m: 1, color: '#1976d2' }}> &nbsp; &nbsp; ID: {product.id} &nbsp; &nbsp;  Price: {product.price} &nbsp; &nbsp; Quantity: {product.quantity}</Box>
                                </Typography>
                            </ButtonGroup>
                        </Box> <br />

                        {
                            productCustomers1.length > 0 &&
                            productCustomers1.map((item) => {
                                return <Box key={item.id} sx={{ bgcolor: 'background.paper', m: 1, p: 2, border: 2, borderRadius: '16px', borderColor: '#9c27b0' }}>
                                    <ButtonGroup variant="contained" aria-label="outlined secondary button group" color={'secondary'}>
                                        <Button onClick={toEditCustomer} >
                                            {item.firstName} {item.lastName}
                                        </Button>
                                    </ButtonGroup>
                                    {
                                        item.customerProducts.map((item2) => {
                                            return <Typography key={item2.id} component="div">
                                                <Box sx={{ fontWeight: 'medium', m: 1, color: '#9c27b0' }}>ID: {item2.id} &nbsp; Name: {item2.name} &nbsp; Price: {item2.price} &nbsp; Quantity: {item2.quantity} &nbsp; Purchase date: {item2.purchaseTime} </Box>
                                            </Typography>
                                        })
                                    }
                                </Box>
                            })
                        }
                    </Container>
                }
            </Box>
        </Box>

    );
}
export default ProductComp;