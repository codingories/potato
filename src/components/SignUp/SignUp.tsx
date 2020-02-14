import * as React from 'react';
import { Input,Icon,Button } from 'antd';
import {Link} from 'react-router-dom'
import axios from '../../../src/config/axios'
import './SignUp.scss'

interface ISignUpState { // 如果不声明会报Property 'account' does not exist on type 'Readonly<{}>'.的错误
  account: string,
  password: string,
  passwordConformation: string
}

class SignUp extends React.Component<any,ISignUpState> { // 第一个参数声明prop的类型，第二个参数声明state的类型
  constructor(props:any){
    super(props)
    this.state = {
      account: '',
      password: '',
      passwordConformation: ''
    }
  }

  onChangeAccount = (e:any) => {
    this.setState({account: e.target.value})
  }

  onChangePassword = (e:any) => {
    this.setState({password: e.target.value})
  }

  onChangePasswordConformation = (e:any) => {
    this.setState({passwordConformation: e.target.value})
  }

  submit = async () => {
    const { account,password,passwordConformation } = this.state;
    try{
      await axios.post('sign_up/user',{
        account,
        password_confirmation:passwordConformation,
        password
      })
      console.log('成功')
    }catch (e) {
      throw new Error(e)
    }
  }

  linkTo = () => {
    this.props.history.push('login')
  }

  public render() {
    const { account,password,passwordConformation } = this.state;
    return (
      <div id="SignUp">
        <h1>番茄闹钟注册</h1>
        <Input
          placeholder="请输入你的用户名"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value = {account}
          onChange={this.onChangeAccount}
        />
        <Input.Password value={password} placeholder="请输入密码" onChange={this.onChangePassword}/>
        <Input.Password value={passwordConformation} placeholder="请确认密码" onChange={this.onChangePasswordConformation}/>
        <Button type="primary" className="loginButton" onClick={this.submit}>注册</Button>
        <p>如果你有账号，请立即登录<Link to="/login">登录</Link>
        </p>
      </div>
    )
  }
}

export default SignUp
