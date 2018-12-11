const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const clientSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, unique: true, ref: 'User'},
    name: {type: String, requiere: true},
    lname: {type: String, requiere: true},
    org: {type: String, requiere: true},
    position: {type: String, requiere: true},
    tax: {type: String, requiere: true},
    address: {
        address: {type: String, requiere: true},
        contry: {type: String, requiere: true},
        state: {type: String, requiere: true},
        city: {type: String, requiere: true}
    },
    zip_code: {type: Number, requiere: true},
    phone: {type: String, requiere: true},
    fax: {type: Number, requiere: true} 
})

module.exports = mongoose.model('client', clientSchema)