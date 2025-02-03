require('dotenv').config();


const mongoose = require('mongoose');
const Product = require('./models/product');
mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', () => {
    console.log('connected successfully', mongoose.connection.name)
})

const prods=[{
    name:"Banana",
    price:2,
    category:"fruit"
},{
    name:"apple",
    price:1,
    category:"fruit"
},{
    name:"milk",
    price:2,
    category:"dairy"
},{
    name:"cheese",
    price:2,
    category:"dairy"
}]

Product.insertMany(prods).then((result)=>{
    console.log('good')
}).catch((error)=>{
    console.log(error)
})
