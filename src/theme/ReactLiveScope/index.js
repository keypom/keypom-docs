import React from 'react';
//import ReactLiveScope from '@theme-original/ReactLiveScope';
import isWds from '@web-dev-simplified/is-wds';
//const isWds = require('@web-dev-simplified/is-wds');
//        ...isWds,

const ButtonExample = (props) => (
  <button
    {...props}
    style={{
      backgroundColor: 'white',
      color: 'black',
      border: 'solid red',
      borderRadius: 20,
      padding: 10,
      cursor: 'pointer',
      ...props.style,
    }}
  />
);

function myFunc(){
  return isWds("abc");
}

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ButtonExample,
  myFunc
};

export default ReactLiveScope;