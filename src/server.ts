import express from 'express' ;
import{MongoClient} from "mongodb";
import {router} from "./routes/route";
import http from "http"
//const express = require('express');
const app= express();
const port = process.env.PORT ?? 9000;
//midlewar
app.use(express.json());
app.use("/api",router)
//routes
app.get('/',(req,res)=>{
    res.send('Welcome to my server')
})
app.get('/status',(req,res)=>{
    res.status(200).send({
        status: "200",
        Body: "OKProgramación-I"
    });
    
})
app.use((req,res,next)=>{
    const error=new Error('not found');
    return res.status(400).json({
        message: error.message
    })
})


const httpServer = http.createServer(app);
httpServer.listen(port, ()=>console.log('server listening on port',port ))