
function RegistroUsuario( props ){
    return (
        <form onSubmit={props.registrarUsuario}>
            <div>
                <label htmlFor="nombre">
                    Nombre:
                </label>
                <input type="text" id="nombre" name="nombre" />
            </div>
            <div>
                <label htmlFor="apellido">
                    Apellido:
                </label>
                <input type="text" id="apellido" name="apellido" />
            </div>
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
                Registar
            </button>
        </form>
    );
}

export default RegistroUsuario;