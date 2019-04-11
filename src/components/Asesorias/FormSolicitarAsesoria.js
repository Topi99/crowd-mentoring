import React from 'react';

const TimeInput = props => {
  return(
    <select value={props.valueIn} onChange={props.onChangeIn} id={props.idIn}>
      <option value="09:00">09:00</option>
      <option value="09:30">09:30</option>
      <option value="10:00">10:00</option>
      <option value="10:30">10:30</option>
      <option value="11:00">11:00</option>
      <option value="11:30">11:30</option>
      <option value="12:00">12:00</option>
      <option value="12:30">12:30</option>
      <option value="13:00">13:00</option>
      <option value="13:30">13:30</option>
      <option value="14:00">14:00</option>
      <option value="14:30">14:30</option>
      <option value="15:00">15:00</option>
      <option value="15:30">15:30</option>
      <option value="16:00">16:00</option>
      <option value="16:30">16:30</option>
      <option value="17:00">17:00</option>
      <option value="17:30">17:30</option>
      <option value="18:00">18:00</option>
      <option value="18:30">18:30</option>
      <option value="19:00">19:00</option>
      <option value="19:30">19:30</option>
      <option value="20:00">20:00</option>
      <option value="20:30">20:30</option>
      <option value="21:00">21:00</option>
      <option value="21:30">21:30</option>
    </select>
  );
}

const FormSolicitarAsesoria = props => {
  return(
    /**
     * Asunto
     *    onChange  👍
     *    id        👍
     *    value     👍
     *    Llega     👍
     */
    <form className="row start-xs" onSubmit={props.send}>
      <div className="col-xs-12">
        <p>Asunto: </p>
        <input 
          required
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
      <div className="col-xs-12 col-md-4">
        <p>Fecha preferida: </p>
        <input 
          required
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
      <div className="col-xs-12 col-md-4">
        <p>Hora de inicio (De 09:00 a 21:00): </p>
        <TimeInput
          required 
          onChangeIn={props.onChangeF} 
          idIn="asesoriaHIP" 
          valueIn={props.asesoriaHIP} />
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
      <div className="col-xs-12 col-md-4">
        <p>Hora de Fin (De 09:00 a 21:00): </p>
        <TimeInput
          required 
          onChangeIn={props.onChangeF} 
          idIn="asesoriaHFP" 
          valueIn={props.asesoriaHFP} />
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
      <div className="col-xs-12 col-md-4">
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
      <div className="col-xs-12 col-md-4">
        <p>Hora de inicio (De 09:00 a 21:00): </p>
        <TimeInput 
          onChangeIn={props.onChangeF} 
          idIn="asesoriaHIA1" 
          valueIn={props.asesoriaHIA1} />
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
      <div className="col-xs-12 col-md-4">
        <p>Hora de Fin (De 09:00 a 21:00): </p>
        <TimeInput 
          onChangeIn={props.onChangeF} 
          idIn="asesoriaHFA1" 
          valueIn={props.asesoriaHFA1} />
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
      <div className="col-xs-12 col-md-4">
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
      <div className="col-xs-12 col-md-4">
        <p>Hora de inicio (De 09:00 a 21:00): </p>
        <TimeInput 
          onChangeIn={props.onChangeF} 
          idIn="asesoriaHIA2" 
          valueIn={props.asesoriaHIA2} />
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
      <div className="col-xs-12 col-md-4">
        <p>Hora de Fin (De 09:00 a 21:00): </p>
        <TimeInput 
          onChangeIn={props.onChangeF} 
          idIn="asesoriaHFA2" 
          valueIn={props.asesoriaHFA2} />
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
      <div className="col-xs-12 col-md-4">
        <p>Temas (ctrl + click): </p>
        <select 
          required
          onChange={props.onChangeF} 
          multiple id="asesoriaTema" 
          value={props.temas} >
            { 
              props.temasComplete.map(tema => 
                <option 
                  key={tema.uid} 
                  value={tema.nombre + '|' + tema.uid}>
                    {tema.nombre}
                </option>
              )
            }
        </select>
      </div>
      <div className="col-xs-12 col-md-8">
				<p>Mensaje: </p>
				<textarea
          required 
					placeholder="Detalla los temas de la asesoría: "
					id="mensajeAs"
					value={props.mensajeAs}
					onChange={props.onChangeF} />
      </div>
      <div className="col-xs-12 center-xs">
        <button 
          className="button" 
          type="submit">
            Solicitar
        </button>
				<p className="gray padding">Al dar click en "Solicitar" aceptas los términos y condiciones del sitio.</p>
      </div>
    </form>
  );
}

export default FormSolicitarAsesoria;