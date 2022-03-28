import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import ListaTodos from './Componentes/ListaTodos/ListaTodos';
import FormularioTodo from './Componentes/FormularioTodo/FormularioTodo';
import {Route, Switch, withRouter} from 'react-router-dom';
import DetalleTodo from './Componentes/DetalleTodo/DetalleTodo';
import SeleccionUsuario from './Componentes/SeleccionUsuario/SeleccionUsuario';

function App( props ) {
  const todoNuevoInicial = {
    nombre : '',
    status : '',
    id : 0
  };

  const [nombre, setNombre] = useState( '' );
  const [apellido, setApellido] = useState( '' );
  const [nombreUsuario, setNombreUsuario] = useState( '' );
  const [usuarios, setUsuarios] = useState( [] );
  const [todos, setTodos] = useState( [] );
  const [nuevoTodo, setNuevoTodo] = useState( todoNuevoInicial );

  const actualizarTodo = ( idTodo, statusNuevo ) => {
    const datosActualizar = {
      id: idTodo,
      status : statusNuevo
    };
    axios.put( 'http://localhost:8080/api/todo/actualizar', datosActualizar )
      .then( response => {
        let todosActualizados = [...todos];
        for( let i = 0; i < todosActualizados.length; i ++ ){
          if( todosActualizados[i].id === idTodo ){
            todosActualizados[i].status = statusNuevo;
          }
        }
        setTodos( (todosPrev) => todosActualizados );
      })
    
  }

  const agregarNuevoTodo = (event) => {
    event.preventDefault();
    const ajusteNuevoTodo = {
      ...nuevoTodo,
      nombreUsuario
    }

    axios.post( 'http://localhost:8080/api/todo/nuevo', ajusteNuevoTodo )
      .then( response => {
        setTodos( (todosPrev) => [...todosPrev, response.data] );

      })
    setNuevoTodo( (todoNuevoPrev) => todoNuevoInicial );
  }

  const actualizaCampoNuevoTodo = ( propiedad, valor ) => {
    setNuevoTodo({
        ...nuevoTodo,
        [propiedad] : valor
    });
  }

  const seleccionarUsuario = ( event ) => {
    event.preventDefault();
    setNombreUsuario( (nombrePrev) => event.target.nombreUsuario.value );
    props.history.push( '/todos' );
  }

  const eliminarTodo = (id) => {
    axios.delete( `http://localhost:8080/api/todo/eliminar/${id}`)
      .then( response => {
        const todosActualizados = [...todos];
        const indice = todos.findIndex( (todo) => todo.id === Number( id ) );
        todosActualizados.splice( indice, 1 );
        setTodos( (todosPrev) => todosActualizados );
      });
  }

  useEffect( () => {
    if( nombreUsuario !== '' ){
      axios.get( `http://localhost:8080/api/usuario/getById/${nombreUsuario}` )
        .then( response => {
          console.log( response );
          setTodos( (todosPrev) => response.data.todos );
        });
    }
  }, [nombreUsuario]);

  useEffect( () => {
    axios.get( 'http://localhost:8080/api/usuario/getAll' )
      .then( response => {
        const listaUsuarios = response.data.map( (usuario, index) => {
          return {
            nombre : usuario.nombre,
            apellido : usuario.apellido,
            nombreUsuario : usuario.nombreUsuario
          }
        });
        setUsuarios( (usuariosPrev) => listaUsuarios );
        
      });
  }, []);
  return (
    <div>
        <Switch>
          <Route exact path="/" render={ (routeProps) => <SeleccionUsuario usuarios={usuarios}
                                                      seleccionarUsuario={seleccionarUsuario}
                                                      {...routeProps} /> } />
          <Route path="/todo/nuevo" 
               render={ (routeProps) => <FormularioTodo agregarNuevoTodo={agregarNuevoTodo}
                                              nuevoTodo={nuevoTodo}
                                              nombreUsuario={nombreUsuario}
                                              actualizaCampoNuevoTodo={actualizaCampoNuevoTodo}
                                              usuarios={usuarios}
                                              {...routeProps}/>} />
          <Route path="/todos" render={ (routeProps) => <ListaTodos todos={todos} 
                                                          actualizarTodo={actualizarTodo}
                                                          eliminarTodo={eliminarTodo}
                                                          nombreUsuario={nombreUsuario}
                                                          {...routeProps}/>} />
          <Route path="/todo/:identificador" render={ (routeProps) => <DetalleTodo {...routeProps} 
                                                  todos={todos}
                                                  eliminarTodo={eliminarTodo}
                                                  nombreUsuario={nombreUsuario} />} />
        </Switch>
        
        
    </div>
  );

  
}

export default withRouter(App);
