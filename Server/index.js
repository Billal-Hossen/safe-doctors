const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const fs=require('fs-extra')
const fileUpload=require('express-fileupload')
require('dotenv').config()
const MongoClient=require('mongodb').MongoClient;
const { json } = require('body-parser');


const app=express()
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('doctors'))
app.use(fileUpload());
const port=5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gyuhd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const appointsCollection = client.db("doctorsPortal").collection("appointment");
    const doctorsCollection = client.db("doctorsPortal").collection("doctors");

    app.post('/addAppointment',(req,res)=>{
        const appointment=req.body;
        console.log(appointment)
        appointsCollection.insertOne(appointment)
        .then(result=>{
            res.send(result.insertedCount>0)
        })
    })
    app.get('/appointments', (req, res) => {
        appointsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.post('/appointmentByDate',(req,res)=>{
        const date=req.body;
        console.log(date.date)
        const email=req.body.email;
        doctorsCollection.find({email:email})
        .toArray((err,doctors)=>{
            const filter={date:date.date}
            if(doctors.length===0){
                filter.email=email;

            }
            appointsCollection.find(filter)
            .toArray((err,documents)=>{
                res.send(documents)
            })
            
        })
    
    })

    app.post('/addADoctor',(req,res)=>{
        const file=req.files.file;
        const name=req.body.name;
        const email=req.body.email;
        const filePath=`${__dirname}/doctors/${file.name}`;
        // console.log(name,email,file)
        // file.mv(`${__dirname}/doctors/${file.name}`,err=>{
        //     if(err){
        //         console.log(error)
        //         return res.status(500).send({msg:'Fail to upload Image'})
        //     }
        //     return res.send({name:file.name,path:`/${file.name}`})
        // })


        ///////module52_5_5 store image on mongodb and display//////////
        // file.mv(filePath,error=>{
        //     if(err){
        //         console.log(err)
        //         res.status(500).send({msg:"fail to upload image"})
        //     }
        //     const newImg=fs.readFileSync(filePath)
        //     const encImg=newImg.toString('base64')
        //     var image={
        //         contentType:req.files.file.mimetype,
        //         size:req.files.file.size,
        //         img:Buffer.from(encImg,'base64')
        //     }
        //     doctorsCollection.insertOne({name,email,image})
        //     .then(result=>{
        //         fs.remove(filePath,error=>{
        //             if(error){console.log(error)}
        //             res.send(result.insertedCount>0)
        //         })
               
        //     })
        // })


        /////////////another way image upload in mongodb/////////good way
        
        const newImg = file.data;
        const encImg = newImg.toString('base64');

        var image = {
            contentType: file.mimetype,
            size: file.size,
            img: Buffer.from(encImg, 'base64')
        };

        doctorsCollection.insertOne({ name, email, image })
            .then(result => {
                res.send(result.insertedCount > 0);
            })



    })


    app.get('/doctors', (req, res) => {
        doctorsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
        });

        app.post('/isDoctor',(req,res)=>{
            const email=req.body.email;
            doctorsCollection.find({email:email})
            .toArray((err,doctors)=>{
                res.send(doctors.length>0)
            })
        })

    

 

 
  });



app.get('/',(req,res)=>{
    res.send("hello from db its working")
}
)
app.listen(process.env.PORT || port)