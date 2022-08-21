
const getSystemDateFormatted = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours();
    let min = today.getMinutes();
    let ss = today.getSeconds();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (min < 10) min = '0' + min;
    if (ss < 10) ss = '0' + ss;

    const formattedToday =  dd + '/' + mm + '/' + yyyy + " time: " + hh + ":" + min + ":" + ss;
    // console.log("new Data " + formattedToday);
    return formattedToday
}

const initDataProducts = () => {
    const product1 = { id: 1, name: "Bamba", price: 7.5, quantity: 150 }
    const product2 = { id: 2, name: "Bissli", price: 8.5, quantity: 270 }
    const product3 = { id: 3, name: "chips", price: 6.8, quantity: 300 }
    const initProducts = []
    initProducts.push(product1)
    initProducts.push(product2)
    initProducts.push(product3)
    // console.log(initProducts);
    return initProducts;
}

const initDataCustomers = () => {
    const customer1 = { id: 1, firstName: "Avi", lastName: "Nimni", city: "Tel-Aviv" }
    const customer2 = { id: 2, firstName: "Dana", lastName: "Banan", city: "Haifa" }
    const customer3 = { id: 3, firstName: "Ron", lastName: "Cohen", city: "Holon" }
    const initCustomers = []
    initCustomers.push(customer1)
    initCustomers.push(customer2)
    initCustomers.push(customer3)
    // console.log(initCustomers);
    return initCustomers;
}

function getCustomersWithProducts(customersList, productsList, purchasesList) {

    if (purchasesList.length > 0) {
        if (customersList.length > 0 && productsList.length > 0) {
            let customersListIn = [...customersList]
            // console.log(customersListIn);
            let purchasesListIn = [...purchasesList]
            // console.log(purchasesListIn);
            let productsListIn = [...productsList]
            // console.log(productsListIn);

            let customerListWithProducts = []

            for (let i = 0; i < customersListIn.length; i++) {
                const customerProducts1 = []
                const element = customersListIn[i];
                let customerPurchases = purchasesListIn.filter(x => x.customerId === element.id)
                for (let j = 0; j < customerPurchases.length; j++) {
                    const element2 = customerPurchases[j];
                    let product = productsListIn.find(x => x.id === element2.productId)
                    product = { ...product, purchaseTime: element2.date }
                    customerProducts1.push(product)
                }
                let obj = { ...element, customerProducts: customerProducts1 }
                customerListWithProducts.push(obj)
            }
            // console.log('customerListWithProducts', customerListWithProducts);
            return customerListWithProducts
        }
    } else {
        if (customersList.length > 0) {
            return customersList
        }
    }
}

const exportedObject = {
    getSystemDateFormatted,
    initDataProducts,
    initDataCustomers,
    getCustomersWithProducts,
};

export default exportedObject;

