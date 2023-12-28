import express from 'express';
const app=express();

import { Usuario } from '../models/Usuario.js';
import { Tweet } from '../models/Tweet.js';
import cors from 'cors';
import { JSON } from 'sequelize';


app.use(express.json());
app.use(cors());

app.get('/inicio',(req,res)=>{
    res.send([])
})

app.get('/agregar-usuario/:nombre/:password',async (req,res)=>{

    try{
        const usuario=await Usuario.create({
            nombre:req.params.nombre,
            password:req.params.password
        });

        res.status(201).send(usuario);
    }
    catch(e){
        console.error("Error al insertar el usuario", e);

        res.status(500).send("Error interno en el servidor")
    }
    

})


app.post('/verificar-usuario',async(req,res)=>{
    try{
        const usuario=await Usuario.findOne({
            where:{
                nombre:req.body.usuario,
                password:req.body.contrasena
            }
        })
        if(!usuario){
            return  res.status(404).send({number:0})
            }
        return res.status(200).send({number:1})
    }catch(e){
        console.error("Error al buscar el usuario " + e);
        res.status(500).send({number:2});
    }
})

app.post('/buscar-usuario', async (req, res) => {
    try {

        const usuario = await Usuario.findOne({
            where: {
                nombre: req.body.nombre,
                password:req.body.contra
            }
        });

        if (!usuario) {
            res.status(404).send("Usuario no encontrado");
            return;
        }

        res.status(200).send(usuario);

    } catch (e) {
        console.error("Error al buscar el usuario " + e);
        res.status(500).send("Error interno en el servidor");
    }
});


app.post('/agregar-tweet', async (req, res) => {
    try {
        
        console.log(req.body);
        const usuario = await Usuario.findOne({
            where: {
                nombre: req.body.nombre,
                password:req.body.contra
            }
        });

        if (!usuario) {
            res.status(404).send("Usuario no encontrado");
            return;
        }

        const tweet = await Tweet.create({
            comentario: req.body.texto,
            UsuarioId: usuario.id
        });

       

        res.status(201).send(tweet);
    } catch (e) {
        console.error("Error al agregar el tweet " + e);
        res.status(500).send("Error interno en el servidor");
    }
});


app.post('/tweet-usuario', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                nombre: req.body.nombre,
                password: req.body.contra
            }
        })

        if (!usuario) {
            res.status(404).send("Usuario no encontrado");
            return;
        }

        const tweets = await Tweet.findAll({
            where: {
                UsuarioId: usuario.id
            }
        });

        if (tweets.length === 0) {
            res.status(204).send(); // No Content
            return;
        }

      

        const tweetTexts = tweets.map(tweet => ({
            id:tweet.id,
            comentario:tweet.comentario
        }));

        res.status(201).send({
            fotoUsuario: usuario.foto,
            nombreUsuario: usuario.nombre,
            tweets: tweetTexts,
            
        });

    } catch (e) {
        console.error("Error al recuperar los tweets " + e);
        res.status(500).send("Error interno en el servidor");
    }
});


app.post('/eliminar-tweet',async(req,res)=>{
    try{
        const tweet=Tweet.destroy({
            where:{
                id:req.body.id
            }
        })

        res.status(201).send(tweet)

    }catch(e){
        console.error("Error al eliminar tweet " + e);
        res.status(500).send("Error interno en el servidor");
    }
})



app.post('/agregar-foto', async (req, res) => {
    try {
        console.log(req.body.foto);
        
        const usuario = await Usuario.update(
            { 
                foto: req.body.foto 
            },
            {
                where: {
                    nombre: req.body.nombre,
                    password: req.body.contra
                }
            }
        );

        res.status(201).send(`Foto agregada usuario`);
        
    } catch (e) {
        console.error("Error al agregar la foto " + e);
        res.status(500).send("Error interno en el servidor");
    }
});




export default app;