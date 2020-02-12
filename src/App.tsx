import React from 'react';
import { Rate,Button } from 'antd';
import './App.css';

console.log(Button)

const App = () => {
  return (
    <div className="App">
      <Rate character="6" />
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
      <Button type="link">Link</Button>
    </div>
  );
}

export default App;
