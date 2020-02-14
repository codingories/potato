import * as React from 'react';
import { Button } from 'antd';
import axios from '../../config/axios'

interface Irouter {
  history: any
}

interface IIndexState {
  user: any
}

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
    try{
      const response = await axios.get('me')
      this.setState({user: response.data})
    }catch (e) {
      // console.error('获取用户失败')
      // if(e.response.status === 401){
      //   this.props.history.push('/login')
      // }
    }
  }


  logout = ()=>{
    localStorage.setItem('x-token','')
    this.props.history.push('/login')
  }

   render() {
    return (
      <div className="Component">
        <p>欢迎，{this.state.user && this.state.user.account}</p>
        <Button onClick={this.logout}>注销</Button>
      </div>
    )
  }
}

export default Index
