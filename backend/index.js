import express from 'express';
import mongoose from 'mongoose';
import { DatesModel } from './models/DatesModel.js';

mongoose.connect('mongodb://localhost:27017/evalucionTutores')
.then(()=>{
    console.log('¡La conexión ha sido exitosa!')
})
const app = express();

app.use(express.json());

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
        msg:'¡formulario con éxito!'
    })
})

app.listen(4000,()=>{
    console.log('¡Servidor en linea!');
    
})
app.get('/users', async (req, res) => {
    try {
        const users = await DatesModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Error al obtener los usuarios', error: err });
    }
});

app.post('/users', (req, res) => {
    const { name, last_name, email } = req.body;

    if (!name || !last_name || !email) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos: name, last_name, email'
        });
    }

    const newUser = {
        Name: name,
        Last_name: last_name,
        Email: email
    };

    // Aquí guardas al usuario en tu base de datos
    DatesModel.create(newUser)
        .then(() => res.status(201).json({ msg: 'Usuario creado exitosamente' }))
        .catch(err => res.status(500).json({ msg: 'Error al crear usuario', error: err }));
});
