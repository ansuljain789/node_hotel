const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
//define the peerson schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number

    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        requird:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});
 personSchema.pre('save',async function(next){
    const person = this;
    if( !person.isModified('password')) return next();
   try{

              ///hash password generate
              const salt = await bcrypt.genSalt(10);
              /// hash password
                 const hashedPassword=  await bcrypt.hashhau(person.password,salt);
                 //override the plain password with the hashed one 
                 person.password = hashedPassword;
              next();
   }catch(err){
              return next(err);
   }
 })

 personSchema.methods.comparePassword = async function(candidatePassword){
    try{
         const isMatch = await bcrypt.compare(candidatePassword,this.password);
         return isMatch;

    }catch(Err){
        throw err;
    }
 }

//create model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;