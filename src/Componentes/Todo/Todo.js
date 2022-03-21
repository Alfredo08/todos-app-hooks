import './Todo.css';

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
        
            {props.children}
        </div>
    );
}

export default Todo;