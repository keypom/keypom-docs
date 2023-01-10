```jsx live
function Clock(props) {
  let result = myFunc();
  let res2 = myFunc2(5,5)

  return (
    <div>
    <ButtonExample onClick={() => alert('hey1!')}>Click me</ButtonExample>
    <h2>It is {result}.</h2>
    <h2>The product is {res2}.</h2>
    </div>
  );
}
```