const mongoose = require('mongoose');
console.log("Todo Model Loaded");
const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }

},{
     timestamps: true
});

// console.log(todoSchema.obj);
module.exports= mongoose.model('Todo',todoSchema);

