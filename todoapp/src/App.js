import React from 'react'

import Todos from './Todos'
import AddTodo from './AddTodo'
import axios from 'axios'
class App extends React.Component{
  state = {
    todos:[]
  }
  componentDidMount(){
    var url = "http://localhost:8000"
    axios.get(`${url}/todos`)
        .then((res) => {
            this.setState({
                todos:res.data
            })
        }).catch((err)=>{
            console.error(err)
        })
  }
  deleteTodo = (id) => {
    var url = "http://localhost:8000"
    axios.post(url+"/delete",{
      id:id
    }).then((res)=>{
      const todos = this.state.todos.filter(todo => {
        return todo._id !== id
      })
      this.setState({
        todos:todos
      })
    })
  }
  addTodo = (todo) => {
    var url = "http://localhost:8000"
    axios.post(url+"/add",{
      content:todo.content
    }).then((res)=>{
      todo._id = res.data.insertedId
      let todos = [...this.state.todos, todo]
      this.setState({
        todos:todos
      })
    })
  }
  render() {
    return(
      <div className="todo-app container">
          <h1 className="center blue-text">Todo's</h1>
          <Todos todos={this.state.todos} deleteTodo={this.deleteTodo}></Todos>
          <AddTodo addTodo={this.addTodo}></AddTodo>
      </div>
    )
  }
}

export default App;