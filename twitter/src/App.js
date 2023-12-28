
import './App.css';
import Iniciodesesion from './Pages/Inicio/Iniciodesesion';
import Principal from './Pages/Principal/Principal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
        
          <Routes>
            
            <Route path='/' element={<Iniciodesesion/>} />
            <Route path='/principal' element={<Principal/>}/>
            
          </Routes>
        </BrowserRouter>
  );
}

export default App;
