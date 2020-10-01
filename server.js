const Database =  require('./app/config/database')
const CONFIG = require('./app/config/config')
const app = require('./app/app')

app.listen(CONFIG.PORT, () =>
    console.log(`Server on port ${CONFIG.PORT}`)
)