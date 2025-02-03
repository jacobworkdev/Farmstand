//dependancies
const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config();
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride=require('method-override')

//connecting to db
mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', () => {
    console.log('connected successfully', mongoose.connection.name)
})


//setting view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middleware
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//routes
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) => {
    const newProd= new Product(req.body)
    await newProd.save()
    console.log(req.body)
    res.redirect('/products')
})



app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const prod = await Product.findById(id)
    res.render('products/details', { prod })
})

app.get('/products/:id/edit', async (req, res) => {
    const prod=await Product.findById(req.params.id)
    res.render('products/edit',{prod})
})

app.put('/products/:id',async (req,res)=>{
    const {id}=req.params
    const prod = await Product.findByIdAndUpdate(id,req.body,{runValidators:true})
    res.redirect(`/products/${id}`)
})

app.delete('/products/:id', async (req, res) => {
 await Product.findByIdAndDelete(req.params.id)
 res.redirect('/products')
})


app.listen(3000, () => {
    console.log('server listening at ports:3000')
})