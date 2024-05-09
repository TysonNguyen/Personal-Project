import Button from "./Button";
import imgSrc from "./assets/img-holder.png";
function Card() {
  return (
    <>
      <div className="card">
        <img src={imgSrc} alt="" />
        <Button name="button3 "></Button>
      </div>
    </>
  );
}
export default Card;
