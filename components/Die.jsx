import "./Die.css";

function Die(props) {
  let styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  return (
    <div className="field" style={styles} onClick={props.holdDice}>
      <h2 className="die-num">{props.value}</h2>
    </div >
  );
}

export default Die;
