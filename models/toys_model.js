const mongoose = require('mongoose');
const Joi = require("@hapi/joi")


//creating  the for schema of our collection
let toysSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minLength:2,
        maxLength:99
      },
      info: {
        type:String,
        minLength:2,
        maxLength:250
      },
      category: {
        type:String,
        required:true,
        minLength:2,
        maxLength:99
      },
      image: {
        type:String,
        required:true,
        minLength:2,
        maxLength:200
      },
      price: {
        type:Number,
        required:true,
        maxLength:99
      },
      date:{type:Date,default:Date.now()}
})

//connecting the schema above to the Collection in db
exports.toysModel = mongoose.model("toys",toysSchema);


const validToy = (_toy) => {

    let JoiSchema = Joi.object({
      id:Joi.string(),
      name:Joi.string().min(2).max(99).required(),
      category:Joi.string().min(2).max(99).required(),
      image:Joi.string().min(2).max(300).required(),
      price:Joi.number().max(99999999).required()
    })
  
    return JoiSchema.validate(_toy);
  }
  
  exports.validToy = validToy;



