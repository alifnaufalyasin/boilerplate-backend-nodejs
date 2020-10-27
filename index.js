const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')

const response = require('./middleware/response')

// cors
var allowedOrigins = [
  "http://127.0.0.1:5501",
  "http://localhost:3000",
  "http://localhost:1000",
  "http://localhost:8080",
  "http://localhost",
  "https://icyption.aliven.my.id",
  "http://icyption.aliven.my.id",
  "http://icyption.telkomuniversity.ac.id",
  "https://icyption.telkomuniversity.ac.id",
  "icyption.telkomuniversity.ac.id"
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
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(response)

// router
const userRoute = require('./routes/user')

app.get('/', function(req,res){
  res.send('Hello')
})
app.use('/api/users' , userRoute)

// error handling
app.use((req,res,next) => {
  let err = new Error('Route not found')
  err.status = 404
  next(err)
})

app.use(async (err,req,res,next) => {
  deleteFoto(req)
  const {message} = err
  const status = err.status || 500
  console.log(err)
  // response(res,false,null,message,status)
  res.sendError(err,message,status)
})


const port = process.env.PORT || 3000

app.listen(port , () => {
  // db.sync({})
  // .then(() => console.log(`app is running on port ${port}`))
  // .catch(err => console.log(err.message))
  console.log(`app is running on port ${port}`)
}) 