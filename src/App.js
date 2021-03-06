import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import ListaTodos from './Componentes/ListaTodos/ListaTodos';
import FormularioTodo from './Componentes/FormularioTodo/FormularioTodo';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import DetalleTodo from './Componentes/DetalleTodo/DetalleTodo';
//import SeleccionUsuario from './Componentes/SeleccionUsuario/SeleccionUsuario';
import RegistroUsuario from './Componentes/RegistroUsuario/RegistroUsuario';
import Login from './Componentes/Login/Login';

function App( props ) {
  const todoNuevoInicial = {
    nombre : '',
    status : '',
    id : 0
  };

  const [nombreUsuario, setNombreUsuario] = useState( '' );
  const [usuarios, setUsuarios] = useState( [] );
  const [todos, setTodos] = useState( [] );
  const [nuevoTodo, setNuevoTodo] = useState( todoNuevoInicial );
  const [mensajeError, setMensajeError] = useState( '' );

  const actualizarTodo = ( idTodo, statusNuevo ) => {
    const datosActualizar = {
      id: idTodo,
      status : statusNuevo
    };
    const config = {
      headers : {
        'api-token' : localStorage.getItem( 'token' )
      }
    };

    axios.put( 'http://localhost:8080/api/todo/actualizar', datosActualizar, config )
      .then( response => {
        let todosActualizados = [...todos];
        for( let i = 0; i < todosActualizados.length; i ++ ){
          if( todosActualizados[i].id === idTodo ){
            todosActualizados[i].status = statusNuevo;
          }
        }
        setTodos( (todosPrev) => todosActualizados );
      })
      .catch( err => {
        console.log( err.response.statusText );
        props.history.push( '/login' );
      });
    
  }

  const agregarNuevoTodo = (event) => {
    event.preventDefault();
    const ajusteNuevoTodo = {
      ...nuevoTodo,
      nombreUsuario
    }
    const config = {
      headers : {
        'api-token' : localStorage.getItem( 'token' )
      }
    };
    axios.post( 'http://localhost:8080/api/todo/nuevo', ajusteNuevoTodo, config )
      .then( response => {
        setTodos( (todosPrev) => [...todosPrev, response.data] );

      })
      .catch( err => {
        // Validar el error
        console.log( err.response.statusText );
        props.history.push( '/login' );
      })
    setNuevoTodo( (todoNuevoPrev) => todoNuevoInicial );
  }

  const actualizaCampoNuevoTodo = ( propiedad, valor ) => {
    setNuevoTodo({
        ...nuevoTodo,
        [propiedad] : valor
    });
  }

  /*
  const seleccionarUsuario = ( event ) => {
    event.preventDefault();
    setNombreUsuario( (nombrePrev) => event.target.nombreUsuario.value );
    props.history.push( '/todos' );
  }
  */

  const eliminarTodo = (id) => {
    const config = {
      headers : {
        'api-token' : localStorage.getItem( 'token' )
      }
    };
    axios.delete( `http://localhost:8080/api/todo/eliminar/${id}`, {}, config )
      .then( response => {
        const todosActualizados = [...todos];
        const indice = todos.findIndex( (todo) => todo.id === Number( id ) );
        todosActualizados.splice( indice, 1 );
        setTodos( (todosPrev) => todosActualizados );
      })
      .catch( err =>{
        console.log( err.response.statusText );
        props.history.push( '/login' );
      });
  }

  const registrarUsuario = ( event ) => {
    event.preventDefault();
    const nuevoUsuario = {
      nombre : event.target.nombre.value,
      apellido : event.target.apellido.value,
      nombreUsuario : event.target.nombreUsuario.value,
      password : event.target.password.value
    };

    axios.post( `http://localhost:8080/api/usuario/registrar`, nuevoUsuario )
      .then( response => {
        localStorage.setItem( 'token', response.data.token );
        setMensajeError( '' );
        props.history.push( '/todos' );
      })
      .catch( err => {
        setMensajeError( err.response.statusText );
      });
  }

  const loginUsuario = ( event ) => {
    event.preventDefault();

    const usuario = {
      nombreUsuario : event.target.nombreUsuario.value,
      password : event.target.password.value
    }

    axios.post( 'http://localhost:8080/api/usuario/login', usuario )
      .then( response => {
        console.log( response.data );
        localStorage.setItem( 'token', response.data.token );
        setMensajeError( '' );
        props.history.push( '/todos' );
      })
      .catch( err => {
        setMensajeError( err.response.statusText );
      });
  }

  const validarToken = () => {
    const token = localStorage.getItem( 'token' );
    const config = {
      headers : {
        'api-token' : token
      }
    }
    axios.post( 'http://localhost:8080/api/usuario/validarToken', {}, config )
      .then( response => {
        setNombreUsuario( response.data.nombreUsuario );
      });
  }

  useEffect( () => {
    if( nombreUsuario !== '' ){
      const config = {
        headers : {
          'api-token' : localStorage.getItem( 'token' )
        }
      }
      axios.get( `http://localhost:8080/api/usuario/getById/${nombreUsuario}`, config )
        .then( response => {
          console.log( response );
          setTodos( (todosPrev) => response.data.todos );
        })
        .catch( err =>{
          console.log( err.response.statusText );
          props.history.push( '/login' );
        });
    }
    else{
      props.history.push( '/login' );
    }
  }, [nombreUsuario]);

  useEffect( () => {
    const config = {
      headers : {
        'api-token' : localStorage.getItem( 'token' )
      }
    }
    axios.get( 'http://localhost:8080/api/usuario/getAll', config )
      .then( response => {
        const listaUsuarios = response.data.map( (usuario, index) => {
          return {
            nombre : usuario.nombre,
            apellido : usuario.apellido,
            nombreUsuario : usuario.nombreUsuario
          }
        })
        .catch( err =>{
          console.log( err.response.statusText );
          props.history.push( '/login' );
        });
        setUsuarios( (usuariosPrev) => listaUsuarios );
        
      });
  }, []);
  return (
    <div>
        <Switch>
          <Route exact path="/" render={ (routeProps) => <Login 
                                                      loginUsuario = {loginUsuario}
                                                      {...routeProps} /> } />
          <Route exact path="/login" render={ (routeProps) => <Login 
                                                      loginUsuario = {loginUsuario}
                                                      {...routeProps} /> } />
          <Route path="/registro" render={ (routeProps) => <RegistroUsuario 
                                              registrarUsuario = {registrarUsuario}
                                              {...routeProps}/> } />
          <Route path="/todo/nuevo" 
               render={ (routeProps) => <FormularioTodo agregarNuevoTodo={agregarNuevoTodo}
                                              nuevoTodo={nuevoTodo}
                                              nombreUsuario={nombreUsuario}
                                              actualizaCampoNuevoTodo={actualizaCampoNuevoTodo}
                                              usuarios={usuarios}
                                              {...routeProps}/>} />
          <Route path="/todos" render={ (routeProps) => {
            validarToken();

            if( nombreUsuario !== '' ){
              return( 
                <ListaTodos todos={todos} 
                            validarToken={validarToken}
                            actualizarTodo={actualizarTodo}
                            eliminarTodo={eliminarTodo}
                            nombreUsuario={nombreUsuario}
                            {...routeProps}/>
              );
            }
            else{
              return(
                <div>
                  Necesitas hacer login para ver el contenido de esta pagina
                  <Link to="/login"> Ir a login</Link>
                </div>
              );
            }
          }} />
          <Route path="/todo/:identificador" render={ (routeProps) => <DetalleTodo {...routeProps} 
                                                  todos={todos}
                                                  eliminarTodo={eliminarTodo}
                                                  nombreUsuario={nombreUsuario} />} />
        </Switch>
        <div>
          {mensajeError}
        </div>
        
    </div>
  );

  
}

export default withRouter(App);
