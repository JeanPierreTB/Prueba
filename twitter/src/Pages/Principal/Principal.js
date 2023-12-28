import React, { useEffect, useState } from 'react'
import Tarjeta from '../../Components/Tarjeta'
import "./Principal.css"
import { FaBell, FaBookmark, FaCompass, FaEllipsisH, FaEnvelope, FaHome, FaList, FaUser } from 'react-icons/fa'

function Principal() {

    const[nombre,setnombre]=useState(localStorage.getItem('usuario'));
    const[contrasena,setcontrasena]=useState(localStorage.getItem('contrasena'));
    const[foto,setfoto]=useState('https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg');
    const[texto,settexto]=useState('');
    const [tweets,settweets]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:3001/buscar-usuario',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    nombre:nombre,
                    contra:contrasena
                })
        })
        .then(response=>response.json())
        .then(data=>setfoto(data.foto))
        .catch(e=>console.error(`Ocurrio un error`,e))

        fetch('http://localhost:3001/tweet-usuario',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    nombre:nombre,
                    contra:contrasena
                })
        })
        .then(response=>response.json())
        .then(data=>settweets(data.tweets))
        .catch(e=>console.error(`Ocurrio un error`,e))

        console.log(tweets);
     
    },[])


    const handletweet = () => {
        fetch('http://localhost:3001/agregar-tweet', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                contra: contrasena,
                texto: texto
            })
        })
        .then((res) => res.json())
        .then((data) => {
            
                const { id, comentario } = data;
                settweets(prevTweets => [...prevTweets, { id, comentario }]);
                // Limpia el área de texto
                settexto('');
                console.log("Nose:",tweets);
                alert("Se agregó un nuevo tweet");

            
        })
        .catch(e => console.error(`Ocurrio un error`, e));
    }
    


    const handledelete=(tweetId)=>{
        console.log(tweetId);
        fetch('http://localhost:3001/eliminar-tweet',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:tweetId
            })
        })
        .then(response=>response.json())
        .then(data=>{
            settweets(prevTweets=>prevTweets.filter(tweet=>tweet.id!=tweetId))
            alert("Se borro")
        })
        .catch(e=>console.error(`Ocurrio un error`,e))  
    }

  return (
    <div className='principal'>
        <nav>
            <ul className='lista'>
                <li><FaHome/><span>Home</span></li>
                <li><FaCompass/><span>Explore</span></li>
                <li><FaBell/><span>Notifications</span></li>
                <li><FaEnvelope/><span>Messages</span></li>
                <li><FaBookmark/><span>Bookmarks</span></li>
                <li><FaList/><span>Lists</span></li>
                <li><FaUser/><span>Profile</span></li>
                <li><FaEllipsisH/><span>Cerrar seccion</span></li> 
            </ul>
        </nav>
        <div className='contenido'>
            <div className='comentario'>
                <p><b>Bienvenido {nombre}</b></p>
                <hr/>
                <div className='comentario1'>
                    <img id="imagen" src={foto} alt="p1"></img>
                    <div className='comentario2'>
                        <textarea id="textarea" placeholder='¿Que estas pensado?' value={texto} onChange={(e)=>settexto(e.target.value)}></textarea>
                        <button id="botonc" onClick={handletweet}>Tweet</button>
                    </div>
                    
                </div>
                
            </div>
            <div className='tarjetas'>
            {tweets.map((tweet) => (
                <Tarjeta key={tweet.id}  img={foto} nomb={nombre} texto={tweet.comentario} ondelete={()=>handledelete(tweet.id)}/>
            ))}

            </div> 
        </div>
       

    </div>
  )
}

export default Principal