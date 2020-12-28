const jwt = require('jsonwebtoken')

require('dotenv').config()

function signUser(user) {
  return jwt.sign(user, process.env.tokenSecret, { expiresIn: 60*30}) // 60detik * 30 = 30 menit
}

async function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return next(req.customError('Authentication tidak ditemukan',401))

  jwt.verify(token, process.env.tokenSecret, (err,user) => {
    if (err) return next(req.customError('Authentication has expired',419))
    req.user = user
    next()
  })
}

module.exports = {
  signUser,
  authenticateToken
}