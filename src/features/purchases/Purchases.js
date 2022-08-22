import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Box, TextField, Button, tableCellClasses, styled, ButtonGroup, MenuItem, TableRow, TableBody, TableContainer, TableCell, Paper, Table, TableHead } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import utils1 from "../../utils/UtilsOptions";


// import { addOnePurchase, updateOnePurchase, deleteOnePurchase } from './purchasesSlice';
// import utils1 from '../../utils/UtilsOptions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#383838',
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

function Purchases() {

    const [customersWithProducts, setCustomersWithProducts] = useState();
    const [searchElements, setSearchElements] = useState([]);

    const purchasesList = useSelector((state) => state.purchasesList.purchases);
    const customersList = useSelector((state) => state.customersList.customers);
    const productsList = useSelector((state) => state.productsList.products);

    useEffect(() => {
        function initData() {
            let customers = utils1.getCustomersWithProducts(customersList, productsList, purchasesList);
            setCustomersWithProducts(customers)
        }
        initData();
    }, [customersList, productsList, purchasesList])

    const { register, handleSubmit, watch, control } = useForm();

    const onSubmit = () => {
        let newCustomerList = []
        if (watch('date') !== "") {
            // console.log(watch('date'));
            for (let i = 0; i < customersWithProducts.length; i++) {
                const element = customersWithProducts[i];
                let newObj = {}
                if (element.customerProducts !== undefined) {
                    const filteredObj = element.customerProducts.filter(element => element.purchaseTime.toLowerCase().includes(watch('date').toLowerCase()))
                    if (filteredObj.length > 0) {
                        newObj = { ...element, customerProducts: filteredObj }
                        newCustomerList.push(newObj)
                    }
                }
            }
        }
        else if (watch("customers") !== "") {
            // console.log(watch("customers"));
            let newObj2 = []
            if (newCustomerList.length > 0) {
                newObj2 = newCustomerList.filter(element => element.id === watch("customers"))
                newCustomerList = newObj2;
            }
            else {
                newObj2 = customersWithProducts.filter(element => element.id === watch("customers"))
                newCustomerList = newObj2;
            }
        }
        else if (watch("products") !== "") {
            // console.log(watch("products"));
            let newObj3 = {}
            if (newCustomerList.length > 0) {
                for (let i = 0; i < newCustomerList.length; i++) {
                    const element1 = newCustomerList[i];
                    let obj1 = []
                    if (element1.customerProducts !== undefined) {
                        obj1 = element1.customerProducts.filter(element => element.id === watch("products"))
                        if (obj1 !== undefined) {
                            if (obj1.length > 0) {
                                newObj3 = { ...element1, customerProducts: obj1 }
                                newCustomerList.push(newObj3)
                            }
                        }
                    }
                }
            }
            else {
                for (let i = 0; i < customersWithProducts.length; i++) {
                    const element1 = customersWithProducts[i];
                    let obj2 = []
                    if (element1.customerProducts !== undefined) {
                        obj2 = element1.customerProducts.filter(element => element.id === watch("products"))
                        if (obj2 !== undefined) {
                            if (obj2.length > 0) {
                                newObj3 = { ...element1, customerProducts: obj2 }
                                newCustomerList.push(newObj3)
                            }
                        }
                    }
                }
            }
        }
        setSearchElements(newCustomerList)
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom component="div" sx={{ color: '#383838' }} >
                Purchases
            </Typography>
            <br /> 

            <form onSubmit={handleSubmit(onSubmit)}>

                <Typography component="div" sx={{ display: 'inline-block', marginRight: '10px' }}>
                    <Box sx={{ fontWeight: 'bold', m: 1, color: '#383838' }}> SEARCH: </Box>
                </Typography>

                <Controller name="date" control={control} defaultValue="" sx={{ display: 'inline-block', marginRight: '10px' }}
                    render={({ field }) => (
                        <TextField {...field}
                            label='date'
                            type="text"
                            variant="outlined"
                            {...register("date")}
                        />
                    )}
                />

                <Controller name="customers" control={control} defaultValue=""
                    render={({ field }) => (
                        <TextField {...field}
                            label="Customers"
                            select
                            sx={{ minWidth: '320px' }}
                            {...register("customers")}
                        >
                            <MenuItem value="0">Choose...</MenuItem>
                            {customersList !== undefined &&
                                customersList.map((item) => {
                                    return <MenuItem key={item.id} value={item.id}> {item.id}. {item.firstName} {item.lastName} - City: {item.city} </MenuItem>
                                })
                            }
                        </TextField>
                    )}
                />

                <Controller name="products" control={control} defaultValue=""
                    render={({ field }) => (
                        <TextField {...field}
                            label="Products"
                            select
                            sx={{ minWidth: '320px' }}
                            {...register("products")}
                        >
                            <MenuItem value="0">Choose...</MenuItem>
                            {productsList !== undefined &&
                                productsList.map((item) => {
                                    return <MenuItem key={item.id} value={item.id}> {item.id}. {item.name} - Price: {item.price} - Quantity: {item.quantity} </MenuItem>
                                })
                            }
                        </TextField>
                    )}
                />
                <span>&nbsp;&nbsp;&nbsp;</span>

                <ButtonGroup variant="contained" aria-label="outlined primary button group" >
                    <Button type="submit">Search</Button>
                </ButtonGroup>
            </form>

            <br /> <br />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, backgroundColor: '#CDBE78' }} aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Customer Name</StyledTableCell>
                            <StyledTableCell align="center">Products Name</StyledTableCell>
                            <StyledTableCell align="center">Purchased Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {searchElements.length !== 0 ?
                        <TableBody>
                            {searchElements.map((item) => {
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
                                                            <StyledTableCell align="center" component="th" scope="row">
                                                                {item2.name}
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
                                                            <StyledTableCell align="center" component="th" scope="row">
                                                                {item3.purchaseTime}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </StyledTableCell>
                                </StyledTableRow>
                            })}
                        </TableBody>
                        :
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
                                                                <StyledTableCell align="center" component="th" scope="row">
                                                                    {item2.name}
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
                                                                <StyledTableCell align="center" component="th" scope="row">
                                                                    {item3.purchaseTime}
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                })}
                        </TableBody>
                    }
                </Table>
            </TableContainer>

            {/* <input type="button" value="Add Purchases" onClick={addPurchases} />

            <input type="button" value="Update Purchases" onClick={updatePurchases} /> <br /> <br />

            <input type="button" value="delete Purchases" onClick={deletePurchases} /> */}

        </Container>
    );
}
export default Purchases;