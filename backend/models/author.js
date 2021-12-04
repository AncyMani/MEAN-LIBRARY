const mongoose = require ('mongoose')

const AuthorSchema = mongoose.Schema({
    name:{type:String,required:true},
    countryname:{type:String,required:true},
    genre:{type:String,required:true},
    image:{type:String,required:true}
    })
    module.exports = mongoose.model('authordata',AuthorSchema);