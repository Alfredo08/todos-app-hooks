import Navegacion from './../Navegacion/Navegacion';

function FormularioTodo( props ){
    console.log( props );
    return(
      <div>
        <Navegacion nombreUsuario={props.nombreUsuario}/>
        <form onSubmit={props.agregarNuevoTodo}>
            <div>
              <label htmlFor="nombreTodo">
                Nombre todo:
              </label>
              <input type="text" id="nombreTodo" 
                    value={props.nuevoTodo.nombre} 
                    onChange={(event) => props.actualizaCampoNuevoTodo('nombre', event.target.value)}/>
            </div>
            <div>
              <label htmlFor="statusTodo">
                Status todo:
              </label>
              <select  id="statusTodo" 
                      onChange={(event) => props.actualizaCampoNuevoTodo('status', event.target.value)}>
                <option value="Completo"> Completo </option>
                <option value="En progreso"> En progreso </option>
                <option value="Cancelado"> Cancelado </option>
              </select>
            </div>
            <div>
              <label htmlFor="idTodo">
                ID todo:
              </label>
              <input type="number" id="idTodo"
                    value={props.nuevoTodo.id} 
                    onChange={(event) => props.actualizaCampoNuevoTodo('id', Number(event.target.value))} />
            </div>
           
            <button type="submit">
              Agregar
            </button>
        </form>
      </div>
    )
}

export default FormularioTodo;