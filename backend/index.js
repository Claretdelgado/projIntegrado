import express from 'express';
import mongoose from 'mongoose';
import { DatesModel } from './models/DatesModel.js';
import cors from 'cors';
import usercontrollers from "./controllers/usercontrollers.js";

mongoose.connect('mongodb://localhost:27017/evaluacionTutores')
.then(()=>{
    console.log('¡La conexión ha sido exitosa!')
})
const app = express();

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hola desde mi servidor') //<- Es un endpoint
});

app.post('/create',(req,res)=>{
    const name = req.body.name;
    const last_name = req.body.last_name;
    const email = req.body.email;

    if(!name || !last_name || !email){
        return res.status(400).json({
            msg:'¡Necesitamos todos las respuestas para almacenar un documento!'
        })
    }
    const obj = {
        Name: name,
        Last_name: last_name,
        Email: email,
    };
    DatesModel.create(obj);
    return res.status(200).json({
        msg:'¡Formulario registrado con éxito!'
    })
})

app.get('/dates', async(req,res)=>{
    const response = await DatesModel.find()
    return res.status(200).json(response)
})

app.post("/user/create", usercontrollers.createUser);
app.delete("/user/delete/:id", usercontrollers.deleteUser);
app.put("/user/update/:id", usercontrollers.updateUser);
app.get("/users", usercontrollers.getAllUsers);
app.get("/user/:id", usercontrollers.getUser);
app.post("/login", usercontrollers.login);


app.listen(4000,()=>{
    console.log('¡Servidor en linea!');
    
})