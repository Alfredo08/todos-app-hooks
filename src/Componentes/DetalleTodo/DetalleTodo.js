import Todo from "./../Todo/Todo";
import Navegacion from './../Navegacion/Navegacion';

function DetalleTodo( props ){
    
    const todoSeleccionado = props.todos.find( (todo, indice) => todo.id === Number(props.match.params.identificador) );

    return(
        <div>
            <Navegacion nombreUsuario={props.nombreUsuario}/>
            {
                (todoSeleccionado) ? <Todo todo={todoSeleccionado} /> : <div> Todo no encontrado </div>
            }
        </div>
    );
}

export default DetalleTodo;