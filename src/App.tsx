import React, { useReducer } from 'react';
import './App.css';
import { todoInitialState, todoReducer } from './store/todos/reducers';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState)

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {state.allIds.map(id => <p>{state.getById[id].text}</p>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
