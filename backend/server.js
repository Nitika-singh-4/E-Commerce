if(process.env.NODE_ENV !=="PRODUCTION"){
    require('dotenv').config({
        path:'config/.env'
    })
}

const app=require('./App');

//Hadling uncaught exceptions

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`shutting down the server for handling uncaught exception`)
})



//create server 
const srever = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})