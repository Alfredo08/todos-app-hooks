import {Link} from 'react-router-dom';

function Login( props ){
    return (
        <div>
            <form onSubmit={props.loginUsuario}>
                <div>
                    <label htmlFor="nombreUsuario">
                        Nombre de usuario:
                    </label>
                    <input type="text" id="nombreUsuario" name="nombreUsuario" />
                </div>
                <div>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
            <div>
                Aun no cuentas con un usuario?
            </div>
            <Link to="/registro">
                Registro
            </Link>
        </div>
        
    );
}

export default Login;