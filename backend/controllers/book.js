const bookdata = require('../models/book')
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/LIBRARYAPPNEW?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});

exports.getBooks= async(req,res)=>{
    const books = await bookdata.find();
    // console.log(books)
    res.status(200).json({books})
}
exports.getBook= async(req,res)=>{
    // console.log(req.body)
    const book = await
     bookdata.findOne({_id: req.body})

    // console.log(books)
    res.status(200).json({book})
}

exports.postBook = async (req,res)=>{
    // console.log(req);
    const {title} = req.body;
    const {author} =req.body;
    const {genre} = req.body;
    const image = 'http://localhost:3000/images/'+req.file.filename;
    const book = new bookdata({
        title,
        author,
        genre,
        image
    })
    const createdBook = await book.save();
    res.status(201).json({
        book:{
            ...createdBook._doc
        }
    })
}

exports.putBook = async (req,res)=>{
 
    
   const { id} = req.body
    const {title} = req.body;
    const {author} =req.body;
    const {genre} = req.body;
    const image = 'http://localhost:3000/images/'+req.file.filename;
      bookdata.findByIdAndUpdate({"_id":id},{$set:{ "title":title,
      "author":author,
      "genre":genre,
     
      "image":image}})
      .then(()=>{
        res.send();
      })
      .catch((error)=>{
      res.status(500).send({error})
      })
      
      
}
