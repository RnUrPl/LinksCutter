require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/index');
const RedirectRouter = require('./routes/redirectRouter');
const path = require('path')
const app = express()

const cors = require('cors')
const errorsMiddleware = require('./middleware/errorsMiddleware');
const cookieParser = require('cookie-parser');

app.use(express.json({extended: true}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'https://linkscutter-7.onrender.com',
  }))
app.use('/api', router)
app.use('/t', RedirectRouter)
app.use(errorsMiddleware)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  }

const PORT = process.env.PORT || 5000
async function start(){
    try{
        await mongoose.connect(process.env.MONGO_URI,{
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