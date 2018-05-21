const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    server: {
        host: 'https://diantum.herokuapp.com',
        port: 8080
    },
    database: {
        host: '',
        port: 57342,
        db: 'diantum',
        url: 'mongodb://manuel:manuel@ds157342.mlab.com:57342/diantum'
    },
    privateKey: 'bfda4c5896ac71a06e5d52ae3e39c1eb61ddbbc02d9faea9dc07389aee25933191cc65bdc9c447fbce132b9c9d2debabd7dd53b676c123fafde29b43d88d0797fdedff555e711fc21f3d20252a82fd50014f0d63646220eba93093d1dc0a0f9e2ea82d8985f2b81bd3623c7abfbe5eba97e95b151ebffdf5ed1d5cc494065c3b9f69b6d9577fbb16a24309b25b0df160435113881c8fd2ef9f7508f8faabdb60459072845107c3d171ec65c3ddc3acc1d5074230ecbfda01e760bd9e92621c3097b36427459cedef10c3402dd41ade8eec0cb61cd74f1006bf127552cce0ee816715d1d9f07535b567fe63d857d7a377a101041bff7ad1827dadfa0419cbf6eb',
    mailgun: {
        api_key: 'key-60d8a0be894a7f5dce59f06f55d449e7',
        domain: 'mg.diantum.com',
        noReply: "no-reply@diantum.com"
    },
    mysql: {
        host: "37.59.226.120",
        user: "diantumc_diantum",
        password: "londoN_2014",
        database: "diantumc_dnt003",
        connectTimeout: 30000
      }
}