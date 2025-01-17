const express=require('express')
const connectDatabase=require('./db/Database')
const ErrorHandler = require('./utils/ErrorHandler')
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
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
//import router
const user=require('./controller/user')
app.use('/api/v2/user',user)
app.use(ErrorHandler);
connectDatabase();

module.exports=app;