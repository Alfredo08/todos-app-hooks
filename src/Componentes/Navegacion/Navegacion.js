import {Link} from 'react-router-dom';

function Navegacion( props ){
    return(
      <div>
        <h1>
          Bienvenido de vuelta {props.nombreUsuario}
        </h1>
        <ul className="navegacion">
          <li className="opcion">
            <Link to="/"> Dashboard </Link>
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

export default Navegacion;