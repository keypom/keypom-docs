import React from 'react';
import ReactLiveScope from '@theme-original/ReactLiveScope';
import * as testImport from '@web-dev-simplified/is-wds';


export default function ReactLiveScopeWrapper(props) {
  return (
    <>
      <ReactLiveScope {
        ...props,
        testImport} />
    </>
  );
}
