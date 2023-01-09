import React from 'react';
import ReactLiveScope from '@theme-original/ReactLiveScope';
import isWds from '@web-dev-simplified/is-wds';
// const isWds = require('@web-dev-simplified/is-wds');


export default function ReactLiveScopeWrapper(props) {
  return (
    <>
      <ReactLiveScope {
        ...isWds} />
    </>
  );
}
