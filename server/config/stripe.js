const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

// Create checkout session
exports.createSession = async ({
    mode = 'payment',
    lineItems,
    customer,
} = {}) => {
    const sessionData = {
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: mode,
        success_url: `${process.env.CLIENT_URL}/me/orders?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/me/orders`,
    }

    if (customer) {
        sessionData.customer = customer
    }

    const session = await stripe.checkout.sessions.create(sessionData)
    return session
}

// Create customer portal session
exports.createCustomerPortalSession = async customer => {
    const session = await stripe.billingPortal.sessions.create({
        customer: customer,
        return_url: `${process.env.CLIENT_URL}/me/orders`,
    })

    return session
}

// Get checkout completed session
exports.getSessionById = async sessionId => {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
}

// Get customer by id
exports.getCustomerById = async customerId => {
    const customer = await stripe.customers.retrieve(customerId)
    return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
    }
}

// Get customers list
exports.getCustomersList = async () => {
    const customers = await stripe.customers.list()
    return customers.data.map(customer => {
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
        }
    })
}

// Get invoice id
exports.getInvoiceById = async invoiceId => {
    const customer = await stripe.invoices.retrieve(invoiceId)
    return customer
}

// Get price id
exports.getPriceById = async id => {
    const price = await stripe.prices.retrieve(id)
    return price
}

// Get product id
exports.getProductById = async id => {
    const product = await stripe.products.retrieve(id)
    return product
}

let products = [
    {
        product: 'prod_JtUuXTggJwBDcB',
        price: 'price_1JFhv5DO38skYAGtv9XVDBVm',
    },
    { product: 'prod_JtUtngiznfbTPR', price: 'price_1JFhu7DO38skYAGtn2MPi37K' },
    { product: 'prod_JtUscChI9CZbq4', price: 'price_1JFhsnDO38skYAGtO66bhepD' },
]

exports.getTestRecurringProducts = async () => {
    const newProducts = products.map(async prod => {
        const product = await stripe.products.retrieve(prod.product)
        const price = await stripe.prices.retrieve(prod.price)
        return {
            productId: product.id,
            name: product.name,
            description: product.description,
            price: {
                id: price.id,
                unitAmount: price.unit_amount,
                type: price.type,
                recurringInterval: price.recurring.interval,
            },
        }
    })

    const productsResult = await Promise.all(newProducts)
    return productsResult
}

// Make recurring product price list object
const makeRecurringPricesListObject = async prices => {
    const pricesList = prices.map(async price => {
        const product = await stripe.products.retrieve(price.product)

        return {
            productId: product.id,
            name: product.name,
            description: product.description,
            price: {
                id: price.id,
                unitAmount: price.unit_amount,
                type: price.type,
                recurringInterval: price.recurring.interval,
            },
        }
    })

    const pricesListResult = await Promise.all(pricesList)

    return pricesListResult
}

// Get Recurring Products
exports.getRecurringProducts = async (active = true) => {
    const prices = await stripe.prices.list({
        active,
        type: 'recurring',
    })

    console.log(prices)

    const recurringPricesListObject = await makeRecurringPricesListObject(
        prices.data
    )

    return recurringPricesListObject.sort(
        (prod1, prod2) => prod1.price.unitAmount - prod2.price.unitAmount
    )
}
