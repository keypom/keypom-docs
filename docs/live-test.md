```jsx live
function Clock(props) {
  let result = testImport.isWDS("WDS");
  
  return (
    <div>
      <h2>It is {result}.</h2>
    </div>
  );
}
```