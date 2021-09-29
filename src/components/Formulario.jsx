import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // State Citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    const [error, setError] = useState(false);

    //Función que lee el onChange, toma los valores y los alamacena en el State de citas
    const actualizarState = e => {
        setCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Se extraen los valores del State de cita
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Enviar Formulario
    const submitCita = e => {
        e.preventDefault();

        //Validar
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            setError(true);
            return;
        }
        //Eliminar mensaje de error
        setError(false);
        //Asignar ID
        cita.id = uuid();
        console.log(cita)
        //Crear Cita
        crearCita(cita);
        //Reiniciar Form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        })
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {
                error ? <p className="alerta-error">Todos los Campos son Obligatorios</p>
                :
                null
            }
            <form 
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text" 
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text" 
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date" 
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time" 
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea 
                    name="sintomas"
                    className="u-full-width" 
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario
