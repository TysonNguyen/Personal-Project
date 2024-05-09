import prototype from "prop-types";
function Button(props) {
  const clickEvent = () => {
    
  }
  return <button onClick = {clickEvent}>{props.name}</button>;
}

Button.prototype = {
  name: prototype.String,
};
export default Button;
