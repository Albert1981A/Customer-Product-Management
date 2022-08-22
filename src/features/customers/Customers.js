import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Container, Typography, TableContainer, Table, TableBody,
    TableHead, TableRow, styled, TableCell, tableCellClasses, Paper
} from "@mui/material";
import AddProduct from "../addProduct/AddProduct";
import { Link } from "react-router-dom";
import utils1 from "../../utils/UtilsOptions";

// import { addOneCustomer, updateOneCustomer, deleteOneCustomer } from './customersSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#9c27b0',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Customers() {

    const [customersWithProducts, setCustomersWithProducts] = useState();

    const customersList = useSelector((state) => state.customersList.customers);
    const productsList = useSelector((state) => state.productsList.products);
    const purchasesList = useSelector((state) => state.purchasesList.purchases);

    useEffect(() => {
        function initData() {
            let customers = utils1.getCustomersWithProducts(customersList, productsList, purchasesList);
            setCustomersWithProducts(customers)
        }
        initData();
    }, [customersList, productsList, purchasesList])

    // const dispatch = useDispatch();

    // const addCustomer = () => {
    //     let obj = { id: 4, firstName: "Avi", lastName: "Nimni", city: "Tel-Aviv" }
    //     dispatch(addOneCustomer(obj));
    // }

    // const updateCustomer = () => {
    //     let obj = { id: 4, firstName: "Dana", lastName: "Banana", city: "Ramatgan" }
    //     dispatch(updateOneCustomer(obj));
    // }

    // const deleteCustomer = () => {
    //     let id = 4
    //     dispatch(deleteOneCustomer(id));
    // }

    return (
        <Container>

            <Typography variant="h4" gutterBottom component="div" sx={{ color: '#9c27b0' }} >
                Customers
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, backgroundColor: '#CDBE78' }} aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" width="15%">Customer Name</StyledTableCell>
                            <StyledTableCell align="center">Products Name</StyledTableCell>
                            <StyledTableCell align="center">Purchased Date</StyledTableCell>
                            <StyledTableCell align="center">Buy</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customersWithProducts !== undefined &&
                            customersWithProducts.map((item) => {
                                return <StyledTableRow key={item.id}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {item.firstName} {item.lastName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Table>
                                            <TableBody>
                                                {item.customerProducts !== undefined &&
                                                    item.customerProducts.map((item2) => {
                                                        return <StyledTableRow key={item2.id}>
                                                            <StyledTableCell component="th" scope="row">
                                                                {item2.id}. <Link to={"/products/product/" + item2.id}>{item2.name}</Link> - Price: {item2.price} - Quantity: {item2.quantity}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Table>
                                            <TableBody>
                                                {item.customerProducts !== undefined &&
                                                    item.customerProducts.map((item3) => {
                                                        return <StyledTableRow key={item3.id}>
                                                            <StyledTableCell component="th" scope="row">
                                                                Purchase Time: {item3.purchaseTime}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <AddProduct customerData={item} compName={"Customers"} />
                                    </StyledTableCell>
                                </StyledTableRow>
                            })}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* {customersList &&
                <div>
                    <ul>
                        {customersList.map((item) => {
                            return <li key={item.id}>
                                ID: {item.id} - First Name: {item.firstName} - Last Name: {item.lastName} - City: {item.city}
                            </li>
                        })}
                    </ul>
                </div>
            } */}

            {/* <input type="button" value="Add Customer" onClick={addCustomer} />

            <input type="button" value="Update Customer" onClick={updateCustomer} /> <br /> <br />

            <input type="button" value="Delete Customer" onClick={deleteCustomer} /> */}

        </Container>
    );
}
export default Customers;