import React from 'react'
import './Box.css'
const Box = ({ message,box,time }) => {
    return (
      <div className="sender_box" id={box}>
        <div className="container">
          <div className="sender_boxText">{message}</div>
            <div className="sender_boxFooter">{time}</div>
        </div>
      </div>
    ); 
};

export default Box