const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://Matheus:0139Sm12Dc@ecommerce-aesiz.gcp.mongodb.net/ecommerceretryWrites=true&w=majority', {
useNewUrlParser: true,
useUnifiedTopology: true})

app.use(express.json())
app.use(routes);


app.listen(3333, () => {
        console.log('servidor rodando!')
})

