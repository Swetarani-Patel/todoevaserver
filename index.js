const express = require("express");
const cors = require("cors")
const jwt = require('jsonwebtoken')
const { connection } = require("./data/db");
const { UserModel } = require("./model/authModel");
const { TodoModel } = require("./model/todoModel");
const app = express();

app.use(express.json());
app.use(cors());

app.post('/signup', async(req, res)=>{
    const {email, password} = req.body;
   const user = new UserModel({email, password})
   await user.save();
   if(user){
    res.status(200).json({message:"signup successful"})
   }else{
    res.status(400).json({message:"signup failed"})
   }

})

app.post('/login', async(req, res)=>{
    const {email, password} = req.body;
   const authenticatedUser = await UserModel.findOne({email});
   if(authenticatedUser){
    const token = jwt.sign({foo:"foo"},"swetatodo")
    res.status(200).json({message:"login successful", token})
   }else{
    res.status(400).json({message:"login failed"})
   }

})
app.get('/gettodo', async(req, res)=>{
    try{
     const todos = await TodoModel.find({})   //todoid:6505cb98523fc17ec82c6d3e
     res.status(200).json(todos)
    }catch(error){
        res.status(400).json(error)
    }
})

app.put('/updatetodo', async(req, res)=>{
    try{
        const {id, task} = req.body;
        const todo = await TodoModel.findOneAndUpdate({_id:id},{task})
        res.status(200).json(todo);
    }catch(error){
        res.status(400).json(error)
    }
})

app.put('/updatetodostatus', async(req, res)=>{
    try{
        const {id, status} = req.body;
        const todo = await TodoModel.findOneAndUpdate({_id:id},{status})
        res.status(200).json(todo);
    }catch(error){
        res.status(400).json(error)
    }
})


app.delete('/deletetodo', async(req, res)=>{
    try{
        const {id} = req.body;
        const todo = await TodoModel.findByIdAndDelete(id)
        res.status(200).json(todo);
    }catch(error){
        res.status(400).json(error)
    }
})

app.post('/addtodo', async(req, res)=>{
    const {task, status, tag} = req.body;
    const todo = new TodoModel({task, status, tag});
    await todo.save();
    res.status(200).json({message:"todos added successful"})

})



const PORT = 8001;
app.listen(PORT, async()=>{
    try{
     await connection
     console.log("connected to mongodb succesfully");
     console.log(`server is running on port ${PORT}`)
    }catch(error){
      console.log(error)
    }
})
