import {useState} from 'react';
import './App.css';
import Todo from './Componentes/Todo/Todo';

function App() {
  const todosIniciales = [{
    nombre : 'Aprender componentes de tipo clase.',
    status : 'En progreso',
    id : 123
  },
  {
    nombre : 'Aprender eventos en React.',
    status : 'En progreso',
    id : 456
  }];

  const todoNuevoInicial = {
    nombre : '',
    status : '',
    id : 0
  };

  const [nombre, setNombre] = useState( 'Alexander' );
  const [apellido, setApellido] = useState( 'Martinez' );
  const [edad, setEdad] = useState( 25 );
  const [todos, setTodos] = useState( todosIniciales );
  const [nuevoTodo, setNuevoTodo] = useState( todoNuevoInicial );

  const actualizarTodo = ( idTodo, statusNuevo ) => {
    let todosActualizados = [...todos];
    for( let i = 0; i < todosActualizados.length; i ++ ){
      if( todosActualizados[i].id === idTodo ){
        todosActualizados[i].status = statusNuevo;
      }
    }
    setTodos( (todosPrev) => todosActualizados );
  }

  const cambiarDatos = () => {
    setNombre( (nombrePrev) => "Alex" );
    setApellido( (apellidoPrev) => "Garcia" );
    setEdad( (edadPrevia) => edadPrevia + 1 );
  }

  const agregarNuevoTodo = (event) => {
    event.preventDefault();

    setTodos( (todosPrev) => [...todosPrev, nuevoTodo] );
    setNuevoTodo( (todoNuevoPrev) => todoNuevoInicial );
  }

  const actualizaCampoNuevoTodo = ( propiedad, valor ) => {
    setNuevoTodo({
        ...nuevoTodo,
        [propiedad] : valor
    });
  }

  const mensajeAlex = () => {
    return(
      <p>
        Alex ya no tiene 25 años
      </p>
    )
  }

  let numeros = [];

  for( let i = 0; i <= 10; i ++ ){
    numeros.push( <p key={"numero_" + i}> {i} </p> )
  }

  if( edad === 25 ){
    return (
      <div>
          <h2>
            Bienvenido de vuelta {nombre} {apellido}. Edad {edad}
          </h2>
          <form onSubmit={agregarNuevoTodo}>
            <div>
              <label htmlFor="nombreTodo">
                Nombre todo:
              </label>
              <input type="text" id="nombreTodo" 
                    value={nuevoTodo.nombre} 
                    onChange={(event) => actualizaCampoNuevoTodo('nombre', event.target.value)}/>
            </div>
            <div>
              <label htmlFor="statusTodo">
                Status todo:
              </label>
              <select  id="statusTodo" 
                      onChange={(event) => actualizaCampoNuevoTodo('status', event.target.value)}>
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
                    value={nuevoTodo.id} 
                    onChange={(event) => actualizaCampoNuevoTodo('id', event.target.value)} />
            </div>
            <button type="submit">
              Agregar
            </button>
          </form>
          <h3>
            Lista de pendientes
          </h3>
          <div className="lista_todos">
            {
              todos.map( (todo, indice) => { 
                return ( 
                  <Todo todo={todo} actualizarTodo={actualizarTodo} key={'todo_' + indice}>
                    <p> Elemento enviado desde el componente padre. </p>
                  </Todo>
                );
              })
            }
          </div>
          <button onClick={() => cambiarDatos()} >
            Cambiar nombre a Alex
          </button>
          {numeros}
      </div>
    );
  }
  else{
    return(
      <div>
        { (edad > 25) ? mensajeAlex() : "" }
      </div>
    )
  }
}

export default App;
