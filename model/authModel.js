const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{type: String, required:true},
    password:{type: String, required:true}
})
const UserModel = mongoose.model('authuser', userSchema)

module.exports = {UserModel};