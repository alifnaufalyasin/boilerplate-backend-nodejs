const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
require('./middleware/auth')

const response = require('./middleware/response')
const flamelinkApp = require('./config/flamelinkSDK')

// cors
var allowedOrigins = [
  "http://localhost:3000",
  "http://localhost"
]

app.use(
  cors({
    origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
      "The CORS policy for this site does not " +
      "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
    }
  })
)

app.use(cors())

// middleware
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(response)

// router

app.get('/', function(req,res){
  res.send('Hello')
})


// error handling
app.use((req,res,next) => {
  let err = new Error('Route not found')
  err.status = 404
  next(err)
})

app.use(async (err,req,res,next) => {
  // deleteFoto(req)
  const {message} = err
  const status = err.status || 500
  console.log(err)
  res.sendError(null,message,status)
})


const port = process.env.PORT || 3000

app.listen(port , () => {
  // db.sync({})
  // .then(() => console.log(`app is running on port ${port}`))
  // .catch(err => console.log(err.message))
  console.log(`app is running on port ${port}`)
}) 