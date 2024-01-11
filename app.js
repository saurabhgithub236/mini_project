const express=require("express")
const path=require("path")
const fs=require("fs")
const app=express()
const hostname = '127.0.0.1'
const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/bloodAvailability.pug', (req, res)=>{
    
    const params = {}
    res.status(200).render('bloodAvailability.pug', params);
})
app.get('/login.pug', (req, res)=>{
    
    const params = {}
    res.status(200).render('login.pug', params);
})
app.get('/medicalConsultation.pug', (req, res)=>{
    
    const params = {}
    res.status(200).render('medicalConsultation.pug', params);
})
app.get('/nearestHospital.pug', (req, res)=>{
    
    const params = {}
    res.status(200).render('nearestHospital.pug', params);
})
app.get('/rehabilatation.pug', (req, res)=>{
    
    const params = {}
    res.status(200).render('rehabilatation.pug', params);
})
app.get('/services.pug', (req, res)=>{
    
    const params = {}
    res.status(200).render('services.pug', params);
})





// START THE SERVER
// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// });

//starting the server
app.listen(port, () => {
    console.log(`The application has started on port http://${hostname}:${port}/`);
})
