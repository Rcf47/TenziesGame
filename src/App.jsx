import "./App.css";
import { useEffect, useState } from "react";
import Die from "../components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"
import Timer from "../components/Timer"

function App() {
  const [arrayDie, setArrayDie] = useState(generateDiceArray(10));
  const [winCondition, setWinCondition] = useState(false);
  const [rollNumber, setRollNumber] = useState(0)

  useEffect(() => {
    const allHeld = arrayDie.every((die) => die.isHeld);
    const allValue = arrayDie.every((die) => die.value === arrayDie[0].value);
    if (allHeld && allValue) {
      setWinCondition(true);
    }
  }, [arrayDie]);

  function randomInt() {
    return Math.ceil(Math.random() * 6);
  }

  function getNewDice() {
    return {
      id: nanoid(),
      value: randomInt(),
      isHeld: false,
    };
  }
  function generateDiceArray(numberItem) {
    let objInt = [];
    for (let i = 0; i < numberItem; i++) {
      objInt.push(getNewDice());
    }
    return objInt;
  }

  function handleClick() {
    setRollNumber(prevRollNumber => prevRollNumber + 1)
    setArrayDie((previousDiceArray) =>
      previousDiceArray.map((item) =>
        item.isHeld === true ? item : getNewDice()
      )

    );
    if (winCondition) {
      setRollNumber(0)
      setWinCondition(false)
      setArrayDie(generateDiceArray(10))
    }
  }
  function holdDice(id) {
    setArrayDie((previousDiceArray) =>
      previousDiceArray.map((item) =>
        item.id === id ? { ...item, isHeld: !item.isHeld } : item
      )
    );
  }

  let dieArray = arrayDie.map((item) => (
    <Die
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      holdDice={() => holdDice(item.id)}
    />
  ));

  return (
    <main className="board">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="roll-counter">{`Number of moves: ${rollNumber}`}</div>
      <Timer winCondition={winCondition} />
      <div className="wrapper">{dieArray}</div>
      <button onClick={handleClick} className="button">
        {winCondition ? "New game" : "Roll"}
      </button>
      {winCondition && <Confetti />}
    </main>
  );
}

export default App;
