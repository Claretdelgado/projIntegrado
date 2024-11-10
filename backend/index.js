import express from 'express';
import mongoose from 'mongoose';
import { DatesModel } from './models/DatesModel.js';
import cors from 'cors';

mongoose.connect('mongodb://localhost:27017/evaluacionTutores')
.then(()=>{
    console.log('¡La conexión ha sido exitosa!')
});

const app = express();

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Servidor funcionando') //<- Es un endpoint
});

app.post('/create', async (req, res) => {
    const name = req.body.name;
    const last_name = req.body.last_name;
    const email = req.body.email;

    if (!name || !last_name || !email) {
        return res.status(400).json({
            msg: '¡Necesitamos todas las respuestas para almacenar un documento!'
        });
    }

    const obj = {
        Name: name,
        Last_name: last_name,
        Email: email,
    };
    try {
        await DatesModel.create(obj);
        return res.status(200).json({
            msg: '¡Formulario registrado con éxito!'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al registrar el formulario',
            error: error.message,
        });
    }
});

app.listen(4000, () => {
    console.log('¡Servidor en línea!');
});