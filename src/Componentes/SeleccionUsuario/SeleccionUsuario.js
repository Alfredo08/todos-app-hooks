
function SeleccionUsuario( props ){
    /*
        const redireccionAListaTodos = ( event ) => {
        props.seleccionarUsuario( event );
        props.history.push( '/todos' );
    }*/
    return(
        <form onSubmit={props.seleccionarUsuario} >
            <label htmlFor="nombreUsuario">
                Por favor selecciona tu usuario
            </label>
            <select id="nombreUsuario" name="nombreUsuario">
                {
                    props.usuarios.map( (usuario, index) => {
                        return (
                            <option value={usuario.nombreUsuario} key={'usuario_' + index}>
                                {usuario.nombre} {usuario.apellido}
                            </option>
                        );
                    })
                }
            </select>
            <button type="submit">
                Seleccionar
            </button>
        </form>
    )
}

export default SeleccionUsuario;