const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MyTodo= new Schema({
    newTodo:{
        type: String,
        required : true
    },
    complete:{
        type : Boolean,
        default : false
    },
    timestamp:{
        type : String,
        default: Date.now()
    }
})

const Todo =mongoose.model("mytodos", MyTodo);
module.exports= Todo;