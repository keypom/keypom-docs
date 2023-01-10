import React from 'react';
//import ReactLiveScope from '@theme-original/ReactLiveScope';
import isWds from 'is-wds-npm-package';
//import * as kpjs from "keypom-js";
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

function myFunc2(num1, num2){
  return num1 * num2;
}

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ButtonExample,
  myFunc,
  myFunc2
};

export default ReactLiveScope;