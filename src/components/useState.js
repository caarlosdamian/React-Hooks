import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function PageInputState() {
  const [state, setState] = useState(0);

  function increment() {
    setState(state + 1);
  }
  function decrement() {
    setState(state - 1);
  }
  function handleChange(event) {
    setState(Number(event.target.value));
  }

  return (
    <div className="content">
      <button onClick={decrement}>
        <FiMinus />
      </button>
      <input type="number" step="1" value={state} onChange={handleChange} />
      <button onClick={increment}>
        <FiPlus />
      </button>
    </div>
  );
}
