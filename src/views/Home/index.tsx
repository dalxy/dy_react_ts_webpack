import React from "react";
import { Button } from "antd";
class Home extends React.Component{
  render(){
    return (
      <div className="home">
        <Button onClick={goAbout} type="primary" size="large">Home</Button>
      </div>
    );
  }
}

function goAbout(){
  window.location.href='/about'
}

export default Home;