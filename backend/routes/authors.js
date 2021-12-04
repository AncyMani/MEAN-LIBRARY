
const express = require('express');

const authorsController = require('../controllers/author')
const storage = require('../helpers/storage')

const authordata = require('../models/author')

const AuthorRouter = express.Router();
const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    if(!req.headers.authorization){
          return res.status(401).send("Unauthorized request")
       
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token)
    if(token == null){
          return res.status(401).send("Unauthorized request")
    
    }
    let payload = jwt.verify(token,'secretKey')
    // console.log(payload);
    if(!payload){
          return res.status(401).send("Unauthorized request")
    
    }
    
    next();
    }
    

AuthorRouter.get('/',authorsController.getAuthors);
AuthorRouter.get('/',authorsController.getAuthor);


AuthorRouter.post('/',verifyToken,storage.single('image'), authorsController.postAuthor);
AuthorRouter.put('/',storage.single('image'), authorsController.putAuthor);

AuthorRouter.delete('/remove/:id',(req,res)=>{
    const id = req.params.id;
    authordata.findByIdAndDelete({"_id":id})
.then(()=>{
        res.send();
})
})
AuthorRouter.get('/:id',(req,res)=>{
    const id = req.params.id;
  

   authordata.findOne({"_id":id})
    .then((data)=>{
        res.send(data);
    })
    .catch(()=>{
        console.log("error")
    })
    })

  
module.exports = AuthorRouter;