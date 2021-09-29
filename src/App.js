import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {


  //LocalStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }
  //STATE GENERAL DE CITAS
  const [citas, setCitas] = useState(citasIniciales);
  //useEffect para realizar acciones cuando el state cambie
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas])

  //Función que tome las citas actuales y agregue nuevas
  const crearCita = cita =>{
    setCitas([
      ...citas,
      cita
    ])
  }
  // Funcion que elimina citas por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevasCitas);
  }

  //Mensaje condicional
  const mensaje = citas.length === 0 ? 'No Hay Citas' : 'Administra tus citas';
  return (
    <Fragment>
      <h1>Adminsitrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
             <h2>{mensaje}</h2>
             {citas.map(cita => (
               <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
               />
             ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
