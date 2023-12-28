import React from 'react'
import "./Tarjeta.css"

function Tarjeta({img,nomb,texto,ondelete}) {
  return (
    <div className='tarjeta'>
    
        <img id="imagen" src={img} alt={nomb}></img>
        <div className='tarjeta2'>
          <p id="titulo"><b>{nomb}</b></p>
          <p>{texto}</p>
          <button id="boton" onClick={ondelete}>Eliminar</button>
        </div>
        
    </div>
  )
}

export default Tarjeta