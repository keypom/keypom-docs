```jsx live
function Clock(props) {
  let result = myFunc();

  return (
    <div>
    <ButtonExample onClick={() => alert('hey1!')}>Click me</ButtonExample>
    <h2>It is {result}.</h2>
    </div>
  );
}
```