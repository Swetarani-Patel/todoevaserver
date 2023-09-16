const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
   task:{type: String, required:true},
   status:{type: String, enum:["pending", "done"], default:"pending"},
   tag:{type: String, enum:["personal", "official", "family"], default:"personal"}
})
const TodoModel = mongoose.model('todo', todoSchema)

module.exports = {TodoModel};