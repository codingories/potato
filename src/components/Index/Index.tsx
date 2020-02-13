import * as React from 'react';
import { Button } from 'antd';

interface Irouter {
  history: any
}

// router给Index传props属性, 要声明props的类型,也可以直接声明一个接口
class Component extends React.Component<Irouter> {

  login = ()=>{
    this.props.history.push('/login')
  }

   render() {
    return (
      <div className="Component">
        <Button onClick={this.login}>登录</Button>
      </div>
    )
  }
}

export default Component
