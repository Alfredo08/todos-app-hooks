import './Todo.css';
import {Link} from 'react-router-dom';

function Todo( props ){
    console.log( props );
    return(
        <div className='tarjeta_todo'>
            <h3 className='titulo_todo'>
                Pendiente: {props.todo.nombre}
            </h3>
            <p className='status_todo'>
                Status: {props.todo.status}
            </p>
            
            <div>
                {
                (props.todo.status !== 'Completo') ? 
                    (<button onClick={() => props.actualizarTodo( props.todo.id, 'Completo' )}>
                        Completar
                    </button>) : "" 
                }
                {
                (props.todo.status !== 'En progreso') ? 
                    (<button onClick={() => props.actualizarTodo( props.todo.id, 'En progreso' )}>
                        En progreso
                    </button>) : ""
                }
                {
                    (props.todo.status !== 'Cancelado') ?
                    (<button onClick={() => props.actualizarTodo( props.todo.id, 'Cancelado' )}>
                        Cancelar
                    </button>) : ""
                }
                
            </div>
            <Link to={'/todo/' + props.todo.id}> Ver detalle </Link>
            <button onClick={() => props.eliminarTodo(props.todo.id)}>
                Eliminar todo
            </button>
            
        </div>
    );
}

export default Todo;