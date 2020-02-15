import * as React from 'react';
// import {Input} from 'antd'
import TodoInput from 'components/Todos/TodoInput'
import axios from 'config/axios'
import './Todos.scss'

class Todos extends React.Component {

  addTodo = async (params:any)=>{
    try {
      const response = await axios.post('todos',  params)
      console.log(response.data)
    }catch (e) {
      throw new Error(e)
    }
  }

  public render() {
    return(
      <div className="Todos" id="Todos">
        {/*params是里面要把内容传出来*/}
        <TodoInput addTodo={(params:any)=>this.addTodo(params)}/>
      </div>
    );
  }
}
export default Todos;
