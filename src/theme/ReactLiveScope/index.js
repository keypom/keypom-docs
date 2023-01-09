import React from 'react';
import ReactLiveScope from '@theme-original/ReactLiveScope';
import isWds from '@web-dev-simplified/is-wds';
// const isWds = require('@web-dev-simplified/is-wds');
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

export default function ReactLiveScopeWrapper(props) {
  return (
    <>
      <ReactLiveScope {
        ...ButtonExample} />
    </>
  );
}
