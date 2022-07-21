const getOrders = (req, res, next) => {
    return res.status(200).render('index')
}

const getOrderDetail = (req, res, next) => {
    const data = {
        order_no: 'ORX131501',
        invoice_no: 'INV932705',
        items: [
            {
                name: 'Gergaji Listrik',
                sku: 121235,
                price: 30000
            },
            {
                name: 'Gergaji Besi',
                sku: 121236,
                price: 20000
            },
        ]
    }

    return res.status(200).render('pages/order-detail', {
        order: data
    })
}

module.exports = {
    getOrders,
    getOrderDetail
}