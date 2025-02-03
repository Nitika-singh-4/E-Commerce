const express=require('express')
const connectDatabase=require('./db/Database')
const ErrorHandler = require('./utils/ErrorHandler')
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
    const path=require('path')

// const product = require('./controller/product');
// Some other code
// Remove the duplicate line above


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/",express.static("uploads"))
app.use(bodyParser.urlencoded({extended:true, limit:'50md'}));
app.use(cors())
//config
if(process.env.NODE_ENV !=="PRODUCTION"){
    require('dotenv').config({
        path:'backend/config/.env'
    })
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products', express.static(path.join(__dirname, 'products')));
//import router
const user=require('./controller/user')
const product=require('./controller/product')
app.use('/api/v2/user',user)
app.use('/api/v2/product', product)
app.use(ErrorHandler);
connectDatabase();

module.exports=app;