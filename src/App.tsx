import React from 'react';
import CheckboxList from './CheckboxList';
import './App.css';

const App: React.FC = () => {
  return (
      <div className="App">
        <header className="App-header">
          <h1>React Select All Checkboxes Example</h1>
        </header>
        <CheckboxList />
      </div>
  );
}

export default App;
