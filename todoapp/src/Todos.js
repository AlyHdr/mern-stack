
const Todos = ({todos,deleteTodo}) => {

    const todoslist = todos.length ? (
        todos.map( todo => {
            return(
                <div className="post card" key={todo._id}>
                    <div className="card-content">
                        <p onClick={() => deleteTodo(todo._id)}>{todo.content}</p>
                    </div>
                </div>
            )
        })
        
    ):(
        <p className="center"> You have nothing to do, yay!</p>
    )
    return(
        <div className="container">
            {todoslist}
        </div>
    )
}
export default Todos