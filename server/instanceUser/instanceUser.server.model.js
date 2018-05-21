const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const instanceUserSchema = Schema({
    user_id: {type: Number, ref: 'User'},
    instance_id: {type: Schema.Types.ObjectId, ref: 'Instance'},
    rol: { type: String, default: "user"}
    
})

module.exports = mongoose.model('InstanceUser', instanceUserSchema)