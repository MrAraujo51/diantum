const crypto = require('crypto')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instanceSchema = Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    iat: { type: Date, require: true },
    exp: { type: Date, require: true },
    pin: { type: String, require: true },
    params: Schema.Types.Mixed,
    maxUser: { type: Number, require: true },
    usersActive: { type: Number, default: 0 },
    image: { type: String, require: true },
    sess: [{
        username: String,
        date: { type: Date, default: Date.now()},
        result: Schema.Types.Mixed
    }],
    code: {type: String},
    token: {type: String, unique: true}
})

// instanceSchema.pre('save', function(next) {
//     if (!this.isNew)
//         return next();
//     this.token = crypto.randomBytes(3, (err, buf) => {
//         this.token = buf.toString('hex');
//         this.pin = (Math.floor(Math.random()*90000) + 10000).toString();
//         next();
//     });
// })

module.exports = mongoose.model('Instance', instanceSchema)