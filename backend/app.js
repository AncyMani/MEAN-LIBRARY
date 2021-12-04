const express = require('express');

const cors = require('cors');

const path = require('path')

require('dotenv').config();

const jwt = require('jsonwebtoken');

const multer = require("multer")

const { set } = require('mongoose');

const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');

const bookdata = require('./models/book')

const authordata = require('./models/author')

const UserData = require('./src/model/UserModel')

const bookRoutes = require('./routes/books')

const authorRoutes = require ('./routes/authors')

mongoose.connect("mongodb+srv://userzero:userzero@ictakfiles.4ubv7.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});

 

const ports = process.env.PORT || 3000;

 

var app = new express();

app.use(express.json());

app.use(cors());

app.use(express.static('./dist/frontend'));

// app.use(express.static("images"));

app.use('/images',express.static(path.join('images')))

username = "admin@gmail.com";

password="admin12345";

 

// app.use('/books',bookRoutes)

app.use('/books',bookRoutes)

app.use('/authors',authorRoutes)

 

 app.post('/api/login',(req,res)=>{

let userData = req.body

var user1 = {

                 

    exampleInputEmail1:req.body.username,

    exampleInputPassword1:req.body.password,

     

   }  

   if(username === userData.username && password === userData.password){

    let payload = {subject:username+password}

    let token = jwt.sign(payload,'secretKey')

    res.status(200).send({token});

    // console.log("success")

   

}

else{

UserData.findOne({exampleInputEmail1: user1.exampleInputEmail1})

.then((data)=>{

   

    if(data==null){

    let error ="Invalid User";

    res.send({error})

    }

    else if(data. exampleInputPassword1===user1.exampleInputPassword1){

        let payload = {subject:username+password}

        let token1 = jwt.sign(payload,'secretKey')

        res.status(200).send({token1});

        // console.log("success")

    }

 

else{

    let error ="Invalid User";

    res.send({error})

   

}

 

    })

}

})

   




    app.post("/api/signup",(req,res)=>{

        let userData = req.body  

        var user1 = {

                 

            exampleInputEmail1:req.body.username,

            exampleInputPassword1:req.body.password,

             

           }  

           

        if(username === user1.exampleInputEmail1){

            let error ="User Already exists";

           

            res.send({error})

           

        }

        else{

        UserData.findOne({exampleInputEmail1: user1.exampleInputEmail1})

        .then((data)=>{

           

            if(data==null){

            //   console.log(data)

                    const user=UserData(user1);

                    user.save();

                    let error ="new User";

                    res.status(200).send({error});

            }

            else{

           

 

                let error ="User Already exists";

               

                res.send({error})

            }

           

        })

       

           

       

     

 

    }

       


    } )

 

    app.get('/*', function(req, res) {

        res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));

       });

app.listen(ports,()=>{

    console.log(`Listening to port ${ports}`)

})