const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersShema = new Schema ({
    name: {type:String, require:true},
    subname: {type:String, require:true},
    DNI: {type:String, require:false},
    direction: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true},
    CP: {type: Number, require:true},
    role: {type:String, require:true},
    telephone: {type:Number, require:true}
});

module.exports = mongoose.model('User', UsersShema);
