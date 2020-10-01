const express = require('express')
const cors = require('cors')

const app = express()

const routeWorkHours =  require('./routes/workHoursRoutes')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.use('/workHours', routeWorkHours)


module.exports = app;