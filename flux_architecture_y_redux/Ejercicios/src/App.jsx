import { useEffect } from "react";
import "./App.css";
import { store } from "./redux/counterReducer";

function App() {
  const [data, setData] = useState(0);
  useEffect(() => {
    store.subscribe(() => {
      setData(store.getState());
    });
  }, []);

  return (
    <>
      <h1>Flux_architecture_y_redux</h1>
      <div>
        <div>{data}</div>

        <div>
          <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
            INCREMENTAR
          </button>
        </div>

        <div>
          <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
            DECREMENTAR
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
