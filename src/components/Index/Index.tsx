import * as React from 'react';
import {Dropdown, Icon ,Menu} from 'antd'
import Todos from 'components/Todos/Todos'
import axios from '../../config/axios'
import history from '../../../src/config/history'
import './Index.scss'

interface Irouter {
  history: any
}

interface IIndexState {
  user: any
}

const logout = ()=>{
  localStorage.setItem('x-token','')
  history.push('/login')
}

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      个人设置
    </Menu.Item>
    <Menu.Item key="2" onClick={logout}>
      <Icon type="logout" />
      注销
    </Menu.Item>
  </Menu>
);


// router给Index传props属性, 要声明props的类型,也可以直接声明一个接口
class Index extends React.Component<Irouter,IIndexState> {

  constructor(props: any){
    super(props)
    this.state = {
      user: {}
    }
  }

  async componentWillMount(){
    await this.getMe()
  }

  getMe = async () => {
    const response = await axios.get('me')
    this.setState({user: response.data})
  }




   render() {
    return (
      <div className="Index" id="Index">
        <header>
          <span className="logo">LOGO</span>
          <Dropdown overlay={menu}>
            <span>{this.state.user && this.state.user.account}
            <Icon type="down" style={{ marginLeft: 8 }}/>
            </span>
          </Dropdown>
        </header>
        <main>
          <Todos />
        </main>
      </div>
    )
  }
}

export default Index
