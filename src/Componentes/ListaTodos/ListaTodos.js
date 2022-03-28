import Todo from "../Todo/Todo";
import Navegacion from './../Navegacion/Navegacion';

function ListaTodos( props ){
    return(
        <div>
            <Navegacion nombreUsuario={props.nombreUsuario}/>
            <h3>
                Lista de pendientes
            </h3>

            <div className="lista_todos">
            {
                props.todos.map( (todo, indice) => { 
                    return ( 
                    <Todo todo={todo} 
                          actualizarTodo={props.actualizarTodo} 
                          eliminarTodo={props.eliminarTodo}
                          key={'todo_' + indice} />
                    );
                })
            }
            </div>
        </div>
    )
}

export default ListaTodos;