import express  from "express";
import  path from "path";
import fs from "fs";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import pug from "pug"
import authRoutes from "./routes/authRoutes.js"


import viewsDirectory from './viewsDirectory.js';//to set the views directory using app.set()


//DOTENV SPECIFIC STUFF
dotenv.config();

//connect to database
connectDB();


const app=express()



// middlewares 
app.use(express.json())
app.use(morgan('dev'))



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', viewsDirectory); // Set the views directory

 
// routes 
app.use('/api/v1/auth',authRoutes);


// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/aboutus', (req, res)=>{
    
    const params = {}
    res.status(200).render('aboutus.pug', params);
})
app.get('/blog', (req, res)=>{
    
    const params = {}
    res.status(200).render('blog.pug', params);
})

app.get('/bloodAvailability', (req, res)=>{
    
    const params = {}
    res.status(200).render('bloodAvailability.pug', params);
})
app.get('/login', (req, res)=>{
    
    const params = {}
    res.status(200).render('login.pug', params);
})
app.get('/medicalConsultation', (req, res)=>{
    
    const params = {}
    res.status(200).render('medicalConsultation.pug', params);
})
app.get('/nearestHospital', (req, res)=>{
    
    const params = {}
    res.status(200).render('nearestHospital.pug', params);
})
app.get('/rehabilatation', (req, res)=>{
    
    const params = {}
    res.status(200).render('rehabilatation.pug', params);
})
app.get('/services', (req, res)=>{
    
    const params = {}
    res.status(200).render('services.pug', params);
})



const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME
// START THE SERVER
// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// });

//starting the server
app.listen(PORT,HOSTNAME,() => {
    console.log(`The application has started on port http://${HOSTNAME}:${PORT}`.bgWhite.cyan);
})
