import "./App.css";
import { useRef } from "react";
import PageInputState from "./components/useState";
import PageInputEffect from "./components/UseEffect";
import PageInputReducer from "./components/UseReducer";
import PageInputCallback from "./components/UseCallback";
import PageInputMemo from "./components/UseMemo";
import InputTexto from "./components/UseRef";
import PageInputLayoutEffect from "./components/UseLayoutEffect";
import InputTextoImperative from "./components/UseImperativeHandler";
import PageInputDebugValue from "./components/UseDebugValue";
import PageInputContext, { PageContextProvider } from "./components/UseContext";
function App() {
  // const inputRef = useRef(null); //Estas lineas son para el UseImput
  // const focaInput = () => {
  //   inputRef.current.focus();
  //   inputRef.current.console();
  // };

  return (
    <div className="App">
      {/* <PageInputState /> */}
      {/* <PageInputEffect/> */}
      {/* <PageInputReducer/> */}
      {/* <PageInputCallback/> */}
      {/* <PageInputMemo /> */}
      {/* <InputTexto /> */}
      {/* <InputTextoImperative ref={inputRef} /> */}
      {/* <button className="focusButton" onClick={focaInput}>Enfocar Input </button> */}
      {/* <PageInputLayoutEffect/> */}
      {/* <PageInputDebugValue/> */}
      {/* <PageContextProvider> <PageInputContext /></PageContextProvider> */}
    </div>
  );
}

export default App;
