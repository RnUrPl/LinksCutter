const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const router = require('./routes/index');
const RedirectRouter = require('./routes/redirectRouter');
const app = express()
const cors = require('cors')
const errorsMiddleware = require('./middleware/errorsMiddleware');
const cookieParser = require('cookie-parser');

app.use(express.json({extended: true}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }))
app.use('/api', router)
app.use('/t', RedirectRouter)
app.use(errorsMiddleware)

const PORT = config.get('port')  || 5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoURI'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    }catch(e){
        console.log('Server Error',e.message)
        process.exit(1)
    }
}

start()