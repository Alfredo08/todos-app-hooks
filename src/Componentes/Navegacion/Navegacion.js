import {Link, withRouter} from 'react-router-dom';

function Navegacion( props ){

  const logout = () => {
    localStorage.removeItem( 'token' );
    props.history.push( '/login' );
  } 

  return(
    <div>
      <h1>
        Bienvenido de vuelta {props.nombreUsuario}
      </h1>
      <ul className="navegacion">
        <li className="opcion">
          <button onClick={logout}> Logout </button>
        </li>
        <li className="opcion">
          <Link to="/todo/nuevo"> Agregar Todo </Link>
        </li>
        <li className="opcion">
          <Link to="/todos"> Lista de todos </Link>
        </li>
      </ul>
    </div>
  );
}

export default withRouter(Navegacion);