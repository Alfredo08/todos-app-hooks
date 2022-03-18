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

  const [usuario, setUsario] = useState( 'alex88' );
  const [nombre, setNombre] = useState( 'Alexander' );
  const [apellido, setApellido] = useState( 'Martinez' );
  const [edad, setEdad] = useState( 25 );
  const [todos, setTodos] = useState( todosIniciales );
  const [nuevoNombreTodo, setNuevoNombreTodo] = useState( '' );
  const [nuevoStatusTodo, setNuevoStatusTodo] = useState( '' );
  const [nuevoIDTodo, setNuevoIDTodo] = useState( 0 );

  const cambiarDatos = () => {
    setNombre( (nombrePrev) => "Alex" );
    setApellido( (apellidoPrev) => "Garcia" );
    setEdad( (edadPrevia) => edadPrevia + 1 );
  }

  const actualizarTodo = ( idTodo, statusNuevo ) => {
    console.log( "Entrando " );
    let todosActualizados = todos; 
    console.log( todosActualizados );
    for( let i = 0; i < todosActualizados.length; i ++ ){
      if( todosActualizados[i].id === idTodo ){
        todosActualizados[i].status = statusNuevo;
      }
    }
    console.log( "Antes del set" );
    setTodos( (todosPrev) => todosActualizados );
    console.log( "Despues del set" );
  }

  const agregarNuevoTodo = (event) => {
    event.preventDefault();
    let nuevoTodo = {
      nombre : nuevoNombreTodo,
      status : nuevoStatusTodo,
      id : Number(nuevoIDTodo)
    }
    setTodos( (todosPrev) => [...todosPrev, nuevoTodo] );
    setNuevoIDTodo( 0 );
    setNuevoNombreTodo( '' );
    setNuevoStatusTodo( '' );
  }

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
                   value={nuevoNombreTodo} 
                   onChange={(event) => setNuevoNombreTodo(event.target.value)}/>
          </div>
          <div>
            <label htmlFor="statusTodo">
              Status todo:
            </label>
            <input type="text" id="statusTodo"
                   value={nuevoStatusTodo} 
                   onChange={(event) => setNuevoStatusTodo(event.target.value)} />
          </div>
          <div>
            <label htmlFor="idTodo">
              ID todo:
            </label>
            <input type="number" id="idTodo"
                   value={nuevoIDTodo} 
                   onChange={(event) => setNuevoIDTodo(event.target.value)} />
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
                <Todo todo={todo} actualizarTodo={() => actualizarTodo()} key={'todo_' + indice}>
                  <p> Elemento enviado desde el componente padre. </p>
                </Todo>
              );
            })
          }
        </div>
        <button onClick={() => cambiarDatos()} >
          Cambiar nombre a Alex
        </button>
    </div>
  );
}

export default App;
