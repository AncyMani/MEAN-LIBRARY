
const express = require('express');
const booksController = require('../controllers/book')
const storage = require('../helpers/storage')
const bookdata =  require('../models/book')
const BookRouter = express.Router();
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
    

BookRouter.get('/',booksController.getBooks);
BookRouter.get('/',booksController.getBook);


BookRouter.post('/',verifyToken,storage.single('image'), booksController.postBook);
BookRouter.put('/',storage.single('image'), booksController.putBook);


BookRouter.delete('/remove/:id',(req,res)=>{
    const id = req.params.id;
    bookdata.findByIdAndDelete({"_id":id})
.then(()=>{
        res.send();
})
})
BookRouter.get('/:id',(req,res)=>{
    const id = req.params.id;
  

   bookdata.findOne({"_id":id})
    .then((data)=>{
        res.send(data);
    })
    .catch(()=>{
        console.log("error")
    })
    })

  
module.exports = BookRouter;