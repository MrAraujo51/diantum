const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    defaultParameters: Schema.Types.Mixed,
    price: {
        type: Number,
        require: true
    },
    code: { type: String, require: true, unique: true},
    image: {
        type: String,
        require: true
    },
    columnName: Schema.Types.Mixed,
    configParams:[
        {
            disabled: Boolean,
            label: String,
            name: {type: String, require: true},
            options: [],
            placeholder: String,
            type: {type: String, require: true},
            validation: [],
            value: Schema.Types.Mixed
        }
    ]
})

module.exports = mongoose.model('Product', productSchema)
