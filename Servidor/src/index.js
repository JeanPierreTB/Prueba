import app from "./app.js";
import { sequelize } from '../database/database.js';




const port=3001;
const verificarConexion = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Conexion a base de datos exitosa");
    
    } catch (e) {
        console.error("No se logró conectar ", e);
    }
}


app.listen(port,()=>{
    console.log(`Servidor ejecutandose en puerto ${port}`)
    verificarConexion()
})



