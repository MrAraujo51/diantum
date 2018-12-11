const productCrtl   = require('./product.server.controller')

module.exports = (app) => {
    // API Server Endpoints
    app.get('/api/product', productCrtl.getProducts)
    app.get('/api/product/:productId', productCrtl.getProduct)
    app.post('/api/product', productCrtl.saveProduct)
    app.put('/api/product/:productId', productCrtl.updateProduct)
    app.delete('/api/product/:productId', productCrtl.deleteProduct)
}