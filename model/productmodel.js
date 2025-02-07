var mongoose = require('mongoose');

var productschema = new mongoose.Schema({
    name:{
        type:String
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
   
})

module.exports = mongoose.model("product",productschema);