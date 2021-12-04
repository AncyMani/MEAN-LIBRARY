const authordata = require('../models/author')
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/LIBRARYAPPNEW?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});

exports.getAuthors= async(req,res)=>{
    const authors = await authordata.find();
    // console.log(books)
    res.status(200).json({authors})
}
exports.getAuthor= async(req,res)=>{
    // console.log(req.body)
    const author = await
     authordata.findOne({_id: req.body})

    // console.log(books)
    res.status(200).json({author})
}

exports.postAuthor = async (req,res)=>{
    // console.log(req);
    const {name} = req.body;
    const {countryname} =req.body;
    const {genre} = req.body;
    const image = 'http://localhost:3000/images/'+req.file.filename;
    const author = new authordata({
        name,
        countryname,
        genre,
        image
    })
    const createdAuthor = await author.save();
    res.status(201).json({
        author:{
            ...createdAuthor._doc
        }
    })
}

exports.putAuthor = async (req,res)=>{
 
    
   const { id} = req.body
    const {name} = req.body;
    const {countryname} =req.body;
    const {genre} = req.body;
    const image = 'http://localhost:3000/images/'+req.file.filename;
    console.log(name,countryname)
      authordata.findByIdAndUpdate({"_id":id},{$set:{ "name":name,
      "countryname":countryname,
      "genre":genre,
     
      "image":image}})
      .then(()=>{
        res.send();
      })
      .catch(()=>{
      
      })
      
      
}
