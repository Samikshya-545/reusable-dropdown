import React from 'react';
import Dropdown from './Dropdown';

const App = () => {
  const options = Array.from({ length: 10 }, (_, index) => `Option ${index + 1}`);

  return (
    <div>
      <h1>Reusable Dropdown Component</h1>
      <Dropdown options={options} />
    </div>
  );
};

export default App;




