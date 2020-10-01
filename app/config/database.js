const mongoose = require('mongoose')
const CONFIG = require('./config')

mongoose.connect(CONFIG.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB conectada'))
    .catch(err => console.error(err));

module.exports = mongoose; 
