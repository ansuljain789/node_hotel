const mongoose = require('mongoose');


//define the peerson schema
const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true

    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        requird:false
    },

    ingredients:{
        type:[String],
        default: []
    },
    num_sales:{
        type:Number,
        default: 0
    }
    

});

//create model
const Menu = mongoose.model('Menu',menuSchema);
module.exports = Menu;