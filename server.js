var express = require('express')
var app = express()
app.use(express.static('public'))
const port = process.env.PORT || 8080
app.listen(port)
console.log('running on port' + port)
