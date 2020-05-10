const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const recipeRoutes = require('./routes/recipes')

const app = express()

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PW}@starter-fqvar.mongodb.net/test?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('connected to mongodb'))
    .catch(error => console.log(error))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, PUT, OPTIONS'
    )
    next()
})

app.use('/api/recipes', recipeRoutes)

module.exports = app
