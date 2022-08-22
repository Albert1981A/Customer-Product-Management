import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOneProduct, deleteOneProduct } from '../products/productsSlice';
import { deleteOnePurchase } from '../purchases/purchasesSlice';
import { Container, Box } from "@mui/system";
import { Button, ButtonGroup, Typography, TextField, List, ListItem, ListItemText } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import utils1 from '../../utils/UtilsOptions';



function EditProduct() {

    const dispatch = useDispatch();
    const customersList = useSelector((state) => state.customersList.customers);
    const productsList = useSelector((state) => state.productsList.products);
    const purchasesList = useSelector((state) => state.purchasesList.purchases);
    const [product, setProduct] = useState();
    const [productsCustomers, setProductsCustomers] = useState();
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        function initP() {
            let customers = utils1.getCustomersWithProducts(customersList, productsList, purchasesList);
            const obj = productsList.find(x => parseInt(x.id) === parseInt(param.productId))
            setProduct(obj)
            if (customers !== undefined) {
                if (customers.length > 0) {
                    const customersFiltered = []
                    for (let i = 0; i < customers.length; i++) {
                        const element = customers[i];
                        if (element.customerProducts !== undefined) {
                            let obj2 = element.customerProducts.filter(x => parseInt(x.id) === parseInt(param.productId))
                            if (obj2.length > 0) {
                                customersFiltered.push(element)
                            }
                        }
                    }
                    setProductsCustomers(customersFiltered);
                }
            }
        }
        initP()
    }, [productsList, customersList, purchasesList, param.productId])

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        alert('Updating: ' + product.name);
        // console.log('Updating to:', data);
        dispatch(updateOneProduct(data));
        navigate(-1);
    }

    const deleteProduct = () => {
        alert('Deleting product id: ' + product.id);
        // console.log('Deleting :', product);
        dispatch(deleteOneProduct(product.id));
        if (purchasesList !== undefined) {
            if (purchasesList.length > 0) {
                for (let i = 0; i < purchasesList.length; i++) {
                    const element = purchasesList[i];
                    if (element.productId === product.id) {
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
                product !== undefined && <Box>
                    <Typography variant="h4" gutterBottom component="div" sx={{ color: '#1976d2' }} >
                        {product.name}
                    </Typography>

                    <br />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller name="id" control={control} defaultValue={product.id}
                            render={({ field }) => (
                                <TextField {...field}
                                    disabled
                                    label='ID'
                                    type="number"
                                    variant="outlined"
                                    {...register("id", {
                                        required: { value: true, message: 'Missing product id' },
                                        pattern: { value: /^[0-9]*$/, message: 'Only integers!' }
                                    })}
                                    error={!!errors.id}
                                    helperText={errors.id && errors.id.message}
                                />
                            )}
                        /> <br /> <br />

                        <Controller name="name" control={control} defaultValue={product.name}
                            render={({ field }) => (
                                <TextField {...field}
                                    label='Name'
                                    type="text"
                                    variant="outlined"
                                    {...register("name", {
                                        required: { value: true, message: 'Missing product name' },
                                        maxLength: { value: 20, message: 'Title is limit upto 20 Characters!' },
                                        minLength: { value: 2, message: 'Minimum length of 2 Characters!' }
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name && errors.name.message}
                                />
                            )}
                        /> <br /> <br />

                        <Controller name="price" control={control} defaultValue={product.price}
                            render={({ field }) => (
                                <TextField {...field}
                                    label='Price'
                                    type="number"
                                    variant="outlined"
                                    {...register("price", {
                                        required: { value: true, message: 'Missing product price' },
                                        min: { value: 1, message: "Price must be grater than zero!" },
                                        pattern: { value: /^-?[0-9]\d*\.?\d*$/, message: 'Only numbers!' }
                                    })}
                                    error={!!errors.price}
                                    helperText={errors.price && errors.price.message}
                                />
                            )}
                        /> <br /> <br />

                        <Controller name="quantity" control={control} defaultValue={product.quantity}
                            render={({ field }) => (
                                <TextField {...field}
                                    label='Quantity'
                                    type="number"
                                    variant="outlined"
                                    {...register("quantity", {
                                        required: { value: true, message: 'Missing product quantity' },
                                        pattern: { value: /^-?[0-9]\d*\.?\d*$/, message: 'Only numbers!' }
                                    })}
                                    error={!!errors.quantity}
                                    helperText={errors.quantity && errors.quantity.message}
                                />
                            )}
                        /> <br /> <br />

                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button type="submit">Update</Button>
                            <Button onClick={deleteProduct}>Delete</Button>
                            <Button onClick={() => navigate(-1)}>Back</Button>
                        </ButtonGroup>
                    </form>
                </Box>
            }

            <br /> <br />

            {
                productsCustomers !== undefined && <Box>
                    {
                        productsCustomers.length > 0 && <Box>
                            <Typography variant="h6" gutterBottom component="div" sx={{ color: '#1976d2' }} >
                                Customers that purchase {product.name}:
                            </Typography>

                            <List sx={{ margin: "auto", width: "300px" }}>
                                {
                                    productsCustomers.map((item) => {
                                        return <ListItem key={item.id} >
                                            <ListItemText>
                                                {item.id}. Name: <Link to={"/customers/customer/" + item.id}>{item.firstName} {item.lastName}</Link> - city: {item.city}
                                            </ListItemText>
                                        </ListItem>
                                    })
                                }
                            </List>
                        </Box>
                    }
                </Box>
            }

        </Container>
    );
}
export default EditProduct;