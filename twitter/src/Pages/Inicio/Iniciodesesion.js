import React, { useState } from 'react'
import "./Iniciodesesion.css"
import { useNavigate } from 'react-router-dom';



function Iniciodesesion() {
  const[nombre,setnombre]=useState('');
  const[password,setpassword]=useState('');
  const navigate = useNavigate();

  const handleclick= async ()=>{
    await fetch('http://localhost:3001/verificar-usuario',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
        },
        body:JSON.stringify({
          usuario:nombre,
          contrasena:password
          })
    })
      .then(response=>response.json())
      .then(data=>{
        switch(data.number){
          case 0:
            alert("Usuario no existente");
            break;
          case 1:
            alert("Bienvenido");
            localStorage.setItem('usuario',nombre);
            localStorage.setItem("contrasena",password);
            navigate('/principal');
            break;
          case 2:
            alert("Problema en el servidor")
            break;
          default:
            break;
          
        }
        setnombre('');
        setpassword('');
      })
      .catch(e=>console.error(`Ocurrio un error ${e}`))
  
  }
  

  return (
    <div className='container'>
       <h1>Inicio de sesion</h1>
       <div className='inputs'>
        <input placeholder='Ingrese su usuario' className='input' type='text' name={nombre} onChange={(e)=>setnombre(e.target.value)}></input>
        <input placeholder='Ingrese su contraseña' className='input' type='password' name={password} onChange={(e)=>setpassword(e.target.value)}></input>
       </div>
       
       <button id="boton" onClick={handleclick}>Iniciar Sesion</button>
       
        <div className='textos'>
            <p>¿Olvido su contraseña?</p>
            <p><b>Cambiela aqui</b></p>
        </div>
        <div className='textos'>
            <p>¿Aun no tiene cuenta?</p> 
            <p><b>Crear aqui</b></p>
        </div>
       
       
       
    </div>
  )
}

export default Iniciodesesion