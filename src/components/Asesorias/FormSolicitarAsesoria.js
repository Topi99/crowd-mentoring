import React from 'react';

const FormSolicitarAsesoria = props => {
  return(
    /**
     * Asunto
     *    onChange  👍
     *    id        👍
     *    value     👍
     *    Llega     👍
     */
    <div className="row start-xs">
      <div className="col-xs-12">
        <p>Asunto: </p>
        <input 
          onChange={props.onChangeF} 
          type="text" 
          id="asesoriaAsunto" 
          value={props.asunto} 
          placeholder="Asunto de Asesoría" />
      </div>

      {
      /**
       * Fecha Preferida
       *    onChange  👍
       *    id        👍
       *    value     👍
       *    Llega     👍 (Debe llegar en formato YYYY-MM-DD)
       */
      }
      <div className="col-xs-4">
        <p>Fecha preferida: </p>
        <input 
          onChange={props.onChangeF} 
          type="date" 
          min={props.today} 
          id="asesoriaFechaP" 
          value={props.fechaPreferida} 
          placeholder="Fecha preferida" />
      </div>

      {
      /**
       * Hora de Inicio P
       *    onChange  👍
       *    id        👍
       *    value     👍
       *    Llega     👍 
       */
      }
      <div className="col-xs-4">
        <p>Hora de inicio (De 9:00 AM a 9:00 PM): </p>
        <input 
          onChange={props.onChangeF} 
          id="asesoriaHIP" 
          value={props.asesoriaHIP} 
          type="time" 
          min="09:00" 
          max="21:00" 
          step="1800" >
        </input>
      </div>

      {
      /**
       * Hora de Fin P
       *    onChange  👍
       *    id        👍
       *    value     👍
       *    Llega     👍 
       */
      }
      <div className="col-xs-4">
        <p>Hora de Fin (De 9:00 AM a 9:00 PM): </p>
        <input 
          onChange={props.onChangeF} 
          id="asesoriaHFP" 
          value={props.asesoriaHFP} 
          type="time" 
          min="09:00" 
          max="21:00" 
          step="1800" >
        </input>
      </div>

      {
      /**
       * Fecha Alterna 1
       *    onChange  👍
       *    id        👍
       *    value     👍
       *    Llega     👍 
       */
      }
      <div className="col-xs-4">
        <p>Fecha alterna 1: </p>
        <input 
          onChange={props.onChangeF} 
          type="date" 
          min={props.today} 
          id="asesoriaFechaA1" 
          value={props.fechaA1} 
          placeholder="Fecha preferida" />
      </div>

      {
      /**
       * Hora Inicio Alterna 1
       *    onChange  👍
       *    id        👍
       *    value     👍
       *    Llega     👍 
       */
      }
      <div className="col-xs-4">
        <p>Hora de inicio (De 9:00 AM a 9:00 PM): </p>
        <input 
          onChange={props.onChangeF} 
          id="asesoriaHIA1" 
          value={props.asesoriaHIA1}
          type="time" 
          min="09:00" 
          max="21:00" 
          step="1800" >
        </input>
      </div>

      {
      /**
       * Hora Fin Alterna 1
       *    onChange  👍
       *    id        👍
       *    value     👍
       *    Llega     👍 
       */
      }
      <div className="col-xs-4">
        <p>Hora de Fin (De 9:00 AM a 9:00 PM): </p>
        <input 
          onChange={props.onChangeF} 
          id="asesoriaHFA1" 
          value={props.asesoriaHFA1} 
          type="time" 
          min="09:00" 
          max="21:00" 
          step="1800" >
        </input>
      </div>

      {
      /**
       * Fecha Alterna 2
       *    onChange  👍
       *    id        👍
       *    value     👍
       *    Llega     👍 
       */
      }
      <div className="col-xs-4">
        <p>Fecha alterna 2: </p>
        <input 
          onChange={props.onChangeF} 
          type="date" 
          min={props.today} 
          id="asesoriaFechaA2" 
          value={props.fechaA2} 
          placeholder="Fecha preferida" />
      </div>

      {
      /**
       * Hora Inicio Alterna 2
       *    onChange  👍
       *    id        👍
       *    value     👍
       *    Llega     👍 
       */
      }
      <div className="col-xs-4">
        <p>Hora de inicio (De 9:00 AM a 9:00 PM): </p>
        <input 
          onChange={props.onChangeF} 
          id="asesoriaHIA2" 
          value={props.asesoriaHIA2}
          type="time" 
          min="09:00" 
          max="21:00" 
          step="1800" >
        </input>
      </div>

      {
      /**
       * Hora Fin Alterna 2
       *    onChange  👍
       *    id        👍
       *    value     👍
       *    Llega     👍 
       */
      }
      <div className="col-xs-4">
        <p>Hora de Fin (De 9:00 AM a 9:00 PM): </p>
        <input 
          onChange={props.onChangeF} 
          id="asesoriaHFA2" 
          value={props.asesoriaHFA2} 
          type="time" 
          min="09:00" 
          max="21:00" 
          step="1800" >
        </input>
      </div>

      {
      /**
       * Temas
       *    onChange  👍
       *    id        👍
       *    value     👍
       *    Llega     👍 
       */
      }
      <div className="col-xs-4">
        <p>Temas (ctrl + click): </p>
        <select 
          onChange={props.onChangeF} 
          multiple id="asesoriaTema" 
          value={props.temas} >
            { 
              props.temasComplete.map(tema => 
                <option 
                  key={tema.uid} 
                  value={tema.uid}>
                    {tema.nombre}
                </option>
              )
            }
        </select>
      </div>
      <div className="col-xs-12 center-xs">
        <button 
          className="button" 
          onClick={props.send}>
            Solicitar
        </button>
      </div>
    </div>
  );
}

export default FormSolicitarAsesoria;