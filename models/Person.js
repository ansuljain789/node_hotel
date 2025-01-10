const mongoose = require('mongoose');


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
    }

});

//create model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;