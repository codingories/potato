import * as React from 'react';
// import {Input} from 'antd'
import TodoInput from 'components/Todos/TodoInput'
import TodoItem from 'components/Todos/TodoItem'
import axios from 'config/axios'
import './Todos.scss'

interface ITodosState {
  todos: any[];
}

class Todos extends React.Component<any, ITodosState> {
  constructor(props:any){
    super(props)
    this.state = {
      todos: []
    }
  }

  addTodo = async (params:any)=>{
    const {todos} = this.state
    try {
      const response = await axios.post('todos',  params)
      this.setState({todos:[response.data.resource,...todos]})
      console.log(response.data)
    }catch (e) {
      throw new Error(e)
    }
  }

  componentDidMount(){
    this.getTodos()
  }

  getTodos = async () => {
    try{
      const response = await axios.get('todos')
      const todos = response.data.resources.map((t:any)=>Object.assign({},t,{editing:false}))
      // 添加editing:false来判断是否是可编辑状态
      this.setState({todos})
      console.log(response.data);
    }catch (e) {
      throw new Error(e)
    }
  }

  updateTodo = async (id:number,params:any) => {
    const {todos} = this.state
    try {
      const response = await axios.put( `todos/${id}`, params )
      const newTodos = todos.map(t=>{
        if(id === t.id){
          return response.data.resource // 这里就直接把后台获取的状态反给id
        } else {
          return t
        }
      })
      this.setState({todos: newTodos})
    }catch (e) {
      throw new Error(e)
    }
  }

  toEditing = (id:number) => {
    const {todos} = this.state
    const newTodos = todos.map(t=>{
      if(id===t.id){
        return Object.assign({},t,{editing:true})
      } else {
        return Object.assign({},t,{editing:false})
      }
    })
    this.setState({todos:newTodos})
  }

  public render() {
    return(
      <div className="Todos" id="Todos">
        {/*params是里面要把内容传出来*/}
        <TodoInput addTodo={(params:any)=>this.addTodo(params)}/>
        <main>
          {
            this.state.todos.map(t=><TodoItem key={t.id} {...t}
              update={this.updateTodo} toEditing={this.toEditing}
            />)
          }
        </main>
      </div>
    );
  }
}
export default Todos;
