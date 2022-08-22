import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOneCustomer, deleteOneCustomer } from '../customers/customersSlice';
import { deleteOnePurchase } from '../purchases/purchasesSlice';
import { Box, Container } from "@mui/system";
import { Button, ButtonGroup, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import utils1 from '../../utils/UtilsOptions';


function EditCustomer() {

    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.productsList.products);
    const customersList = useSelector((state) => state.customersList.customers);
    const purchasesList = useSelector((state) => state.purchasesList.purchases);
    const [customer, setCustomer] = useState();
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        function initData() {
            let customers = utils1.getCustomersWithProducts(customersList, productsList, purchasesList);
            const obj = customers.find(x => parseInt(x.id) === parseInt(param.customerId))
            setCustomer(obj)
        }
        initData();
    }, [customersList, productsList, purchasesList, param.customerId])

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        dispatch(updateOneCustomer(data));
        navigate(-1);
    }

    const deleteProduct = () => {
        alert('Deleting product id: ' + customer.id);
        dispatch(deleteOneCustomer(customer.id));
        if (purchasesList !== undefined) {
            if (purchasesList.length > 0) {
                for (let i = 0; i < purchasesList.length; i++) {
                    const element = purchasesList[i];
                    if (element.customerId === customer.id) {
                        dispatch(deleteOnePurchase(element.id));
                    }
                }
            }
        }
        navigate(-1);
    }

    return (
        <Container>
            {
                customer !== undefined && <Box>
                    <Typography variant="h4" gutterBottom component="div" sx={{ color: '#9c27b0' }} >
                        {customer.firstName} {customer.lastName}
                    </Typography>

                    <br />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller name="id" control={control} defaultValue={customer.id}
                            render={({ field }) => (
                                <TextField {...field}
                                    disabled
                                    label='ID'
                                    type="number"
                                    variant="outlined"
                                    {...register("id", {
                                        required: { value: true, message: 'Missing customer id' },
                                        pattern: { value: /^[0-9]*$/, message: 'Only integers!' }
                                    })}
                                    error={!!errors.id}
                                    helperText={errors.id && errors.id.message}
                                />
                            )}
                        /> <br /> <br />

                        <Controller name="firstName" control={control} defaultValue={customer.firstName}
                            render={({ field }) => (
                                <TextField {...field}
                                    label='First Name'
                                    type="text"
                                    variant="outlined"
                                    {...register("firstName", {
                                        required: { value: true, message: 'Missing customer firstName' },
                                        maxLength: { value: 20, message: 'Title is limit upto 20 Characters!' },
                                        minLength: { value: 2, message: 'Minimum length of 2 Characters!' }
                                    })}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName && errors.firstName.message}
                                />
                            )}
                        /> <br /> <br />

                        <Controller name="lastName" control={control} defaultValue={customer.lastName}
                            render={({ field }) => (
                                <TextField {...field}
                                    label='Last Name'
                                    type="text"
                                    variant="outlined"
                                    {...register("lastName", {
                                        required: { value: true, message: 'Missing customer lastName' },
                                        maxLength: { value: 20, message: 'Title is limit upto 20 Characters!' },
                                        minLength: { value: 2, message: 'Minimum length of 2 Characters!' }
                                    })}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName && errors.lastName.message}
                                />
                            )}
                        /> <br /> <br />

                        <Controller name="city" control={control} defaultValue={customer.city}
                            render={({ field }) => (
                                <TextField {...field}
                                    label='City'
                                    type="text"
                                    variant="outlined"
                                    {...register("city", {
                                        required: { value: true, message: 'Missing customer city' },
                                        maxLength: { value: 20, message: 'Title is limit upto 20 Characters!' },
                                        minLength: { value: 2, message: 'Minimum length of 2 Characters!' }
                                    })}
                                    error={!!errors.city}
                                    helperText={errors.city && errors.city.message}
                                />
                            )}
                        /> <br /> <br />

                        <ButtonGroup variant="contained" aria-label="outlined primary button group" color="secondary">
                            <Button type="submit">Update</Button>
                            <Button onClick={deleteProduct}>Delete</Button>
                            <Button onClick={() => navigate(-1)}>Back</Button>
                        </ButtonGroup>
                    </form>

                    <br /> <br />

                    {
                        customer.customerProducts !== undefined && <Box>
                            {
                                customer.customerProducts.length > 0 && <Box>
                                    <Typography variant="h6" gutterBottom component="div" sx={{ color: '#9c27b0' }} >
                                        Products purchases:
                                    </Typography>

                                    <List sx={{ margin: "auto", width: "350px"}}>
                                        {
                                            customer.customerProducts.map((item) => {
                                                return <ListItem key={item.id} >
                                                    <ListItemText>
                                                    {item.id}. Name: <Link to={"/products/product/" + item.id}>{item.name}</Link> - Price: {item.price} Quantity: {item.quantity}
                                                    </ListItemText>
                                                </ListItem>
                                            })
                                        }
                                    </List>                                
                                </Box>
                            }
                        </Box>
                    }

                </Box>
            }
        </Container>
    );
}
export default EditCustomer;