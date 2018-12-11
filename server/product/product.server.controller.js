
const Product = require('./product.server.model')

function getProduct(req, res){
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).json({message: `Error en el servidor`})
        if(!product) return res.status(404).json({message: `La gamificación no existe`})

        res.status(200).json(product)
    })
}

function getProducts(req, res){
    Product.find({}, (err, products) => {
        if(err) return res.status(500).json({success: false, message: `Error en el servidor`})
        if(!products) return res.status(404).json({success: false, message: `No existen gamificaciones`})

        res.status(200).json({success: true, products: products })
    })
}

function saveProduct (req, res) {

    let product = new Product({
        title: req.body.title,
        description: req.body.description,
        defaultParameters: req.body.defaultParameters,
        price: req.body.price,
        code: req.body.code,
        image: req.body.image,
        columnName: req.body.columnName
    })

    product.save((err, productStored) => {
        if (err) res.status(500).json({success: false, message: `Error al salvar la base de datos ${err}` })

        res.status(200).json({success: true, message: "Product saved"})
    })
}

function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if(err) res.status(500).json({success: false, message: `Error al actualizar el producto ${err}`})

        res.status(200).json({success: true, message: "Product updated"})
    })
}

function deleteProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if(err) res.status(500).json({message: `Error al borrar el producto ${err}`})

        product.remove(err =>{
            if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})
            res.status(200).json({message: `El producto ha sido eliminado`})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
};